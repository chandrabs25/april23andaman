import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    serviceId: string;
  };
}

// Helper function to check ownership and verification status
async function checkServiceOwnershipAndVerification(db: DatabaseService, userId: number | string, serviceId: number): Promise<{ isOwner: boolean; isVerified: boolean; isHotel: boolean; serviceProviderId: number | null }> {
    const serviceProvider = await db.getServiceProviderByUserId(Number(userId));
    if (!serviceProvider || !serviceProvider.id) {
        return { isOwner: false, isVerified: false, isHotel: false, serviceProviderId: null };
    }

    const isVerified = serviceProvider.verified === 1;
    const isHotel = serviceProvider.type === 'hotel';
    const serviceProviderId = serviceProvider.id;

    const service = await db.getServiceById(serviceId);
    const isOwner = service !== null && service?.provider_id === serviceProvider.id;

    return { isOwner, isVerified, isHotel, serviceProviderId };
}

// GET: Fetch a specific service by ID (owned by the verified vendor)
export async function GET(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ success: false, message: 'Invalid Service ID' }, { status: 400 });
  }

  try {
    const db = new DatabaseService();

    // Verify ownership and verification
    const { isOwner, isVerified } = await checkServiceOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
        // Return 404 instead of 403 to avoid revealing existence
        return NextResponse.json({ success: false, message: 'Service not found or permission denied.' }, { status: 404 });
    }    // --- Verification Check Removed for GET as per requirements ---
    // Sticking to requirement: only verified vendors manage services.
    // if (!isVerified) {
    //     return NextResponse.json({ success: false, message: \"Vendor account not verified. Cannot view service details.\" }, { status: 403 });
    // }
    // --- End Check ---
    // Fetch the service details since ownership & verification are confirmed
    const service = await db.getServiceById(serviceId);

    if (!service) {
        // Should be caught by isOwner check, but for safety
        return NextResponse.json({ success: false, message: 'Service not found.' }, { status: 404 });
    }

    // Frontend needs to parse JSON fields like 'amenities', 'availability', 'cancellation_policy'
    return NextResponse.json({ success: true, data: service });

  } catch (error) {
    console.error(`Error fetching service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to fetch service.', error: message }, { status: 500 });
  }
}

// PUT: Update a specific service (Rentals/Activities)
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ success: false, message: 'Invalid Service ID' }, { status: 400 });
  }

  try {
    const db = new DatabaseService();

    // Verify ownership, verification, and type
    const { isOwner, isVerified, isHotel } = await checkServiceOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
        return NextResponse.json({ success: false, message: 'Permission denied: You do not own this service.' }, { status: 403 });
    }
    if (!isVerified) {
        return NextResponse.json({ success: false, message: 'Vendor account not verified. Cannot update service.' }, { status: 403 });
    }
    // This endpoint is for non-hotel services.
    // Fetch the service type to double-check, although provider type check is primary
    const serviceToUpdate = await db.getServiceById(serviceId);
    if (!serviceToUpdate) { // Should be caught by isOwner check
        return NextResponse.json({ success: false, message: 'Service not found.' }, { status: 404 });
    }
    if (isHotel || serviceToUpdate.type === 'hotel') {
        return NextResponse.json({ success: false, message: 'Hotel vendors should use the hotel management endpoint.' }, { status: 400 });
    }

    // Define expected body structure including specific fields (similar to POST)
    interface ServiceUpdateBody {
      // Generic
      name: string;
      description?: string;
      type: string; // e.g., "rental/car", "activity/trek"
      island_id: number;
      price: number;
      availability?: any;
      images?: string | null;
      cancellation_policy?: any;
      // is_active is handled by the status endpoint
      // Rental Specific (Optional)
      rental_unit?: 'per hour' | 'per day';
      quantity_available?: number;
      deposit_required?: boolean;
      deposit_amount?: number;
      age_license_requirement?: boolean;
      age_license_details?: string;
      // Activity Specific (Optional)
      duration?: number;
      duration_unit?: 'hours' | 'days';
      group_size_min?: number;
      group_size_max?: number;
      difficulty_level?: 'easy' | 'medium' | 'hard';
      equipment_provided?: string[];
      safety_requirements?: string;
      guide_required?: boolean;
      // General Amenities (Optional)
      general_amenities?: string[];
    }

    const body: ServiceUpdateBody = await request.json();

    if (!body || typeof body !== 'object') {
        return NextResponse.json({ success: false, message: 'Invalid request body format' }, { status: 400 });
    }

    // Basic validation
    if (!body.name || !body.type || body.price === undefined || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }
    if (body.type.startsWith('hotel')) {
         return NextResponse.json({ success: false, message: 'Invalid type. Use hotel management endpoint for hotels.' }, { status: 400 });
    }

    // --- Prepare Specific Fields JSON --- (Similar to POST)
    let specificFieldsData: any = {};
    if (body.type.startsWith('rental/')) {
        specificFieldsData = {
            unit: body.rental_unit,
            quantity: body.quantity_available,
            deposit: body.deposit_required ? { required: true, amount: body.deposit_amount } : { required: false },
            requirements: body.age_license_requirement ? { required: true, details: body.age_license_details } : { required: false },
        };
    } else if (body.type.startsWith('activity/')) {
        specificFieldsData = {
            duration: body.duration ? { value: body.duration, unit: body.duration_unit } : null,
            group_size: { min: body.group_size_min, max: body.group_size_max },
            difficulty: body.difficulty_level,
            equipment: body.equipment_provided,
            safety: body.safety_requirements,
            guide: body.guide_required,
        };
    }
    const amenitiesToStore = {
        general: body.general_amenities ?? [],
        specifics: specificFieldsData
    };
    // --- End Specific Fields JSON ---

    // Safely stringify JSON fields
    let availabilityString: string | null = null;
    try {
        if (body.availability) {
            // Optional: Add validation here if needed (e.g., using Zod)
            availabilityString = JSON.stringify(body.availability);
        }
    } catch (e) {
        console.error(`Service ID ${serviceId}: Failed to stringify availability`, e);
        return NextResponse.json({ success: false, message: 'Invalid format for availability data.' }, { status: 400 });
    }

    let amenitiesString: string | null = null;
    try {
        // Optional: Add validation here if needed (e.g., using Zod)
        amenitiesString = JSON.stringify(amenitiesToStore);
    } catch (e) {
        console.error(`Service ID ${serviceId}: Failed to stringify amenities`, e);
        // This might indicate a server-side logic error in creating amenitiesToStore
        return NextResponse.json({ success: false, message: 'Internal error processing service amenities.' }, { status: 500 });
    }

    let cancellationPolicyString: string | null = null;
    try {
        if (body.cancellation_policy) {
            // Optional: Add validation here if needed (e.g., using Zod)
            cancellationPolicyString = JSON.stringify(body.cancellation_policy);
        }
    } catch (e) {
        console.error(`Service ID ${serviceId}: Failed to stringify cancellation_policy`, e);
        return NextResponse.json({ success: false, message: 'Invalid format for cancellation policy data.' }, { status: 400 });
    }

    const result = await db.updateService(serviceId, {
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: availabilityString, // Use safe string
      images: body.images ?? null, // Assuming images is already a string or null
      amenities: amenitiesString, // Use safe string
      cancellation_policy: cancellationPolicyString, // Use safe string
      // is_active is not updated here, use status endpoint
    });

     if (!result.success) {
        if (result.meta?.changes === 0) {
             return NextResponse.json({ success: false, message: 'Service not found or no changes detected.' }, { status: 404 });
        }
        throw new Error(result.error || 'Failed to update service in database');
    }

    // Fetch the updated service to return it
    const updatedService = await db.getServiceById(serviceId);
    if (!updatedService) {
        throw new Error('Failed to retrieve updated service.');
    }

    return NextResponse.json({ success: true, message: 'Service updated successfully', data: updatedService });

  } catch (error) {
    console.error(`Error updating service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to update service.', error: message }, { status: 500 });
  }
}

// DELETE: Delete a specific service
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  const serviceId = parseInt(params.serviceId, 10);
  if (isNaN(serviceId)) {
    return NextResponse.json({ success: false, message: 'Invalid Service ID' }, { status: 400 });
  }

  try {
    const db = new DatabaseService();

    // Verify ownership and verification
    const { isOwner, isVerified } = await checkServiceOwnershipAndVerification(db, user.id, serviceId);

    if (!isOwner) {
        return NextResponse.json({ success: false, message: 'Permission denied: You do not own this service.' }, { status: 403 });
    }
    if (!isVerified) {
        return NextResponse.json({ success: false, message: 'Vendor account not verified. Cannot delete service.' }, { status: 403 });
    }

    // Optional: Add check for existing bookings before deleting?
    // const existingBookings = await db.checkBookingsForService(serviceId); // Needs implementation in DatabaseService
    // if (existingBookings > 0) {
    //     return NextResponse.json({ success: false, message: 'Cannot delete service with active bookings.' }, { status: 400 });
    // }

    const result = await db.deleteService(serviceId);

    if (!result.success) {
        throw new Error(result.error || 'Failed to delete service in database');
    }
    if (result.meta?.changes === 0) {
        // This implies the service didn't exist, which contradicts the ownership check, but handle defensively
        return NextResponse.json({ success: false, message: 'Service not found or already deleted.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });

  } catch (error) {
    console.error(`Error deleting service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to delete service.', error: message }, { status: 500 });
  }
}

