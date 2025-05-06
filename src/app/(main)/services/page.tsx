// src/app/(main)/services/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  AlertTriangle,
  MapPin,
  Clock,
  Star,
  Filter,
  Search,
  Car,
  Bike,
  Ship,
  ShoppingBag, // For rentals
  IndianRupee,
  ArrowRight,
  Users,
  ListFilter,
  ShieldCheck,
  Tag
} from "lucide-react";
import { useFetch } from "@/hooks/useFetch";
import type {
  CategorizedService,
  TransportService,
  RentalService,
  PaginatedServicesResponse
} from "@/types/transport_rental";

// --- Color Theme ---
const primaryColor = "#10B981"; // Emerald-500 (New color for this page)
const primaryColorDarker = "#059669"; // Emerald-600
const primaryColorLighter = "#6EE7B7"; // Emerald-300
const primaryColorLightestBg = "#ECFDF5"; // Emerald-50

const transportColor = "#3B82F6"; // Blue-500 for transport
const rentalColor = "#F59E0B";    // Amber-500 for rental
// --- End Color Theme ---

// --- Helper Components ---
const LoadingSpinner = ({ text }: { text: string }) => (
  <div className="flex flex-col justify-center items-center py-16">
    <Loader2 className={`h-10 w-10 animate-spin text-[${primaryColor}] mb-4`} />
    <span className={`text-lg font-medium text-[${primaryColorDarker}]`}>{text}</span>
  </div>
);

const ErrorDisplay = ({ message }: { message?: string }) => (
  <div className="flex flex-col justify-center items-center py-16 text-center">
    <AlertTriangle className={`h-10 w-10 text-red-500 mb-4`} />
    <span className={`text-lg font-medium text-red-600`}>Oops! Something went wrong.</span>
    <p className="text-sm text-gray-600 mt-2">{message || "Failed to load services."}</p>
  </div>
);

interface ServiceCardProps {
  service: CategorizedService;
  categoryColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, categoryColor }) => {
  const imageUrl = service.images && service.images.length > 0 ? service.images[0] : "/images/placeholder_service.jpg";
  const rating = service.rating || null;
  const priceDisplay = service.price_details || (service.price_numeric ? `${service.price_numeric.toLocaleString("en-IN")} (approx)` : "Price on request");

  let detailPath = "";
  if (service.service_category === "transport") {
    detailPath = `/services/transport/${service.id}`;
  } else if (service.service_category === "rental") {
    detailPath = `/services/rental/${service.id}`;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-200">
      <div className="h-48 w-full relative flex-shrink-0">
        <Image
          src={imageUrl}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => (e.currentTarget.src = "/images/placeholder_service.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div style={{ backgroundColor: categoryColor }} className={`absolute top-3 right-3 text-white text-xs font-semibold py-1 px-2.5 rounded-full shadow-md flex items-center`}>
          {service.service_category === "transport" ? <Car size={12} className="mr-1" /> : <ShoppingBag size={12} className="mr-1" />}
          {service.type.replace(/^(transport_|rental_)/, '').replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-md font-semibold leading-tight text-gray-800 line-clamp-2 mb-1">{service.name}</h3>
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin size={12} className="mr-1 flex-shrink-0" style={{ color: categoryColor }} />
          <span>{service.island_name}</span>
          {service.provider?.business_name && <span className="mx-1">|</span>}
          {service.provider?.business_name && <span className="line-clamp-1">By: {service.provider.business_name}</span>}
        </div>

        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
          {service.description || "Reliable service for your travel needs."}
        </p>

        <div className="flex justify-between items-center mb-3 text-xs">
            <div className="flex items-center font-semibold" style={{ color: categoryColor }}>
                <IndianRupee size={14} className="mr-0.5" /> {priceDisplay}
            </div>
            {rating !== null && (
                <div className="flex items-center text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
                </div>
            )}
        </div>
        
        {detailPath && (
          <Link
            href={detailPath}
            style={{ backgroundColor: categoryColor, borderColor: categoryColor }}
            className={`mt-auto block w-full text-center text-white font-medium py-2 px-4 rounded-lg text-sm transition-opacity hover:opacity-90 shadow-md`}
          >
            View Details <ArrowRight size={14} className="ml-1 inline-block"/>
          </Link>
        )}
      </div>
    </div>
  );
};

// --- Main Component Logic ---
function ServicesMainPageContent() {
  const [filters, setFilters] = useState({
    search: "",
    islandId: "",
    // Add more specific filters if needed, e.g., vehicleType, itemType
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilters(filters), 500);
    return () => clearTimeout(handler);
  }, [filters]);

  const apiUrl = useCallback(() => {
    const params = new URLSearchParams();
    // For this page, we always fetch both transport and rental, then separate client-side
    // Or, make two API calls if preferred for larger datasets / more complex filtering per category
    params.append("category", "transport,rental"); 
    if (debouncedFilters.search) params.append("search", debouncedFilters.search);
    if (debouncedFilters.islandId) params.append("islandId", debouncedFilters.islandId);
    return `/api/services-main?${params.toString()}`;
  }, [debouncedFilters]);

  const { data: apiResponse, error, status } = useFetch<PaginatedServicesResponse>(apiUrl());

  const allServices = apiResponse?.data || [];
  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;

  const transportServices = allServices.filter(s => s.service_category === "transport") as TransportService[];
  const rentalServices = allServices.filter(s => s.service_category === "rental") as RentalService[];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const islandOptions = [
      { value: "", label: "All Islands" },
      { value: "1", label: "Havelock Island (Swaraj Dweep)" },
      { value: "2", label: "Neil Island (Shaheed Dweep)" },
      { value: "3", label: "Port Blair" },
  ];

  const renderServiceSection = (title: string, services: CategorizedService[], icon: React.ElementType, color: string) => (
    <section className="mb-12">
      <div className="flex items-center mb-6">
        {React.createElement(icon, { size: 28, className: "mr-3", style: { color: color } })}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      {isLoading && <LoadingSpinner text={`Loading ${title.toLowerCase()}...`} />}
      {fetchError && !isLoading && <ErrorDisplay message={`Could not load ${title.toLowerCase()}.`} />}
      {!isLoading && !fetchError && services.length === 0 && (
        <p className="text-gray-600 text-center py-8">No {title.toLowerCase()} found matching your criteria.</p>
      )}
      {!isLoading && !fetchError && services.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map(service => (
            <ServiceCard key={`${service.service_category}-${service.id}`} service={service} categoryColor={color} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <>
      <div style={{ background: `linear-gradient(to right, ${primaryColorLighter}, ${primaryColor})` }} className={`h-60 md:h-72`}>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
            Transport & Rental Services
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl opacity-90 drop-shadow-md">
            Find reliable transport and convenient rentals for your Andaman adventure.
          </p>
        </div>
      </div>

      <div className={`bg-[${primaryColorLightestBg}] py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          {/* Filters Section */}
          <div className={`bg-white rounded-xl shadow-lg p-5 md:p-6 mb-10 border border-gray-200`}>
            <div className="flex items-center mb-4">
                <ListFilter size={20} className="mr-2" style={{color: primaryColorDarker}}/>
                <h3 className="text-lg font-semibold text-gray-700">Filter Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
              <div>
                <label htmlFor="search" className="block text-xs font-medium text-gray-600 mb-1">Search by Name</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" id="search" name="search" value={filters.search} onChange={handleFilterChange} placeholder="e.g., Airport Cab, Scooter Rental" className={`w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[${primaryColor}] focus:border-[${primaryColor}] text-sm`} />
                </div>
              </div>
              <div>
                <label htmlFor="islandId" className="block text-xs font-medium text-gray-600 mb-1">Island</label>
                <select id="islandId" name="islandId" value={filters.islandId} onChange={handleFilterChange} className={`w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[${primaryColor}] focus:border-[${primaryColor}] text-sm`}>
                  {islandOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Transport Services Section */}
          {renderServiceSection("Transport Services", transportServices, Car, transportColor)}

          {/* Rental Services Section */}
          {renderServiceSection("Rental Services", rentalServices, ShoppingBag, rentalColor)}
          
        </div>
      </div>
    </>
  );
}

export default function ServicesMainPage() {
  return <ServicesMainPageContent />;
}

