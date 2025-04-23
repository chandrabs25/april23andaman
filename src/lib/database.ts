// src/lib/database.ts

import { getCloudflareContext } from '@opennextjs/cloudflare'
import type { CloudflareEnv } from '../../cloudflare-env'  // ← adjust path!

let _db: CloudflareEnv['DB']

export async function getDatabase(): Promise<CloudflareEnv['DB']> {
  if (_db) return _db

  // ✓ now we await an async context
  const ctx = await getCloudflareContext<CloudflareEnv>({ async: true })
  const { env } = ctx

  if (!env.DB) {
    throw new Error(
      "D1 binding 'DB' not found—did you forget to run `npm run cf-typegen` and configure [[d1_databases]] in wrangler.toml?"
    )
  }

  _db = env.DB
  return _db
}



/**
 * Service layer wrapping common D1 operations.
 * Each method fetches the binding at call time.
 */
export class DatabaseService {
  // User methods
  async getUserByEmail(email: string) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first()
  }

  async getUserById(id: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first()
  }

  async createUser(userData: {
    email: string
    password_hash: string
    first_name: string
    last_name: string
    phone?: string
    role_id: number
  }) {
    const db = await getDatabase()
    return db
      .prepare(
        'INSERT INTO users (email, password_hash, first_name, last_name, phone, role_id) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .bind(
        userData.email,
        userData.password_hash,
        userData.first_name,
        userData.last_name,
        userData.phone ?? null,
        userData.role_id
      )
      .run()
  }

  // Island methods
  async getAllIslands() {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM islands ORDER BY name ASC').all()
  }

  async getIslandById(id: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM islands WHERE id = ?').bind(id).first()
  }

  // Service methods
  async getServicesByIsland(islandId: number) {
    const db = await getDatabase()
    return db
      .prepare('SELECT * FROM services WHERE island_id = ? ORDER BY name ASC')
      .bind(islandId)
      .all()
  }

  async getServiceById(id: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM services WHERE id = ?').bind(id).first()
  }

  async getServicesByProvider(providerId: number) {
    const db = await getDatabase()
    return db
      .prepare('SELECT * FROM services WHERE provider_id = ? ORDER BY name ASC')
      .bind(providerId)
      .all()
  }

  // Package methods
  async getAllActivePackages(limit = 10, offset = 0) {
    const db = await getDatabase()
    return db
      .prepare(
        'SELECT * FROM packages WHERE is_active = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?'
      )
      .bind(limit, offset)
      .all()
  }

  async countAllActivePackages() {
    const db = await getDatabase()
    return db
      .prepare('SELECT COUNT(*) AS total FROM packages WHERE is_active = 1')
      .first<{ total: number }>()
  }

  async getPackageById(id: number) {
    const db = await getDatabase()
    return db
      .prepare('SELECT * FROM packages WHERE id = ? AND is_active = 1')
      .bind(id)
      .first()
  }

  // Booking methods
  async createBooking(bookingData: {
    user_id: number | null
    package_id?: number | null
    total_people: number
    start_date: string
    end_date: string
    total_amount: number
    special_requests?: string | null
    guest_name?: string | null
    guest_email?: string | null
    guest_phone?: string | null
  }) {
    const db = await getDatabase()
    return db
      .prepare(
        `
        INSERT INTO bookings (
          user_id, package_id, total_people, start_date, end_date, total_amount,
          status, payment_status, special_requests, guest_name, guest_email,
          guest_phone, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )`
      )
      .bind(
        bookingData.user_id,
        bookingData.package_id ?? null,
        bookingData.total_people,
        bookingData.start_date,
        bookingData.end_date,
        bookingData.total_amount,
        'pending',
        'pending',
        bookingData.special_requests ?? null,
        bookingData.guest_name ?? null,
        bookingData.guest_email ?? null,
        bookingData.guest_phone ?? null
      )
      .run()
  }

  async getBookingById(id: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first()
  }

  async getBookingsByUser(userId: number) {
    const db = await getDatabase()
    return db
      .prepare('SELECT * FROM bookings WHERE user_id = ? ORDER BY start_date DESC')
      .bind(userId)
      .all()
  }

  async updateBookingPaymentStatus(
    bookingId: number,
    paymentStatus: string,
    paymentDetails: string | null
  ) {
    const db = await getDatabase()
    return db
      .prepare(
        'UPDATE bookings SET payment_status = ?, payment_details = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
      )
      .bind(paymentStatus, paymentDetails, bookingId)
      .run()
  }

  // Review methods
  async createReview(reviewData: {
    user_id: number
    service_id: number
    rating: number
    comment?: string | null
    images?: string | null
  }) {
    const db = await getDatabase()
    return db
      .prepare(
        'INSERT INTO reviews (user_id, service_id, rating, comment, images, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
      )
      .bind(
        reviewData.user_id,
        reviewData.service_id,
        reviewData.rating,
        reviewData.comment ?? null,
        reviewData.images ?? null
      )
      .run()
  }

  async getReviewsByService(serviceId: number) {
    const db = await getDatabase()
    return db
      .prepare(`
        SELECT r.id, r.rating, r.comment, r.images, r.created_at, u.first_name, u.last_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.service_id = ?
        ORDER BY r.created_at DESC
      `)
      .bind(serviceId)
      .all()
  }

  // Ferry methods
  async getFerrySchedules(
    originId: number,
    destinationId: number,
    date: string
  ) {
    const db = await getDatabase()
    return db
      .prepare(`
        SELECT fs.id, fs.departure_time, fs.arrival_time, fs.availability, fs.price, f.name AS ferry_name
        FROM ferry_schedules fs
        JOIN ferries f ON fs.ferry_id = f.id
        WHERE fs.origin_id = ? AND fs.destination_id = ? AND DATE(fs.departure_time) = ?
        ORDER BY fs.departure_time
      `)
      .bind(originId, destinationId, date)
      .all()
  }

  // Service Provider methods
  async getServiceProviderByUserId(userId: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM service_providers WHERE user_id = ?').bind(userId).first()
  }

  async getServiceProviderById(providerId: number) {
    const db = await getDatabase()
    return db.prepare('SELECT * FROM service_providers WHERE id = ?').bind(providerId).first()
  }

  async createServiceProvider(providerData: {
    user_id: number
    business_name: string
    type: string
    license_no?: string | null
    address?: string | null
    verification_documents?: string | null
    bank_details?: string | null
  }) {
    const db = await getDatabase()
    return db
      .prepare(`
        INSERT INTO service_providers (
          user_id, business_name, type, license_no, address, verified,
          verification_documents, bank_details, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, 0, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        )`
      )
      .bind(
        providerData.user_id,
        providerData.business_name,
        providerData.type,
        providerData.license_no ?? null,
        providerData.address ?? null,
        providerData.verification_documents ?? null,
        providerData.bank_details ?? null
      )
      .run()
  }

  // Admin methods
  async getAllServiceProviders(verified?: boolean) {
    const db = await getDatabase()
    let query = 'SELECT id, user_id, business_name, type, address, verified FROM service_providers'
    const params: any[] = []

    if (verified !== undefined) {
      query += ' WHERE verified = ?'
      params.push(verified ? 1 : 0)
    }

    query += ' ORDER BY business_name ASC'
    return db.prepare(query).bind(...params).all()
  }

  async verifyServiceProvider(providerId: number) {
    const db = await getDatabase()
    return db
      .prepare('UPDATE service_providers SET verified = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(providerId)
      .run()
  }
}
