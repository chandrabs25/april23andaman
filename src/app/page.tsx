// Path: ./src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Calendar, Users, Loader2, AlertTriangle,Check, Camera } from 'lucide-react'; // Import Loader2, AlertTriangle
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFetch } from '@/hooks/useFetch'; // Import useFetch

// --- Define Interfaces (consistent with API responses) ---
interface Destination {
  id: number;
  name: string;
  description: string | null;
  images: string | null; 
}
interface Activity {
  id: number;
  name: string;
  description: string | null;
  images: string | null; // Comma-separated URLs or single URL
  island_name?: string; // Optional, may come from API
}
interface GetDestinationsApiResponse {
  success: boolean; data: Destination[]; message?: string;
}
interface GetActivitiesApiResponse {
  success: boolean; data: Activity[]; message?: string;
}
// --- End Interfaces ---

export default function Home() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState('');

  // --- Fetch Destinations ---
  const {
      data: destinationsResponse,
      error: destinationsError,
      status: destinationsStatus
  } = useFetch<Destination[]>('/api/destinations?limit=4'); // Fetch first 4
  const featuredDestinationsData = destinationsResponse || [];
  console.log('Destinations:', featuredDestinationsData);

  // --- Fetch Activities ---
  const {
      data: activitiesResponse,
      error: activitiesError,
      status: activitiesStatus
  } = useFetch<Activity[]>('/api/activities?limit=4'); // Fetch first 4
  const popularActivitiesData = activitiesResponse || [];
  console.log('Activities:', popularActivitiesData);
  // --- End Data Fetching ---

  // Helper to get the first image URL
  const getImageUrl = (images: string | null): string => {
      return images?.split(',')[0]?.trim() || '/images/placeholder.jpg';
  };

  // Handle Search (remains the same)
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination); 
    if (startDate) params.append('startDate', startDate.toISOString().split('T')[0]);
    if (endDate) params.append('endDate', endDate.toISOString().split('T')[0]);
    if (travelers) params.append('travelers', travelers);

    
    const router = (window as any).__nextRouter; 
    if (router) {
        router.push(`/search-results?${params.toString()}`);
    } else {
        // Fallback if router isn't available (less ideal)
        window.location.href = `/search-results?${params.toString()}`;
        console.warn("Using window.location.href for navigation. Consider importing and using useRouter from 'next/navigation'.");
    }
    // --- End FIX ---
  };


  return (
    <div className="flex flex-col min-h-screen">

      {/* --- Hero Section Container with enhanced styling --- */}
      <section className="relative">
        {/* Image Background Layer */}
        <div className="relative h-[350px] sm:h-[450px] md:h-[600px] w-full">
          {/* Enhanced Overlays for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
          {/* Images... */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/hero-min.webp" alt="Andaman Islands scenery - Desktop" fill className="object-cover hidden md:block" priority />
            <Image src="/images/hero-min.webp" alt="Andaman Islands scenery - Mobile" fill className="object-cover block md:hidden" priority />
          </div>
          {/* Text Content with enhanced styling */}
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20 pt-16 pb-8 md:pb-0">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center mb-3 md:mb-6 drop-shadow-lg">
              Discover Paradise in Andaman
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white text-center max-w-2xl drop-shadow-md">
              Explore pristine beaches, vibrant coral reefs, and unforgettable experiences.
            </p>
            {/* Added CTA button in hero section */}
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Plan Your Dream Vacation
            </button>
          </div>
        </div>
        {/* Search Form with enhanced styling */}
        
      </section> {/* End Hero Section Container */}

      {/* --- Featured Destinations with enhanced styling --- */}
      <section className="pt-20 pb-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <MapPin className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Featured Destinations</h2>
          </div>
          {/* Handle Loading State with enhanced styling */}
          {destinationsStatus === 'loading' && (
            <div className="flex justify-center items-center py-12 bg-white rounded-2xl shadow-md">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-3 text-gray-600 font-medium">Loading Destinations...</span>
            </div>
          )}
          {/* Handle Error State with enhanced styling */}
          {destinationsStatus === 'error' && (
            <div className="text-center py-12 px-6 bg-red-50 border border-red-200 rounded-2xl shadow-md">
              <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600">Could not load destinations. {destinationsError?.message}</p>
            </div>
          )}
          {/* Render Data with enhanced styling */}
          {destinationsStatus === 'success' && featuredDestinationsData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredDestinationsData.map((destination) => (
                <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                  <div className="h-52 w-full relative">
                    <Image src={getImageUrl(destination.images)} alt={destination.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')} />
                    {/* Added overlay gradient for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {/* Added location badge */}
                    <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                      <MapPin size={12} className="mr-1" />
                      { 'Andaman'}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{destination.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {destination.description || 'Discover this amazing place.'}
                    </p>
                    <Link href={`/destinations/${destination.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group">
                      Explore More
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Handle No Data with enhanced styling */}
          {destinationsStatus === 'success' && featuredDestinationsData.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md text-gray-500">
              No featured destinations available right now
            </div>
          )}
          {/* View All Button with enhanced styling */}
          <div className="text-center mt-12 md:mt-14">
            <Link href="/destinations" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
      {/* --- End Featured Destinations --- */}

      {/* --- Popular Activities with enhanced styling --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Popular Activities</h2>
          </div>
          {/* Handle Loading State with enhanced styling */}
          {activitiesStatus === 'loading' && (
            <div className="flex justify-center items-center py-12 bg-white rounded-2xl shadow-md">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-3 text-gray-600 font-medium">Loading Activities...</span>
            </div>
          )}
          {/* Handle Error State with enhanced styling */}
          {activitiesStatus === 'error' && (
            <div className="text-center py-12 px-6 bg-red-50 border border-red-200 rounded-2xl shadow-md">
              <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-3" />
              <p className="text-red-600">Could not load activities. {activitiesError?.message}</p>
            </div>
          )}
          {/* Render Data with enhanced styling */}
          {activitiesStatus === 'success' && popularActivitiesData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {popularActivitiesData.map((activity) => (
                <div key={activity.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                  <div className="h-52 w-full relative">
                    <Image src={getImageUrl(activity.images)} alt={activity.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')} />
                    {/* Added overlay gradient for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {/* Added activity type badge */}
                    <div className="absolute bottom-3 left-3 bg-white/90 text-blue-600 text-xs font-medium py-1 px-2 rounded-full flex items-center">
                      {activity.island_name }
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{activity.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {activity.description || 'Experience this exciting activity.'}
                    </p>
                    <Link href={`/activities/${activity.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group">
                      Learn More
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Handle No Data with enhanced styling */}
          {activitiesStatus === 'success' && popularActivitiesData.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-md text-gray-500">
              No popular activities available right now.
            </div>
          )}
          {/* View All Button with enhanced styling */}
          <div className="text-center mt-12 md:mt-14">
            <Link href="/activities" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Explore All Activities
            </Link>
          </div>
        </div>
      </section>
      {/* --- End Popular Activities --- */}

      {/* --- Why Choose Us with enhanced styling --- */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <Check className="text-blue-600 mr-3 flex-shrink-0" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 with enhanced styling */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Expert Local Knowledge</h3>
              <p className="text-gray-600">Authentic experiences curated by local experts who know every hidden gem in the Andaman Islands.</p>
            </div>

            {/* Card 2 with enhanced styling */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">Best Price Guarantee</h3>
              <p className="text-gray-600">Competitive, transparent pricing with no hidden fees. We match any lower price you find elsewhere.</p>
            </div>

            {/* Card 3 with enhanced styling */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-800">24/7 Customer Support</h3>
              <p className="text-gray-600">Dedicated support available round the clock to assist with any questions or concerns during your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Call to Action with enhanced styling --- */}
      <section className="py-16 md:py-20 bg-blue-700 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-white"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Ready for Your Andaman Adventure?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Book your dream vacation today and experience the magic of the Andaman Islands. Special discounts available for early bookings!
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
      </section>

      {/* --- Testimonials Section (New) --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10 md:mb-14">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What Our Travelers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">John Doe</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The snorkeling experience at Havelock Island was incredible! Our guide knew exactly where to find the most colorful coral reefs. Will definitely book again."</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"From booking to return, everything was perfectly organized. The beachfront accommodation exceeded our expectations and the staff was incredibly helpful."</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Robert Johnson</h4>
                  <div className="flex text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The sunset cruise around Neil Island was the highlight of our trip. The crew was professional and the views were breathtaking. Worth every penny!"</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              Read More Reviews
              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Newsletter Section (New) --- */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">Subscribe to our newsletter for travel tips, exclusive offers, and Andaman inspiration.</p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>

  );
}