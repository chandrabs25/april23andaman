// src/app/api/services-main/[serviceId]/route.ts
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";
import type {
  CategorizedService,
  TransportService,
  RentalService,
  SingleServiceResponse,
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

export async function GET(
  request: NextRequest,
  { params }: { params: { serviceId: string } }
) {
  try {
    const db = await getDatabase();
    const serviceId = parseInt(params.serviceId, 10);

    if (isNaN(serviceId)) {
      return NextResponse.json(
        { success: false, message: "Invalid service ID format.", data: null },
        { status: 400 }
      );
    }

    const queryString = `
      SELECT
        s.id, s.name, s.description, s.type, s.provider_id, s.island_id,
        s.price, s.availability, s.images, s.amenities, s.cancellation_policy,
        s.duration, s.rating, s.is_active, s.created_at, s.updated_at,
        s.location_details, s.what_to_bring, s.included_services, s.not_included_services,
        s.latitude, s.longitude,
        -- Transport specific
        s.vehicle_type, s.capacity_passengers, s.route_details, s.price_per_km, s.price_per_trip, s.driver_included,
        -- Rental specific
        s.item_type, s.rental_duration_options, s.price_per_hour, s.price_per_day, s.deposit_amount, s.pickup_location_options, s.rental_terms,
        i.name AS island_name,
        sp.business_name AS provider_business_name,
        sp.id AS service_provider_table_id
      FROM services s
      JOIN islands i ON s.island_id = i.id
      LEFT JOIN service_providers sp ON s.provider_id = sp.id
      WHERE s.id = ? AND s.is_active = TRUE 
      AND (s.type LIKE 'transport%' OR s.type LIKE 'rental%')
    `; // Ensure it's a transport or rental type

    const stmt = db.prepare(queryString).bind(serviceId);
    const raw = await stmt.first<any>();

    if (!raw) {
      return NextResponse.json(
        { success: false, message: "Service not found or not active.", data: null },
        { status: 404 }
      );
    }
    
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
        price_details: raw.price,
        price_numeric: raw.price_numeric ? parseFloat(raw.price_numeric) : (parseFloat(raw.price_per_day || raw.price_per_trip || raw.price) || null),
        availability_summary: raw.availability,
        rating: raw.rating ? parseFloat(raw.rating) : null,
        is_active: Boolean(raw.is_active),
        cancellation_policy: raw.cancellation_policy,
        amenities: parseStringList(raw.amenities),
        // Adding fields from activity that might be relevant for services too
        duration: raw.duration, 
        location_details: raw.location_details,
        what_to_bring: parseStringList(raw.what_to_bring),
        included_services: parseStringList(raw.included_services),
        not_included_services: parseStringList(raw.not_included_services),
        latitude: raw.latitude ? parseFloat(raw.latitude) : null,
        longitude: raw.longitude ? parseFloat(raw.longitude) : null,
        created_at: raw.created_at,
        updated_at: raw.updated_at,
    };

    let serviceData: CategorizedService | null = null;

    if (raw.type && raw.type.startsWith("transport")) {
    serviceData = {
        ...baseData,
        service_category: "transport",
        vehicle_type: raw.vehicle_type,
        capacity_passengers: raw.capacity_passengers ? parseInt(raw.capacity_passengers) : null,
        route_details: raw.route_details,
        price_per_km: raw.price_per_km ? parseFloat(raw.price_per_km) : null,
        price_per_trip: raw.price_per_trip ? parseFloat(raw.price_per_trip) : null,
        driver_included: typeof raw.driver_included === 'boolean' ? raw.driver_included : (raw.driver_included === 1 || String(raw.driver_included).toLowerCase() === 'true'),
    } as TransportService;
    } else if (raw.type && raw.type.startsWith("rental")) {
    serviceData = {
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

    if (!serviceData) {
        // This case should ideally not be hit if the WHERE clause for type is correct
        return NextResponse.json(
            { success: false, message: "Service type is not recognized as transport or rental.", data: null },
            { status: 400 }
        );
    }

    const response: SingleServiceResponse = { success: true, data: serviceData };
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error(`Error fetching service with ID ${params.serviceId}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    const errorResponse: SingleServiceResponse = {
        success: false,
        message: `Failed to fetch service: ${errorMessage}`,
        data: null,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

