import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    serviceId: string;
  };
}

// Helper function to check ownership
async function checkServiceOwnership(db: DatabaseService, userId: number | string, serviceId: number): Promise<boolean> {
    const serviceProvider = await db.getServiceProviderByUserId(Number(userId));
    if (!serviceProvider || !serviceProvider.id) return false;

    const service = await db.getServiceById(serviceId);
    // Also check if the service exists at all
    return service !== null && service?.provider_id === serviceProvider.id;
}

// GET: Fetch a specific service by ID (owned by the vendor)
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

    // Verify ownership before fetching details
    const isOwner = await checkServiceOwnership(db, user.id, serviceId);
    if (!isOwner) {
        // Return 404 instead of 403 to avoid revealing existence of the service to non-owners
        return NextResponse.json({ success: false, message: 'Service not found or permission denied.' }, { status: 404 });
    }

    // Fetch the service details since ownership is confirmed
    const service = await db.getServiceById(serviceId);

    // Although checkServiceOwnership implies service exists, double-check here
    if (!service) {
        // This case should technically be covered by isOwner check, but good to be safe
        return NextResponse.json({ success: false, message: 'Service not found.' }, { status: 404 });
    }

    // Note: JSON fields like 'availability' are returned as strings from the DB.
    // The frontend should handle parsing if needed.

    return NextResponse.json({ success: true, data: service });

  } catch (error) {
    console.error(`Error fetching service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to fetch service.', error: message }, { status: 500 });
  }
}

// PUT: Update a specific service
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

    // Verify ownership
    const isOwner = await checkServiceOwnership(db, user.id, serviceId);
    if (!isOwner) {
        return NextResponse.json({ success: false, message: 'Permission denied: You do not own this service.' }, { status: 403 });
    }

    interface ServiceUpdateBody {
      name: string;
      description?: string;
      type: string;
      island_id: number;
      price: number;
      availability?: any; // Consider using a more specific type
      images?: any;       // Consider using a more specific type
      amenities?: any;    // Consider using a more specific type
      cancellation_policy?: any; // Consider using a more specific type
    }

    // Apply type assertion and add explicit type annotation
    const body: ServiceUpdateBody = await request.json() as ServiceUpdateBody;

    // Add basic check for body type after parsing
    if (!body || typeof body !== 'object') {
        return NextResponse.json({ success: false, message: 'Invalid request body format' }, { status: 400 });
    }

    // Basic validation (refined check for price)
    if (!body.name || !body.type || body.price === undefined || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }

    const result = await db.updateService(serviceId, {
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: body.availability ? JSON.stringify(body.availability) : null,
      images: body.images ?? null, // Store as provided string
      amenities: body.amenities ? JSON.stringify(body.amenities) : null, // Assuming amenities might be structured
      cancellation_policy: body.cancellation_policy ? JSON.stringify(body.cancellation_policy) : null, // Assuming policy might be structured
    });

     if (!result.success) {
        throw new Error(result.error || 'Failed to update service in database');
    }

    // Optionally fetch the updated service to return it
    const updatedService = await db.getServiceById(serviceId);
    if (!updatedService) {
        // Should not happen if update succeeded, but handle defensively
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

    // Verify ownership
    const isOwner = await checkServiceOwnership(db, user.id, serviceId);
    if (!isOwner) {
        return NextResponse.json({ success: false, message: 'Permission denied: You do not own this service.' }, { status: 403 });
    }

    // Add check for existing bookings before deleting?

    const result = await db.deleteService(serviceId);

    if (!result.success) {
        throw new Error(result.error || 'Failed to delete service in database');
    }
    if (result.meta?.changes === 0) {
        return NextResponse.json({ success: false, message: 'Service not found or already deleted.' }, { status: 404 });
    }


    return NextResponse.json({ success: true, message: 'Service deleted successfully' });

  } catch (error) {
    console.error(`Error deleting service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to delete service.', error: message }, { status: 500 });
  }
}
