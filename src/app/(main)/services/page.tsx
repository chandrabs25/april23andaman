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
  ActivityService,
  PaginatedServicesResponse,
  SingleServiceResponse
} from "@/types/transport_rental";

// --- Color Theme ---
const primaryColor = "#10B981"; // Emerald-500 (New color for this page)
const primaryColorDarker = "#059669"; // Emerald-600
const primaryColorLighter = "#6EE7B7"; // Emerald-300
const primaryColorLightestBg = "#ECFDF5"; // Emerald-50

const transportColor = "#3B82F6"; // Blue-500 for transport
const rentalColor = "#F59E0B";    // Amber-500 for rental
const activityColor = "#EC4899";  // Pink-500 for activities
// --- End Color Theme ---

// --- Helper Components ---
const LoadingSpinner = ({ text }: { text: string }) => (
  <div className="flex flex-col justify-center items-center py-16">
    <Loader2 className={`h-10 w-10 animate-spin text-[${primaryColor}] mb-4`} />
    <span className={`text-lg font-medium text-[${primaryColorDarker}]`}>{text}</span>
  </div>
);

const ErrorDisplay = ({ message, onRetry }: { message?: string, onRetry?: () => void }) => (
  <div className="flex flex-col justify-center items-center py-16 text-center">
    <AlertTriangle className={`h-10 w-10 text-red-500 mb-4`} />
    <span className={`text-lg font-medium text-red-600`}>Oops! Something went wrong.</span>
    <p className="text-sm text-gray-600 mt-2">{message || "Failed to load services."}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

interface ServiceCardProps {
  service: CategorizedService;
  categoryColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, categoryColor }) => {
  const [imgError, setImgError] = useState(false);
  const imageUrl = !imgError && service.images && service.images.length > 0 
    ? service.images[0] 
    : "/images/placeholder_service.jpg";
  const rating = service.rating || null;
  
  // Parse amenities to get specifics data
  const getSpecificsData = (service: CategorizedService) => {
    // Check if amenities has specifics data in a JSON structure
    if (service.amenities && typeof service.amenities === 'string') {
      try {
        const amenitiesData = JSON.parse(service.amenities);
        if (amenitiesData && amenitiesData.specifics) {
          return amenitiesData.specifics;
        }
      } catch (e) {
        console.error("Failed to parse amenities JSON:", e);
      }
    }
    return null;
  };

  // Get price display based on service category and specifics
  const getPriceDisplay = (service: CategorizedService) => {
    // First check if price_details is available (direct field)
    if (service.price_details) {
      return service.price_details;
    }

    // Then check for specifics data
    const specifics = getSpecificsData(service);
    
    if (service.service_category === "transport") {
      const transportSpecifics = specifics?.transport;
      if (transportSpecifics) {
        if (transportSpecifics.price_per_trip) {
          return `₹${transportSpecifics.price_per_trip.toLocaleString("en-IN")} per trip`;
        } else if (transportSpecifics.price_per_km) {
          return `₹${transportSpecifics.price_per_km.toLocaleString("en-IN")} per km`;
        }
      }
    } else if (service.service_category === "rental") {
      const rentalSpecifics = specifics?.rental;
      if (rentalSpecifics && rentalSpecifics.unit) {
        return `₹${service.price_numeric?.toLocaleString("en-IN") || ""} ${rentalSpecifics.unit}`;
      }
    }
    
    // Fallback to price_numeric
    return service.price_numeric ? `₹${service.price_numeric.toLocaleString("en-IN")} (approx)` : "Price on request";
  };
  
  const priceDisplay = getPriceDisplay(service);

  // Handle image error
  const handleImageError = () => {
    console.log("Image failed to load:", imageUrl);
    setImgError(true);
  };

  let detailPath = "";
  if (service.service_category === "transport") {
    detailPath = `/services/transport/${service.id}`;
  } else if (service.service_category === "rental") {
    detailPath = `/services/rental/${service.id}`;
  } else if (service.service_category === "activity") {
    detailPath = `/activities/${service.id}`;
  }

  // Get additional display details based on service type
  const getAdditionalDetails = () => {
    const specifics = getSpecificsData(service);
    
    if (service.service_category === "transport") {
      const transportSpecifics = specifics?.transport;
      if (transportSpecifics) {
        return (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            {transportSpecifics.vehicle_type && (
              <div className="flex items-center mr-3">
                <Car size={12} className="mr-1 flex-shrink-0" style={{ color: categoryColor }} />
                <span>{transportSpecifics.vehicle_type}</span>
              </div>
            )}
            {transportSpecifics.capacity_passengers && (
              <div className="flex items-center">
                <Users size={12} className="mr-1 flex-shrink-0" style={{ color: categoryColor }} />
                <span>{transportSpecifics.capacity_passengers} passengers</span>
              </div>
            )}
          </div>
        );
      }
    } else if (service.service_category === "rental") {
      const rentalSpecifics = specifics?.rental;
      return (
        <div className="flex items-center text-xs text-gray-500 mb-2">
          {service.item_type && (
            <div className="flex items-center mr-3">
              <ShoppingBag size={12} className="mr-1 flex-shrink-0" style={{ color: categoryColor }} />
              <span>{service.item_type}</span>
            </div>
          )}
          {rentalSpecifics?.unit && (
            <div className="flex items-center">
              <Clock size={12} className="mr-1 flex-shrink-0" style={{ color: categoryColor }} />
              <span>{rentalSpecifics.unit}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-200">
      <div className="h-48 w-full relative flex-shrink-0">
        <Image
          src={imageUrl}
          alt={service.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={handleImageError}
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div style={{ backgroundColor: categoryColor }} className={`absolute top-3 right-3 text-white text-xs font-semibold py-1 px-2.5 rounded-full shadow-md flex items-center`}>
          {service.service_category === "transport" ? <Car size={12} className="mr-1" /> : service.service_category === "rental" ? <ShoppingBag size={12} className="mr-1" /> : <Tag size={12} className="mr-1" />}
          {(service.type || "").replace(/^(transport_|rental_|activity_)/, '').replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
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

        {getAdditionalDetails()}

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
  const [forceRefetch, setForceRefetch] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedFilters(filters), 500);
    return () => clearTimeout(handler);
  }, [filters]);

  // Single API URL for all service types
  const apiUrl = useCallback(() => {
    const params = new URLSearchParams();
    // Fetch all three types of services
    params.append("category", "transport,rental,activity"); 
    if (debouncedFilters.search) params.append("search", debouncedFilters.search);
    if (debouncedFilters.islandId) params.append("islandId", debouncedFilters.islandId);
    return `/api/services-main?${params.toString()}`;
  }, [debouncedFilters]);

  // Fetch all services from services-main
  const { 
    data: apiResponse, 
    error, 
    status 
  } = useFetch<PaginatedServicesResponse | CategorizedService[]>(apiUrl() + (forceRefetch ? `&_cache=${forceRefetch}` : ''));
  
  // Log raw API response to debug its structure
  console.log("🔍 Raw API response:", apiResponse);

  // Function to manually trigger a refetch of data
  const refetchData = useCallback(() => {
    setForceRefetch(prev => prev + 1);
  }, []);

  // Get all services from the response - handle both possible response formats
  let allServices = Array.isArray(apiResponse) 
    ? apiResponse  // Direct array of services
    : (apiResponse?.data || []); // PaginatedServicesResponse format
  
  // Ensure all services have their service_category property set based on their type
  allServices = allServices.map(service => {
    // Use type assertion to work with the service object
    const svc = service as any;
    if (!svc.service_category) {
      if (svc.type?.startsWith('transport')) {
        return { ...svc, service_category: 'transport' };
      } else if (svc.type?.startsWith('rental')) {
        return { ...svc, service_category: 'rental' };
      } else if (svc.type?.startsWith('activity')) {
        return { ...svc, service_category: 'activity' };
      }
    }
    return svc;
  }) as CategorizedService[];
  
  console.log("🔍 All services from API:", JSON.stringify(allServices).substring(0, 500) + "...");
  
  const isLoading = status === "loading";
  const fetchError = status === "error" ? error : null;

  // Filter services by type with robust type checking
  const transportServices = allServices
    .filter(s => s && typeof s === 'object' && s.service_category === "transport")
    .map(s => s as TransportService);
    
  const rentalServices = allServices
    .filter(s => s && typeof s === 'object' && s.service_category === "rental")
    .map(s => s as RentalService);
    
  const activityServices = allServices
    .filter(s => s && typeof s === 'object' && s.service_category === "activity")
    .map(s => s as ActivityService);
  
  console.log("🔍 Services page data:", { 
    status,
    isLoading,
    hasError: !!fetchError,
    allServicesCount: allServices.length,
    transportCount: transportServices.length,
    rentalCount: rentalServices.length,
    activityCount: activityServices.length
  });
  
  if (allServices.length > 0) {
    console.log("🔍 First service:", JSON.stringify(allServices[0], null, 2));
    console.log("🔍 Service categories in raw data:", allServices.map(s => s.service_category || 'missing'));
  }
  
  if (activityServices.length > 0) {
    console.log("🔍 First activity:", JSON.stringify(activityServices[0], null, 2));
  } else {
    console.log("🔍 No activities found. Sample service for debugging:", 
      allServices.length > 0 ? JSON.stringify(allServices[0], null, 2) : "No services available");
  }

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
      {fetchError && !isLoading && (
        <ErrorDisplay 
          message={`Could not load ${title.toLowerCase()}. ${fetchError.message}`} 
          onRetry={() => refetchData()}
        />
      )}
      {!isLoading && !fetchError && services.length === 0 && (
        <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-100">
          <p className="text-gray-600">No {title.toLowerCase()} found matching your criteria.</p>
        </div>
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
            Services & Activities
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl opacity-90 drop-shadow-md">
            Discover reliable transport, convenient rentals, and exciting activities for your perfect Andaman adventure.
          </p>
        </div>
      </div>

      <div className={`bg-[${primaryColorLightestBg}] py-10 md:py-16`}>
        <div className="container mx-auto px-4">
          {/* Overall status indicator */}
          {isLoading && (
            <div className="text-center mb-8">
              <LoadingSpinner text="Loading all services..." />
            </div>
          )}
          
          {fetchError && !isLoading && allServices.length === 0 && (
            <div className="mb-8">
              <ErrorDisplay
                message={`Failed to load services. ${fetchError.message}`}
                onRetry={refetchData}
              />
            </div>
          )}

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

          {/* Show a message when there are no services at all after filtering */}
          {!isLoading && !fetchError && allServices.length === 0 && (
            <div className="text-center py-10 bg-white rounded-xl shadow mb-8">
              <p className="text-lg text-gray-700">No services found matching your search criteria.</p>
              <button 
                onClick={() => setFilters({ search: "", islandId: "" })}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Transport Services Section */}
          {renderServiceSection("Transport Services", transportServices, Car, transportColor)}

          {/* Rental Services Section */}
          {renderServiceSection("Rental Services", rentalServices, ShoppingBag, rentalColor)}
          
          {/* Activity Services Section */}
          {renderServiceSection("Activity Services", activityServices, Tag, activityColor)}
          
        </div>
      </div>
    </>
  );
}

export default function ServicesMainPage() {
  return <ServicesMainPageContent />;
}

