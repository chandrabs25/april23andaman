// Path: .\src\app\destinations\page.tsx
'use client';
export const dynamic = 'force-dynamic'
import React, { useState, useEffect, Suspense } from 'react'; // Import Suspense
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, AlertTriangle, MapPin,Package,Clock,Star,Info,Calendar,Plane,FileText, Wifi, Camera } from 'lucide-react'; // Import icons
import { useFetch } from '@/hooks/useFetch'; // Import useFetch

// --- Define Interfaces (consistent with API response) ---
interface Destination {
  id: number; // Island ID
  name: string;
  description: string | null;
  permit_required: number;
  permit_details: string | null;
  coordinates: string | null;
  attractions: string | null;
  activities: string | null;
  images: string | null; // Comma-separated URLs or single URL
  // Add derived/formatted fields if needed
  image_url?: string; // Derived from images
  location?: string; // Can add a default or fetch if needed
}

// Define the overall API response structure for GET /api/destinations
interface GetDestinationsApiResponse {
  success: boolean;
  data: Destination[]; // Expect an array of islands/destinations
  message?: string;
}
// --- End Interfaces ---


// --- LoadingSpinner Component ---
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    <span className="ml-2 text-lg">Loading destinations...</span>
  </div>
);
// --- End LoadingSpinner ---


// --- DestinationCard Component ---
interface DestinationCardProps {
    destination: Destination;
}
const DestinationCard = ({ destination }: DestinationCardProps) => {
    const imageUrl = destination.images?.split(',')[0]?.trim() || '/images/placeholder.jpg';
    const locationDisplay = "Andaman Islands"; // Default location

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
        <div className="h-52 sm:h-60 w-full relative flex-shrink-0">
          <Image
            src={imageUrl}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')} // Fallback
          />
          {/* Added overlay gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {/* Added location badge */}
          <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
            <MapPin size={12} className="mr-1" />
            {locationDisplay}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{destination.name}</h2>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
            {destination.description || 'Explore this beautiful destination.'}
          </p>
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
            {/* Added attractions count */}
            <div className="text-xs text-gray-500 flex items-center">
              <Camera size={14} className="mr-1 text-blue-500" />
              {5} Attractions
            </div>
            <Link
              href={`/destinations/${destination.id}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group"
            >
              Explore More
              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

    );
};
// --- End DestinationCard Component ---


// --- Main Component Logic ---
function DestinationsContent() {
  // Fetch data using the hook
  const { data: apiResponse, error, status } = useFetch<Destination[]>('/api/destinations');

  // Extract destinations, default to empty array
  const destinations = apiResponse || [];

  return (
    <>
      {/* --- Hero Section with enhanced styling --- */}
      <div className="relative bg-blue-900 h-72 md:h-96">
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/80 z-10"></div>
        <div className="absolute inset-0 z-0">
          <Image src="/images/destinations-hero.jpg" alt="Panoramic view of Andaman Islands - Desktop" fill className="object-cover hidden md:block" priority />
          <Image src="/images/destinations-hero-mobile.jpg" alt="Beautiful Andaman beach - Mobile" fill className="object-cover block md:hidden" priority />
        </div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-3 md:mb-5 drop-shadow-lg">
            Explore Andaman Destinations
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl opacity-95 drop-shadow-md">
            Discover paradise islands with pristine beaches, vibrant coral reefs, and lush forests
          </p>
          {/* Added CTA button */}
          <button className="mt-6 bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Packages
          </button>
        </div>

        {/* Added decorative wave element */}
        <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* --- Destinations List with enhanced styling --- */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Added section header with icon */}
        <div className="flex items-center justify-center mb-10 md:mb-14">
          <MapPin className="text-blue-600 mr-3 flex-shrink-0" size={24} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Destinations</h2>
        </div>

        {/* Loading state with enhanced styling */}
        {status === 'loading' ? (
          <div className="flex justify-center items-center py-12 bg-white rounded-2xl shadow-md">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-3 text-gray-600 font-medium">Loading Destinations...</span>
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-12 px-6 bg-red-50 border border-red-200 rounded-2xl shadow-md">
            <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-medium">Could not load destinations.</p>
            <p className="text-red-600 text-sm mt-1">{error?.message || "An unknown error occurred."}</p>
            {/* Added retry button */}
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2 bg-white text-red-600 border border-red-300 rounded-full hover:bg-red-50 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          destinations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <Image
                src="/images/no-results.svg"
                alt="No destinations found"
                width={150}
                height={150}
                className="mx-auto mb-6 opacity-80"
              />
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">No Destinations Found</h2>
              <p className="text-gray-600 mb-6">Check back later or explore our packages!</p>
              <Link href="/packages" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Browse Packages
              </Link>
            </div>
          )
        )}
      </div>

      {/* Added Featured Packages section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <Package className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Packages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Package Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
              <div className="h-52 w-full relative">
                <Image
                  src="/images/package-1.jpg"
                  alt="Havelock Island Package"
                  fill
                  className="object-cover"
                />
                {/* Added overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Added price badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded-full">
                  ₹12,999
                </div>
                {/* Added duration badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" />
                  5 Days / 4 Nights
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Havelock Island Explorer</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  Experience the best of Havelock with pristine beaches, water activities, and luxury accommodations.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-xs text-gray-600">(48 reviews)</span>
                  </div>
                  <Link href="/packages/havelock-explorer" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group">
                    View Details
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Package Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
              <div className="h-52 w-full relative">
                <Image
                  src="/images/package-2.jpg"
                  alt="Neil Island Package"
                  fill
                  className="object-cover"
                />
                {/* Added overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Added price badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded-full">
                  ₹15,499
                </div>
                {/* Added duration badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" />
                  6 Days / 5 Nights
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Island Hopping Adventure</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  Visit multiple islands including Havelock, Neil, and Ross with guided tours and premium stays.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current opacity-30" />
                    <span className="ml-1 text-xs text-gray-600">(36 reviews)</span>
                  </div>
                  <Link href="/packages/island-hopping" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group">
                    View Details
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Package Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
              <div className="h-52 w-full relative">
                <Image
                  src="/images/package-3.jpg"
                  alt="Luxury Andaman Package"
                  fill
                  className="object-cover"
                />
                {/* Added overlay gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                {/* Added price badge */}
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-sm font-bold py-1.5 px-3 rounded-full">
                  ₹24,999
                </div>
                {/* Added duration badge */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" />
                  7 Days / 6 Nights
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">Luxury Andaman Retreat</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  Premium 5-star accommodations, private beach access, exclusive water activities, and gourmet dining.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-xs text-gray-600">(22 reviews)</span>
                  </div>
                  <Link href="/packages/luxury-retreat" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group">
                    View Details
                    <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12 md:mt-14">
            <Link href="/packages" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View All Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Added Travel Tips section */}
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <Info className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Travel Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Tip 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Best Time to Visit</h3>
              <p className="text-gray-600 text-sm">October to May is ideal with clear skies and calm seas, perfect for water activities and island exploration.</p>
            </div>

            {/* Tip 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plane className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Getting There</h3>
              <p className="text-gray-600 text-sm">Direct flights available from major Indian cities to Port Blair. Book in advance for better rates.</p>
            </div>

            {/* Tip 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Permits Required</h3>
              <p className="text-gray-600 text-sm">Indian tourists need a photo ID. Foreign tourists require a Restricted Area Permit (RAP) issued on arrival.</p>
            </div>

            {/* Tip 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Wifi className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Connectivity</h3>
              <p className="text-gray-600 text-sm">Internet connectivity can be limited on remote islands. Download maps and essential information beforehand.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/travel-guide" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              View Complete Travel Guide
              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Added Call to Action section */}
      <div className="bg-blue-700 py-16 md:py-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Ready to Explore Andaman?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Book your dream vacation today and experience the magic of these pristine islands. Special discounts available for early bookings!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Book Now
              </button>
              <button className="bg-transparent text-white border-2 border-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </>


  );
}

// Wrap the main content component with Suspense
export default function DestinationsPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <DestinationsContent />
        </Suspense>
    );
}