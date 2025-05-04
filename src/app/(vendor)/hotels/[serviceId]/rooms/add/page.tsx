// Path: /home/ubuntu/vendor_dev/component/(vendor)/hotels/[serviceId]/rooms/add/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, ArrowLeft, Hotel, Package, BedDouble } from "lucide-react";
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

// Interface for the parent hotel data (needed for context/breadcrumbs)
interface VendorHotel {
  service_id: number;
  name: string;
  // Add other fields if needed
}
interface GetHotelResponse {
  success: boolean;
  data: VendorHotel | null;
  message?: string;
}

// Form state interface (matches API body)
interface RoomTypeFormData {
  room_type_name: string;
  base_price: string; // Use string for form input
  max_guests: string; // Use string for form input
  quantity_available: string;
  amenities: string; // Comma-separated
  images: string; // Comma-separated URLs
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
      Your account must be verified before you can add rooms. Please check your
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
      This page is for adding Hotel Rooms. Non-hotel vendors should use the
      Service Management section.
    </p>
    <Link
      href="/services"
      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
    >
      Go to Service Management
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

// --- Main Add Room Form Component ---
function AddRoomForm() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [formData, setFormData] = useState<RoomTypeFormData>({
    room_type_name: "",
    base_price: "",
    max_guests: "",
    quantity_available: "",
    amenities: "",
    images: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Vendor Profile (for verification and type check)
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: profileApiResponse, error: profileError, status: profileStatus } = useFetch<GetVendorProfileResponse>(profileApiUrl);
  const vendorProfile = profileApiResponse?.data;
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Parent Hotel Details (for context and checks)
  const shouldFetchHotel = profileStatus === "success" && isVerified && isHotelVendor && !!serviceId;
  const hotelApiUrl = shouldFetchHotel ? `/api/vendor/hotels/${serviceId}` : null;
  const { data: hotelApiResponse, error: hotelError, status: hotelStatus } = useFetch<GetHotelResponse>(hotelApiUrl);
  const hotelName = hotelApiResponse?.data?.name || `Hotel ${serviceId}`;

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || (shouldFetchHotel && hotelStatus === "loading");

  if (isLoading) {
    return <LoadingSpinner text="Loading Add Room Form..." />;
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
        Vendor profile not found. Cannot add room.
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

  // Handle Hotel Fetch Error or Not Found (implies permission issue or invalid ID)
  if (hotelStatus === "error" || (hotelStatus === "success" && !hotelApiResponse?.data)) {
    return (
      <div className="text-red-600">
        Error loading hotel details: {hotelError?.message || hotelApiResponse?.message || "Hotel not found or permission denied."}
        <br />
        <Link href="/hotels" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            Return to Hotel List
        </Link>
      </div>
    );
  }

  // --- Form Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.room_type_name || !formData.base_price || !formData.max_guests) {
        toast({ variant: "destructive", title: "Error", description: "Please fill in Room Type Name, Base Price, and Max Guests." });
        setIsSubmitting(false);
        return;
    }

    // Prepare API payload
    const payload = {
      room_type_name: formData.room_type_name,
      base_price: parseFloat(formData.base_price),
      max_guests: parseInt(formData.max_guests, 10),
      quantity_available: formData.quantity_available ? parseInt(formData.quantity_available, 10) : undefined,
      amenities: formData.amenities.split(",").map(s => s.trim()).filter(Boolean),
      images: formData.images,
    };

    try {
      const response = await fetch(`/api/vendor/hotels/${serviceId}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Type the result
      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to add room type");
      }

      toast({ title: "Success", description: "Room type added successfully." });
      router.push(`/hotels/${serviceId}/rooms`); // Redirect to the room list page for this hotel
    } catch (error) {
      console.error("Error adding room type:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not add room type.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Form ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <Link href={`/hotels/${serviceId}/rooms`} className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center">
        <ArrowLeft size={14} className="mr-1" /> Back to Rooms for {hotelName}
      </Link>
      <h2 className="text-xl font-bold mb-6">Add New Room Type</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="room_type_name" className="block text-sm font-medium text-gray-700">Room Type Name <span className="text-red-500">*</span></label>
          <input type="text" id="room_type_name" name="room_type_name" value={formData.room_type_name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="base_price" className="block text-sm font-medium text-gray-700">Base Price/Night (INR) <span className="text-red-500">*</span></label>
          <input type="number" id="base_price" name="base_price" value={formData.base_price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="max_guests" className="block text-sm font-medium text-gray-700">Max Guests <span className="text-red-500">*</span></label>
          <input type="number" id="max_guests" name="max_guests" value={formData.max_guests} onChange={handleChange} required min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="quantity_available" className="block text-sm font-medium text-gray-700">Quantity Available</label>
          <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p className="mt-1 text-xs text-gray-500">Leave blank if not applicable (e.g., unlimited or managed elsewhere).</p>
        </div>
        <div>
          <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
          <input type="text" id="amenities" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Wi-Fi, Balcony, AC" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
          <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} placeholder="http://..., http://..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Link href={`/hotels/${serviceId}/rooms`} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 mr-2">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin mr-2" /> Adding Room Type...</>
            ) : (
              "Add Room Type"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Wrap with Suspense ---
export default function AddVendorRoomPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading Add Room Page..." />}>
      <AddRoomForm />
    </Suspense>
  );
}

