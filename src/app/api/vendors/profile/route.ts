import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import type { CloudflareEnv } from '../../../../../cloudflare-env'; // Adjust path as needed



export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get('userId');

  if (!userIdParam) {
    return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
  }

  const userId = parseInt(userIdParam, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ success: false, message: 'Invalid User ID format' }, { status: 400 });
  }

  try {
    // Initialize DatabaseService - context might be needed if getDatabase relies on it implicitly
    // If getDatabase() works standalone in edge runtime, this context fetch might be optional here
    // but good practice if bindings are needed directly or for other Cloudflare services.
    // const context = getCloudflareContext<CloudflareEnv>();
    const dbService = new DatabaseService();

    const profile = await dbService.getServiceProviderByUserId(userId);

    // Optionally fetch user details like email/phone if not in service_providers
    const user = await dbService.getUserById(userId);

    if (!profile && !user) {
        return NextResponse.json({ success: false, message: 'Vendor profile or user not found' }, { status: 404 });
    }

    // Combine data - prioritize profile data, supplement with user data
    const combinedData = {
        ...(profile || {}), // Spread profile data if exists
        user_id: userId, // Ensure user_id is present
        email: user?.email ?? profile?.email, // Example: Get email from user table if available
        phone: user?.phone ?? profile?.phone, // Example: Get phone from user table if available
        // Add other fields as needed
    };


    if (!profile) {
      // If only user exists but no service_provider entry, maybe return a specific message or limited data
       console.warn(`User ${userId} found, but no service provider profile linked.`);
       // Decide response: return 404, or return basic user info?
       // Returning basic info for now:
       return NextResponse.json({ success: true, data: { user_id: userId, email: user?.email, phone: user?.phone, business_name: 'Profile Not Set Up', type: 'N/A', verified: 0 } }, { status: 200 });
       // Or return 404:
       // return NextResponse.json({ success: false, message: 'Vendor profile not found' }, { status: 404 });
    }

    // Add user email/phone to profile data if they aren't already columns there
    const responseData = {
        ...profile,
        email: profile.email || user?.email, // Assuming profile might have an email column
        phone: profile.phone || user?.phone, // Assuming profile might have a phone column
    };


    return NextResponse.json({ success: true, data: responseData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching vendor profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: `Failed to fetch profile: ${errorMessage}` }, { status: 500 });
  }
}
