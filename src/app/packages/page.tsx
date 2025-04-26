// Path: ./src/app/packages/page.tsx
'use client';
export const dynamic = 'force-dynamic'
import React, { useState, useEffect, Suspense, useCallback, useMemo } from 'react'; // Added useMemo
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Clock, Star, ArrowRight, Filter, X, Loader2, AlertTriangle, Package, SlidersHorizontal, DollarSign, RefreshCw, MessageSquare, HelpCircle, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFetch } from '@/hooks/useFetch';

// --- Define interfaces ---

// Package data structure from API
interface Package {
  id: number;
  name: string;
  description: string | null;
  duration: string;
  base_price: number;
  max_people: number | null;
  created_by: number;
  is_active: number;
  itinerary: string | null; 
  included_services: string | null; 
  images: string | null; 
}

// Island data structure from /api/destinations
interface Island {
  id: number;
  name: string;
  // Add other island properties if needed by filters/UI
}

// API response structure for destinations
interface GetDestinationsApiResponse {
  success: boolean;
  data: Island[]; // Expecting an array of islands
  message?: string;
}


// API response structure for paginated packages
interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
interface GetPackagesApiResponse {
  packages: Package[];
  pagination: PaginationInfo;
}

// Updated Filters State (removed activities)
interface FiltersState {
  destination: string; // Now corresponds to Island Name/ID ideally
  duration: string;
  priceRange: string;
  // activities: string[]; // Removed
}
// --- End Interfaces ---

// --- LoadingSpinner Component ---
const LoadingSpinner = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex flex-col justify-center items-center min-h-[60vh] text-center py-20">
    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
    <span className="text-lg font-medium text-gray-700">{message}</span>
  </div>
);
// --- End LoadingSpinner ---

// --- Package Card Component (Simplified - No hardcoded destinations/activities) ---
interface PackageCardProps {
  pkg: Package;
}
const PackageCard = ({ pkg }: PackageCardProps) => {
  const imageUrl = pkg.images?.split(',')[0]?.trim() || '/images/placeholder.jpg';

  // We cannot reliably display specific destinations/activities here
  // without significant client-side parsing or API changes.
  // Showing only data directly available in the pkg object.

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 h-full">
      <div className="h-52 w-full relative flex-shrink-0">
        <Image
          src={imageUrl}
          alt={pkg.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          onError={(e) => { if (e.currentTarget.src !== '/images/placeholder.jpg') e.currentTarget.src = '/images/placeholder.jpg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded-full shadow-md">
          ₹{pkg.base_price.toLocaleString('en-IN')}
        </div>
        <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
          <Clock size={12} className="mr-1" />
          {pkg.duration}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold leading-tight mb-2 text-gray-800">{pkg.name}</h3>

        {/* Removed hardcoded destinations/activities */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow"> {/* Increased line-clamp */}
          {pkg.description || 'Explore the beauty of the Andaman Islands with this package. Click View Details for the full itinerary.'}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <span className="text-gray-600 text-sm">
            From <span className="font-semibold text-blue-600">₹{pkg.base_price.toLocaleString('en-IN')}</span>
          </span>
          <Link
            href={`/packages/${pkg.id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
          >
            View Details
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
// --- End Package Card ---

// --- Main Component Logic ---
function PackagesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for filters
  const [filters, setFilters] = useState<FiltersState>({
    destination: searchParams.get('destination') || '',
    duration: searchParams.get('duration') || '',
    priceRange: searchParams.get('priceRange') || '',
    // activities: searchParams.get('activities')?.split(',').filter(Boolean) || [] // Removed activities
  });
  const [showFilters, setShowFilters] = useState(false);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const [itemsPerPage] = useState(9);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo | null>(null);

  // State for packages
  const [packages, setPackages] = useState<Package[]>([]);

  // --- Fetch Destinations for Filter ---
  const { data: destinationsResponse, status: destinationsStatus } =
    useFetch<GetDestinationsApiResponse>('/api/destinations'); // Fetch destinations
  const [destinationsList, setDestinationsList] = useState<Island[]>([]);

  useEffect(() => {
    if (destinationsStatus === 'success' && destinationsResponse?.data) {
      setDestinationsList(destinationsResponse.data);
    }
  }, [destinationsStatus, destinationsResponse]);
  // --- End Fetch Destinations ---

  // Fetch packages data
  const apiUrl = `/api/packages?page=${currentPage}&limit=${itemsPerPage}`;
  const { data: packagesApiResponse, error: packagesError, status: packagesStatus } =
    useFetch<GetPackagesApiResponse>(apiUrl);

  // Update packages state
  useEffect(() => {
    if (packagesStatus === 'success' && packagesApiResponse) {
      setPackages(packagesApiResponse.packages || []);
      setPaginationInfo(packagesApiResponse.pagination || null);
    } else if (packagesStatus === 'error') {
      setPackages([]);
      setPaginationInfo(null);
    }
  }, [packagesStatus, packagesApiResponse]);

  // Apply filters client-side (Destination filter still keyword based)
  const filteredPackages = useMemo(() => {
    let tempFiltered = [...packages];

    // Destination keyword filter (improve when API supports ID filtering)
    if (filters.destination) {
      tempFiltered = tempFiltered.filter(pkg =>
        (pkg.name + (pkg.description || '')).toLowerCase().includes(filters.destination.toLowerCase())
      );
    }
    // Duration filter
    if (filters.duration) {
      tempFiltered = tempFiltered.filter(pkg => {
        const durationMatch = pkg.duration.match(/^(\d+)\s*D/i);
        if (!durationMatch) return false;
        const pkgDays = parseInt(durationMatch[1], 10);
        const filterDaysStr = filters.duration.replace('+', '');
        const filterDays = parseInt(filterDaysStr, 10);
        if (isNaN(pkgDays) || isNaN(filterDays)) return false;
        return filters.duration.includes('+') ? pkgDays >= filterDays : pkgDays === filterDays;
      });
    }
    // Price range filter
    if (filters.priceRange) {
      const range = filters.priceRange.split('-').map(Number);
      const min = range[0];
      const max = range.length > 1 ? range[1] : Infinity;
      if (!isNaN(min)) {
        tempFiltered = tempFiltered.filter(pkg => pkg.base_price >= min && pkg.base_price <= max);
      } else {
        const singleVal = Number(filters.priceRange);
        if (!isNaN(singleVal)) tempFiltered = tempFiltered.filter(pkg => pkg.base_price >= singleVal);
      }
    }
    // Activity filter removed

    return tempFiltered;
    // Depends on filters and the currently fetched packages
  }, [filters, packages]);

  // --- Handlers ---
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    // Reset to page 1 when filters change for consistency
    handlePageChange(1, true); // Pass true to prevent URL push if already on page 1
  };

  // Removed handleActivityToggle

  const handleClearFilters = () => {
    setFilters({
      destination: '',
      duration: '',
      priceRange: '',
    });
    // Reset to page 1
    handlePageChange(1, true);
  };

  // Handler for changing page
  const handlePageChange = useCallback((newPage: number, calledByFilter = false) => {
    if (newPage < 1 || (paginationInfo && newPage > paginationInfo.totalPages) || (newPage === currentPage && !calledByFilter)) {
      return;
    }
    setCurrentPage(newPage);

    // Only push history state if the page actually changes
    if (newPage !== currentPage || calledByFilter) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set('page', newPage.toString());
      // Add current filters to URL? (Optional)
      // if (filters.destination) current.set('destination', filters.destination);
      // ... etc ...
      router.push(`/packages?${current.toString()}`, { scroll: false }); // Prevent scroll jump
      // Scroll manually after navigation
      setTimeout(() => window.scrollTo({ top: 400, behavior: 'smooth' }), 100);
    }

  }, [paginationInfo, currentPage, router, searchParams]); // Removed filters from deps for now
  // --- End Handlers ---

  return (
    <>
      {/* --- Hero Section --- */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-72 md:h-96">
        {/* ... hero content (backgrounds, text, button) ... */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image src="/images/packages-hero.jpg" alt="Andaman tour packages - Desktop" fill className="object-cover hidden md:block" priority />
          <Image src="/images/packages-hero-mobile.jpg" alt="Andaman tour packages - Mobile" fill className="object-cover block md:hidden" priority />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 md:mb-5 drop-shadow-lg">
            Our Andaman Packages
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-95 drop-shadow-md">
            Find the perfect curated experience for your island getaway.
          </p>
          <Link href="#packages-grid" scroll={true} className="mt-6 bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Packages
          </Link>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto"> <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path> </svg>
        </div>
      </div>

      <div id="packages-grid" className="bg-gray-50 min-h-screen py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <Package className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Find Your Perfect Package</h2>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-6 text-center">
            <button onClick={() => setShowFilters(!showFilters)} className="...">
              <Filter size={16} className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* --- Filters Section (Modified) --- */}
          <div className={`bg-white rounded-2xl shadow-lg p-5 md:p-7 mb-10 border border-gray-100 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center"><SlidersHorizontal className="text-blue-600 mr-2" size={20} /> Filter Packages</h2>
              <button className="md:hidden ..." onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            {/* Updated Filter Grid (Removed Activities Column implicitly by reducing cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5"> {/* Adjusted grid cols */}
              {/* Destination (Dynamic Options) */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1.5">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                  <select
                    id="destination"
                    name="destination"
                    value={filters.destination}
                    onChange={handleFilterChange}
                    className="pl-9 pr-8 py-2.5 w-full text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-blue-300 transition-colors appearance-none disabled:bg-gray-100"
                    disabled={destinationsStatus === 'loading'}
                  >
                    <option value="">
                      {destinationsStatus === 'loading' ? 'Loading...' : 'All Destinations'}
                    </option>
                    {destinationsList.map(island => (
                      <option key={island.id} value={island.name}> {/* Use name for value for now */}
                        {island.name}
                      </option>
                    ))}
                  </select>
                  {destinationsStatus === 'error' && <p className="text-xs text-red-500 mt-1">Could not load destinations.</p>}
                </div>
                <p className="text-xs text-gray-400 mt-1 italic">Note: Filters by keyword match for now.</p>
              </div>
              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                  <select id="duration" name="duration" value={filters.duration} onChange={handleFilterChange} className="pl-9 pr-8 py-2.5 w-full text-sm border border-gray-300 rounded-xl ... appearance-none">
                    <option value="">Any Duration</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                    <option value="6">6 Days</option>
                    <option value="7">7 Days</option>
                    <option value="8+">8+ Days</option>
                  </select>
                </div>
              </div>
              {/* Price Range */}
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1.5">Price Range</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 pointer-events-none" size={16} />
                  <select id="priceRange" name="priceRange" value={filters.priceRange} onChange={handleFilterChange} className="pl-9 pr-8 py-2.5 w-full text-sm border border-gray-300 rounded-xl ... appearance-none">
                    <option value="">Any Price</option>
                    <option value="0-15000">Under ₹15k</option>
                    <option value="15000-25000">₹15k - ₹25k</option>
                    <option value="25000-40000">₹25k - ₹40k</option>
                    <option value="40000">₹40k+</option>
                  </select>
                </div>
              </div>
              {/* Activities Filter Section Removed */}
            </div>
            {/* Clear Filters Button */}
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
              <button onClick={handleClearFilters} className="..." disabled={!filters.destination && !filters.duration && !filters.priceRange}>
                <RefreshCw size={14} className="mr-1" /> Clear Filters
              </button>
            </div>
          </div>
          {/* --- End Filters Section --- */}

          {/* --- Display Area --- */}
          {packagesStatus === 'loading' ? (
            <LoadingSpinner message="Loading Packages..." />
          ) : packagesStatus === 'error' ? (
            <div className="text-center py-12 px-6 bg-red-50 ...">
              <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-700 font-medium">Could not load packages.</p>
              <p className="text-red-600 text-sm mt-1">{packagesError?.message || "An unknown error occurred."}</p>
              <button onClick={() => window.location.reload()} className="..."> Try Again </button>
            </div>
          ) : (
            <>
              {filteredPackages.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredPackages.map((pkg: Package) => ( // Added type annotation
                      <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                  </div>
                  {/* Pagination Controls */}
                  {paginationInfo && paginationInfo.totalPages > 1 && (
                    <div className="flex justify-center items-center mt-10 md:mt-14 space-x-3">
                      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="..." aria-label="Previous Page"> <ChevronLeft size={20} /> </button>
                      <span className="text-sm text-gray-700 font-medium"> Page {paginationInfo.currentPage} of {paginationInfo.totalPages} </span>
                      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === paginationInfo.totalPages} className="..." aria-label="Next Page"> <ChevronRight size={20} /> </button>
                    </div>
                  )}
                </>
              ) : (
                // No Results Found
                <div className="text-center py-16 bg-white rounded-2xl ...">
                  <Image src="/images/no-results.svg" alt="No packages found" width={150} height={150} className="mx-auto mb-6 opacity-80" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">No packages found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or check back later.</p>
                  <button onClick={handleClearFilters} className="..."> Clear All Filters </button>
                </div>
              )}
            </>
          )}
          {/* --- End Display Area --- */}


          {/* --- Custom Package CTA (Still relevant) --- */}
          <div className="mt-16 md:mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-10 text-center ...">
            {/* ... CTA content ... */}
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-5">Can't find what you're looking for?</h2>
              <p className="text-blue-100 mb-6 md:mb-8 max-w-2xl mx-auto"> Let us create a custom package tailored to your preferences, budget, and travel dates. </p>
              <Link href="/custom-package" className="..."> Create Custom Package </Link>
            </div>
          </div>

          {/* Testimonials and FAQ Sections Removed */}

        </div>
      </div>
    </>
  );
}

// Wrap with Suspense
export default function PackagesPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Page..." />}>
      <PackagesContent />
    </Suspense>
  );
}