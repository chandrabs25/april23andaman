// Path: /home/ubuntu/vendor_dev/component/(vendor)/my-hotels/[serviceId]/rooms/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import {
  PlusCircle,
  Edit,
  Trash2,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Hotel,
  Package,
  BedDouble,
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

// Interface for the parent hotel data (needed for context/breadcrumbs)
interface VendorHotel {
  service_id: number;
  name: string;
  // Add other fields if needed
}

// Interface for Room Type data
interface RoomType {
  id: number;
  hotel_service_id: number;
  room_type_name: string;
  base_price: number | string;
  max_guests: number;
  quantity_available: number | null;
  amenities: string | null; // JSON string
  images: string | null; // URLs
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
      Your account must be verified before you can manage rooms. Please check your
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
      This page is for managing Hotel Rooms. Non-hotel vendors should use the
      Service Management section.
    </p>
    <Link
      href="/my-services"
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

// --- Main Room List Component ---
function RoomListContent() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [isDeleting, setIsDeleting] = useState<number | null>(null); // Store room type id

  // 1. Fetch Vendor Profile (for verification and type check)
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: vendorProfile, error: profileError, status: profileStatus } = useFetch<VendorProfile | null>(profileApiUrl);
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Parent Hotel Details (for context and checks)
  const shouldFetchHotel = profileStatus === "success" && vendorProfile && isVerified && isHotelVendor && !!serviceId;
  const hotelApiUrl = shouldFetchHotel ? `/api/vendor/my-hotels/${serviceId}` : null;
  const { data: hotelData, error: hotelError, status: hotelStatus } = useFetch<VendorHotel | null>(hotelApiUrl);
  const hotelName = hotelData?.name || `Hotel ${serviceId}`;

  // 3. Fetch Room Types (only if hotel fetch successful)
  const shouldFetchRooms = hotelStatus === "success" && !!hotelData;
  const roomsApiUrl = shouldFetchRooms ? `/api/vendor/my-hotels/${serviceId}/rooms` : null;
  const { data: fetchedRooms, error: roomsError, status: roomsStatus } = useFetch<RoomType[] | null>(roomsApiUrl);

  // Update local room types state when fetch completes
  useEffect(() => {
    if (roomsStatus === "success" && fetchedRooms) {
      setRoomTypes(fetchedRooms);
    }
  }, [roomsStatus, fetchedRooms]);

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || (shouldFetchHotel && hotelStatus === "loading") || (shouldFetchRooms && roomsStatus === "loading");

  if (isLoading) {
    return <LoadingSpinner text="Loading Room Types..." />;
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
        Vendor profile not found. Cannot load rooms.
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

  // Handle Hotel Fetch Error or Not Found (implies permission issue or invalid ID)
  if (hotelStatus === "error" || (hotelStatus === "success" && !hotelData)) {
    return (
      <div className="text-red-600">
        Error loading hotel details: {hotelError?.message || "Hotel not found or permission denied."}
        <br />
        <Link href="/my-hotels" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
            Return to Hotel List
        </Link>
      </div>
    );
  }

  // Handle Rooms Fetch Error
  if (roomsStatus === "error") {
    return (
      <div className="text-red-600">
        Error loading room types: {roomsError?.message || "Unknown error"}
      </div>
    );
  }

  // --- Event Handlers ---
  const handleDeleteRoom = async (roomId: number) => {
    if (!confirm("Are you sure you want to delete this room type? This action cannot be undone.")) {
      return;
    }
    setIsDeleting(roomId);
    try {
      // Use the room-specific delete endpoint
      const response = await fetch(`/api/vendor/my-hotels/${serviceId}/rooms/${roomId}`, {
        method: "DELETE",
      });
      // Type the result
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete room type");
      }
      toast({ title: "Success", description: "Room type deleted successfully." });
      // Update local state
      setRoomTypes((prev) => prev.filter((r) => r.id !== roomId));
      // Removed comment: Or use mutateRooms();
    } catch (error) {
      console.error("Error deleting room type:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Could not delete room type.",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  // --- Render Room List ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Link href="/my-hotels" className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center">
        <ArrowLeft size={14} className="mr-1" /> Back to Hotels
      </Link>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Rooms for: {hotelName}</h2>
        <Link
          href={`/my-hotels/${serviceId}/rooms/add`}
          className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
        >
          <PlusCircle size={16} className="mr-2" /> Add New Room Type
        </Link>
      </div>

      {roomTypes.length === 0 && roomsStatus === "success" ? (
        <p className="text-gray-500 text-center py-4">
          You haven't added any room types for this hotel yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Type Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Price (INR)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Guests</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                {/* Add more columns if needed, e.g., amenities preview */}
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roomTypes.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.room_type_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.base_price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.max_guests}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.quantity_available ?? "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link href={`/my-hotels/${serviceId}/rooms/${room.id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center" title="Edit Room Type">
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      disabled={isDeleting === room.id}
                      className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50 disabled:cursor-wait"
                      title="Delete Room Type"
                    >
                      {isDeleting === room.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Wrap with Suspense ---
export default function VendorHotelRoomsPage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading Rooms Page..." />}>
      <RoomListContent />
    </Suspense>
  );
}

