// src/app/(main)/services/rental/[serviceId]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import type { RentalService, SingleServiceResponse } from "@/types/transport_rental";
import {
  Loader2,
  AlertTriangle,
  MapPin,
  Clock,
  Star,
  IndianRupee,
  CalendarDays,
  ShieldCheck,
  Info,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ShoppingBag,
  Tag,
  Repeat,
  Archive // For deposit
} from "lucide-react";

// --- Color Theme ---
const rentalColor = "#F59E0B"; // Amber-500
const rentalColorDarker = "#D97706"; // Amber-600
// --- End Color Theme ---

// --- Helper Components (can be shared or adapted from transport page) ---
const LoadingState = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <Loader2 className={`h-12 w-12 animate-spin text-[${rentalColor}] mx-auto mb-4`} />
    <p className={`text-xl font-semibold text-[${rentalColorDarker}]`}>Loading Rental Service Details...</p>
    <p className="text-gray-500">Please wait a moment.</p>
  </div>
);

const ErrorState = ({ message }: { message?: string }) => (
  <div className="container mx-auto px-4 py-12 text-center">
    <AlertTriangle className={`h-12 w-12 text-red-500 mx-auto mb-4`} />
    <p className="text-xl font-semibold text-red-600">Could Not Load Service</p>
    <p className="text-gray-500">{message || "The service details could not be retrieved."}</p>
    <Link href="/services" className={`mt-6 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[${rentalColor}] hover:bg-[${rentalColorDarker}] transition-colors`}>
      <ChevronLeft size={18} className="mr-2" /> Back to Services
    </Link>
  </div>
);

interface DetailItemProps {
  label: string;
  value?: string | number | null | React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  highlight?: boolean;
}
const DetailItem: React.FC<DetailItemProps> = ({ label, value, icon: Icon, className, highlight }) => {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className={`flex items-start py-2 ${className || ""}`}>
      {Icon && <Icon size={18} className={`mr-2.5 mt-0.5 flex-shrink-0 ${highlight ? `text-[${rentalColorDarker}]` : "text-gray-500" }`} />}
      <span className={`text-sm font-medium ${highlight ? `text-[${rentalColorDarker}]` : "text-gray-600" } w-36 md:w-48 flex-shrink-0`}>{label}:</span>
      <span className="text-sm text-gray-800 flex-grow break-words">{value}</span>
    </div>
  );
};

interface DetailSectionProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
const DetailSection: React.FC<DetailSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={`py-5 border-b border-gray-200 last:border-b-0 ${className || ""}`}>
    <h2 className="text-lg font-semibold text-gray-800 mb-2.5 flex items-center">
      {Icon && <Icon size={20} className={`mr-2.5 text-[${rentalColorDarker}]`} />}
      {title}
    </h2>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);
// --- End Helper Components ---

const RentalServiceDetailPage = () => {
  const params = useParams();
  const serviceId = params.serviceId as string;

  console.log("🔍 RentalServiceDetailPage: Loading service with ID:", serviceId);

  const { data: apiResponse, error, status } = useFetch<SingleServiceResponse>(serviceId ? `/api/services-main/${serviceId}` : null);

  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;
  
  console.log("🔍 RentalServiceDetailPage: API Response:", JSON.stringify(apiResponse));
  console.log("🔍 RentalServiceDetailPage: Status:", status);
  console.log("🔍 RentalServiceDetailPage: Error:", fetchError);

  // Get service data and ensure type safety with a fallback
  let serviceData: any = null;
  
  // Handle different response structures
  if (apiResponse) {
    if ('data' in apiResponse && apiResponse.data) {
      // Standard SingleServiceResponse structure
      serviceData = apiResponse.data;
    } else if (
      ('service_category' in apiResponse && apiResponse.service_category) || 
      ('type' in apiResponse && apiResponse.type)
    ) {
      // Direct service object response
      serviceData = apiResponse;
    }
  }
  
  console.log("🔍 RentalServiceDetailPage: Service Data:", JSON.stringify(serviceData));
  
  // If we have service data from the API, validate it's a rental service or manually add service_category
  let service: RentalService | undefined = undefined;
  
  if (serviceData) {
    if (serviceData.service_category === "rental") {
      // Already properly categorized
      service = serviceData as RentalService;
    } else if (serviceData.type && typeof serviceData.type === 'string' && serviceData.type.startsWith("rental")) {
      // Service exists but needs categorization
      service = {
        ...serviceData,
        service_category: "rental"
      } as RentalService;
    }
  }
  
  console.log("🔍 RentalServiceDetailPage: Processed Service:", service ? "Valid rental service" : "Invalid or non-rental service");

  if (isLoading) return <LoadingState />;
  if (fetchError || !service) {
    return <ErrorState message={fetchError?.message || apiResponse?.message || "Rental service not found or invalid type."} />;
  }

  // Parse amenities to get rental-specific data from specifics
  const parseAmenities = (service: RentalService) => {
    let rentalSpecifics = null;
    
    if (service.amenities) {
      // If amenities is a string (JSON), try to parse it
      if (typeof service.amenities === 'string') {
        try {
          const amenitiesData = JSON.parse(service.amenities);
          if (amenitiesData && amenitiesData.specifics && amenitiesData.specifics.rental) {
            rentalSpecifics = amenitiesData.specifics.rental;
          }
        } catch (e) {
          console.error("Failed to parse amenities JSON:", e);
        }
      }
    }
    
    return {
      item_type: rentalSpecifics?.item_type || service.item_type,
      rental_duration_options: Array.isArray(service.rental_duration_options) ? service.rental_duration_options : [],
      price_per_hour: rentalSpecifics?.price_per_hour || service.price_per_hour,
      price_per_day: rentalSpecifics?.price_per_day || service.price_per_day,
      deposit_amount: rentalSpecifics?.deposit?.amount || service.deposit_amount,
      pickup_location_options: Array.isArray(service.pickup_location_options) ? service.pickup_location_options : [],
      rental_terms: rentalSpecifics?.requirements?.details || service.rental_terms,
      unit: rentalSpecifics?.unit || null,
      price_details: service.price_details,
      price_numeric: service.price_numeric
    };
  };
  
  // Get rental-specific details from amenities or direct fields
  const rentalDetails = parseAmenities(service);

  // Get general amenities from amenities field
  const getGeneralAmenities = (service: RentalService) => {
    if (Array.isArray(service.amenities)) {
      return service.amenities;
    }
    
    if (typeof service.amenities === 'string') {
      try {
        const amenitiesData = JSON.parse(service.amenities);
        if (amenitiesData && Array.isArray(amenitiesData.general)) {
          return amenitiesData.general;
        }
      } catch (e) {
        console.error("Failed to parse amenities JSON for general amenities:", e);
      }
    }
    
    return [];
  };
  
  const generalAmenities = getGeneralAmenities(service);
  
  // Process and validate images
  const normalizeImageUrl = (url: string): string => {
    // Return placeholder if the URL is empty or doesn't look valid
    if (!url || url.trim() === '' || url === 'null' || url === 'undefined') {
      return "/images/placeholder_rental.jpg";
    }
    
    // If URL is a full URL, return it, otherwise check and fix relative paths
    if (url.startsWith('http')) {
      return url;
    }
    
    // Handle URLs that might be relative but missing leading slash
    if (!url.startsWith('/')) {
      return `/images/${url}`;
    }
    
    return url;
  };
  
  // Process main image with fallback
  const mainImageUrl = service.images && service.images.length > 0 && service.images[0] 
    ? normalizeImageUrl(service.images[0]) 
    : "/images/placeholder_rental.jpg";
  
  // Process gallery images, filtering out any invalid ones
  const validGalleryImages = service.images && service.images.length > 1 
    ? service.images.slice(1)
        .filter(img => img && img.trim() !== '' && img !== 'null' && img !== 'undefined')
        .map(img => normalizeImageUrl(img))
    : [];

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      <div className={`bg-white shadow-sm py-3 sticky top-0 z-40`}>
        <div className="container mx-auto px-4">
          <Link href="/services" className={`inline-flex items-center text-sm text-[${rentalColorDarker}] hover:text-[${rentalColor}] font-medium`}>
            <ChevronLeft size={20} className="mr-1" />
            Back to All Services
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">{service.name}</h1>
          <div className="flex flex-wrap items-center text-xs text-gray-600 gap-x-3 gap-y-1">
            <span className="flex items-center"><MapPin size={14} className={`mr-1 text-[${rentalColor}]`} /> {service.island_name}</span>
            {service.item_type && <span className="flex items-center"><ShoppingBag size={14} className={`mr-1 text-[${rentalColor}]`} /> {service.item_type}</span>}
            {service.rating !== null && (
              <span className="flex items-center">
                <Star size={14} className={`mr-1 text-yellow-400 fill-current`} /> {service.rating.toFixed(1)}/5.0
              </span>
            )}
          </div>
          {service.provider?.business_name && (
             <p className="text-xs text-gray-500 mt-1">Provided by: <span className="font-medium">{service.provider.business_name}</span></p>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-5 rounded-lg overflow-hidden shadow-lg relative aspect-[16/10]">
              <Image
                src={mainImageUrl}
                alt={`Main image for ${service.name}`}
                width={700}
                height={450}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Main image error, using placeholder");
                  e.currentTarget.src = "/images/placeholder_rental.jpg";
                  e.currentTarget.onerror = null; // Prevent infinite loop
                }}
                priority
                unoptimized={true} // Don't use Next.js image optimization
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Proper sizing instructions
                loading="eager" // Load immediately
              />
            </div>

            {validGalleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-6">
                {validGalleryImages.map((img, index) => (
                  <div key={index} className="rounded-md overflow-hidden shadow aspect-square relative">
                    <Image 
                      src={img} 
                      alt={`${service.name} gallery image ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        console.log("Gallery image error, using placeholder");
                        e.currentTarget.src = "/images/placeholder_service_thumb.jpg";
                        e.currentTarget.onerror = null; // Prevent infinite loop
                      }}
                      unoptimized={true} // Don't use Next.js image optimization
                      sizes="(max-width: 768px) 50vw, 25vw" // Proper sizing instructions
                      loading="lazy" // Lazy load gallery images
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white p-5 rounded-lg shadow-lg">
              <DetailSection title="Rental Overview" icon={Info}>
                <p className="text-sm text-gray-700 leading-relaxed">{service.description || "Detailed description not available."}</p>
              </DetailSection>

              <DetailSection title="Rental Details" icon={ShoppingBag}>
                <DetailItem label="Item Type" value={rentalDetails.item_type} icon={Tag} highlight />
                {rentalDetails.rental_duration_options && rentalDetails.rental_duration_options.length > 0 && (
                    <DetailItem label="Duration Options" value={rentalDetails.rental_duration_options.join(", ")} icon={Clock} />
                )}
                {rentalDetails.pickup_location_options && rentalDetails.pickup_location_options.length > 0 && (
                    <DetailItem label="Pickup Locations" value={rentalDetails.pickup_location_options.join(", ")} icon={MapPin} />
                )}
              </DetailSection>
              
              <DetailSection title="Pricing" icon={IndianRupee}>
                <DetailItem label="General Price" value={rentalDetails.price_details} highlight />
                {rentalDetails.price_per_hour && <DetailItem label="Price per Hour" value={`₹${rentalDetails.price_per_hour.toLocaleString("en-IN")}`} />}
                {rentalDetails.price_per_day && <DetailItem label="Price per Day" value={`₹${rentalDetails.price_per_day.toLocaleString("en-IN")}`} />}
                {rentalDetails.deposit_amount && <DetailItem label="Security Deposit" value={`₹${rentalDetails.deposit_amount.toLocaleString("en-IN")}`} icon={Archive} />}
              </DetailSection>

              {generalAmenities.length > 0 && (
                <DetailSection title="Features / Included" icon={CheckCircle}>
                  <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                    {generalAmenities.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}
              
              {rentalDetails.rental_terms && (
                <DetailSection title="Rental Terms" icon={ShieldCheck}>
                    <p className="text-sm text-gray-700 whitespace-pre-line">{rentalDetails.rental_terms}</p>
                </DetailSection>
              )}

              <DetailSection title="Availability & Policy" icon={CalendarDays} className="border-b-0 pb-0">
                <DetailItem label="Availability" value={service.availability_summary} />
                <DetailItem label="Cancellation Policy" value={service.cancellation_policy} />
              </DetailSection>
            </div>
          </div>

          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className={`sticky top-20 bg-white p-5 rounded-lg shadow-xl border border-gray-200`}>
              <p className="text-xl font-bold text-gray-900 mb-1">
                {rentalDetails.price_details ? rentalDetails.price_details : (rentalDetails.price_numeric ? `Approx. ₹${rentalDetails.price_numeric.toLocaleString("en-IN")}`: "Contact for Price")}
              </p>
              <p className="text-xs text-gray-500 mb-3">{rentalDetails.price_numeric ? "(indicative price)" : "(may vary based on specific needs)"}</p>
              
              <button
                type="button"
                style={{ backgroundColor: rentalColor, borderColor: rentalColorDarker }}
                className={`w-full text-white font-semibold py-2.5 px-4 rounded-md transition-all duration-200 shadow hover:shadow-md hover:opacity-90`}
                onClick={() => alert("Booking functionality to be implemented!")}
              >
                Book This Rental
              </button>
              <p className="text-xs text-gray-500 mt-2.5 text-center">Check availability and book now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalServiceDetailPage;

