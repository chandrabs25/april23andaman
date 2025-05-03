import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/lib/database'; // Assuming database service is correctly set up
import * as bcrypt from 'bcryptjs';
import * as jose from 'jose'; // For JWT generation

// Define expected request body structure
interface LoginRequestBody {
  email: string;
  password: string;
}

// Define expected User structure (align with your database schema)
interface User {
    id: number;
    email: string;
    password_hash: string;
    role_id: number; // Crucial for checking vendor role
    // Add other relevant fields if needed (e.g., first_name)
}

// Define expected ServiceProvider structure (align with your database schema)
interface ServiceProvider {
    id: number;
    user_id: number;
    business_name: string;
    // Add other relevant fields if needed
}

// Environment variable for JWT secret (ensure this is set in your .env or Cloudflare secrets)
const JWT_SECRET = process.env.JWT_SECRET;
const VENDOR_ROLE_ID = 3; // Define the role ID for vendors

export async function POST(request: NextRequest) {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET environment variable is not set.');
    return NextResponse.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const databaseService = new DatabaseService();
    const body = await request.json() as LoginRequestBody;
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // --- Find User by Email ---
    const user = await databaseService.getUserByEmail(email) as User | null; // Type assertion

    if (!user) {
      console.log(`Login attempt failed: User not found for email ${email}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 } // Unauthorized
      );
    }

    // --- Verify Password ---
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      console.log(`Login attempt failed: Invalid password for email ${email}`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 } // Unauthorized
      );
    }

    // --- Verify Role ---
    if (user.role_id !== VENDOR_ROLE_ID) {
      console.log(`Login attempt failed: User ${email} is not a vendor (role_id: ${user.role_id})`);
      return NextResponse.json(
        { success: false, message: 'Access denied. Not a vendor account.' },
        { status: 403 } // Forbidden
      );
    }

    // --- Fetch Service Provider Details (Optional but Recommended) ---
    // This allows including provider-specific info in the token/session
    console.log(`Attempting to fetch service provider for user ID: ${user.id} (Role ID: ${user.role_id})`); // Added log
    const serviceProvider = await databaseService.getServiceProviderByUserId(user.id) as ServiceProvider | null;

    // Added detailed log for service provider result
    if (!serviceProvider) {
        console.warn(`Service provider NOT FOUND for vendor user ${email} (User ID: ${user.id}). Denying login.`);
        // This case might indicate an inconsistency (user has vendor role but no provider entry)
        // Decide how to handle this: deny login or proceed without provider info
        // For now, let's deny login to enforce data integrity
        return NextResponse.json(
            { success: false, message: 'Vendor profile incomplete. Please contact support.' },
            { status: 403 }
        );
    } else {
        console.log(`Service provider FOUND for user ID: ${user.id}. Provider ID: ${serviceProvider.id}, Business: ${serviceProvider.business_name}`); // Added log
    }

    // --- Generate JWT Token ---
    const secretKey = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({
        userId: user.id,
        email: user.email,
        roleId: user.role_id,
        providerId: serviceProvider.id, // Include provider ID
        businessName: serviceProvider.business_name // Include business name
        // Add other relevant claims like first_name if needed
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // Set token expiration (e.g., 1 hour)
      .sign(secretKey);

    console.log(`Vendor login successful for ${email}`);

    // --- Return Success Response with Token ---
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token: token, // Send the token back to the client
      // Optionally include some non-sensitive user data
      user: {
          id: user.id,
          email: user.email,
          roleId: user.role_id,
          providerId: serviceProvider.id,
          businessName: serviceProvider.business_name
      }
    });

    // Optionally set the token in an HttpOnly cookie for better security
    // response.cookies.set('authToken', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    //   sameSite: 'strict',
    //   maxAge: 3600, // 1 hour (in seconds)
    //   path: '/',
    // });

    return response;

  } catch (error) {
    console.error('Error during vendor login:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred during login.', error: errorMessage },
      { status: 500 }
    );
  }
}
