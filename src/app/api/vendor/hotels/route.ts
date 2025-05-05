import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/database";
import { verifyAuth, requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET: Fetch all hotels for the authenticated vendor
export async function GET(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found after auth check" },
      { status: 401 }
    );
  }

  try {
    const db = new DatabaseService();
    const serviceProvider = await db.getServiceProviderByUserId(Number(user.id));

    if (!serviceProvider || !serviceProvider.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Service provider profile not found for this user.",
        },
        { status: 404 }
      );
    }

    // --- Verification Check Removed for GET as per requirements ---
    // if (!serviceProvider.verified) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Vendor account not verified. Cannot manage hotels.",
    //     },
    //     { status: 403 }
    //   );
    // }
    // --- End Check ---
    if (serviceProvider.type !== "hotel") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. This endpoint is for hotel vendors only.",
        },
        { status: 403 }
      );
    }

    // Fetch hotels (services with type=\'hotel\' joined with hotels table)
    const result = await db.getHotelsByProvider(serviceProvider.id);

    if (!result || !result.success) {
      console.error(
        "Failed to fetch vendor hotels from database:",
        result?.error
      );
      return NextResponse.json(
        { success: false, message: "Failed to fetch hotels." },
        { status: 500 }
      );
    }

    const hotels = result.results ?? [];
    return NextResponse.json({ success: true, data: hotels });
  } catch (error) {
    console.error("Error fetching vendor hotels:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to fetch hotels.", error: message },
      { status: 500 }
    );
  }
}

// POST: Create a new hotel for the authenticated vendor
export async function POST(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json(
      { success: false, message: "User not found after auth check" },
      { status: 401 }
    );
  }

  try {
    const db = new DatabaseService();
    const serviceProvider = await db.getServiceProviderByUserId(Number(user.id));

    if (!serviceProvider || !serviceProvider.id) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Service provider profile not found for this user. Cannot create hotel.",
        },
        { status: 403 }
      );
    }

    // Check Verification Status & Type
    if (!serviceProvider.verified) {
      return NextResponse.json(
        {
          success: false,
          message: "Vendor account not verified. Cannot create hotel.",
        },
        { status: 403 }
      );
    }
    if (serviceProvider.type !== "hotel") {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. This endpoint is for hotel vendors only.",
        },
        { status: 403 }
      );
    }

    // Define expected body structure based on design_hotel_management_pages.md
    interface HotelCreateBody {
      // Generic Service Fields
      name: string;
      description?: string;
      price: number; // Base per-night rate
      cancellation_policy?: any;
      images?: string | null; // General Hotel Photos (URL)
      island_id: number;
      is_active?: boolean;
      // Hotel-Specific Fields
      star_rating: number;
      check_in_time: string; // e.g., "14:00"
      check_out_time: string; // e.g., "12:00"
      total_rooms?: number;
      facilities?: string[]; // e.g., ["Pool", "Gym", "Spa"]
      meal_plans?: string[]; // e.g., ["Breakfast", "Half-board"]
      pets_allowed?: boolean;
      children_allowed?: boolean;
      accessibility_features?: string;
      street_address: string;
      geo_lat?: number | null;
      geo_lng?: number | null;
    }

    const body: HotelCreateBody = await request.json();

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
        {
          success: false,
          message:
            "Missing required fields (name, price, island_id, star_rating, check_in_time, check_out_time, street_address)",
        },
        { status: 400 }
      );
    }

    // Ensure island exists
    const island = await db.getIslandById(Number(body.island_id));
    if (!island) {
      return NextResponse.json(
        { success: false, message: `Island with ID ${body.island_id} not found.` },
        { status: 400 }
      );
    }

    // Define type for serviceData based on createService input
    interface ServiceDataForCreate {
        name: string;
        description: string | null;
        type: string;
        provider_id: number;
        island_id: number;
        price: number;
        availability: string | null;
        images: string | null;
        amenities: string | null;
        cancellation_policy: string | null;
        is_active?: boolean;
    }

    // Prepare data for database insertion
    const serviceData: ServiceDataForCreate = {
      name: body.name,
      description: body.description ?? null,
      type: "hotel", // Hardcoded type
      provider_id: serviceProvider.id,
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: null, // Hotels usually manage availability via rooms
      images: body.images ?? null,
      amenities: null, // Use hotel-specific fields instead
      cancellation_policy: null, // Initialize as null, will be updated below
      is_active: body.is_active === undefined ? true : body.is_active,
    };

    // Safely stringify JSON fields for hotelData
    let facilitiesString: string | null = null;
    try {
        if (body.facilities) {
            facilitiesString = JSON.stringify(body.facilities);
        }
    } catch (e) {
        console.error("Hotel Creation: Failed to stringify facilities", e);
        return NextResponse.json({ success: false, message: 'Invalid format for facilities data.' }, { status: 400 });
    }

    let mealPlansString: string | null = null;
    try {
        if (body.meal_plans) {
            mealPlansString = JSON.stringify(body.meal_plans);
        }
    } catch (e) {
        console.error("Hotel Creation: Failed to stringify meal_plans", e);
        return NextResponse.json({ success: false, message: 'Invalid format for meal plans data.' }, { status: 400 });
    }

    // Safely stringify JSON for cancellation_policy in serviceData
    let cancellationPolicyString: string | null = null;
    try {
        if (body.cancellation_policy) {
            cancellationPolicyString = JSON.stringify(body.cancellation_policy);
        }
    } catch (e) {
        console.error("Hotel Creation: Failed to stringify cancellation_policy", e);
        return NextResponse.json({ success: false, message: 'Invalid format for cancellation policy data.' }, { status: 400 });
    }
    // Update serviceData with the safe string
    serviceData.cancellation_policy = cancellationPolicyString;

    const hotelData = {
      // service_id will be set after service creation
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

    // Use the new database method to create hotel (handles transaction)
    const result = await db.createHotel(serviceData, hotelData);

    if (!result.success || !result.serviceId) {
      throw new Error(result.error || "Failed to create hotel in database");
    }

    // Fetch the newly created hotel (joined data) to return it
    const newHotel = await db.getHotelById(result.serviceId);
    if (!newHotel) {
      throw new Error("Failed to retrieve newly created hotel.");
    }

    return NextResponse.json(
      { success: true, message: "Hotel created successfully", data: newHotel },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to create hotel.", error: message },
      { status: 500 }
    );
  }
}

