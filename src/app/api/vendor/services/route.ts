import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { verifyAuth, requireAuth } from '@/lib/auth'; // Assuming verifyAuth returns user with ID

export const dynamic = 'force-dynamic';

// GET: Fetch all services for the authenticated vendor
export async function GET(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Role 3 for vendor
  if (authResponse) return authResponse; // Return error response if not authorized

  const { user } = await verifyAuth(request); // Get user info again (or pass from requireAuth if modified)
  if (!user || !user.id) {
    return NextResponse.json({ success: false, message: 'User not found after auth check' }, { status: 401 });
  }

  try {
    const db = new DatabaseService();
    // 1. Get the service provider ID linked to the user ID
    const serviceProvider = await db.getServiceProviderByUserId(Number(user.id));
    if (!serviceProvider || !serviceProvider.id) {
      return NextResponse.json({ success: false, message: 'Service provider profile not found for this user.' }, { status: 404 });
    }

    // 2. Fetch services using the provider ID
    const result = await db.getServicesByProvider(serviceProvider.id);

    // D1 results are in `results` property if successful
    const services = result.results || [];

    // Add is_active boolean based on the integer value from DB
    const processedServices = services.map(s => ({
        ...s,
        isActive: s.is_active === 1 // Convert 1/0 to true/false
    }));

    return NextResponse.json({ success: true, data: processedServices });
  } catch (error) {
    console.error('Error fetching vendor services:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to fetch services.', error: message }, { status: 500 });
  }
}

// POST: Create a new service for the authenticated vendor
export async function POST(request: NextRequest) {
  const authResponse = await requireAuth(request, [3]); // Role 3 for vendor
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

    const body = await request.json();

    // Basic validation (add more as needed)
    if (!body.name || !body.type || !body.price || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }

    const result = await db.createService({
      provider_id: serviceProvider.id,
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      island_id: Number(body.island_id), // Ensure island_id is provided
      price: Number(body.price),
      availability: body.availability ? JSON.stringify(body.availability) : null, // Expecting array from client
      images: body.images ?? null, // Expecting string (URL or comma-separated)
      amenities: body.amenities ?? null,
      cancellation_policy: body.cancellation_policy ?? null,
      is_active: body.is_active === undefined ? true : body.is_active, // Default to active
    });

    if (!result.success) {
        throw new Error(result.error || 'Failed to create service in database');
    }

    // Optionally fetch the created service to return it
    // const createdServiceId = result.meta?.last_row_id;
    // const newService = createdServiceId ? await db.getServiceById(createdServiceId) : null;

    return NextResponse.json({ success: true, message: 'Service created successfully' /*, data: newService */ }, { status: 201 });

  } catch (error) {
    console.error('Error creating service:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: 'Failed to create service.', error: message }, { status: 500 });
  }
}
