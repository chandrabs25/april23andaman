// src/types/hotel.d.ts

export interface Room {
  id: number; // Or string if using UUIDs
  hotel_id: number; // Or string, Foreign key to Hotel
  room_type_name: string; // e.g., "Deluxe King", "Standard Twin"
  description?: string;
  capacity_adults: number;
  capacity_children?: number; // Optional, defaults to 0
  price_per_night: number;
  amenities: string[]; // JSON array of strings in DB, parsed in application
  images: string[]; // JSON array of strings (URLs) in DB, parsed in application
  quantity: number; // Number of such rooms available
  created_at?: string; // ISO 8601 date string
  updated_at?: string; // ISO 8601 date string
}

export interface Hotel {
  id: number; // Or string if using UUIDs
  provider_id: number; // Foreign key to the service provider (user with provider role or a dedicated providers table)
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  rating?: number; // e.g., 1-5, allows for unrated hotels
  amenities: string[]; // JSON array of strings in DB, parsed in application
  images: string[]; // JSON array of strings (URLs) in DB, parsed in application
  rooms?: Room[]; // Optional: To be populated when fetching hotel details
  created_at?: string; // ISO 8601 date string
  updated_at?: string; // ISO 8601 date string
}

// For API responses, especially for lists with pagination
export interface PaginatedHotelsResponse {
  data: Hotel[];
  total: number;
  page: number;
  limit: number;
}

// Interface for hotel filtering options - ADDING EXPORT
export interface HotelFilters {
  name?: string;
  location?: string; // Could be city or country
  minRating?: number;
  // Potentially add more filters like amenities, price range for rooms etc.
}

