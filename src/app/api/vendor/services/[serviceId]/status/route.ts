import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    serviceId: string;
  };
}

// Helper function to check ownership (can be shared or redefined)
async function checkServiceOwnership(db: DatabaseService, userId: number | string, serviceId: number): Promise<boolean> {
    const serviceProvider = await db.getServiceProviderByUserId(Number(userId));
    if (!serviceProvider || !serviceProvider.id) return false;

    const service = await db.getServiceById(serviceId);
    return service !== null && service?.provider_id === serviceProvider.id;
}

// PATCH: Update the active status of a specific service
export async function PATCH(request: NextRequest, { params }: RouteContext) {
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
    const body = await request.json() as { isActive: boolean };
    const isActive = body.isActive; // Expecting { "isActive": boolean }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ success: false, message: 'Invalid request body: "isActive" must be a boolean.' }, { status: 400 });
    }

    const db = new DatabaseService();

    // Verify ownership
    const isOwner = await checkServiceOwnership(db, user.id, serviceId);
    if (!isOwner) {
        // Return 404 to prevent revealing service existence
        return NextResponse.json({ success: false, message: 'Service not found or permission denied.' }, { status: 404 });
    }

    // Update the status using the dedicated DB method
    const result = await db.updateServiceStatus(serviceId, isActive);

    if (!result.success) {
        throw new Error(result.error || 'Failed to update service status in database');
    }

    if (result.meta?.changes === 0) {
        // This might happen if the service was deleted between the ownership check and update,
        // or if the status was already the target value.
        // Check current status to confirm if it's already set
        const currentService = await db.getServiceById(serviceId);
        if (!currentService) {
             return NextResponse.json({ success: false, message: 'Service not found.' }, { status: 404 });
        }
        // Check if status is already what was requested
        if ((isActive && currentService.is_active === 1) || (!isActive && currentService.is_active === 0)) {
             return NextResponse.json({ success: true, message: `Service status was already ${isActive ? 'active' : 'inactive'}.` });
        }
        // If status is different but changes=0, something else went wrong
        return NextResponse.json({ success: false, message: 'Service not found or failed to update status.' }, { status: 404 });
    }

    // Optionally fetch the updated service to return it
    const updatedService = await db.getServiceById(serviceId);

    return NextResponse.json({
        success: true,
        message: `Service status updated successfully to ${isActive ? 'active' : 'inactive'}.`,
        data: updatedService // Return updated service data
    });

  } catch (error) {
    console.error(`Error updating status for service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to update service status.', error: message }, { status: 500 });
  }
}
