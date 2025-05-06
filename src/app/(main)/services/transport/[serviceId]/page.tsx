// src/app/(main)/services/transport/[serviceId]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useFetch } from "@/hooks/useFetch";
import type { TransportService, SingleServiceResponse } from "@/types/transport_rental";
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
  CheckCircle,
  XCircle,
  ChevronLeft,
  Car,
  Route as RouteIcon,
  DollarSign,
  UserCheck
} from "lucide-react";

// --- Color Theme ---
const transportColor = "#3B82F6"; // Blue-500
const transportColorDarker = "#2563EB"; // Blue-600
// --- End Color Theme ---

// --- Helper Components (can be shared) ---
const LoadingState = () => (
  <div className="container mx-auto px-4 py-12 text-center">
    <Loader2 className={`h-12 w-12 animate-spin text-[${transportColor}] mx-auto mb-4`} />
    <p className={`text-xl font-semibold text-[${transportColorDarker}]`}>Loading Transport Service Details...</p>
    <p className="text-gray-500">Please wait a moment.</p>
  </div>
);

const ErrorState = ({ message }: { message?: string }) => (
  <div className="container mx-auto px-4 py-12 text-center">
    <AlertTriangle className={`h-12 w-12 text-red-500 mx-auto mb-4`} />
    <p className="text-xl font-semibold text-red-600">Could Not Load Service</p>
    <p className="text-gray-500">{message || "The service details could not be retrieved."}</p>
    <Link href="/services" className={`mt-6 inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[${transportColor}] hover:bg-[${transportColorDarker}] transition-colors`}>
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
      {Icon && <Icon size={18} className={`mr-2.5 mt-0.5 flex-shrink-0 ${highlight ? "text-[${transportColorDarker}]" : "text-gray-500" }`} />}
      <span className={`text-sm font-medium ${highlight ? "text-[${transportColorDarker}]" : "text-gray-600" } w-36 md:w-48 flex-shrink-0`}>{label}:</span>
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
      {Icon && <Icon size={20} className={`mr-2.5 text-[${transportColorDarker}]`} />}
      {title}
    </h2>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);
// --- End Helper Components ---

const TransportServiceDetailPage = () => {
  const params = useParams();
  const serviceId = params.serviceId as string;

  const { data: apiResponse, error, status } = useFetch<SingleServiceResponse>(serviceId ? `/api/services-main/${serviceId}` : null);

  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;
  const service = apiResponse?.data as TransportService | undefined;

  if (isLoading) return <LoadingState />;
  if (fetchError || !service || service.service_category !== "transport") {
    return <ErrorState message={fetchError?.message || apiResponse?.message || "Transport service not found or invalid type."} />;
  }

  const mainImage = service.images && service.images.length > 0 ? service.images[0] : "/images/placeholder_transport.jpg";
  const galleryImages = service.images?.slice(1) || [];

  return (
    <div className={`bg-gray-50 min-h-screen`}>
      <div className={`bg-white shadow-sm py-3 sticky top-0 z-40`}>
        <div className="container mx-auto px-4">
          <Link href="/services" className={`inline-flex items-center text-sm text-[${transportColorDarker}] hover:text-[${transportColor}] font-medium`}>
            <ChevronLeft size={20} className="mr-1" />
            Back to All Services
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">{service.name}</h1>
          <div className="flex flex-wrap items-center text-xs text-gray-600 gap-x-3 gap-y-1">
            <span className="flex items-center"><MapPin size={14} className={`mr-1 text-[${transportColor}]`} /> {service.island_name}</span>
            {service.vehicle_type && <span className="flex items-center"><Car size={14} className={`mr-1 text-[${transportColor}]`} /> {service.vehicle_type}</span>}
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
            <div className="mb-5 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={`Main image for ${service.name}`}
                width={700}
                height={450}
                className="w-full h-auto object-cover aspect-[16/10]"
                onError={(e) => (e.currentTarget.src = "/images/placeholder_transport.jpg")}
                priority
              />
            </div>

            {galleryImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 mb-6">
                {galleryImages.map((img, index) => (
                  <div key={index} className="rounded-md overflow-hidden shadow aspect-square">
                    <Image src={img} alt={`${service.name} gallery image ${index + 1}`} width={150} height={150} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "/images/placeholder_service_thumb.jpg")} />
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white p-5 rounded-lg shadow-lg">
              <DetailSection title="Service Overview" icon={Info}>
                <p className="text-sm text-gray-700 leading-relaxed">{service.description || "Detailed description not available."}</p>
              </DetailSection>

              <DetailSection title="Transport Details" icon={Car}>
                <DetailItem label="Vehicle Type" value={service.vehicle_type} icon={Car} highlight />
                <DetailItem label="Passenger Capacity" value={service.capacity_passengers ? `${service.capacity_passengers} passengers` : null} icon={Users} />
                <DetailItem label="Route / Service Area" value={service.route_details} icon={RouteIcon} />
                <DetailItem label="Driver Included" value={service.driver_included ? "Yes" : (service.driver_included === false ? "No" : "N/A")} icon={UserCheck} />
              </DetailSection>
              
              <DetailSection title="Pricing" icon={DollarSign}>
                <DetailItem label="General Price" value={service.price_details} highlight />
                {service.price_per_km && <DetailItem label="Price per KM" value={`₹${service.price_per_km.toLocaleString("en-IN")}`} />}
                {service.price_per_trip && <DetailItem label="Price per Trip" value={`₹${service.price_per_trip.toLocaleString("en-IN")}`} />}
              </DetailSection>

              {service.amenities && service.amenities.length > 0 && (
                <DetailSection title="Features & Amenities" icon={CheckCircle}>
                  <ul className="list-disc list-inside text-sm text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-x-3">
                    {service.amenities.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
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
                {service.price_details ? service.price_details : (service.price_numeric ? `Approx. ₹${service.price_numeric.toLocaleString("en-IN")}`: "Contact for Price")}
              </p>
              <p className="text-xs text-gray-500 mb-3">{service.price_numeric ? "(indicative price)" : "(may vary based on specific needs)"}</p>
              
              <button
                type="button"
                style={{ backgroundColor: transportColor, borderColor: transportColorDarker }}
                className={`w-full text-white font-semibold py-2.5 px-4 rounded-md transition-all duration-200 shadow hover:shadow-md hover:opacity-90`}
                onClick={() => alert("Booking functionality to be implemented!")}
              >
                Book This Transport
              </button>
              <p className="text-xs text-gray-500 mt-2.5 text-center">Secure your ride in advance!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportServiceDetailPage;

