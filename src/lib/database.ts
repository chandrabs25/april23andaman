// src/lib/database.ts

import { getCloudflareContext } from '@opennextjs/cloudflare'
// Adjust the path to your CloudflareEnv type definition
// This typically comes from `wrangler types` or your manual definition
import type { CloudflareEnv } from '../../cloudflare-env'

// --- Interfaces (Define or import necessary data structures) ---

// Example Package interface (align with your schema)
interface Package {
  id: number;
  name: string;
  description: string | null;
  duration: string;
  base_price: number;
  max_people: number | null;
  created_by: number;
  is_active: number; // 0 or 1
  itinerary: string | null; // Raw TEXT/JSON string from DB
  included_services: string | null; // Raw TEXT/JSON string from DB
  images: string | null; // Raw TEXT/JSON string from DB
  created_at: string;
  updated_at: string;
}

// Interface for package filtering options
interface PackageFilters {
  minPrice?: number;
  maxPrice?: number;
  duration?: string;
  maxPeople?: number;
  // Add other potential filters here if needed
}

// You might have other interfaces for Users, Islands, Services, etc.
// Define them here or import them if they are defined elsewhere.
// For brevity, only Package and PackageFilters are explicitly defined here,
// assuming others are inferred or defined elsewhere.

// --- Database Connection ---

let _db: CloudflareEnv['DB'] | undefined;

// Asynchronous function to get the D1 Database binding
export async function getDatabase(): Promise<CloudflareEnv['DB']> {
  if (_db) {
    console.log("Returning cached DB instance."); // Added log for debugging
    return _db;
  }

  console.log("Attempting to get Cloudflare context for DB..."); // Added log for debugging
  try {
    // Fetch the async context which contains the environment variables including bindings
    const ctx = await getCloudflareContext<CloudflareEnv>({ async: true });
    const { env } = ctx;
    console.log("Cloudflare context obtained."); // Added log for debugging

    if (!env || !env.DB) {
      console.error("D1 binding 'DB' not found in Cloudflare environment."); // Added log for debugging
      throw new Error(
        "D1 binding 'DB' not found. Ensure it's configured in wrangler.toml and `npm run cf-typegen` was run."
      );
    }

    console.log("D1 binding 'DB' found. Caching instance."); // Added log for debugging
    _db = env.DB;
    return _db;
  } catch (error) {
    console.error("Error getting Cloudflare context or DB binding:", error); // Added log for debugging
    throw new Error(`Failed to initialize database: ${error instanceof Error ? error.message : String(error)}`);
  }
}


// --- Database Service Layer ---

/**
 * Service layer wrapping common D1 database operations.
 * Each method retrieves the database binding when called.
 */
export class DatabaseService {

  // --- User Methods ---
  async getUserByEmail(email: string) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  }

  async getUserById(id: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first();
  }

  async createUser(userData: {
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone?: string | null; // Allow null
    role_id: number;
  }) {
    const db = await getDatabase();
    return db
      .prepare(
        'INSERT INTO users (email, password_hash, first_name, last_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(
        userData.email,
        userData.password_hash,
        userData.first_name,
        userData.last_name,
        userData.phone ?? null, // Ensure null is inserted if undefined
        userData.role_id
      )
      .run(); // Returns Promise<D1Result>
  }

  // --- Island Methods ---
  async getAllIslands() {
    const db = await getDatabase();
    // Returns Promise<D1Result<Island[]>> - Let the caller handle .results
    return db.prepare('SELECT * FROM islands ORDER BY name ASC').all();
  }

  async getIslandById(id: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM islands WHERE id = ?').bind(id).first();
  }

  // --- Service Methods ---
  async getServicesByIsland(islandId: number) {
    const db = await getDatabase();
    // Returns Promise<D1Result<Service[]>>
    return db
      .prepare('SELECT * FROM services WHERE island_id = ? ORDER BY name ASC')
      .bind(islandId)
      .all();
  }

  async getServiceById(id: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM services WHERE id = ?').bind(id).first();
  }

  async getServicesByProvider(providerId: number) {
    const db = await getDatabase();
    // Returns Promise<D1Result<Service[]>>
    return db
      .prepare('SELECT * FROM services WHERE provider_id = ? ORDER BY name ASC')
      .bind(providerId)
      .all();
  }

  // --- Package Methods ---

  /**
   * Retrieves a list of active packages with optional filtering and pagination.
   * @param limit Max number of packages to return.
   * @param offset Number of packages to skip.
   * @param filters Optional filters for price, duration, maxPeople.
   * @returns Promise<D1Result<Package[]>>
   */
  async getAllActivePackages(limit = 10, offset = 0, filters: PackageFilters = {}) {
    const db = await getDatabase();
    let query = 'SELECT * FROM packages WHERE is_active = 1';
    const params: (string | number)[] = [];

    // Build WHERE clause dynamically based on filters
    const conditions: string[] = [];
    if (filters.minPrice !== undefined) {
      conditions.push(`base_price >= ?`);
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      conditions.push(`base_price <= ?`);
      params.push(filters.maxPrice);
    }
    if (filters.duration) {
      conditions.push(`duration = ?`);
      params.push(filters.duration);
    }
    if (filters.maxPeople !== undefined) {
      // Filter packages suitable FOR AT LEAST this many people
      conditions.push(`(max_people IS NULL OR max_people >= ?)`);
      params.push(filters.maxPeople);
    }

    if (conditions.length > 0) {
      query += ' AND (' + conditions.join(' AND ') + ')'; // Group filters
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Return the D1Result object directly
    return db.prepare(query).bind(...params).all<Package>();
  }

  /**
   * Counts the total number of active packages, applying optional filters.
   * @param filters Optional filters for price, duration, maxPeople.
   * @returns Promise<{ total: number } | null>
   */
  async countAllActivePackages(filters: PackageFilters = {}) {
    const db = await getDatabase();
    let query = 'SELECT COUNT(*) AS total FROM packages WHERE is_active = 1';
    const params: (string | number)[] = [];

    // Build WHERE clause dynamically based on filters (same logic as getAllActivePackages)
    const conditions: string[] = [];
    if (filters.minPrice !== undefined) {
      conditions.push(`base_price >= ?`);
      params.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      conditions.push(`base_price <= ?`);
      params.push(filters.maxPrice);
    }
    if (filters.duration) {
      conditions.push(`duration = ?`);
      params.push(filters.duration);
    }
    if (filters.maxPeople !== undefined) {
      conditions.push(`(max_people IS NULL OR max_people >= ?)`);
      params.push(filters.maxPeople);
    }

    if (conditions.length > 0) {
      query += ' AND (' + conditions.join(' AND ') + ')'; // Group filters
    }

    // Use .first() to get the count object
    return db.prepare(query).bind(...params).first<{ total: number }>(); // Returns { total: number } or null
  }

  /**
   * Retrieves a single active package by its ID.
   * @param id The ID of the package.
   * @returns Promise<Package | null>
   */
  async getPackageById(id: number) {
    const db = await getDatabase();
    return db
      .prepare('SELECT * FROM packages WHERE id = ? AND is_active = 1')
      .bind(id)
      .first<Package>(); // Returns the package object or null
  }

  /**
  * Creates a new package in the database.
  * @param packageData Data for the new package.
  * @returns Promise<D1Result>
  */
  async createPackage(packageData: {
    name: string;
    description?: string | null;
    duration: string;
    base_price: number;
    max_people?: number | null;
    created_by: number; // Should come from auth context
    itinerary?: string | object | null; // Can be JSON object or stringified JSON
    included_services?: string | object | null; // Can be JSON object or stringified JSON
    images?: string | object | null; // Can be JSON object or stringified JSON
  }) {
    const db = await getDatabase();

    // Helper to ensure complex fields are stored as TEXT strings if provided as objects
    const stringifyIfNeeded = (data: any): string | null => {
      if (data === null || data === undefined) return null;
      // Only stringify if it's an actual object (not null, not already a string)
      return typeof data === 'object' ? JSON.stringify(data) : String(data);
    }

    return db
      .prepare(`
        INSERT INTO packages (
          name, description, duration, base_price, max_people,
          created_by, itinerary, included_services, images, is_active,
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `) // is_active defaults to 1 (true)
      .bind(
        packageData.name,
        packageData.description ?? null,
        packageData.duration,
        packageData.base_price,
        packageData.max_people ?? null,
        packageData.created_by, // Pass the authenticated user ID here
        stringifyIfNeeded(packageData.itinerary),
        stringifyIfNeeded(packageData.included_services),
        stringifyIfNeeded(packageData.images)
      )
      .run(); // Returns Promise<D1Result>
  }


  // --- Booking Methods ---
  async createBooking(bookingData: {
    user_id: number | null; // Nullable for guest bookings
    package_id?: number | null; // Optional package ID
    total_people: number;
    start_date: string; // Format: 'YYYY-MM-DD'
    end_date: string;   // Format: 'YYYY-MM-DD'
    total_amount: number;
    special_requests?: string | null;
    guest_name?: string | null;
    guest_email?: string | null;
    guest_phone?: string | null;
  }) {
    const db = await getDatabase();
    return db
      .prepare(
        `
        INSERT INTO bookings (
          user_id, package_id, total_people, start_date, end_date, total_amount,
          status, payment_status, special_requests, guest_name, guest_email,
          guest_phone, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )`
      )
      .bind(
        bookingData.user_id, // Can be null
        bookingData.package_id ?? null,
        bookingData.total_people,
        bookingData.start_date,
        bookingData.end_date,
        bookingData.total_amount,
        bookingData.special_requests ?? null,
        bookingData.guest_name ?? null,
        bookingData.guest_email ?? null,
        bookingData.guest_phone ?? null
      )
      .run(); // Returns Promise<D1Result>
  }

  async getBookingById(id: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first();
  }

  async getBookingsByUser(userId: number) {
    const db = await getDatabase();
    // Returns Promise<D1Result<Booking[]>>
    return db
      .prepare('SELECT * FROM bookings WHERE user_id = ? ORDER BY start_date DESC')
      .bind(userId)
      .all();
  }

  async updateBookingPaymentStatus(
    bookingId: number,
    paymentStatus: string, // e.g., 'paid', 'failed'
    paymentDetails: string | null // e.g., transaction ID, error message
  ) {
    const db = await getDatabase();
    return db
      .prepare(
        'UPDATE bookings SET payment_status = ?, payment_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      )
      .bind(paymentStatus, paymentDetails, bookingId)
      .run(); // Returns Promise<D1Result>
  }

  // --- Review Methods ---
  async createReview(reviewData: {
    user_id: number;
    service_id: number; // Assuming reviews are linked to specific services
    rating: number; // e.g., 1-5
    comment?: string | null;
    images?: string | null; // JSON array of image URLs?
  }) {
    const db = await getDatabase();
    return db
      .prepare(
        'INSERT INTO reviews (user_id, service_id, rating, comment, images, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
      )
      .bind(
        reviewData.user_id,
        reviewData.service_id,
        reviewData.rating,
        reviewData.comment ?? null,
        reviewData.images ?? null // Ensure JSON is stringified if needed before calling
      )
      .run(); // Returns Promise<D1Result>
  }

  async getReviewsByService(serviceId: number) {
    const db = await getDatabase();
    // Join with users table to get reviewer's name
    // Returns Promise<D1Result<ReviewWithUser[]>>
    return db
      .prepare(`
        SELECT r.id, r.rating, r.comment, r.images, r.created_at, u.first_name, u.last_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.service_id = ?
        ORDER BY r.created_at DESC
      `)
      .bind(serviceId)
      .all();
  }

  // --- Ferry Methods ---
  async getFerrySchedules(
    originId: number,
    destinationId: number,
    date: string // Format: 'YYYY-MM-DD'
  ) {
    const db = await getDatabase();
    // Join with ferries table to get ferry name
    // Returns Promise<D1Result<FerrySchedule[]>>
    return db
      .prepare(`
        SELECT fs.id, fs.departure_time, fs.arrival_time, fs.availability, fs.price, f.name AS ferry_name
        FROM ferry_schedules fs
        JOIN ferries f ON fs.ferry_id = f.id
        WHERE fs.origin_id = ? AND fs.destination_id = ? AND DATE(fs.departure_time) = ?
        ORDER BY fs.departure_time
      `)
      .bind(originId, destinationId, date)
      .all();
  }

  // --- Service Provider Methods ---
  async getServiceProviderByUserId(userId: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM service_providers WHERE user_id = ?').bind(userId).first();
  }

  async getServiceProviderById(providerId: number) {
    const db = await getDatabase();
    return db.prepare('SELECT * FROM service_providers WHERE id = ?').bind(providerId).first();
  }

  async createServiceProvider(providerData: {
    user_id: number;
    business_name: string;
    type: string; // e.g., 'hotel', 'ferry', 'activity'
    license_no?: string | null;
    address?: string | null;
    verification_documents?: string | null; // JSON array of doc URLs?
    bank_details?: string | null; // Consider encrypting or storing securely
  }) {
    const db = await getDatabase();
    return db
      .prepare(`
        INSERT INTO service_providers (
          user_id, business_name, type, license_no, address, verified,
          verification_documents, bank_details, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, 0, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )`
      ) // verified defaults to 0 (false)
      .bind(
        providerData.user_id,
        providerData.business_name,
        providerData.type,
        providerData.license_no ?? null,
        providerData.address ?? null,
        providerData.verification_documents ?? null, // Stringify JSON if needed
        providerData.bank_details ?? null
      )
      .run(); // Returns Promise<D1Result>
  }

  // --- Admin Methods ---

  /**
   * Retrieves all service providers, optionally filtering by verification status.
   * @param verified Optional boolean to filter by verification status.
   * @returns Promise<D1Result<ServiceProvider[]>>
   */
  async getAllServiceProviders(verified?: boolean) {
    const db = await getDatabase();
    let query = 'SELECT id, user_id, business_name, type, address, verified FROM service_providers';
    const params: any[] = [];

    if (verified !== undefined) {
      query += ' WHERE verified = ?';
      params.push(verified ? 1 : 0); // Use 1 for true, 0 for false in SQLite/D1 boolean
    }

    query += ' ORDER BY business_name ASC';
    return db.prepare(query).bind(...params).all();
  }

  /**
   * Marks a service provider as verified.
   * @param providerId The ID of the service provider to verify.
   * @returns Promise<D1Result>
   */
  async verifyServiceProvider(providerId: number) {
    const db = await getDatabase();
    return db
      .prepare('UPDATE service_providers SET verified = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(providerId)
      .run();
  }
}