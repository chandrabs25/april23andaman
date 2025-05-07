import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/database";
import { verifyAuth, requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    serviceId: string;
  };
}

// Helper function to check ownership, verification, and type
async function checkHotelOwnershipAndVerification(
  db: DatabaseService,
  userId: number | string,
  serviceId: number
): Promise<{ isOwner: boolean; isVerified: boolean; isHotelVendor: boolean; serviceProviderId: number | null }> {
  const serviceProvider = await db.getServiceProviderByUserId(Number(userId));
  if (!serviceProvider || !serviceProvider.id) {
    return { isOwner: false, isVerified: false, isHotelVendor: false, serviceProviderId: null };
  }

  const isVerified = serviceProvider.verified === 1;
  const isHotelVendor = serviceProvider.type === "hotel";
  const serviceProviderId = serviceProvider.id;

  // Check if the service exists and belongs to the provider
  const service = await db.getServiceById(serviceId);
  const isOwner = service !== null && service?.provider_id === serviceProvider.id;

  // Additionally confirm the service type is indeed hotel
  if (isOwner && service?.type !== "hotel") {
      console.warn(`Ownership check passed for service ${serviceId}, but type is ${service?.type}, not hotel.`);
      // Treat as not owner for hotel-specific endpoints
      return { isOwner: false, isVerified, isHotelVendor, serviceProviderId };
  }

  return { isOwner, isVerified, isHotelVendor, serviceProviderId };
}

// GET: Fetch details for a specific hotel
export async function GET(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found after auth check" },
      { status: 401 }
    );
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // Verify ownership, verification, and type
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 } // Use 404 to avoid revealing existence
      );
    }    // --- Verification Check Removed for GET as per requirements ---
    // if (!isVerified) {
    //     return NextResponse.json(
    //         { success: false, message: \"Vendor account not verified. Cannot view hotel details.\" },
    //         { status: 403 }
    //     );
    // }
    // --- End Check ---
    if (!isHotelVendor) {
        // This check is somewhat redundant if isOwner check confirms service type is hotel
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // Fetch the joined hotel details
    const hotel = await db.getHotelById(serviceId);

    if (!hotel) {
      // Should be caught by isOwner check, but for safety
      return NextResponse.json(
        { success: false, message: "Hotel details not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: hotel });
  } catch (error) {
    console.error(`Error fetching hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to fetch hotel details.", error: message },
      { status: 500 }
    );
  }
}

// PUT: Update a specific hotel
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found after auth check" },
      { status: 401 }
    );
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // Verify ownership, verification, and type
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 }
      );
    }
     if (!isVerified) {
        return NextResponse.json(
            { success: false, message: "Vendor account not verified. Cannot update hotel." },
            { status: 403 }
        );
    }
    if (!isHotelVendor) {
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // Define expected body structure (similar to POST, but service_id is known)
     interface HotelUpdateBody {
      // Generic Service Fields (subset that can be updated here)
      name: string;
      description?: string;
      price: number; // Base per-night rate
      cancellation_policy?: any;
      images?: string | null; // General Hotel Photos (URL)
      island_id: number;
      // is_active is handled by status endpoint
      // Hotel-Specific Fields
      star_rating: number;
      check_in_time: string;
      check_out_time: string;
      total_rooms?: number;
      facilities?: string[];
      meal_plans?: string[];
      pets_allowed?: boolean;
      children_allowed?: boolean;
      accessibility_features?: string;
      street_address: string;
      geo_lat?: number | null;
      geo_lng?: number | null;
    }

    const body: HotelUpdateBody = await request.json();

    // Basic validation
     if (
      !body.name ||
      body.price === undefined ||
      body.island_id === undefined ||
      body.star_rating === undefined ||
      !body.check_in_time ||
      !body.check_out_time ||
      !body.street_address
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define type for service update data
    interface ServiceUpdateData {
        name: string;
        description: string | null;
        island_id: number;
        price: number;
        images: string | null;
        cancellation_policy: string | null;
    }

    // Prepare data for database update
    const serviceUpdateData: ServiceUpdateData = {
      name: body.name,
      description: body.description ?? null,
      // type cannot be changed
      island_id: Number(body.island_id),
      price: Number(body.price),
      images: body.images ?? null,
      cancellation_policy: null,
      // is_active is not updated here
    };

    // Safely stringify JSON fields
    let cancellationPolicyString: string | null = null;
    try {
        if (body.cancellation_policy) {
            cancellationPolicyString = JSON.stringify(body.cancellation_policy);
        }
    } catch (e) {
        console.error(`Hotel Update (Service ID ${serviceId}): Failed to stringify cancellation_policy`, e);
        return NextResponse.json({ success: false, message: 'Invalid format for cancellation policy data.' }, { status: 400 });
    }
    // @ts-ignore - Property exists in database schema but not in type
    serviceUpdateData.cancellation_policy = cancellationPolicyString;

    let facilitiesString: string | null = null;
    try {
        if (body.facilities) {
            facilitiesString = JSON.stringify(body.facilities);
        }
    } catch (e) {
        console.error(`Hotel Update (Service ID ${serviceId}): Failed to stringify facilities`, e);
        return NextResponse.json({ success: false, message: 'Invalid format for facilities data.' }, { status: 400 });
    }

    let mealPlansString: string | null = null;
    try {
        if (body.meal_plans) {
            mealPlansString = JSON.stringify(body.meal_plans);
        }
    } catch (e) {
        console.error(`Hotel Update (Service ID ${serviceId}): Failed to stringify meal_plans`, e);
        return NextResponse.json({ success: false, message: 'Invalid format for meal plans data.' }, { status: 400 });
    }

    const hotelUpdateData = {
      star_rating: Number(body.star_rating),
      check_in_time: body.check_in_time,
      check_out_time: body.check_out_time,
      total_rooms: body.total_rooms ? Number(body.total_rooms) : null,
      facilities: facilitiesString, // Use safe string
      meal_plans: mealPlansString, // Use safe string
      pets_allowed: body.pets_allowed === undefined ? false : body.pets_allowed,
      children_allowed:
        body.children_allowed === undefined ? true : body.children_allowed,
      accessibility: body.accessibility_features ?? null, // Map API name to DB name
      street_address: body.street_address,
      geo_lat: body.geo_lat ?? null,
      geo_lng: body.geo_lng ?? null,
    };

    // Use the database method to update hotel (handles transaction)
    const result = await db.updateHotel(serviceId, serviceUpdateData, hotelUpdateData);

    if (!result.success) {
       if (result.error?.includes("No changes detected")) {
             return NextResponse.json({ success: false, message: "No changes detected." }, { status: 400 });
       }
      throw new Error(result.error || "Failed to update hotel in database");
    }

    // Fetch the updated hotel to return it
    const updatedHotel = await db.getHotelById(serviceId);
    if (!updatedHotel) {
      throw new Error("Failed to retrieve updated hotel.");
    }

    return NextResponse.json(
      { success: true, message: "Hotel updated successfully", data: updatedHotel }
    );
  } catch (error) {
    console.error(`Error updating hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to update hotel.", error: message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a specific hotel
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found after auth check" },
      { status: 401 }
    );
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // Verify ownership, verification, and type
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 }
      );
    }
     if (!isVerified) {
        return NextResponse.json(
            { success: false, message: "Vendor account not verified. Cannot delete hotel." },
            { status: 403 }
        );
    }
    if (!isHotelVendor) {
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // Optional: Check for active bookings associated with this hotel/its rooms?

    // Use the database method to delete the hotel (handles transaction/cascade)
    const result = await db.deleteHotel(serviceId);

    if (!result.success) {
      throw new Error(result.error || "Failed to delete hotel in database");
    }
    if (result.meta?.changes === 0) {
      // This implies the service/hotel didn\'t exist, contradicting ownership check
      return NextResponse.json(
        { success: false, message: "Hotel not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Hotel deleted successfully" });
  } catch (error) {
    console.error(`Error deleting hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    // Consider specific errors, e.g., foreign key constraints if cascade isn\'t perfect
    return NextResponse.json(
      { success: false, message: "Failed to delete hotel.", error: message },
      { status: 500 }
    );
  }
}

