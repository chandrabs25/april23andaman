// Path: src/app/api/activities/route.ts

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/database';

interface Activity {
  id: number
  name: string
  description: string | null
  type: string
  provider_id: number
  island_id: number
  price: string
  availability: string | null
  images: string | null
  amenities: string | null
  cancellation_policy: string | null
  island_name: string
}

export async function GET(request: Request) {
  try {
    const db = await getDatabase()  // await the D1Database instance
    const { searchParams } = new URL(request.url)

    const islandIdParam = searchParams.get('islandId')
    const islandId = islandIdParam ? parseInt(islandIdParam, 10) : null

    const providerIdParam = searchParams.get('providerId')
    const providerId = providerIdParam ? parseInt(providerIdParam, 10) : null

    let queryString = `
      SELECT
        s.id, s.name, s.description, s.type, s.provider_id, s.island_id,
        s.price, s.availability, s.images, s.amenities, s.cancellation_policy,
        i.name AS island_name
      FROM services s
      JOIN islands i ON s.island_id = i.id
      WHERE s.type LIKE ?`

    const queryParams: (string | number)[] = ['%activity%']

    if (islandId !== null && !isNaN(islandId)) {
      queryString += ' AND s.island_id = ?'
      queryParams.push(islandId)
    }

    if (providerId !== null && !isNaN(providerId)) {
      queryString += ' AND s.provider_id = ?'
      queryParams.push(providerId)
    }

    queryString += ' ORDER BY s.name ASC'

    const stmt = db.prepare(queryString).bind(...queryParams)
    const { results, success, error } = await stmt.all<Activity>()

    if (!success) {
      console.error('Failed to fetch activities from D1:', error)
      throw new Error(error || 'Database query failed')
    }

    const activitiesData = results ?? []

    return NextResponse.json({
      success: true,
      message: 'Activities retrieved successfully',
      data: activitiesData,
    })
  } catch (err) {
    console.error('Error fetching activities:', err)
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve activities', error: errorMessage, data: [] },
      { status: 500 }
    )
  }
}


export async function POST(request: NextRequest) {
  
  console.warn("POST /api/activities is not fully implemented.");
   try {
      
       return NextResponse.json({
           success: false, // Set to false as it's not implemented
           message: 'POST method for activities not implemented yet.',
           data: null
       }, { status: 501 }); // 501 Not Implemented

   } catch (error) {
       console.error("Error in POST /api/activities:", error);
       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
       return NextResponse.json({ success: false, message: "Failed to process request", error: errorMessage }, { status: 500 });
   }
}
