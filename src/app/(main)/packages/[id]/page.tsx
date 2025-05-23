// Path: src/app/api/packages/[id]/route.ts
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';

// Define interfaces to match the expected structure from getPackageWithCategories
interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
  // Add other fields if they exist in your ItineraryDay structure from admin side
  // e.g., activities: any[]; meals: string[]; accommodation: string;
}

interface PackageCategoryWithParsedImages {
  id: number;
  package_id: number;
  category_name: string;
  price: number;
  hotel_details: string | null;
  category_description: string | null;
  max_pax_included_in_price: number | null;
  images: string[]; // Parsed images
  // created_at and updated_at are likely present from DB but optional for frontend
  created_at?: string;
  updated_at?: string;
}

interface PackageWithCategories {
  id: number;
  name: string;
  description: string | null;
  duration: string;
  base_price: number;
  max_people: number | null;
  created_by: number; // Assuming this might still be relevant for some checks or logs
  is_active: number;
  itinerary: ItineraryDay[]; // Parsed itinerary
  included_services: string | null; // Keep as string, or parse if it's structured JSON
  images: string[];        // Parsed main images
  cancellation_policy: string | null;
  created_at: string;
  updated_at: string;
  categories: PackageCategoryWithParsedImages[];
  // Add other potential top-level fields like bestTimeToVisit, howToReach if they are part of main package
  bestTimeToVisit?: string;
  howToReach?: string;
}
// --- End Interface ---


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // Destructure 'id' from params
) {
  const dbService = new DatabaseService();
  const packageId = params.id;

  try {
    const idAsNumber = parseInt(packageId, 10);
    if (isNaN(idAsNumber)) {
      return NextResponse.json(
        { success: false, message: 'Invalid package ID format. Must be a number.' },
        { status: 400 }
      );
    }

    // Use the new service method to fetch the package with its categories and parsed fields
    const pkg: PackageWithCategories | null = await dbService.getPackageWithCategories(idAsNumber);

    if (!pkg) {
      return NextResponse.json(
        { success: false, message: `Active package with ID ${idAsNumber} not found.` },
        { status: 404 }
      );
    }
    
    // The pkg object already has images and itinerary as parsed arrays.
    // Categories within pkg.categories also have their images as parsed arrays.
    return NextResponse.json({
      success: true,
      message: `Package details retrieved successfully for ID: ${idAsNumber}`,
      data: pkg // pkg is now the PackageWithCategories object
    });

  } catch (err) {
    console.error(`Error fetching package with ID ${packageId}:`, err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve package details',
        error: errorMessage,
        data: null
      },
      { status: 500 }
    );
  }
}

// --- PUT/DELETE placeholders remain the same ---
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.warn(`PUT /api/packages/${params.id} is not fully implemented.`);
  return NextResponse.json({
    success: false,
    message: `PUT method for package ID ${params.id} not implemented yet.`,
    data: null
  }, { status: 501 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.warn(`DELETE /api/packages/${params.id} is not fully implemented.`);
  return NextResponse.json({
    success: false,
    message: `DELETE method for package ID ${params.id} not implemented yet.`
  }, { status: 501 });
}
