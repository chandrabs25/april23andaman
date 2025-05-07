// Path: /home/ubuntu/vendor_frontend_rev2/test 2/src/app/(vendor)/services/add/page.tsx
"use client";
export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { toast } from "@/hooks/use-toast";
import { Loader2, AlertTriangle, ArrowLeft, Hotel, Package, Info } from "lucide-react";
import Link from "next/link";
import { CheckboxGroup } from "@/components/CheckboxGroup"; // Import the new component

// --- Interfaces ---
interface AuthUser {
  id: string | number;
  role_id?: number;
}

interface VendorProfile {
  id: number;
  verified: number; // 0 or 1
  type: string; // e.g., 'hotel', 'rental', 'activity'
}

interface Island {
  id: number;
  name: string;
}

interface ApiResponse {
    success: boolean;
    message?: string;
    data?: any; // Keep flexible for different API responses
}

// --- Define Options for Checkbox Groups ---
const generalAmenityOptions = [
  { label: "Wi-Fi", value: "wifi" },
  { label: "Parking", value: "parking" },
  { label: "Restroom", value: "restroom" },
  { label: "First Aid", value: "first_aid" },
  { label: "Refreshments Available", value: "refreshments" },
];

const equipmentOptions = [
  { label: "Helmet", value: "helmet" },
  { label: "Life Jacket", value: "life_jacket" },
  { label: "Snorkel Gear", value: "snorkel_gear" },
  { label: "Scuba Gear", value: "scuba_gear" },
  { label: "Kayak/Paddle", value: "kayak_paddle" },
  { label: "Hiking Boots", value: "hiking_boots" },
  { label: "Safety Harness", value: "safety_harness" },
];

const availabilityDayOptions = [
    { label: "Monday", value: "Mon" },
    { label: "Tuesday", value: "Tue" },
    { label: "Wednesday", value: "Wed" },
    { label: "Thursday", value: "Thu" },
    { label: "Friday", value: "Fri" },
    { label: "Saturday", value: "Sat" },
    { label: "Sunday", value: "Sun" },
];

// Updated Form state interface
interface ServiceFormData {
  // Generic
  name: string;
  description: string;
  type: string;
  island_id: string;
  price: string;
  availability_days: string[]; // Changed from string
  availability_notes: string; // Added for specific times/notes
  images: string[]; // Changed from string
  cancellation_policy: string;
  is_active: boolean;
  general_amenities: string[]; // Changed from string
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
  equipment_provided: string[]; // Changed from string
  safety_requirements: string;
  guide_required: boolean;
}

// --- Helper Components (LoadingSpinner, VerificationPending, IncorrectVendorType) ---
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
    <span>{text}</span>
  </div>
);

const VerificationPending = () => (
  <div className="flex flex-col items-center justify-center p-6 border border-yellow-300 bg-yellow-50 rounded-md shadow-sm text-yellow-700">
    <AlertTriangle className="h-8 w-8 mb-2" />
    <h3 className="text-lg font-semibold mb-1">Verification Pending</h3>
    <p className="text-sm text-center">Your vendor account is awaiting verification. You cannot add services until verified.</p>
    {/* Optionally add a link to contact support or check status */}
  </div>
);

const IncorrectVendorType = () => (
    <div className="flex flex-col items-center justify-center p-6 border border-red-300 bg-red-50 rounded-md shadow-sm text-red-700">
        <Info className="h-8 w-8 mb-2" />
        <h3 className="text-lg font-semibold mb-1">Incorrect Vendor Type</h3>
        <p className="text-sm text-center">This form is for adding Rentals or Activities. Hotel vendors should manage rooms via the Hotels section.</p>
        <Link href="/hotels" className="mt-3 text-sm text-indigo-600 hover:underline">
            Go to Hotel Management
        </Link>
    </div>
);

// Simple Tag Input Component (For Image URLs - consider replacing with file upload later)
const TagInput = ({ label, name, value, onChange, placeholder, helperText }: {
    label: string;
    name: string;
    value: string[];
    onChange: (name: string, value: string[]) => void;
    placeholder?: string;
    helperText?: string;
}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "," || e.key === "Enter") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange(name, [...value, newTag]);
            }
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        onChange(name, value.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="mt-1 flex flex-wrap items-center gap-1 p-2 border border-gray-300 rounded-md shadow-sm bg-white">
                {value.map(tag => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1.5 flex-shrink-0 text-indigo-500 hover:text-indigo-700 focus:outline-none">
                            <span className="sr-only">Remove {tag}</span>
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    id={name}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder || "Add item and press Enter or comma"}
                    className="flex-grow px-1 py-0.5 border-none focus:ring-0 sm:text-sm outline-none"
                />
            </div>
            {helperText && <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>}
        </div>
    );
};

// --- Main Add Service Form Component ---
function AddServiceForm() {
  const router = useRouter();
  const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
    user: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
  };

  const [formData, setFormData] = useState<ServiceFormData>({
    name: "",
    description: "",
    type: "",
    island_id: "",
    price: "",
    availability_days: [],
    availability_notes: "",
    images: [],
    cancellation_policy: "",
    is_active: true,
    general_amenities: [],
    rental_unit: "",
    quantity_available: "",
    deposit_required: false,
    deposit_amount: "",
    age_license_requirement: false,
    age_license_details: "",
    duration: "",
    duration_unit: "",
    group_size_min: "",
    group_size_max: "",
    difficulty_level: "",
    equipment_provided: [],
    safety_requirements: "",
    guide_required: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedServiceBaseType = formData.type.split("/")[0];

  // 1. Fetch Vendor Profile
  const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
  const { data: vendorProfile, error: profileError, status: profileStatus } = useFetch<VendorProfile | null>(profileApiUrl);
  const isVerified = vendorProfile?.verified === 1;
  const isHotelVendor = vendorProfile?.type === "hotel";

  // 2. Fetch Islands
  const { data: islands = [], error: islandsError, status: islandsStatus } = useFetch<Island[]>("/api/islands");

  // --- Authorization & Loading Checks ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
      router.replace("/auth/signin?reason=unauthorized_vendor");
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  const isLoading = authLoading || profileStatus === "loading" || islandsStatus === "loading";

  if (isLoading) {
    return <LoadingSpinner text="Loading Add Service Form..." />;
  }

  // Handle Profile Fetch Error/Not Found
  if (profileStatus === "error" || (profileStatus === "success" && !vendorProfile)) {
    return <div className="text-red-600">Error loading vendor profile or profile not found.</div>;
  }

  // --- Conditional Rendering based on Type ---
  if (isHotelVendor) {
    return <IncorrectVendorType />;
  }

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

  const handleArrayChange = (name: string, values: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: values }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (!formData.type || !formData.island_id || !formData.name.trim() || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please fill all required fields (*) with valid data." });
        setIsSubmitting(false);
        return;
    }
    // Add more specific validation based on type
    if (selectedServiceBaseType === "rental" && (!formData.rental_unit || isNaN(parseInt(formData.quantity_available)) || parseInt(formData.quantity_available) <= 0)) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please provide valid rental unit and quantity for rentals." });
        setIsSubmitting(false);
        return;
    }
    if (selectedServiceBaseType === "activity" && (!formData.duration_unit || isNaN(parseInt(formData.duration)) || parseInt(formData.duration) <= 0)) {
        toast({ variant: "destructive", title: "Validation Error", description: "Please provide valid duration and unit for activities." });
        setIsSubmitting(false);
        return;
    }

    // --- Data Transformation for API ---
    let apiPayload: any = {
        ...formData,
        service_provider_id: vendorProfile?.id,
        island_id: parseInt(formData.island_id, 10) || null,
        price: parseFloat(formData.price) || 0,
        quantity_available: formData.quantity_available ? (parseInt(formData.quantity_available, 10) || null) : null,
        deposit_amount: formData.deposit_amount ? (parseFloat(formData.deposit_amount) || null) : null,
        duration: formData.duration ? (parseInt(formData.duration, 10) || null) : null,
        group_size_min: formData.group_size_min ? (parseInt(formData.group_size_min, 10) || null) : null,
        group_size_max: formData.group_size_max ? (parseInt(formData.group_size_max, 10) || null) : null,
        availability: JSON.stringify({
            days: formData.availability_days,
            notes: formData.availability_notes
        }),
        images: JSON.stringify(formData.images),
        equipment_provided: JSON.stringify(formData.equipment_provided),
        general_amenities: JSON.stringify(formData.general_amenities),
    };

    delete apiPayload.availability_days;
    delete apiPayload.availability_notes;

    if (selectedServiceBaseType === "rental") {
        delete apiPayload.duration;
        delete apiPayload.duration_unit;
        delete apiPayload.group_size_min;
        delete apiPayload.group_size_max;
        delete apiPayload.difficulty_level;
        delete apiPayload.equipment_provided;
        delete apiPayload.safety_requirements;
        delete apiPayload.guide_required;
    } else if (selectedServiceBaseType === "activity") {
        delete apiPayload.rental_unit;
        delete apiPayload.quantity_available;
        delete apiPayload.deposit_required;
        delete apiPayload.deposit_amount;
        delete apiPayload.age_license_requirement;
        delete apiPayload.age_license_details;
    }

    // --- API Call ---
    try {
      const response = await fetch("/api/vendor/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });
      const result: ApiResponse = await response.json();
      if (response.ok && result.success) {
        toast({ title: "Success", description: "Service added successfully." });
        router.push("/my-services");
      } else {
        throw new Error(result.message || "Failed to add service");
      }
    } catch (error: any) {
      console.error("Add Service Error:", error);
      toast({ variant: "destructive", title: "Error", description: error.message || "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render Form ---
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
       {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex space-x-2">
            <li className="flex items-center">
                <Link href="/dashboard" className="hover:text-indigo-600 hover:underline">Dashboard</Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li className="flex items-center">
                <Link href="/my-services" className="hover:text-indigo-600 hover:underline">Services</Link>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li className="flex items-center text-gray-700 font-medium">
                Add New Service
            </li>
            </ol>
        </nav>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Service</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* --- Basic Information --- */}
        <fieldset className="border border-gray-200 p-6 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2">Basic Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Service Type */}
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Service Type <span className="text-red-500">*</span></label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                        <option value="" disabled>-- Select Type --</option>
                        <optgroup label="Rentals">
                            <option value="rental/car">Car Rental</option>
                            <option value="rental/bike">Bike/Scooter Rental</option>
                            <option value="rental/boat">Boat Rental</option>
                            <option value="rental/equipment">Equipment Rental (Surfboard, etc.)</option>
                        </optgroup>
                        <optgroup label="Activities">
                            <option value="activity/tour">Tour (Guided)</option>
                            <option value="activity/watersport">Watersport (Lesson/Rental)</option>
                            <option value="activity/hiking">Hiking/Trekking</option>
                            <option value="activity/cultural">Cultural Experience</option>
                            <option value="activity/diving">Diving/Snorkeling</option>
                        </optgroup>
                    </select>
                </div>
                {/* Island */}
                <div>
                    <label htmlFor="island_id" className="block text-sm font-medium text-gray-700 mb-1">Island <span className="text-red-500">*</span></label>
                    <select id="island_id" name="island_id" value={formData.island_id} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                        <option value="" disabled>-- Select Island --</option>
                        {islands?.map(island => (
                        <option key={island.id} value={island.id}>{island.name}</option>
                        ))}
                    </select>
                    {islandsStatus === "error" && <p className="text-xs text-red-500 mt-1">Error loading islands.</p>}
                </div>
                {/* Name */}
                <div className="md:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Service Name <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Guided Island Tour, Scooter Rental"/>
                </div>
                {/* Description */}
                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Provide details about the service..."></textarea>
                </div>
                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (INR) <span className="text-red-500">*</span></label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 1500"/>
                    <p className="mt-1 text-xs text-gray-500">Base price. Specify unit (per hour/day) in relevant section below.</p>
                </div>
                {/* Active Status */} 
                <div className="flex items-center pt-6">
                    <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 cursor-pointer">Service is Active</label>
                </div>
            </div>
        </fieldset>

        {/* --- Availability & Amenities --- */}
        <fieldset className="border border-gray-200 p-6 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2">Availability & Amenities</legend>
            <div className="space-y-6 mt-4">
                {/* Availability Days */}
                <CheckboxGroup
                    label="Available Days"
                    name="availability_days"
                    options={availabilityDayOptions}
                    selectedValues={formData.availability_days}
                    onChange={handleArrayChange}
                    gridCols={4} // Use grid layout
                    helperText="Select the days this service is typically available."
                />
                {/* Availability Notes */}
                <div>
                    <label htmlFor="availability_notes" className="block text-sm font-medium text-gray-700 mb-1">Availability Notes</label>
                    <input type="text" id="availability_notes" name="availability_notes" value={formData.availability_notes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 9 AM - 5 PM, Closed on public holidays"/>
                    <p className="mt-1 text-xs text-gray-500">Specify times, seasonal availability, or other notes.</p>
                </div>
                {/* General Amenities */}
                <CheckboxGroup
                    label="General Amenities"
                    name="general_amenities"
                    options={generalAmenityOptions}
                    selectedValues={formData.general_amenities}
                    onChange={handleArrayChange}
                    gridCols={3} // Use grid layout
                    helperText="Select amenities available at the location or included with the service."
                />
            </div>
        </fieldset>

        {/* --- Rental Specific Fields --- */}
        {selectedServiceBaseType === "rental" && (
            <fieldset className="border border-blue-200 p-6 rounded-lg shadow-sm bg-blue-50">
                <legend className="text-lg font-semibold text-blue-700 px-2">Rental Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Rental Unit */}
                    <div>
                        <label htmlFor="rental_unit" className="block text-sm font-medium text-gray-700 mb-1">Rental Unit <span className="text-red-500">*</span></label>
                        <select id="rental_unit" name="rental_unit" value={formData.rental_unit} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                            <option value="" disabled>-- Select Unit --</option>
                            <option value="per hour">Per Hour</option>
                            <option value="per day">Per Day</option>
                        </select>
                    </div>
                    {/* Quantity Available */}
                    <div>
                        <label htmlFor="quantity_available" className="block text-sm font-medium text-gray-700 mb-1">Quantity Available <span className="text-red-500">*</span></label>
                        <input type="number" id="quantity_available" name="quantity_available" value={formData.quantity_available} onChange={handleChange} required min="1" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 10"/>
                    </div>
                    {/* Deposit */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="flex items-center pt-6">
                            <input type="checkbox" id="deposit_required" name="deposit_required" checked={formData.deposit_required} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                            <label htmlFor="deposit_required" className="ml-2 block text-sm text-gray-900 cursor-pointer">Deposit Required?</label>
                        </div>
                        {formData.deposit_required && (
                            <div className="md:col-span-2">
                                <label htmlFor="deposit_amount" className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (INR)</label>
                                <input type="number" id="deposit_amount" name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 500"/>
                            </div>
                        )}
                    </div>
                    {/* Age/License Requirement */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="flex items-center pt-6">
                            <input type="checkbox" id="age_license_requirement" name="age_license_requirement" checked={formData.age_license_requirement} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                            <label htmlFor="age_license_requirement" className="ml-2 block text-sm text-gray-900 cursor-pointer">Age/License Required?</label>
                        </div>
                        {formData.age_license_requirement && (
                            <div className="md:col-span-2">
                                <label htmlFor="age_license_details" className="block text-sm font-medium text-gray-700 mb-1">Requirement Details</label>
                                <input type="text" id="age_license_details" name="age_license_details" value={formData.age_license_details} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Min age 18, Valid driving license"/>
                            </div>
                        )}
                    </div>
                </div>
            </fieldset>
        )}

        {/* --- Activity Specific Fields --- */}
        {selectedServiceBaseType === "activity" && (
            <fieldset className="border border-green-200 p-6 rounded-lg shadow-sm bg-green-50">
                <legend className="text-lg font-semibold text-green-700 px-2">Activity Details</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    {/* Duration */}
                    <div className="flex items-end gap-2">
                        <div className="flex-grow">
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration <span className="text-red-500">*</span></label>
                            <input type="number" id="duration" name="duration" value={formData.duration} onChange={handleChange} required min="1" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 3"/>
                        </div>
                        <div>
                            <label htmlFor="duration_unit" className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                            <select id="duration_unit" name="duration_unit" value={formData.duration_unit} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                                <option value="" disabled>-- Unit --</option>
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                            </select>
                        </div>
                    </div>
                    {/* Group Size */}
                    <div className="flex items-end gap-2">
                        <div className="flex-grow">
                            <label htmlFor="group_size_min" className="block text-sm font-medium text-gray-700 mb-1">Min Group Size</label>
                            <input type="number" id="group_size_min" name="group_size_min" value={formData.group_size_min} onChange={handleChange} min="1" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 2"/>
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="group_size_max" className="block text-sm font-medium text-gray-700 mb-1">Max Group Size</label>
                            <input type="number" id="group_size_max" name="group_size_max" value={formData.group_size_max} onChange={handleChange} min="1" step="1" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., 10"/>
                        </div>
                    </div>
                    {/* Difficulty Level */}
                    <div>
                        <label htmlFor="difficulty_level" className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                        <select id="difficulty_level" name="difficulty_level" value={formData.difficulty_level} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white">
                            <option value="" disabled>-- Select Level --</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {/* Guide Required */}
                    <div className="flex items-center pt-6">
                        <input type="checkbox" id="guide_required" name="guide_required" checked={formData.guide_required} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer" />
                        <label htmlFor="guide_required" className="ml-2 block text-sm text-gray-900 cursor-pointer">Guide Required/Included</label>
                    </div>
                    {/* Equipment Provided */}
                    <div className="md:col-span-2">
                        <CheckboxGroup
                            label="Equipment Provided"
                            name="equipment_provided"
                            options={equipmentOptions}
                            selectedValues={formData.equipment_provided}
                            onChange={handleArrayChange}
                            gridCols={3} // Use grid layout
                            helperText="Select equipment included in the activity price."
                        />
                    </div>
                    {/* Safety Requirements */}
                    <div className="md:col-span-2">
                        <label htmlFor="safety_requirements" className="block text-sm font-medium text-gray-700 mb-1">Safety Requirements</label>
                        <textarea id="safety_requirements" name="safety_requirements" value={formData.safety_requirements} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Must be able to swim, Good physical condition required..."></textarea>
                    </div>
                </div>
            </fieldset>
        )}

        {/* --- Images & Policies --- */}
        <fieldset className="border border-gray-200 p-6 rounded-lg shadow-sm">
            <legend className="text-lg font-semibold text-gray-700 px-2">Images & Policies</legend>
            <div className="space-y-6 mt-4">
                {/* Images */}
                <TagInput
                    label="Image URLs"
                    name="images"
                    value={formData.images}
                    onChange={handleArrayChange}
                    placeholder="Enter image URL and press Enter"
                    helperText="Add URLs for photos showcasing the service or rental item."
                />
                {/* Cancellation Policy */}
                <div>
                    <label htmlFor="cancellation_policy" className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
                    <textarea id="cancellation_policy" name="cancellation_policy" value={formData.cancellation_policy} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="e.g., Full refund if cancelled 24 hours prior..."></textarea>
                </div>
            </div>
        </fieldset>

        {/* --- Form Actions --- */}
        <div className="flex justify-end space-x-4 pt-4">
          <Link href="/my-services" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition duration-150 ease-in-out">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin mr-2" /> Adding Service...</>
            ) : (
              "Add Service"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Wrap with Suspense ---
export default function AddVendorServicePage() {
  return (
    <Suspense fallback={<LoadingSpinner text="Loading Add Service Page..." />}>
      <AddServiceForm />
    </Suspense>
  );
}
