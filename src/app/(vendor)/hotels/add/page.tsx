// Path: /home/ubuntu/vendor_dev/component/(vendor)/hotels/add/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, ArrowLeft, Hotel, Package } from "lucide-react";
import Link from "next/link";

// --- Interfaces ---
interface AuthUser {
  id: string | number;
  role_id?: number;
}

interface VendorProfile {
  id: number;
  verified: number; // 0 or 1
  type: string; // e.g., hotel, rental, activity
}
interface GetVendorProfileResponse {
  success: boolean;
  data: VendorProfile | null;
  message?: string;
}

interface Island {
  id: number;
  name: string;
}
interface GetIslandsResponse {
  success: boolean;
  data: Island[];
  message?: string;
}

// Form state interface (matches API body)
interface HotelFormData {
  // Generic Service Fields
  name: string;
  description: string;
  price: string; // Base per-night rate (use string for form)
  cancellation_policy: string; // Simple text for now
  images: string; // General Hotel Photos (comma-separated URLs)
  island_id: string; // Use string for form
  is_active: boolean;
  // Hotel-Specific Fields
  star_rating: string; // Use string for form
  check_in_time: string; // e.g., "14:00"
  check_out_time: string; // e.g., "12:00"
  total_rooms: string;
  facilities: string; // Comma-separated
  meal_plans: string; // Comma-separated
  pets_allowed: boolean;
  children_allowed: boolean;
  accessibility_features: string;
  street_address: string;
  geo_lat: string;
  geo_lng: string;
}

// Add a generic response type for simple success/message APIs
interface ApiResponse {
    success: boolean;
    message?: string;
}

// --- Helper Components ---
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
    <span>{text}</span>
  </div>
);

const VerificationPending = () => (
  <div
    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md mb-8"
    role="alert"
  >
    <p className="font-bold flex items-center">
      <AlertTriangle size={18} className="mr-2" />
      Verification Pending
    </p>
    <p>
      Your account must be verified before you can add hotels. Please check your
      profile status or contact support.
    </p>
    <Link
      href="/dashboard"
      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
    >
      Return to Dashboard
    </Link>
  </div>
);

const IncorrectVendorType = () => (
  <div
    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-8"
    role="alert"
  >
    <p className="font-bold flex items-center">
      <Package size={18} className="mr-2" />
      Incorrect Vendor Type
    </p>
    <p>
      This page is for adding Hotels. Non-hotel vendors should use the Service
      Management section.
    </p>
    <Link
      href="/services/add"
      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
    >
      Go to Add Service
    </Link>
    <br />
    <Link
      href="/dashboard"
      className="text-sm text-gray-600 hover:underline mt-1 inline-block"
    >
      Return to Dashboard
    </Link>
  </div>
);

// --- Main Add Hotel Form Component ---
function AddHotelForm() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [formData, setFormData] = useState<HotelFormData>({
    name: "",
    description: "",
    price: "",
    cancellation_policy: "",
    images: "",
    island_id: "",
    is_active: true,
    star_rating: "",
    check_in_time: "14:00", // Default value
    check_out_time: "12:00", // Default value
    total_rooms: "",
    facilities: "",
    meal_plans: "",
    pets_allowed: false,
    children_allowed: true,
    accessibility_features: "",
    street_address: "",
    geo_lat: "",
    geo_lng: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Vendor Profile (for verification and type check)
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: profileApiResponse, error: profileError, status: profileStatus } = useFetch<GetVendorProfileResponse>(profileApiUrl);
  const vendorProfile = profileApiResponse?.data;
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Islands
  const { data: islandsApiResponse, status: islandsStatus } = useFetch<GetIslandsResponse>("/api/islands");
  const islands = islandsApiResponse?.data || [];

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || islandsStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner text="Loading Add Hotel Form..." />;
  }

  // Handle Profile Fetch Error
  if (profileStatus === "error") {
    return (
      <div className="text-red-600">
        Error loading vendor profile:{" "}
        {profileError?.message || profileApiResponse?.message}
      </div>
    );
  }
  // Handle Profile Not Found (edge case)
  if (profileStatus === "success" && !vendorProfile) {
    return (
      <div className="text-orange-600">
        Vendor profile not found. Cannot add hotel.
      </div>
    );
  }

  // --- Conditional Rendering based on Verification & Type ---
  if (!isVerified) {
    return <VerificationPending />;
  }
  if (!isHotelVendor) {
    return <IncorrectVendorType />;
  }
  // --- End Conditional Rendering ---

  // --- Form Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation (add more as needed)
    if (!formData.island_id || !formData.star_rating) {
        toast({ variant: "destructive", title: "Error", description: "Please select an island and star rating." });
        setIsSubmitting(false);
        return;
    }

    // Prepare API payload based on design
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      cancellation_policy: formData.cancellation_policy,
      images: formData.images,
      island_id: parseInt(formData.island_id, 10),
      is_active: formData.is_active,
      star_rating: parseInt(formData.star_rating, 10),
      check_in_time: formData.check_in_time,
      check_out_time: formData.check_out_time,
      total_rooms: formData.total_rooms ? parseInt(formData.total_rooms, 10) : undefined,
      facilities: formData.facilities.split(",").map(s => s.trim()).filter(Boolean),
      meal_plans: formData.meal_plans.split(",").map(s => s.trim()).filter(Boolean),
      pets_allowed: formData.pets_allowed,
      children_allowed: formData.children_allowed,
      accessibility_features: formData.accessibility_features,
      street_address: formData.street_address,
      geo_lat: formData.geo_lat ? parseFloat(formData.geo_lat) : null,
      geo_lng: formData.geo_lng ? parseFloat(formData.geo_lng) : null,
    };

    try {
      const response = await fetch("/api/vendor/hotels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Type the result
      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add hotel");
      }

      toast({ title: "Success", description: "Hotel added successfully." });
      router.push("/hotels"); // Redirect to the hotel list page
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not add hotel.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Form ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <Link href="/hotels" className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center">
        <ArrowLeft size={14} className="mr-1" /> Back to Hotels
      </Link>
      <h2 className="text-xl font-bold mb-6">Add New Hotel</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2">Basic Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Hotel Name <span className="text-red-500">*</span></label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="star_rating" className="block text-sm font-medium text-gray-700">Star Rating <span className="text-red-500">*</span></label>
              <select id="star_rating" name="star_rating" value={formData.star_rating} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="" disabled>-- Select Rating --</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Base Price/Night (INR) <span className="text-red-500">*</span></label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="island_id" className="block text-sm font-medium text-gray-700">Island <span className="text-red-500">*</span></label>
              <select id="island_id" name="island_id" value={formData.island_id} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="" disabled>-- Select Island --</option>
                {islands.map(island => (
                  <option key={island.id} value={island.id}>{island.name}</option>
                ))}
              </select>
            </div>
             <div className="md:col-span-2">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
              <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} placeholder="http://..., http://..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="cancellation_policy" className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
              <textarea id="cancellation_policy" name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
             <div className="flex items-center">
              <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Hotel is Active</label>
            </div>
          </div>
        </fieldset>

        {/* Hotel Details Section */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold px-2">Hotel Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
             <div>
              <label htmlFor="check_in_time" className="block text-sm font-medium text-gray-700">Check-in Time <span className="text-red-500">*</span></label>
              <input type="time" id="check_in_time" name="check_in_time" value={formData.check_in_time} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="check_out_time" className="block text-sm font-medium text-gray-700">Check-out Time <span className="text-red-500">*</span></label>
              <input type="time" id="check_out_time" name="check_out_time" value={formData.check_out_time} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="total_rooms" className="block text-sm font-medium text-gray-700">Total Rooms</label>
              <input type="number" id="total_rooms" name="total_rooms" value={formData.total_rooms} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="facilities" className="block text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
              <input type="text" id="facilities" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Pool, Gym, Spa" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="meal_plans" className="block text-sm font-medium text-gray-700">Meal Plans (comma-separated)</label>
              <input type="text" id="meal_plans" name="meal_plans" value={formData.meal_plans} onChange={handleChange} placeholder="Breakfast, Half-board" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div className="md:col-span-2">
              <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Street Address <span className="text-red-500">*</span></label>
              <input type="text" id="street_address" name="street_address" value={formData.street_address} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="geo_lat" className="block text-sm font-medium text-gray-700">Latitude</label>
              <input type="number" step="any" id="geo_lat" name="geo_lat" value={formData.geo_lat} onChange={handleChange} placeholder="e.g., 11.6234" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="geo_lng" className="block text-sm font-medium text-gray-700">Longitude</label>
              <input type="number" step="any" id="geo_lng" name="geo_lng" value={formData.geo_lng} onChange={handleChange} placeholder="e.g., 92.7265" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div className="md:col-span-2">
              <label htmlFor="accessibility_features" className="block text-sm font-medium text-gray-700">Accessibility Features</label>
              <textarea id="accessibility_features" name="accessibility_features" value={formData.accessibility_features} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
             <div className="flex items-center">
              <input type="checkbox" id="pets_allowed" name="pets_allowed" checked={formData.pets_allowed} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="pets_allowed" className="ml-2 block text-sm text-gray-900">Pets Allowed</label>
            </div>
             <div className="flex items-center">
              <input type="checkbox" id="children_allowed" name="children_allowed" checked={formData.children_allowed} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <label htmlFor="children_allowed" className="ml-2 block text-sm text-gray-900">Children Allowed</label>
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Link href="/hotels" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 mr-2">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin mr-2" /> Adding Hotel...</>
            ) : (
              "Add Hotel"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Wrap with Suspense ---
export default function AddVendorHotelPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading Add Hotel Page..." />}>
      <AddHotelForm />
    </Suspense>
  );
}

