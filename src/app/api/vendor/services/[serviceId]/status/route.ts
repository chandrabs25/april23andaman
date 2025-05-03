import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    serviceId: string;
  };
}

// Helper function to check ownership (can be moved to a shared lib)
async function checkServiceOwnership(db: DatabaseService, userId: number | string, serviceId: number): Promise<boolean> {
    const serviceProvider = await db.getServiceProviderByUserId(Number(userId));
    if (!serviceProvider || !serviceProvider.id) return false;

    const service = await db.getServiceById(serviceId);
    return service?.provider_id === serviceProvider.id;
}

// PATCH: Update the active status of a service
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
    const db = new DatabaseService();

    // Verify ownership
    const isOwner = await checkServiceOwnership(db, user.id, serviceId);
    if (!isOwner) {
        return NextResponse.json({ success: false, message: 'Permission denied: You do not own this service.' }, { status: 403 });
    }

    const body = await request.json();
    const isActive = body.isActive; // Expecting { "isActive": boolean }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ success: false, message: 'Invalid request body: "isActive" (boolean) is required.' }, { status: 400 });
    }

    const result = await db.updateServiceStatus(serviceId, isActive);

    if (!result.success) {
        throw new Error(result.error || 'Failed to update service status in database');
    }
     if (result.meta?.changes === 0) {
        return NextResponse.json({ success: false, message: 'Service not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Service status updated to ${isActive ? 'active' : 'inactive'}.` });

  } catch (error) {
    console.error(`Error updating status for service ${serviceId}:`, error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to update service status.', error: message }, { status: 500 });
  }
}
