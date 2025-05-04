import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/database";
import { verifyAuth, requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: {
    serviceId: string; // Hotel's service ID
    roomId: string;    // Room Type ID
  };
}

// Helper function (copied/adapted from parent route)
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

  const service = await db.getServiceById(serviceId);
  const isOwner = service !== null && service?.provider_id === serviceProvider.id;

  if (isOwner && service?.type !== "hotel") {
      return { isOwner: false, isVerified, isHotelVendor, serviceProviderId };
  }

  return { isOwner, isVerified, isHotelVendor, serviceProviderId };
}

// Helper function to check if room belongs to the hotel
async function checkRoomBelongsToHotel(
    db: DatabaseService,
    roomId: number,
    hotelServiceId: number
): Promise<boolean> {
    const roomType = await db.getRoomTypeById(roomId);
    return roomType !== null && roomType.hotel_service_id === hotelServiceId;
}

// GET: Fetch details for a specific room type
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
  const roomId = parseInt(params.roomId, 10);
  if (isNaN(serviceId) || isNaN(roomId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID or Room ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // 1. Verify ownership, verification, and type for the parent hotel
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 }
      );
    }
    // --- Verification Check Removed for GET as per requirements ---
    // if (!isVerified) {
    //     return NextResponse.json(
    //         { success: false, message: "Vendor account not verified. Cannot manage rooms." },
    //         { status: 403 }
    //     );
    // }
    // --- End Check ---
    if (!isHotelVendor) {
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // 2. Verify the room belongs to this hotel
    const roomBelongs = await checkRoomBelongsToHotel(db, roomId, serviceId);
    if (!roomBelongs) {
        return NextResponse.json(
            { success: false, message: `Room type ${roomId} does not belong to hotel ${serviceId}.` },
            { status: 404 } // Treat as not found for this hotel
        );
    }

    // Fetch the room type details
    const roomType = await db.getRoomTypeById(roomId);

    if (!roomType) {
      // Should be caught by roomBelongs check, but for safety
      return NextResponse.json(
        { success: false, message: "Room type not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: roomType });

  } catch (error) {
    console.error(`Error fetching room type ${roomId} for hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to fetch room type details.", error: message },
      { status: 500 }
    );
  }
}

// PUT: Update a specific room type
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
  const roomId = parseInt(params.roomId, 10);
  if (isNaN(serviceId) || isNaN(roomId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID or Room ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // 1. Verify ownership, verification, and type for the parent hotel
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 }
      );
    }
     if (!isVerified) {
        return NextResponse.json(
            { success: false, message: "Vendor account not verified. Cannot update room type." },
            { status: 403 }
        );
    }
    if (!isHotelVendor) {
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // 2. Verify the room belongs to this hotel
    const roomBelongs = await checkRoomBelongsToHotel(db, roomId, serviceId);
    if (!roomBelongs) {
        return NextResponse.json(
            { success: false, message: `Room type ${roomId} does not belong to hotel ${serviceId}.` },
            { status: 404 }
        );
    }

    // Define expected body structure (similar to POST)
    interface RoomTypeUpdateBody {
      room_type_name: string;
      base_price: number;
      max_guests: number;
      quantity_available?: number;
      amenities?: string[] | null;
      images?: string | null;
    }

    const body: RoomTypeUpdateBody = await request.json();

    // Basic validation
    if (!body.room_type_name || body.base_price === undefined || body.max_guests === undefined) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare data for database update
    const roomTypeUpdateData = {
      // hotel_service_id cannot be changed
      room_type_name: body.room_type_name,
      base_price: Number(body.base_price),
      max_guests: Number(body.max_guests),
      quantity_available: body.quantity_available ? Number(body.quantity_available) : null,
      amenities: body.amenities ? JSON.stringify(body.amenities) : null,
      images: body.images ?? null,
    };

    // Use the database method to update the room type
    const result = await db.updateRoomType(roomId, roomTypeUpdateData);

    if (!result.success) {
       const error = result.error as unknown; // Cast to unknown
       // Check if error is a string before calling includes
       if (typeof error === "string" && error.includes("No changes detected")) {
             return NextResponse.json({ success: false, message: "No changes detected." }, { status: 400 });
       }
       // Ensure we throw an actual Error object
       if (error instanceof Error) {
           throw error;
       } else {
           throw new Error(String(error || "Failed to update room type in database"));
       }
    }

    // Fetch the updated room type to return it
    const updatedRoomType = await db.getRoomTypeById(roomId);
    if (!updatedRoomType) {
      throw new Error("Failed to retrieve updated room type.");
    }

    return NextResponse.json(
      { success: true, message: "Room type updated successfully", data: updatedRoomType }
    );

  } catch (error) {
    console.error(`Error updating room type ${roomId} for hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: "Failed to update room type.", error: message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a specific room type
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
  const roomId = parseInt(params.roomId, 10);
  if (isNaN(serviceId) || isNaN(roomId)) {
    return NextResponse.json(
      { success: false, message: "Invalid Hotel Service ID or Room ID" },
      { status: 400 }
    );
  }

  try {
    const db = new DatabaseService();

    // 1. Verify ownership, verification, and type for the parent hotel
    const { isOwner, isVerified, isHotelVendor } = await checkHotelOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
      return NextResponse.json(
        { success: false, message: "Hotel not found or permission denied." },
        { status: 404 }
      );
    }
     if (!isVerified) {
        return NextResponse.json(
            { success: false, message: "Vendor account not verified. Cannot delete room type." },
            { status: 403 }
        );
    }
    if (!isHotelVendor) {
        return NextResponse.json(
            { success: false, message: "Access denied. Not a hotel vendor." },
            { status: 403 }
        );
    }

    // 2. Verify the room belongs to this hotel before attempting delete
    const roomBelongs = await checkRoomBelongsToHotel(db, roomId, serviceId);
    if (!roomBelongs) {
        return NextResponse.json(
            { success: false, message: `Room type ${roomId} does not belong to hotel ${serviceId}.` },
            { status: 404 }
        );
    }

    // Optional: Check for active bookings associated with this room type?

    // Use the database method to delete the room type
    const result = await db.deleteRoomType(roomId);

    if (!result.success) {
      throw new Error(result.error || "Failed to delete room type in database");
    }
    if (result.meta?.changes === 0) {
      // This implies the room didn't exist, contradicting roomBelongs check
      return NextResponse.json(
        { success: false, message: "Room type not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Room type deleted successfully" });

  } catch (error) {
    console.error(`Error deleting room type ${roomId} for hotel ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    // Consider specific errors, e.g., foreign key constraints if cascade isn't perfect
    return NextResponse.json(
      { success: false, message: "Failed to delete room type.", error: message },
      { status: 500 }
    );
  }
}

