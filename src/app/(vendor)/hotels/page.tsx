// Path: /home/ubuntu/vendor_dev/component/(vendor)/hotels/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import {
  PlusCircle,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  AlertTriangle,
  Shield,
  Hotel,
  BedDouble,
  Package,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

// Interface for the data returned by GET /api/vendor/hotels
// This joins services and hotels tables
interface VendorHotel {
  service_id: number; // From hotels table
  name: string; // From services table
  star_rating: number;
  street_address: string;
  island_id: number;
  is_active: number; // From services table
  // Add other fields as needed for display (e.g., price from services)
  price?: number | string;
}

interface Island {
  id: number;
  name: string;
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
      Your account must be verified before you can manage hotels. Please check your
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
      This page is for managing Hotels. Non-hotel vendors should use the
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

// --- Main Hotel List Component ---
function HotelListContent() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [hotels, setHotels] = useState<VendorHotel[]>([]);
  const [isToggling, setIsToggling] = useState<number | null>(null); // Store service_id
  const [isDeleting, setIsDeleting] = useState<number | null>(null); // Store service_id

  // 1. Fetch Vendor Profile (for verification and type check)
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: vendorProfile, error: profileError, status: profileStatus } = useFetch<VendorProfile | null>(profileApiUrl);
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Hotels (only if profile loaded, verified, and is a hotel vendor)
  const shouldFetchHotels = profileStatus === "success" && vendorProfile && isVerified && isHotelVendor;
  const hotelsApiUrl = shouldFetchHotels ? `/api/vendor/hotels` : null; // Uses GET from hotels route.ts
  const { data: fetchedHotels, error: hotelsError, status: hotelsStatus } = useFetch<VendorHotel[] | null>(hotelsApiUrl);

  // 3. Fetch Islands (for displaying names)
  const { data: fetchedIslands, status: islandsStatus } = useFetch<Island[] | null>("/api/islands");
  const islandsMap = React.useMemo(() => {
    const map = new Map<number, string>();
    fetchedIslands?.forEach((island) => map.set(island.id, island.name));
    return map;
  }, [fetchedIslands]);

  // Update local hotels state when fetch completes
  useEffect(() => {
    if (hotelsStatus === "success" && fetchedHotels) {
      setHotels(fetchedHotels);
    }
  }, [hotelsStatus, fetchedHotels]);

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || (shouldFetchHotels && hotelsStatus === "loading") || islandsStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner text="Loading Hotels..." />;
  }

  // Handle Profile Fetch Error
  if (profileStatus === "error") {
    return (
      <div className="text-red-600">
        Error loading vendor profile:{" "}
        {profileError?.message || "Unknown error"}
      </div>
    );
  }
  // Handle Profile Not Found (edge case)
  if (profileStatus === "success" && !vendorProfile) {
    return (
      <div className="text-orange-600">
        Vendor profile not found. Cannot load hotels.
      </div>
    );
  }

  // --- Conditional Rendering based on Verification & Type ---
  // --- Verification Check Removed ---
  // if (!isVerified) {
  //   return <VerificationPending />;
  // }
  // --- End Removal ---
  if (!isHotelVendor) {
    return <IncorrectVendorType />;
  }
  // --- End Conditional Rendering ---

  // Handle Hotels Fetch Error
  if (hotelsStatus === "error") {
    return (
      <div className="text-red-600">
        Error loading hotels: {hotelsError?.message || "Unknown error"}
      </div>
    );
  }

  // --- Event Handlers ---
  const handleToggleActive = async (serviceId: number, currentStatus: boolean) => {
    setIsToggling(serviceId);
    try {
      // Use the generic service status endpoint
      const response = await fetch(`/api/vendor/services/${serviceId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      // Type the result
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update status");
      }
      toast({ title: "Success", description: `Hotel ${!currentStatus ? "activated" : "deactivated"}.` });
      // Update local state
      setHotels((prev) =>
        prev.map((h) =>
          h.service_id === serviceId ? { ...h, is_active: !currentStatus ? 1 : 0 } : h
        )
      );
      // Removed comment: Or use mutateHotels();
    } catch (error) {
      console.error("Error toggling hotel status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not update hotel status.",
      });
    } finally {
      setIsToggling(null);
    }
  };

  const handleDeleteHotel = async (serviceId: number) => {
    if (!confirm("Are you sure you want to delete this hotel and all its associated room types? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(serviceId);
    try {
      // Use the hotel-specific delete endpoint
      const response = await fetch(`/api/vendor/hotels/${serviceId}`, {
        method: "DELETE",
      });
      // Type the result
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete hotel");
      }
      toast({ title: "Success", description: "Hotel deleted successfully." });
      // Update local state
      setHotels((prev) => prev.filter((h) => h.service_id !== serviceId));
      // Removed comment: Or use mutateHotels();
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not delete hotel.",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // --- Render Hotel List ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Hotels</h2>
        <Link
          href="/hotels/add"
          className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          <PlusCircle size={16} className="mr-2" /> Add New Hotel
        </Link>
      </div>

      {hotels.length === 0 && hotelsStatus === "success" ? (
        <p className="text-gray-500 text-center py-4">
          You haven't added any hotels yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Island</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.map((hotel) => (
                <tr key={hotel.service_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hotel.star_rating} Star</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{islandsMap.get(hotel.island_id) || `ID: ${hotel.island_id}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{hotel.street_address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleToggleActive(hotel.service_id, hotel.is_active === 1)}
                      disabled={isToggling === hotel.service_id}
                      className={`flex items-center px-2 py-1 rounded-full text-xs ${hotel.is_active === 1 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} disabled:opacity-50 disabled:cursor-wait`}
                    >
                      {isToggling === hotel.service_id ? (
                        <Loader2 size={14} className="animate-spin mr-1" />
                      ) : hotel.is_active === 1 ? (
                        <ToggleRight size={14} className="mr-1" />
                      ) : (
                        <ToggleLeft size={14} className="mr-1" />
                      )}
                      {hotel.is_active === 1 ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`/hotels/${hotel.service_id}/rooms`} className="text-green-600 hover:text-green-900 inline-flex items-center" title="Manage Rooms">
                      <BedDouble size={16} />
                    </Link>
                    <Link href={`/hotels/${hotel.service_id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center" title="Edit Hotel">
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteHotel(hotel.service_id)}
                      disabled={isDeleting === hotel.service_id}
                      className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50 disabled:cursor-wait"
                      title="Delete Hotel"
                    >
                      {isDeleting === hotel.service_id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* TODO: Add Pagination if necessary */} 
    </div>
  );
}

// --- Wrap with Suspense for Client Components ---
export default function VendorHotelsPage() {
  return (
    // Suspense boundary for client components using hooks like useAuth, useFetch
    <Suspense fallback={<LoadingSpinner text="Loading Hotels Page..." />}>
      <HotelListContent />
    </Suspense>
  );
}

