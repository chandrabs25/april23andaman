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
    return service?.provider_id === serviceProvider.id;
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

    const body = await request.json();

    // Basic validation
    if (!body.name || !body.type || !body.price || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }

    const result = await db.updateService(serviceId, {
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: body.availability ? JSON.stringify(body.availability) : null,
      images: body.images ?? null,
      amenities: body.amenities ?? null,
      cancellation_policy: body.cancellation_policy ?? null,
    });

     if (!result.success) {
        throw new Error(result.error || 'Failed to update service in database');
    }

    // Optionally fetch the updated service
    // const updatedService = await db.getServiceById(serviceId);

    return NextResponse.json({ success: true, message: 'Service updated successfully' /*, data: updatedService */ });

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
