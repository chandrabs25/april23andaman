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

    // --- Verification Check Removed for GET as per requirements ---
    // if (!serviceProvider.verified) {
    //     return NextResponse.json({ success: false, message: 'Vendor account not verified. Cannot manage services.' }, { status: 403 });
    // }
    // --- End Check --- 

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

// POST: Create a new service for the authenticated vendor (Rentals/Activities)
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

    // --- Check Verification Status & Type --- (Added as per requirements)
    if (!serviceProvider.verified) {
        return NextResponse.json({ success: false, message: 'Vendor account not verified. Cannot create service.' }, { status: 403 });
    }
    if (serviceProvider.type === 'hotel') {
        // This endpoint is for non-hotel services. Hotels should use a different endpoint.
        return NextResponse.json({ success: false, message: 'Hotel vendors should use the hotel management endpoint.' }, { status: 400 });
    }
    // --- End Check ---

    // Define expected body structure including specific fields for rentals/activities
    // Based on pasted_content.txt and design_service_management_pages.md
    interface ServiceCreateBody {
      // Generic
      name: string;
      description?: string;
      type: string; // e.g., "rental/car", "activity/trek"
      island_id: number;
      price: number;
      availability?: any; // Keep flexible for now (text/JSON)
      images?: string | null; // URL(s)
      cancellation_policy?: any; // Keep flexible (text/JSON)
      is_active?: boolean;
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
      equipment_provided?: string[]; // Array of strings
      safety_requirements?: string;
      guide_required?: boolean;
      // General Amenities (Optional - separate from specific fields)
      general_amenities?: string[]; // e.g., helmet, insurance, GPS, guide, equipment
    }

    const body: ServiceCreateBody = await request.json();

    // Basic validation
    if (!body.name || !body.type || body.price === undefined || body.island_id === undefined) {
      return NextResponse.json({ success: false, message: 'Missing required fields (name, type, price, island_id)' }, { status: 400 });
    }
    if (body.type.startsWith('hotel')) {
         return NextResponse.json({ success: false, message: 'Invalid type. Use hotel management endpoint for hotels.' }, { status: 400 });
    }

    // Ensure island exists (optional but good practice)
    const island = await db.getIslandById(Number(body.island_id));
    if (!island) {
        return NextResponse.json({ success: false, message: `Island with ID ${body.island_id} not found.` }, { status: 400 });
    }

    // --- Prepare Specific Fields JSON --- (Added as per requirements)
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

    // Combine general amenities and specific fields into the 'amenities' TEXT field
    // Store as a JSON string: { general: [...], specifics: {...} }
    const amenitiesToStore = {
        general: body.general_amenities ?? [],
        specifics: specificFieldsData
    };
    // --- End Specific Fields JSON ---

    const result = await db.createService({
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      provider_id: serviceProvider.id, // Use the fetched provider ID
      island_id: Number(body.island_id),
      price: Number(body.price),
      availability: body.availability ? JSON.stringify(body.availability) : null,
      images: body.images ?? null, // Store as provided string
      amenities: JSON.stringify(amenitiesToStore), // Store combined JSON string
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

