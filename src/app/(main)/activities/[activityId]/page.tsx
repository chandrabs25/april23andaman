// src/app/(main)/activities/[activityId]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import type { Activity } from "@/types/activity";
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
  Waves
} from "lucide-react";

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

  const { data: apiResponse, error, status } = useFetch<{ success: boolean; data: Activity | null; message?: string }>(activityId ? `/api/activities/${activityId}` : null);

  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;
  const activity = apiResponse?.data;

  if (isLoading) return <LoadingState />;
  if (fetchError || !activity) return <ErrorState message={fetchError?.message || apiResponse?.message} />;

  const mainImage = activity.images && activity.images.length > 0 ? activity.images[0] : "/images/placeholder_activity_large.jpg";
  const galleryImages = activity.images?.slice(1) || [];

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
            {activity.duration && <span className="flex items-center"><Clock size={16} className={`mr-1.5 text-[${primaryColor}]`} /> {activity.duration}</span>}
            {activity.rating !== null && (
              <span className="flex items-center">
                <Star size={16} className={`mr-1 text-yellow-400 fill-current`} /> {activity.rating.toFixed(1)}/5.0
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
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={`Main image for ${activity.name}`}
                width={800}
                height={500}
                className="w-full h-auto object-cover aspect-[16/10]"
                onError={(e) => (e.currentTarget.src = "/images/placeholder_activity_large.jpg")}
                priority
              />
            </div>

            {/* Gallery Images (if any) */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                {galleryImages.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md aspect-square">
                    <Image
                      src={img}
                      alt={`${activity.name} gallery image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "/images/placeholder_activity.jpg")}
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

              {activity.amenities && activity.amenities.length > 0 && (
                <DetailSection title="Amenities & Features" icon={Sparkles}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.amenities.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}
              
              {activity.location_details && (
                <DetailSection title="Location & Meeting Point" icon={Navigation}>
                    <p>{activity.location_details}</p>
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

              {activity.what_to_bring && activity.what_to_bring.length > 0 && (
                <DetailSection title="What to Bring" icon={Sun}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.what_to_bring.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.included_services && activity.included_services.length > 0 && (
                <DetailSection title="What’s Included" icon={CheckCircle}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.included_services.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.not_included_services && activity.not_included_services.length > 0 && (
                <DetailSection title="What’s Not Included" icon={XCircle}>
                  <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    {activity.not_included_services.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </DetailSection>
              )}

              {activity.availability && (
                <DetailSection title="Availability" icon={CalendarDays}>
                  <p>{activity.availability}</p>
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
                <IndianRupee size={20} className="inline-block mb-1 mr-0.5" />
                {activity.price.toLocaleString("en-IN")}
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
                // className={`w-full bg-[${primaryColor}] hover:bg-[${primaryColorDarker}] text-black font-bold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg`}
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

