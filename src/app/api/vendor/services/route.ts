import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET: Fetch all services for the authenticated vendor
export async function GET(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  try {
    const db = new DatabaseService();
    const serviceProvider = await db.getServiceProviderByUserId(Number(user.id));

    if (!serviceProvider || !serviceProvider.id) {
      return NextResponse.json({ success: false, message: 'Service provider profile not found for this user.' }, { status: 404 });
    }

    const result = await db.getServicesByProvider(serviceProvider.id);

    if (!result || !result.success) {
      console.error('Failed to fetch vendor services from database:', result?.error);
      return NextResponse.json({ success: false, message: 'Failed to fetch services.' }, { status: 500 });
    }

    const services = result.results ?? [];
    return NextResponse.json({ success: true, data: services });

  } catch (error) {
    console.error('Error fetching vendor services:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to fetch services.', error: message }, { status: 500 });
  }
}

// POST: Create a new service for the authenticated vendor
export async function POST(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Vendor role
  if (authResponse) return authResponse;

  const { user } = await verifyAuth(request);
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  try {
    const db = new DatabaseService();
    const serviceProvider = await db.getServiceProviderByUserId(Number(user.id));

    if (!serviceProvider || !serviceProvider.id) {
      return NextResponse.json({ success: false, message: 'Service provider profile not found for this user. Cannot create service.' }, { status: 403 });
    }

    // Define expected body structure
    interface ServiceCreateBody {
      name: string;
      description?: string;
      type: string;
      island_id: number;
      price: number;
      availability?: any;
      images?: string | null; // Expect string (e.g., URL or comma-separated)
      amenities?: any;
      cancellation_policy?: any;
      is_active?: boolean;
    }

    const body: ServiceCreateBody = await request.json();

    // Basic validation
    if (!body.name || !body.type || body.price === undefined || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }

    // Ensure island exists (optional but good practice)
    const island = await db.getIslandById(Number(body.island_id));
    if (!island) {
        return NextResponse.json({ success: false, message: `Island with ID ${body.island_id} not found.` }, { status: 400 });
    }

    const result = await db.createService({
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      provider_id: serviceProvider.id, // Use the fetched provider ID
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: body.availability ? JSON.stringify(body.availability) : null,
      images: body.images ?? null, // Store as provided string
      amenities: body.amenities ? JSON.stringify(body.amenities) : null, // Assuming amenities might be structured
      cancellation_policy: body.cancellation_policy ? JSON.stringify(body.cancellation_policy) : null, // Assuming policy might be structured
      is_active: body.is_active === undefined ? true : body.is_active, // Default to active
    });

    if (!result.success || !result.meta?.last_row_id) {
        throw new Error(result.error || 'Failed to create service in database');
    }

    // Fetch the newly created service to return it
    const newService = await db.getServiceById(result.meta.last_row_id);
    if (!newService) {
        // Should not happen if insert succeeded, but handle defensively
        throw new Error('Failed to retrieve newly created service.');
    }

    return NextResponse.json({ success: true, message: 'Service created successfully', data: newService }, { status: 201 });

  } catch (error) {
    console.error('Error creating service:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    // Check for specific DB errors like UNIQUE constraints if needed
    return NextResponse.json({ success: false, message: 'Failed to create service.', error: message }, { status: 500 });
  }
}
