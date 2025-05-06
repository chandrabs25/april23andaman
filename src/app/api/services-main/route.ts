// src/app/api/services-main/route.ts
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";
import type {
  CategorizedService,
  TransportService,
  RentalService,
  PaginatedServicesResponse,
  ServiceProviderBasicInfo
} from "@/types/transport_rental";

// Helper to parse comma-separated strings or JSON arrays into string arrays
function parseStringList(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(s => s.length > 0);
    }
  } catch (e) {
    // Fallback to comma-separated logic
  }
  return value.split(",").map(s => s.trim()).filter(s => s.length > 0);
}

export async function GET(request: NextRequest) {
  try {
    const db = await getDatabase();
    const { searchParams } = new URL(request.url);

    // Filtering parameters
    const islandIdParam = searchParams.get("islandId");
    const islandId = islandIdParam ? parseInt(islandIdParam, 10) : null;
    const searchTerm = searchParams.get("search") || null;
    // Specific type filter for this endpoint, e.g., "transport" or "rental" or comma-separated for both
    const serviceCategory = searchParams.get("category"); // e.g., "transport", "rental"

    let queryString = `
      SELECT
        s.id, s.name, s.description, s.type, s.provider_id, s.island_id,
        s.price, s.availability, s.images, s.amenities, s.cancellation_policy,
        s.duration, s.rating, s.is_active, s.created_at, s.updated_at,
        s.location_details, s.what_to_bring, s.included_services, s.not_included_services,
        s.latitude, s.longitude,
        -- Transport specific (assuming these columns exist or are in a JSON details field)
        s.vehicle_type, s.capacity_passengers, s.route_details, s.price_per_km, s.price_per_trip, s.driver_included,
        -- Rental specific (assuming these columns exist or are in a JSON details field)
        s.item_type, s.rental_duration_options, s.price_per_hour, s.price_per_day, s.deposit_amount, s.pickup_location_options, s.rental_terms,
        i.name AS island_name,
        sp.business_name AS provider_business_name,
        sp.id AS service_provider_table_id 
      FROM services s
      JOIN islands i ON s.island_id = i.id
      LEFT JOIN service_providers sp ON s.provider_id = sp.id
      WHERE s.is_active = TRUE
    `;

    const queryParams: (string | number)[] = [];

    if (serviceCategory) {
      const categories = serviceCategory.split(",").map(cat => cat.trim());
      if (categories.length > 0) {
        const typeConditions = categories.map(cat => `s.type LIKE ?`).join(" OR ");
        queryString += ` AND (${typeConditions})`;
        categories.forEach(cat => queryParams.push(`${cat}%`)); // e.g., "transport%", "rental%"
      }
    } else {
      // Default to fetching both transport and rental if no specific category is given
      queryString += " AND (s.type LIKE ? OR s.type LIKE ?)";
      queryParams.push("transport%", "rental%");
    }

    if (islandId !== null && !isNaN(islandId)) {
      queryString += " AND s.island_id = ?";
      queryParams.push(islandId);
    }

    if (searchTerm) {
      queryString += " AND (s.name LIKE ? OR s.description LIKE ?)";
      queryParams.push(`%${searchTerm}%`, `%${searchTerm}%`);
    }
    
    // Add other filters as needed: minPrice, maxPrice, minRating, specific vehicle_type, item_type etc.

    queryString += " ORDER BY s.type, s.rating DESC, s.name ASC";

    const stmt = db.prepare(queryString).bind(...queryParams);
    const { results, success, error } = await stmt.all<any>();

    if (!success) {
      console.error("Failed to fetch services from D1:", error);
      throw new Error(error || "Database query failed");
    }

    const servicesData: CategorizedService[] = (results || []).map((raw: any) => {
      const providerInfo: ServiceProviderBasicInfo | undefined = raw.provider_business_name ? {
        id: raw.service_provider_table_id,
        business_name: raw.provider_business_name,
      } : undefined;

      const baseData = {
        id: raw.id,
        name: raw.name,
        description: raw.description,
        type: raw.type,
        provider_id: raw.provider_id,
        provider: providerInfo,
        island_id: raw.island_id,
        island_name: raw.island_name,
        images: parseStringList(raw.images),
        price_details: raw.price, // Assuming 'price' column stores general price string
        price_numeric: raw.price_numeric ? parseFloat(raw.price_numeric) : (parseFloat(raw.price_per_day || raw.price_per_trip || raw.price) || null), // Heuristic for numeric price
        availability_summary: raw.availability,
        rating: raw.rating ? parseFloat(raw.rating) : null,
        is_active: Boolean(raw.is_active),
        cancellation_policy: raw.cancellation_policy,
        amenities: parseStringList(raw.amenities),
        created_at: raw.created_at,
        updated_at: raw.updated_at,
      };

      if (raw.type && raw.type.startsWith("transport")) {
        return {
          ...baseData,
          service_category: "transport",
          vehicle_type: raw.vehicle_type,
          capacity_passengers: raw.capacity_passengers ? parseInt(raw.capacity_passengers) : null,
          route_details: raw.route_details,
          price_per_km: raw.price_per_km ? parseFloat(raw.price_per_km) : null,
          price_per_trip: raw.price_per_trip ? parseFloat(raw.price_per_trip) : null,
          driver_included: typeof raw.driver_included === 'boolean' ? raw.driver_included : (raw.driver_included === 1 || raw.driver_included === 'true'),
        } as TransportService;
      } else if (raw.type && raw.type.startsWith("rental")) {
        return {
          ...baseData,
          service_category: "rental",
          item_type: raw.item_type,
          rental_duration_options: parseStringList(raw.rental_duration_options),
          price_per_hour: raw.price_per_hour ? parseFloat(raw.price_per_hour) : null,
          price_per_day: raw.price_per_day ? parseFloat(raw.price_per_day) : null,
          deposit_amount: raw.deposit_amount ? parseFloat(raw.deposit_amount) : null,
          pickup_location_options: parseStringList(raw.pickup_location_options),
          rental_terms: raw.rental_terms,
        } as RentalService;
      }
      // Fallback for unknown types, or return as BaseService if that makes sense
      return null; 
    }).filter((service: CategorizedService | null) => service !== null) as CategorizedService[]; // Filter out nulls
    
    const response: PaginatedServicesResponse = {
        success: true,
        message: "Services retrieved successfully",
        data: servicesData,
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("Error fetching main services:", err);
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    const errorResponse: PaginatedServicesResponse = {
        success: false,
        message: `Failed to retrieve services: ${errorMessage}`,
        data: [],
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

