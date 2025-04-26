// Path: src/app/api/packages/route.ts
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
// --- FIX: Import DatabaseService ---
import { DatabaseService } from '@/lib/database';

// --- Interfaces (Keep these as they define the API contract) ---
interface Package {
  id: number;
  name: string;
  description: string | null;
  duration: string;
  base_price: number;
  max_people: number | null;
  created_by: number;
  is_active: number; // 0 or 1
  itinerary: string | null;
  included_services: string | null;
  images: string | null;
  created_at: string;
  updated_at: string;
}

interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

interface GetPackagesResponse {
  packages: Package[];
  pagination: PaginationInfo;
}

interface ApiError {
  message: string;
  error?: string;
}
// --- End Interfaces ---

// --- FIX: Enhanced GET handler using DatabaseService ---
export async function GET(request: NextRequest) {
  // --- FIX: Instantiate DatabaseService ---
  const dbService = new DatabaseService();
  const searchParams = request.nextUrl.searchParams;

  try {
    // --- Pagination ---
    const pageParam = searchParams.get('page') || '1';
    const limitParam = searchParams.get('limit') || '9'; // Default limit
    const page = parseInt(pageParam, 10);
    const limit = parseInt(limitParam, 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ success: false, message: 'Invalid page parameter.' }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ success: false, message: 'Invalid limit parameter.' }, { status: 400 });
    }
    const offset = (page - 1) * limit;

    // --- Filtering ---
    const filters: { minPrice?: number; maxPrice?: number; duration?: string; maxPeople?: number } = {}; // Use the interface defined in DB service if preferred
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const durationParam = searchParams.get('duration');
    const maxPeopleParam = searchParams.get('maxPeople');

    if (minPriceParam) {
      const minPrice = parseFloat(minPriceParam);
      if (!isNaN(minPrice)) filters.minPrice = minPrice;
    }
    if (maxPriceParam) {
      const maxPrice = parseFloat(maxPriceParam);
      if (!isNaN(maxPrice)) filters.maxPrice = maxPrice;
    }
    if (durationParam) {
      filters.duration = durationParam;
    }
    if (maxPeopleParam) {
      const maxPeople = parseInt(maxPeopleParam, 10);
      if (!isNaN(maxPeople)) filters.maxPeople = maxPeople;
    }

    // --- Execute Queries using Service ---
    // Fetch total count with filters
    const countResult = await dbService.countAllActivePackages(filters);
    const total = countResult?.total ?? 0;

    // Fetch packages for the current page with filters
    // The service method returns D1Result<Package[]>
    const packagesResult = await dbService.getAllActivePackages(limit, offset, filters);

    // Check D1 result success flag
    if (!packagesResult.success) {
      console.error('Failed to fetch packages from D1:', packagesResult.error);
      throw new Error('Database query failed to fetch packages.');
    }

    const packagesData = packagesResult.results || [];
    const totalPages = Math.ceil(total / limit);

    // --- Format Response ---
    const responseData: GetPackagesResponse = {
      packages: packagesData,
      pagination: {
        totalItems: total,
        currentPage: page,
        pageSize: limit,
        totalPages: totalPages
      }
    };

    return NextResponse.json({
      success: true,
      message: 'Packages retrieved successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Error fetching packages:', error);
    const apiError: ApiError = {
      message: 'Failed to retrieve packages',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
    return NextResponse.json({
      success: false,
      ...apiError,
      data: null
    }, { status: 500 });
  }
}
// --- End of FIX ---

// --- FIX: Updated POST handler using DatabaseService ---
interface CreatePackagePayload {
  name: string;
  description?: string | null;
  duration: string;
  base_price: number;
  max_people?: number | null;
  itinerary?: string | object | null; // Accept object or string
  included_services?: string | object | null; // Accept object or string
  images?: string | object | null; // Accept object or string
}

export async function POST(request: NextRequest) {
  // --- FIX: Instantiate DatabaseService ---
  const dbService = new DatabaseService();

  try {
    // --- Authentication/Authorization Placeholder ---
    // TODO: Implement real auth check. Assume user ID 1 for now.
    // const { user } = await verifyUserAuth(request); // Your auth function
    const userId = 1; // Placeholder: Replace with actual authenticated user ID
    // --- End Auth Placeholder ---

    const body = await request.json() as CreatePackagePayload;

    // --- Validation ---
    if (!body.name || !body.duration || body.base_price === undefined || body.base_price === null) {
      return NextResponse.json({
        success: false, message: 'Name, duration, and base price are required fields.', data: null
      }, { status: 400 });
    }
    if (typeof body.base_price !== 'number' || body.base_price <= 0) {
      return NextResponse.json({ success: false, message: 'Base price must be a positive number.' }, { status: 400 });
    }
    if (body.max_people !== undefined && body.max_people !== null && (typeof body.max_people !== 'number' || body.max_people <= 0)) {
      return NextResponse.json({ success: false, message: 'Max people must be a positive number if provided.' }, { status: 400 });
    }
    // --- End Validation ---

    // --- Call Service Method ---
    const result = await dbService.createPackage({
      ...body, // Spread validated payload
      created_by: userId // Add the authenticated user ID
    });

    // Check D1 result success flag and last_row_id
    if (!result.success || !result.meta?.last_row_id) {
      console.error("Package insert failed using service, D1 result:", result);
      throw new Error('Database operation failed to create package or return ID.');
    }

    return NextResponse.json({
      success: true,
      message: 'Package created successfully',
      data: { id: result.meta.last_row_id } // Return the ID of the created package
    }, { status: 201 }); // 201 Created

  } catch (error) {
    console.error('Error creating package:', error);
    const apiError: ApiError = {
      message: 'Error creating package',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
    // Optional: Check for specific errors like UNIQUE constraints if needed
    return NextResponse.json({
      success: false,
      ...apiError,
      data: null
    }, { status: 500 });
  }
}
// --- End of FIX ---