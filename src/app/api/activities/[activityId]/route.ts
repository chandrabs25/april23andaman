// src/app/api/activities/[activityId]/route.ts
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/database";
import type { Activity, ActivityProviderDetails } from "@/types/activity";

// Helper to parse comma-separated strings or JSON arrays into string arrays
function parseStringList(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.map(String);
    }
  } catch (e) {
    // Fallback to comma-separated logic
  }
  return value.split(",").map(s => s.trim()).filter(s => s.length > 0);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { activityId: string } }
) {
  try {
    const db = await getDatabase();
    const activityId = parseInt(params.activityId, 10);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { success: false, message: "Invalid activity ID format.", data: null },
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
        i.name AS island_name,
        sp.business_name AS provider_business_name,
        sp.id AS service_provider_table_id
      FROM services s
      JOIN islands i ON s.island_id = i.id
      LEFT JOIN service_providers sp ON s.provider_id = sp.id
      WHERE s.id = ? AND s.type LIKE ? AND s.is_active = TRUE
    `;

    const stmt = db.prepare(queryString).bind(activityId, "%activity%");
    const rawActivity = await stmt.first<any>();

    if (!rawActivity) {
      return NextResponse.json(
        { success: false, message: "Activity not found or not active.", data: null },
        { status: 404 }
      );
    }

    const activityData: Activity = {
      id: rawActivity.id,
      name: rawActivity.name,
      description: rawActivity.description,
      type: rawActivity.type,
      provider_id: rawActivity.provider_id,
      provider: rawActivity.provider_business_name ? {
        id: rawActivity.service_provider_table_id,
        business_name: rawActivity.provider_business_name,
      } : undefined,
      island_id: rawActivity.island_id,
      island_name: rawActivity.island_name,
      price: parseFloat(rawActivity.price) || 0,
      availability: rawActivity.availability,
      images: parseStringList(rawActivity.images),
      amenities: parseStringList(rawActivity.amenities),
      cancellation_policy: rawActivity.cancellation_policy,
      duration: rawActivity.duration,
      rating: rawActivity.rating ? parseFloat(rawActivity.rating) : null,
      is_active: Boolean(rawActivity.is_active),
      location_details: rawActivity.location_details,
      what_to_bring: parseStringList(rawActivity.what_to_bring),
      included_services: parseStringList(rawActivity.included_services),
      not_included_services: parseStringList(rawActivity.not_included_services),
      latitude: rawActivity.latitude ? parseFloat(rawActivity.latitude) : null,
      longitude: rawActivity.longitude ? parseFloat(rawActivity.longitude) : null,
      created_at: rawActivity.created_at,
      updated_at: rawActivity.updated_at,
    };

    return NextResponse.json({ success: true, data: activityData }, { status: 200 });

  } catch (error) {
    console.error(`Error fetching activity with ID ${params.activityId}:`, error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, message: `Failed to fetch activity: ${errorMessage}`, data: null },
      { status: 500 }
    );
  }
}

