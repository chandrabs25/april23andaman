// Path: /home/ubuntu/vendor_dev/component/(vendor)/services/[serviceId]/edit/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation"; // Added useParams
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

// Add a generic response type for simple success/message APIs
interface ApiResponse {
    success: boolean;
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

// Existing Service Data Interface (from GET /api/vendor/services/[serviceId])
interface VendorService {
  id: number;
  name: string;
  description: string | null;
  type: string;
  island_id: number;
  price: string | number;
  availability: string | null; // Assuming JSON string or simple text
  images: string | null; // Assuming comma-separated URLs or single URL
  amenities: string | null; // Assuming JSON string { general: [], specifics: {} }
  cancellation_policy: string | null; // Assuming JSON string or simple text
  is_active: number;
  // Other fields if returned by API
}
interface GetServiceResponse {
  success: boolean;
  data: VendorService | null;
  message?: string;
}

// Define structure for amenities specifics
interface RentalSpecifics {
    unit?: "per hour" | "per day";
    quantity?: number;
    deposit?: {
        required?: boolean;
        amount?: number;
    };
    requirements?: {
        required?: boolean;
        details?: string;
    };
}

interface ActivitySpecifics {
    duration?: {
        value?: number;
        unit?: "hours" | "days";
    };
    group_size?: {
        min?: number;
        max?: number;
    };
    difficulty?: "easy" | "medium" | "hard";
    equipment?: string[];
    safety?: string;
    guide?: boolean;
}

// Form state interface (matches API body + specific fields)
interface ServiceFormData {
  // Generic
  name: string;
  description: string;
  type: string; // e.g., "rental/car", "activity/trek"
  island_id: string; // Use string for form input
  price: string; // Use string for form input
  availability: string;
  images: string;
  cancellation_policy: string;
  // is_active is handled separately via status endpoint/list page toggle
  // Rental Specific
  rental_unit: "per hour" | "per day" | "";
  quantity_available: string;
  deposit_required: boolean;
  deposit_amount: string;
  age_license_requirement: boolean;
  age_license_details: string;
  // Activity Specific
  duration: string;
  duration_unit: "hours" | "days" | "";
  group_size_min: string;
  group_size_max: string;
  difficulty_level: "easy" | "medium" | "hard" | "";
  equipment_provided: string; // Comma-separated
  safety_requirements: string;
  guide_required: boolean;
  // General Amenities
  general_amenities: string; // Comma-separated
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
      Your account must be verified before you can edit services. Please check your
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
      <Hotel size={18} className="mr-2" />
      Incorrect Vendor Type
    </p>
    <p>
      This page is for editing Rentals and Activities. Hotel vendors should use
      the Hotel Management section.
    </p>
    <Link
      href="/hotels" // Link to hotel list or specific hotel edit?
      className="text-sm text-blue-600 hover:underline mt-2 inline-block"
    >
      Go to Hotel Management
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

// --- Main Edit Service Form Component ---
function EditServiceForm() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [formData, setFormData] = useState<ServiceFormData | null>(null); // Initialize as null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialServiceType, setInitialServiceType] = useState<string>(""); // Store initial type

  // 1. Fetch Vendor Profile (for verification and type check)
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: vendorProfile, error: profileError, status: profileStatus } = useFetch<VendorProfile | null>(profileApiUrl);
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Existing Service Data (only if profile loaded, verified, not hotel, and serviceId is valid)
  const shouldFetchService = profileStatus === "success" && vendorProfile && isVerified && !isHotelVendor && !!serviceId;
  const serviceApiUrl = shouldFetchService ? `/api/vendor/services/${serviceId}` : null;
  const { data: serviceData, error: serviceError, status: serviceStatus } = useFetch<VendorService | null>(serviceApiUrl);

  // 3. Fetch Islands
  const { data: islands, status: islandsStatus } = useFetch<Island[]>("/api/islands");
  const islandsList = islands || [];

  // --- Populate Form Data Effect ---
  useEffect(() => {
    if (serviceStatus === "success" && serviceData) {
      const service = serviceData;
      setInitialServiceType(service.type); // Store the initial type

      // --- Safe JSON Parsing ---
      let amenitiesData: { general?: string[]; specifics?: RentalSpecifics | ActivitySpecifics | {} } = { general: [], specifics: {} };
      try {
          // Explicitly check if service.amenities is a non-empty string before parsing
          if (typeof service.amenities === 'string' && service.amenities.trim()) {
              amenitiesData = JSON.parse(service.amenities);
          }
      } catch (e) {
          console.error("Failed to parse service amenities JSON:", service.amenities, e);
          toast({ variant: "destructive", title: "Warning", description: "Could not load existing amenities data." });
      }

      let imagesArray: string[] = [];
       try {
           // Explicitly check if service.images is a non-empty string before parsing
           if (typeof service.images === 'string' && service.images.trim()) {
               const parsedImages = JSON.parse(service.images);
               // Ensure it's actually an array of strings
               if (Array.isArray(parsedImages) && parsedImages.every(item => typeof item === 'string')) {
                   imagesArray = parsedImages;
               } else {
                   console.warn("Parsed images data is not an array of strings:", parsedImages);
                   // Attempt recovery if it's just a single string
                   if (typeof parsedImages === 'string' && parsedImages.trim()) {
                       imagesArray = [parsedImages.trim()];
                   }
               }
           } else if (typeof service.images === 'string' && service.images.trim()) {
               // Handle case where it might be a single URL string not in JSON format
               imagesArray = [service.images.trim()];
           }
       } catch (e) {
           console.error("Failed to parse service images JSON:", service.images, e);
           toast({ variant: "destructive", title: "Warning", description: "Could not load existing image data." });
            // Fallback: treat as comma-separated if parsing fails but it's a string
           if (typeof service.images === 'string' && service.images.includes(',')) {
               imagesArray = service.images.split(',').map(s => s.trim()).filter(Boolean);
           } else if (typeof service.images === 'string' && service.images.trim()) {
               imagesArray = [service.images.trim()]; // Treat as single image URL
           }
       }

      // Use type assertions based on service type
      const serviceBaseType = service.type.split("/")[0];
      const specifics = amenitiesData.specifics || {};
      const rentalSpecifics = serviceBaseType === 'rental' ? specifics as RentalSpecifics : {};
      const activitySpecifics = serviceBaseType === 'activity' ? specifics as ActivitySpecifics : {};

      // Safely parse equipment_provided based on activity type
      let equipmentArray: string[] = [];
      if (serviceBaseType === 'activity') {
          try {
              // Check if activitySpecifics.equipment is already an array (from amenities parse)
               if (Array.isArray(activitySpecifics.equipment)) {
                   equipmentArray = activitySpecifics.equipment;
               }
               // Legacy check: Maybe equipment_provided is a separate field from the API?
               // If your API sends `equipment_provided` as a separate JSON string field:
               /*
               else if (typeof (service as any).equipment_provided === 'string' && (service as any).equipment_provided.trim()) {
                   const parsedEquipment = JSON.parse((service as any).equipment_provided);
                   if (Array.isArray(parsedEquipment) && parsedEquipment.every(item => typeof item === 'string')) {
                       equipmentArray = parsedEquipment;
                   }
               }
               */

          } catch (e) {
              console.error("Failed to parse equipment_provided JSON:", activitySpecifics.equipment, e);
               toast({ variant: "destructive", title: "Warning", description: "Could not load existing equipment data." });
               // Fallback logic if needed
          }
      }


      // --- Populate State ---
      setFormData({
        name: service.name || "",
        description: service.description || "",
        type: service.type || "",
        island_id: service.island_id?.toString() || "",
        price: typeof service.price === 'number' ? service.price.toString() : service.price || "",
        availability: service.availability || "",
        images: imagesArray.join(", "),
        cancellation_policy: service.cancellation_policy || "",
        // is_active is not edited here
        // Rental Specific
        rental_unit: rentalSpecifics.unit || "",
        quantity_available: rentalSpecifics.quantity?.toString() || "",
        deposit_required: rentalSpecifics.deposit?.required || false,
        deposit_amount: rentalSpecifics.deposit?.amount?.toString() || "",
        age_license_requirement: rentalSpecifics.requirements?.required || false,
        age_license_details: rentalSpecifics.requirements?.details || "",
        // Activity Specific
        duration: activitySpecifics.duration?.value?.toString() || "",
        duration_unit: activitySpecifics.duration?.unit || "",
        group_size_min: activitySpecifics.group_size?.min?.toString() || "",
        group_size_max: activitySpecifics.group_size?.max?.toString() || "",
        difficulty_level: activitySpecifics.difficulty || "",
        equipment_provided: (activitySpecifics.equipment || []).join(", "),
        safety_requirements: activitySpecifics.safety || "",
        guide_required: activitySpecifics.guide || false,
        // General Amenities
        general_amenities: (amenitiesData.general || []).join(", "),
      });
    } else if (serviceStatus === "error") {
        toast({ variant: "destructive", title: "Error Loading Service", description: serviceError?.message || "Could not load service details." });
        router.replace("/services");
    }
  }, [serviceStatus, serviceData, serviceError, router]);

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || (shouldFetchService && serviceStatus === "loading") || islandsStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner text="Loading Edit Service Form..." />;
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
        Vendor profile not found. Cannot edit service.
      </div>
    );
  }

  // --- Conditional Rendering based on Verification & Type ---
  // --- Verification Check Removed (as per Add page logic) ---
  // if (!isVerified) {
  //   return <VerificationPending />;
  // }

  if (isHotelVendor) {
    return <IncorrectVendorType />;
  }

  // Handle Service Not Found or Error after profile is loaded
  if (shouldFetchService && serviceStatus === 'success' && !serviceData) {
    return (
      <div className="text-red-600">
        Service not found or could not be loaded.
        <Link href="/services" className="ml-2 text-blue-600 hover:underline">Back to Services</Link>
      </div>
    );
  }
   if (shouldFetchService && serviceStatus === 'error') {
     // Error is handled within the useEffect, redirecting the user.
     // Showing a loading state might be better here if the redirect hasn't happened.
     return <LoadingSpinner text="Error loading service..." />;
  }

  // If formData hasn't been populated yet (still loading or initial state)
  if (!formData) {
     // Render loading or a placeholder if service data is still being fetched/processed
     return <LoadingSpinner text="Loading service details..." />;
  }

  const selectedServiceBaseType = formData.type.split("/")[0]; // rental or activity

  // --- Form Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => prev ? { ...prev, [name]: checked } : null);
    } else {
      setFormData((prev) => prev ? { ...prev, [name]: value } : null);
    }

    // If the main type changes, warn the user if it crosses rental/activity boundary
    if (name === "type") {
        const newBaseType = value.split("/")[0];
        const initialBaseType = initialServiceType.split("/")[0];
        if (newBaseType !== initialBaseType && initialBaseType) {
            toast({ variant: "default", title: "Warning", description: "Changing the base service type (Rental/Activity) might reset specific fields. Please review carefully." });
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) {
        toast({ variant: "destructive", title: "Error", description: "Form data not loaded yet." });
        return;
    }
    setIsSubmitting(true);

    // Basic validation (can add more)
    if (!formData.type) {
        toast({ variant: "destructive", title: "Error", description: "Please select a service type." });
        setIsSubmitting(false);
        return;
    }
     if (!formData.island_id) {
        toast({ variant: "destructive", title: "Error", description: "Please select an island." });
        setIsSubmitting(false);
        return;
    }

    // --- Data Transformation (Similar to Add Page) ---
    // Note: We are rebuilding the payload structure required by the PUT API endpoint.
    // This might differ slightly from the GET response structure.
    // We assume the PUT endpoint expects a similar structure to the POST endpoint.

    let apiPayload: any = {
        // Include fields that are directly editable and part of the ServiceFormData
        name: formData.name,
        description: formData.description,
        type: formData.type,
        island_id: parseInt(formData.island_id, 10) || null,
        price: parseFloat(formData.price) || 0,
        availability: formData.availability, // Assuming API accepts simple string
        cancellation_policy: formData.cancellation_policy, // Assuming API accepts simple string
        // is_active is handled separately

        // Transform comma-separated strings back to JSON arrays
        images: JSON.stringify(formData.images ? formData.images.split(',').map(img => img.trim()).filter(Boolean) : []),
        general_amenities: JSON.stringify(formData.general_amenities ? formData.general_amenities.split(',').map(am => am.trim()).filter(Boolean) : []),

        // Include type-specific fields, converting numeric strings
        rental_unit: formData.rental_unit || null,
        quantity_available: parseInt(formData.quantity_available, 10) || null,
        deposit_required: formData.deposit_required,
        deposit_amount: formData.deposit_required ? (parseFloat(formData.deposit_amount) || null) : null,
        age_license_requirement: formData.age_license_requirement,
        age_license_details: formData.age_license_requirement ? formData.age_license_details : null,

        duration: parseInt(formData.duration, 10) || null,
        duration_unit: formData.duration_unit || null,
        group_size_min: parseInt(formData.group_size_min, 10) || null,
        group_size_max: parseInt(formData.group_size_max, 10) || null,
        difficulty_level: formData.difficulty_level || null,
        equipment_provided: JSON.stringify(formData.equipment_provided ? formData.equipment_provided.split(',').map(eq => eq.trim()).filter(Boolean) : []),
        safety_requirements: formData.safety_requirements,
        guide_required: formData.guide_required,

    };

     // Optional: Clean up fields irrelevant to the *current* type before sending
     const baseType = formData.type.split('/')[0];
     if (baseType === 'rental') {
         delete apiPayload.duration;
         delete apiPayload.duration_unit;
         delete apiPayload.group_size_min;
         delete apiPayload.group_size_max;
         delete apiPayload.difficulty_level;
         delete apiPayload.equipment_provided; // Keep if stored under rental specifics? Check API PUT model
         delete apiPayload.safety_requirements;
         delete apiPayload.guide_required;
     } else if (baseType === 'activity') {
         delete apiPayload.rental_unit;
         delete apiPayload.quantity_available;
         delete apiPayload.deposit_required;
         delete apiPayload.deposit_amount;
         delete apiPayload.age_license_requirement;
         delete apiPayload.age_license_details;
     }

    // --- API Call ---
    try {
      // Use PUT method for update
      const response = await fetch(`/api/vendor/services/${serviceId}`, {
        method: "PUT", // Changed from POST to PUT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload), // Send the transformed payload
      });

      const result: ApiResponse = await response.json(); // Use ApiResponse type

      if (response.ok && result.success) {
        toast({ title: "Success", description: "Service updated successfully." });
        router.push("/services"); // Redirect back to the service list
      } else {
        throw new Error(result.message || "Failed to update service");
      }
    } catch (error: any) {
      console.error("Update Service Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Form ---
  // Show loading spinner until form data is populated
  if (!isLoading) {
      return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <Link href="/services" className="text-sm text-blue-600 hover:underline mb-4 inline-flex items-center">
            <ArrowLeft size={14} className="mr-1" /> Back to Services
          </Link>
          <h2 className="text-xl font-bold mb-6">Edit Service: {serviceData?.name || ""}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Generic Fields Section */}
            <fieldset className="border p-4 rounded-md">
              <legend className="text-lg font-semibold px-2">Basic Information</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Service Name <span className="text-red-500">*</span></label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">Service Type <span className="text-red-500">*</span></label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>-- Select Type --</option>
                    <optgroup label="Rentals">
                      <option value="rental/car">Car Rental</option>
                      <option value="rental/bike">Bike Rental</option>
                      <option value="rental/scooter">Scooter Rental</option>
                      {/* Add other rental types */}
                    </optgroup>
                    <optgroup label="Activities">
                      <option value="activity/scuba">Scuba Diving</option>
                      <option value="activity/snorkeling">Snorkeling</option>
                      <option value="activity/trek">Trekking</option>
                      <option value="activity/kayaking">Kayaking</option>
                      {/* Add other activity types */}
                    </optgroup>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (INR) <span className="text-red-500">*</span></label>
                  <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="island_id" className="block text-sm font-medium text-gray-700">Island <span className="text-red-500">*</span></label>
                  <select id="island_id" name="island_id" value={formData.island_id} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled>-- Select Island --</option>
                    {islandsList.map(island => (
                      <option key={island.id} value={island.id}>{island.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability (e.g., schedule, dates)</label>
                  <input type="text" id="availability" name="availability" value={formData.availability} onChange={handleChange} placeholder="Enter schedule details or JSON" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
                  <input type="text" id="images" name="images" value={formData.images} onChange={handleChange} placeholder="http://..., http://..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cancellation_policy" className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
                  <textarea id="cancellation_policy" name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                 <div className="md:col-span-2">
                  <label htmlFor="general_amenities" className="block text-sm font-medium text-gray-700">General Amenities (comma-separated)</label>
                  <input type="text" id="general_amenities" name="general_amenities" value={formData.general_amenities} onChange={handleChange} placeholder="e.g., Helmet, Insurance, GPS, Guide" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                {/* is_active toggle is on the list page, not here */}
              </div>
            </fieldset>

            {/* Rental Specific Fields */} 
            {selectedServiceBaseType === "rental" && (
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold px-2">Rental Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="rental_unit" className="block text-sm font-medium text-gray-700">Rental Unit</label>
                    <select id="rental_unit" name="rental_unit" value={formData.rental_unit} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="">-- Select Unit --</option>
                      <option value="per hour">Per Hour</option>
                      <option value="per day">Per Day</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity_available" className="block text-sm font-medium text-gray-700">Quantity Available</label>
                    <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                     <div className="flex items-center sm:col-span-1">
                        <input type="checkbox" id="deposit_required" name="deposit_required" checked={formData.deposit_required} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="deposit_required" className="ml-2 block text-sm text-gray-900">Deposit Required?</label>
                     </div>
                     {formData.deposit_required && (
                        <div className="sm:col-span-2">
                            <label htmlFor="deposit_amount" className="block text-sm font-medium text-gray-700">Deposit Amount (INR)</label>
                            <input type="number" id="deposit_amount" name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                     )}
                  </div>
                   <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                     <div className="flex items-center sm:col-span-1">
                        <input type="checkbox" id="age_license_requirement" name="age_license_requirement" checked={formData.age_license_requirement} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="age_license_requirement" className="ml-2 block text-sm text-gray-900">Age/License Required?</label>
                     </div>
                     {formData.age_license_requirement && (
                        <div className="sm:col-span-2">
                            <label htmlFor="age_license_details" className="block text-sm font-medium text-gray-700">Requirement Details</label>
                            <textarea id="age_license_details" name="age_license_details" value={formData.age_license_details} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                        </div>
                     )}
                  </div>
                </div>
              </fieldset>
            )}

            {/* Activity Specific Fields */} 
            {selectedServiceBaseType === "activity" && (
              <fieldset className="border p-4 rounded-md">
                <legend className="text-lg font-semibold px-2">Activity Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                   <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                            <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="duration_unit" className="block text-sm font-medium text-gray-700">Unit</label>
                            <select id="duration_unit" name="duration_unit" value={formData.duration_unit} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">-- Unit --</option>
                            <option value="hours">Hours</option>
                            <option value="days">Days</option>
                            </select>
                        </div>
                   </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="group_size_min" className="block text-sm font-medium text-gray-700">Min Group Size</label>
                            <input type="number" id="group_size_min" name="group_size_min" value={formData.group_size_min} onChange={handleChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="group_size_max" className="block text-sm font-medium text-gray-700">Max Group Size</label>
                            <input type="number" id="group_size_max" name="group_size_max" value={formData.group_size_max} onChange={handleChange} min="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="difficulty_level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                        <select id="difficulty_level" name="difficulty_level" value={formData.difficulty_level} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="">-- Select Level --</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="equipment_provided" className="block text-sm font-medium text-gray-700">Equipment Provided (comma-separated)</label>
                        <input type="text" id="equipment_provided" name="equipment_provided" value={formData.equipment_provided} onChange={handleChange} placeholder="e.g., Life Jacket, Boots" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="safety_requirements" className="block text-sm font-medium text-gray-700">Safety Requirements</label>
                        <textarea id="safety_requirements" name="safety_requirements" value={formData.safety_requirements} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="guide_required" name="guide_required" checked={formData.guide_required} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="guide_required" className="ml-2 block text-sm text-gray-900">Guide Required?</label>
                    </div>
                </div>
              </fieldset>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Link href="/services" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-300 mr-2">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin mr-2" /> Saving Changes...</>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      );
  }
}

// --- Wrap with Suspense ---
export default function EditVendorServicePage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading Edit Service Page..." />}>
      <EditServiceForm />
    </Suspense>
  );
}

