// src/app/(main)/activities/[activityId]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import type { Activity } from "@/types/activity";
import type { ActivityService, SingleServiceResponse, BaseService } from "@/types/transport_rental";
import {
  Loader2,
  AlertTriangle,
  MapPin,
  Clock,
  Star,
  IndianRupee,
  Users,
  CalendarDays,
  ShieldCheck,
  Info,
  Sparkles,
  CheckCircle,
  XCircle,
  ChevronLeft,
  Navigation,
  Sun,
  Wind,
  Waves,
  BarChart3,
  UserPlus,
  HardHat,
  LifeBuoy
} from "lucide-react";

// Extended interface to handle additional fields that are missing from ActivityService
interface ExtendedActivityService extends ActivityService {
  location_details?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  what_to_bring?: string[] | null;
  included_services?: string[] | null;
  not_included_services?: string[] | null;
}

// --- Color Theme (consistent with activities list page) ---
const primaryColor = "#F59E0B"; // Amber-600
const primaryColorDarker = "#D97706"; // Amber-700
// --- End Color Theme ---

// --- Helper Components ---
const LoadingState = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <Loader2 className={`h-12 w-12 animate-spin text-[${primaryColor}] mx-auto mb-4`} />
    <p className={`text-xl font-semibold text-[${primaryColorDarker}]`}>Loading Activity Details...</p>
    <p className="text-gray-500">Please wait a moment.</p>
  </div>
);

const ErrorState = ({ message }: { message?: string }) => (
  <div className="container mx-auto px-4 py-12 text-center">
    <AlertTriangle className={`h-12 w-12 text-red-500 mx-auto mb-4`} />
    <p className="text-xl font-semibold text-red-600">Could Not Load Activity</p>
    <p className="text-gray-500">{message || "The activity details could not be retrieved. It might be unavailable or the link may be incorrect."}</p>
    <Link href="/activities" className={`mt-6 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[${primaryColor}] hover:bg-[${primaryColorDarker}] transition-colors`}>
      <ChevronLeft size={18} className="mr-2" /> Back to Activities
    </Link>
  </div>
);

interface DetailSectionProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}
const DetailSection: React.FC<DetailSectionProps> = ({ title, icon: Icon, children, className }) => (
  <div className={`py-6 border-b border-gray-200 ${className || ""}`}>
    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
      {Icon && <Icon size={22} className={`mr-3 text-[${primaryColorDarker}]`} />}
      {title}
    </h2>
    <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
      {children}
    </div>
  </div>
);

const ActivityDetailsPage = () => {
  const params = useParams();
  const activityId = params.activityId as string;

  console.log("🔍 ActivityDetailPage: Loading activity with ID:", activityId);

  // Use services-main endpoint which handles all service types consistently
  const { data: apiResponse, error, status } = useFetch<SingleServiceResponse>(activityId ? `/api/services-main/${activityId}` : null);

  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;
  
  console.log("🔍 ActivityDetailPage: API Response:", JSON.stringify(apiResponse));
  console.log("🔍 ActivityDetailPage: Status:", status);
  console.log("🔍 ActivityDetailPage: Error:", fetchError);

  // Get activity data with type safety fallback
  let serviceData: any = null;
  
  // Handle different response structures
  if (apiResponse) {
    if ('data' in apiResponse && apiResponse.data) {
      // Standard response structure
      serviceData = apiResponse.data;
    } else if (
      ('name' in apiResponse) || 
      ('type' in apiResponse && apiResponse.type)
    ) {
      // Direct service object response
      serviceData = apiResponse;
    }
  }
  
  console.log("🔍 ActivityDetailPage: Service Data:", JSON.stringify(serviceData));
  
  // Check if it's an activity (either by service_category or type field)
  let activity: ExtendedActivityService | undefined = undefined;
  
  if (serviceData) {
    if (serviceData.service_category === "activity" || 
        (serviceData.type && typeof serviceData.type === 'string' && serviceData.type.startsWith("activity"))) {
      activity = serviceData as ExtendedActivityService;
    }
  }
  
  console.log("🔍 ActivityDetailPage: Processed Activity:", activity ? "Valid" : "Invalid or non-activity service");

  if (isLoading) return <LoadingState />;
  if (fetchError || !activity) return <ErrorState message={fetchError?.message || apiResponse?.message || "Activity not found or invalid type."} />;

  // Get general amenities (separate from activity-specific details)
  const getGeneralAmenities = (activity: ExtendedActivityService): string[] => {
    // If amenities is undefined or null, return empty array
    if (!activity.amenities) return [];
    
    // If amenities is a string, try to parse it as JSON first
    if (typeof activity.amenities === 'string') {
      try {
        const amenitiesData = JSON.parse(activity.amenities);
        
        // Check if parsed data has general_amenities array
        if (amenitiesData && typeof amenitiesData === 'object' && 'general_amenities' in amenitiesData && 
            Array.isArray(amenitiesData.general_amenities)) {
          return amenitiesData.general_amenities;
        }
        
        // Check if parsed data is directly an array
        if (Array.isArray(amenitiesData)) {
          return amenitiesData.map(item => String(item));
        }
        
        // If we reach here, no valid array was found in the parsed JSON
        return [];
      } catch (e) {
        // JSON parsing failed, treat it as comma-separated string
        // We already checked above that activity.amenities is a string
        const amenitiesString = activity.amenities as string;
        return amenitiesString.split(',')
          .map((item: string) => item.trim())
          .filter(Boolean);
      }
    }
    
    // If amenities is already an array, return it after ensuring all items are strings
    if (Array.isArray(activity.amenities)) {
      return activity.amenities.map(item => String(item));
    }
    
    // Fallback for any other type
    return [];
  };

  // Process general amenities
  const generalAmenities = getGeneralAmenities(activity);

  // Process and validate images
  const normalizeImageUrl = (url: string): string => {
    // Return placeholder if the URL is empty or doesn't look valid
    if (!url || url.trim() === '' || url === 'null' || url === 'undefined') {
      return "/images/placeholder_activity_large.jpg";
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
  const mainImageUrl = activity.images && activity.images.length > 0 && activity.images[0] 
    ? normalizeImageUrl(activity.images[0]) 
    : "/images/placeholder_activity_large.jpg";
  
  // Process gallery images, filtering out any invalid ones
  const validGalleryImages = activity.images && activity.images.length > 1 
    ? activity.images.slice(1)
        .filter(img => img && img.trim() !== '' && img !== 'null' && img !== 'undefined')
        .map(img => normalizeImageUrl(img))
    : [];

  // Format duration properly
  const formattedDuration = activity.duration && activity.duration_unit
    ? `${activity.duration} ${activity.duration_unit}`
    : activity.duration 
      ? `${activity.duration} hours` 
      : null;

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      {/* Back to Activities Link */} 
      <div className={`bg-white shadow-sm py-3 sticky top-0 z-40`}>
        <div className="container mx-auto px-4">
            <Link href="/activities" className={`inline-flex items-center text-sm text-[${primaryColorDarker}] hover:text-[${primaryColor}] font-medium`}>
                <ChevronLeft size={20} className="mr-1" />
                Back to All Activities
            </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{activity.name}</h1>
          <div className="flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1">
            <span className="flex items-center"><MapPin size={16} className={`mr-1.5 text-[${primaryColor}]`} /> {activity.island_name}</span>
            {formattedDuration && <span className="flex items-center"><Clock size={16} className={`mr-1.5 text-[${primaryColor}]`} /> {formattedDuration}</span>}
            {activity.rating !== null && (
              <span className="flex items-center">
                <Star size={16} className={`mr-1 text-yellow-400 fill-current`} /> {activity.rating.toFixed(1)}/5.0
              </span>
            )}
            {activity.difficulty_level && (
              <span className="flex items-center">
                <BarChart3 size={16} className={`mr-1.5 text-[${primaryColor}]`} /> 
                {activity.difficulty_level.charAt(0).toUpperCase() + activity.difficulty_level.slice(1)} Difficulty
              </span>
            )}
          </div>
          {activity.provider?.business_name && (
             <p className="text-xs text-gray-500 mt-1">Offered by: <span className="font-medium">{activity.provider.business_name}</span></p>
          )}
        </div>

        {/* Layout: Image Gallery and Booking Sidebar */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Left Column: Image Gallery & Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg relative aspect-[16/10]">
              <Image
                src={mainImageUrl}
                alt={`Main image for ${activity.name}`}
                width={800}
                height={500}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Main image error, using placeholder");
                  e.currentTarget.src = "/images/placeholder_activity_large.jpg";
                  e.currentTarget.onerror = null; // Prevent infinite loop
                }}
                priority
                unoptimized={true} // Don't use Next.js image optimization
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Proper sizing instructions
                loading="eager" // Load immediately
              />
            </div>

            {/* Gallery Images (if any) */}
            {validGalleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {validGalleryImages.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md aspect-square relative">
                    <Image
                      src={img}
                      alt={`${activity.name} gallery image ${index + 1}`}
                      width={200}
                      height={200}
                      className="object-cover h-full w-full"
                      onError={(e) => {
                        console.log("Gallery image error, using placeholder");
                        e.currentTarget.src = "/images/placeholder_activity.jpg";
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

            {/* Detailed Sections */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <DetailSection title="About this Activity" icon={Info}>
                <p>{activity.description || "Detailed description not available."}</p>
              </DetailSection>

              {/* Activity Specific Details */}
              <DetailSection title="Activity Details" icon={Sparkles}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {formattedDuration && (
                    <div className="flex items-start">
                      <Clock size={18} className={`mr-2 text-[${primaryColor}] mt-0.5 flex-shrink-0`} />
                      <div>
                        <h4 className="font-medium text-gray-800">Duration</h4>
                        <p className="text-sm text-gray-600">{formattedDuration}</p>
                      </div>
                    </div>
                  )}
                  
                  {(activity.group_size_min || activity.group_size_max) && (
                    <div className="flex items-start">
                      <Users size={18} className={`mr-2 text-[${primaryColor}] mt-0.5 flex-shrink-0`} />
                      <div>
                        <h4 className="font-medium text-gray-800">Group Size</h4>
                        <p className="text-sm text-gray-600">
                          {activity.group_size_min && activity.group_size_max 
                            ? `${activity.group_size_min} to ${activity.group_size_max} people`
                            : activity.group_size_min 
                              ? `Minimum ${activity.group_size_min} people` 
                              : `Maximum ${activity.group_size_max} people`}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activity.difficulty_level && (
                    <div className="flex items-start">
                      <BarChart3 size={18} className={`mr-2 text-[${primaryColor}] mt-0.5 flex-shrink-0`} />
                      <div>
                        <h4 className="font-medium text-gray-800">Difficulty Level</h4>
                        <p className="text-sm text-gray-600">{activity.difficulty_level.charAt(0).toUpperCase() + activity.difficulty_level.slice(1)}</p>
                      </div>
                    </div>
                  )}
                  
                  {activity.guide_required && (
                    <div className="flex items-start">
                      <UserPlus size={18} className={`mr-2 text-[${primaryColor}] mt-0.5 flex-shrink-0`} />
                      <div>
                        <h4 className="font-medium text-gray-800">Guide</h4>
                        <p className="text-sm text-gray-600">Professional guide included</p>
                      </div>
                    </div>
                  )}
                </div>
              </DetailSection>

              {/* Equipment Provided */}
              {activity.equipment_provided && activity.equipment_provided.length > 0 && (
                <DetailSection title="Equipment Provided" icon={LifeBuoy}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.equipment_provided.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {/* Safety Requirements */}
              {activity.safety_requirements && (
                <DetailSection title="Safety Requirements" icon={HardHat}>
                  <p>{activity.safety_requirements}</p>
                </DetailSection>
              )}

              {/* General Amenities */}
              {generalAmenities.length > 0 && (
                <DetailSection title="Amenities & Features" icon={Sparkles}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {generalAmenities.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}
              
              {activity.location_details && (
                <DetailSection title="Location & Meeting Point" icon={Navigation}>
                    <p>{activity.location_details || ""}</p>
                    {/* Basic Map Link - Consider embedding a map later if needed */}
                    {activity.latitude && activity.longitude && (
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${activity.latitude},${activity.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-2 inline-flex items-center text-sm text-[${primaryColorDarker}] hover:text-[${primaryColor}] font-medium`}
                        >
                           View on Map <MapPin size={14} className="ml-1.5"/>
                        </a>
                    )}
                </DetailSection>
              )}

              {activity.what_to_bring && Array.isArray(activity.what_to_bring) && activity.what_to_bring.length > 0 && (
                <DetailSection title="What to Bring" icon={Sun}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.what_to_bring.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.included_services && activity.included_services.length > 0 && (
                <DetailSection title="What's Included" icon={CheckCircle}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.included_services.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.not_included_services && activity.not_included_services.length > 0 && (
                <DetailSection title="What's Not Included" icon={XCircle}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.not_included_services.map((item: string, i: number) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.availability_summary && (
                <DetailSection title="Availability" icon={CalendarDays}>
                  <p>{activity.availability_summary}</p>
                </DetailSection>
              )}

              {activity.cancellation_policy && (
                <DetailSection title="Cancellation Policy" icon={ShieldCheck} className="border-b-0 pb-0">
                  <p>{activity.cancellation_policy}</p>
                </DetailSection>
              )}
            </div>
          </div>

          {/* Right Column: Booking Sidebar (Sticky) */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-20 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {activity.price_details ? activity.price_details : (activity.price_numeric ? `₹${activity.price_numeric.toLocaleString("en-IN")}`: "Contact for Price")}
                <span className="text-sm font-normal text-gray-500 ml-1">per person</span>
              </p>
              
              {/* Placeholder for date/time selection and guest count */}
              <div className="my-4 space-y-3">
                <div>
                    <label htmlFor="activity-date" className="block text-xs font-medium text-gray-700">Select Date</label>
                    <input type="date" id="activity-date" name="activity-date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[${primaryColor}] focus:border-[${primaryColor}] sm:text-sm"/>
                </div>
                <div>
                    <label htmlFor="activity-guests" className="block text-xs font-medium text-gray-700">Number of Guests</label>
                    <input type="number" id="activity-guests" name="activity-guests" defaultValue="1" min="1" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[${primaryColor}] focus:border-[${primaryColor}] sm:text-sm"/>
                </div>
              </div>

              <button
                type="button"
                className={`w-full bg-gradient-to-r from-[${primaryColor}] to-[${primaryColorDarker}] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
                onClick={() => alert("Booking functionality to be implemented!")}
              >
                Book This Activity
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">Secure your spot! This activity is popular.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;

