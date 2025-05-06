// src/app/api/hotels/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/database";
import type { Hotel, PaginatedHotelsResponse } from "@/types/hotel";

export const dynamic = "force-dynamic"; // Ensure dynamic rendering

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dbService = new DatabaseService();

  // Pagination parameters
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  // Filtering parameters
  const name = searchParams.get("name") || undefined;
  const location = searchParams.get("location") || undefined;
  const minRatingParam = searchParams.get("minRating");
  const minRating = minRatingParam ? parseFloat(minRatingParam) : undefined;

  const filters = {
    name,
    location,
    minRating,
  };

  try {
    const hotelsResult = await dbService.getAllHotels(limit, offset, filters);
    const totalHotelsResult = await dbService.countAllHotels(filters);

    if (!hotelsResult || !hotelsResult.results || totalHotelsResult === null || totalHotelsResult.total === undefined) {
      console.error("Failed to fetch hotels or count from database");
      return NextResponse.json(
        { success: false, message: "Failed to retrieve hotel data." },
        { status: 500 }
      );
    }
    
    const responseData: PaginatedHotelsResponse = {
        data: hotelsResult.results as Hotel[], // Cast here after ensuring parsing in DB service
        total: totalHotelsResult.total,
        page: page,
        limit: limit,
    };

    return NextResponse.json({ success: true, ...responseData }, { status: 200 });

  } catch (error) {
    console.error("Error fetching hotels:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: `Failed to fetch hotels: ${errorMessage}` },
      { status: 500 }
    );
  }
}

