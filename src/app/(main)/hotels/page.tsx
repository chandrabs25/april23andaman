"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { useFetch } from "@/hooks/useFetch";
import type { Hotel, Room, PaginatedHotelsResponse } from "@/types/hotel";
import {
  Loader2, AlertTriangle, MapPin, Star, ChevronLeft, Users, IndianRupee, ListChecks, Search, Filter as FilterIcon, BedDouble, Wifi, ParkingCircle, Utensils, Briefcase, Building, ChevronRight, XCircle, Heart, DollarSign, Calendar, Clock, ChevronDown, CreditCard, Info, ExternalLink, MessageSquare, Share2, ThumbsUp, ThumbsDown, Award, CheckCircle, X, Phone, Mail, Globe
} from "lucide-react";

const ITEMS_PER_PAGE = 9;

const HotelsPage = () => {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedLocationFilter, setDebouncedLocationFilter] = useState(locationFilter);

  const [retryHotelsToken, setRetryHotelsToken] = useState(0);
  const [retrySelectedHotelToken, setRetrySelectedHotelToken] = useState(0);

  // --- Define Common Styles (from sample page) ---
  const primaryButtonBg = 'bg-blue-600'; // Updated to blue from screenshot
  const primaryButtonHoverBg = 'bg-blue-700'; // Updated to blue from screenshot
  const primaryButtonText = 'text-white';

  const secondaryButtonBg = 'bg-white';
  const secondaryButtonHoverBg = 'bg-gray-100';
  const secondaryButtonText = 'text-gray-700';
  const secondaryButtonBorder = 'border border-gray-300';

  const inputBaseStyle = `w-full p-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`; // Updated focus color
  const labelBaseStyle = `block text-sm font-medium text-gray-700 mb-1`;

  const cardBaseStyle = `bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 flex flex-col h-full`; // Slightly updated shadow and border
  const cardImageContainerStyle = "h-48 sm:h-52 w-full relative flex-shrink-0";
  const cardContentStyle = "p-4 flex flex-col flex-grow";
  const cardTitleStyle = `text-lg font-semibold mb-1 text-gray-800 line-clamp-2`;
  const buttonPrimaryStyle = `inline-flex items-center justify-center ${primaryButtonBg} hover:${primaryButtonHoverBg} ${primaryButtonText} font-medium py-2.5 px-5 rounded-md transition-all duration-300 shadow-sm hover:shadow-md`; // Updated padding and shadow
  const buttonSecondaryStyle = `inline-flex items-center justify-center ${secondaryButtonBg} hover:${secondaryButtonHoverBg} ${secondaryButtonText} ${secondaryButtonBorder} font-medium py-2 px-4 rounded-md transition-all duration-300`; // Updated padding

  const loadingErrorBaseStyle = "text-center py-10 px-4 rounded-lg shadow-md";
  const neutralIconColor = 'text-gray-500';
  const sectionPadding = 'py-6 md:py-10';
  const neutralBorderLight = 'border-gray-200';
  const neutralText = 'text-gray-800';
  const neutralTextLight = 'text-gray-600';
  const successText = 'text-green-600';
  const successIconColor = 'text-green-500';
  const sectionHeadingStyle = 'text-2xl font-semibold text-gray-800'; // Updated style
  const errorBg = 'bg-red-50';
  const errorBorder = 'border-red-200';
  const errorText = 'text-red-700';
  const errorIconColor = 'text-red-500';
  const neutralBg = 'bg-gray-50'; // Lighter gray

  const loadingIndicator = (
    <div className={`flex justify-center items-center ${loadingErrorBaseStyle} bg-white min-h-[300px]`}>
      <Loader2 className={`h-8 w-8 animate-spin ${neutralIconColor}`} />
      <span className={`ml-3 ${neutralText} font-medium text-base`}>Loading...</span>
    </div>
  );

  const errorIndicator = (message: string | undefined, onRetry?: () => void) => (
    <div className={`${loadingErrorBaseStyle} ${errorBg} ${errorBorder} min-h-[300px]`}>
      <AlertTriangle className={`h-8 w-8 ${errorIconColor} mx-auto mb-3`} />
      <p className={`${errorText} font-semibold text-base`}>Could not load data.</p>
      <p className={`${errorText} text-sm mt-1`}>{message || 'Please try again later.'}</p>
      {onRetry &&
        <button onClick={onRetry} className={`mt-4 px-4 py-2 bg-red-100 ${errorText} rounded-md hover:bg-red-200 transition-colors font-medium text-sm`}>
          Try Again
        </button>
      }
    </div>
  );

  const noDataIndicator = (itemType: string, message?: string) => (
    <div className={`${loadingErrorBaseStyle} bg-white ${neutralTextLight} flex flex-col items-center min-h-[300px]`}>
      <div className={`w-16 h-16 ${neutralBg} rounded-full flex items-center justify-center mb-4`}>
        <Building className="h-8 w-8 text-gray-400" />
      </div>
      <p className={`${neutralText} font-medium text-base`}>No {itemType} found.</p>
      <p className="text-gray-500 text-sm mt-1">{message || 'Please check back soon or try different filters.'}</p>
    </div>
  );

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedSearchTerm(searchTerm), 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedLocationFilter(locationFilter), 500);
    return () => clearTimeout(timerId);
  }, [locationFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedLocationFilter, minRating]);

  const getHotelsListUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", ITEMS_PER_PAGE.toString());
    if (debouncedSearchTerm) params.append("name", debouncedSearchTerm);
    if (debouncedLocationFilter) params.append("location", debouncedLocationFilter);
    if (minRating > 0) params.append("min_rating", minRating.toString());
    params.append("_retry", retryHotelsToken.toString());
    return `/api/hotels?${params.toString()}`;
  }, [currentPage, debouncedSearchTerm, debouncedLocationFilter, minRating, retryHotelsToken]);

  const {
    data: hotelsResponse,
    error: hotelsError,
    isLoading: isLoadingHotels,
  } = useFetch<Hotel[]>(getHotelsListUrl());

  const hotelsList = hotelsResponse || [];
  const totalHotels = hotelsList.length; // This will be incorrect if API doesn't return all items for length calculation
  // User confirmed data handling is fixed, so assuming this is intended or API returns all for now.
  const totalPages = hotelsList.length > 0 ? Math.ceil(hotelsList.length / ITEMS_PER_PAGE) : 1;

  const selectedHotelApiUrl = selectedHotelId ? `/api/hotels/${selectedHotelId}?_retry=${retrySelectedHotelToken}` : null;
  const {
    data: selectedHotel,
    error: selectedHotelError,
    isLoading: isLoadingSelectedHotel,
  } = useFetch<Hotel>(selectedHotelApiUrl);

  const handleSelectHotel = (hotelId: number) => {
    setRetrySelectedHotelToken(0);
    setSelectedHotelId(hotelId);
  };
  const handleBackToList = () => setSelectedHotelId(null);

  const renderStars = (rating: number | undefined, starSize = "h-5 w-5", isHotelClass = false) => {
    if (rating === undefined || rating === null || rating === 0) return <span className={`text-xs ${neutralTextLight}`}>Not rated</span>;
    
    const fullStars = Math.floor(rating);
    // Only use half star for review ratings, not for hotel class
    const halfStar = !isHotelClass && (rating % 1 >= 0.5);
    const emptyStars = 5 - fullStars - (halfStar && fullStars < 5 ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className={`${starSize} text-yellow-400 fill-yellow-400`} />)}
        {halfStar && fullStars < 5 && <Star key="half" className={`${starSize} text-yellow-400 fill-yellow-400`} />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />)}
        {isHotelClass ? (
          <span className={`ml-1.5 text-xs font-medium ${neutralTextLight}`}>({fullStars}-Star Hotel)</span>
        ) : (
          <span className={`ml-1.5 text-xs font-medium ${neutralTextLight}`}>({rating.toFixed(1)})</span>
        )}
      </div>
    );
  };

  const getAmenityIcon = (amenity: string, size = "h-5 w-5") => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <Wifi className={`${size} mr-2 ${neutralIconColor}`} />;
    if (lowerAmenity.includes("parking")) return <ParkingCircle className={`${size} mr-2 ${neutralIconColor}`} />;
    if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("dining")) return <Utensils className={`${size} mr-2 ${neutralIconColor}`} />;
    if (lowerAmenity.includes("pool")) return <ListChecks className={`${size} mr-2 ${neutralIconColor}`} />;
    if (lowerAmenity.includes("gym") || lowerAmenity.includes("fitness")) return <Heart className={`${size} mr-2 ${neutralIconColor}`} />;
    if (lowerAmenity.includes("spa")) return <Heart className={`${size} mr-2 ${neutralIconColor}`} />;
    return <ListChecks className={`${size} mr-2 ${neutralIconColor}`} />;
  };

  const handleBookRoom = (roomId: number, hotelName: string | undefined, roomTypeName: string) => {
    alert(`Booking room: ${roomTypeName} at ${hotelName || 'this hotel'} (Room ID: ${roomId}). Integration pending.`);
  };

  // --- Hotel Detail View ---
  if (selectedHotelId) {
    if (isLoadingSelectedHotel) return loadingIndicator;
    if (selectedHotelError) return errorIndicator(selectedHotelError.message, () => setRetrySelectedHotelToken(c => c + 1));
    if (!selectedHotel) return noDataIndicator("hotel details", "The selected hotel details could not be found.");

    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <button onClick={handleBackToList} className={`${buttonSecondaryStyle} mb-6 text-sm`}>
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Back to Search Results
          </button>

          {/* Main Hotel Info & Gallery */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedHotel.name}</h1>
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" />
                  <span>{selectedHotel.address}, {selectedHotel.city}, {selectedHotel.country}</span>
                </div>
                <div className="mb-3">{renderStars(selectedHotel.rating, "h-5 w-5", true)}</div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-gray-600"><Award className="inline h-4 w-4 mr-1 text-yellow-500" />Highly rated</span>
                  <span className="text-sm text-gray-600"><MessageSquare className="inline h-4 w-4 mr-1 text-blue-500" />150 reviews</span>
                </div>
                <div className="flex space-x-2 mb-4">
                  <button className={`${buttonSecondaryStyle} text-sm`}><Share2 className="mr-1.5 h-4 w-4" /> Share</button>
                  <button className={`${buttonSecondaryStyle} text-sm`}><Heart className="mr-1.5 h-4 w-4" /> Save</button>
                </div>
              </div>
              <div className="md:col-span-1 flex flex-col items-end">
                <div className="text-right mb-2">
                  <p className="text-xs text-gray-500">Price starts from</p>
                  <p className="text-3xl font-bold text-blue-600"><IndianRupee className="inline h-6 w-6" />{selectedHotel.rooms && selectedHotel.rooms.length > 0 ? selectedHotel.rooms[0].price_per_night : 'N/A'}</p>
                  <p className="text-xs text-gray-500">per night, excl. taxes & fees</p>
                </div>
                <button className={`${buttonPrimaryStyle} w-full text-lg py-3`}>View Deals</button>
              </div>
            </div>
            {selectedHotel.images && selectedHotel.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                {selectedHotel.images.slice(0, 4).map((imgSrc, index) => (
                  <div key={index} className={`relative rounded-md overflow-hidden shadow-sm ${index === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'}`}>
                    <Image
                      src={imgSrc || "/images/placeholder.jpg"}
                      alt={`${selectedHotel.name} image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 transition-transform duration-300"
                      onError={(e: any) => { if (e.target.src !== '/images/placeholder.jpg') e.target.src = '/images/placeholder.jpg'; }}
                      priority={index < 2} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs (Simplified) */}
          <div className="bg-white p-2 rounded-lg shadow-md mb-8 sticky top-0 z-10">
            <nav className="flex space-x-4">
              {['Overview', 'Rooms', 'Location', 'Amenities', 'Reviews', 'Policies'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase()}`} className="px-3 py-2 text-gray-600 font-medium hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors">
                  {tab}
                </a>
              ))}
            </nav>
          </div>

          {/* Overview Section */}
          <div id="overview" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Overview</h2>
            {selectedHotel.description && <p className={`text-gray-700 leading-relaxed whitespace-pre-line mb-4`}>{selectedHotel.description}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Property Highlights</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {selectedHotel.amenities?.slice(0, 4).map(amenity => <li key={amenity}>{amenity}</li>)}
                  {selectedHotel.amenities && selectedHotel.amenities.length > 4 && <li>And more...</li>}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Highlights</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Near City Center</li>
                  <li>Close to Airport</li>
                  <li>Beautiful Views</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Rooms Section */}
          <div id="rooms" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Available Rooms</h2>
            {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
              <div className="space-y-6">
                {selectedHotel.rooms.map((room: Room) => (
                  <div key={room.id} className={`border ${neutralBorderLight} rounded-lg overflow-hidden md:flex`}>
                    {room.images && room.images.length > 0 && (
                      <div className="md:w-1/3 relative h-48 md:h-auto flex-shrink-0">
                        <Image
                          src={room.images[0] || "/images/placeholder.jpg"}
                          alt={room.room_type_name}
                          layout="fill"
                          objectFit="cover"
                          onError={(e: any) => { if (e.target.src !== '/images/placeholder.jpg') e.target.src = '/images/placeholder.jpg'; }}
                        />
                      </div>
                    )}
                    <div className="p-4 md:p-6 flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{room.room_type_name}</h3>
                      {room.description && <p className={`text-sm text-gray-600 mb-3 line-clamp-2`}>{room.description}</p>}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-gray-500" /> {room.capacity_adults} Adults{room.capacity_children ? `, ${room.capacity_children} Children` : ""}</div>
                        <div className="flex items-center"><BedDouble className="h-4 w-4 mr-2 text-gray-500" /> King Bed</div> {/* Placeholder */}
                        {room.amenities?.slice(0, 2).map(ra => (
                          <div key={ra} className="flex items-center"><ListChecks className="h-4 w-4 mr-2 text-gray-500" /> {ra}</div>
                        ))}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-3 md:mb-0">
                          <p className="text-2xl font-bold text-blue-600"><IndianRupee className="inline h-5 w-5" />{room.price_per_night}</p>
                          <p className="text-xs text-gray-500">per night, + taxes & fees</p>
                        </div>
                        <button
                          onClick={() => handleBookRoom(room.id, selectedHotel.name, room.room_type_name)}
                          className={`${buttonPrimaryStyle} text-base py-3 px-6 w-full md:w-auto`}
                        >
                          Book This Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              noDataIndicator("rooms", "No rooms are currently listed for this hotel.")
            )}
          </div>

          {/* Location Section (Placeholder) */}
          <div id="location" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Location</h2>
            <div className="h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              Map Placeholder (Integration with a map service needed)
            </div>
            <p className="mt-4 text-gray-700">Exact location provided after booking.</p>
          </div>

          {/* Amenities Section */}
          <div id="amenities" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Amenities</h2>
            {selectedHotel.amenities && selectedHotel.amenities.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                {selectedHotel.amenities.map(amenity => (
                  <li key={amenity} className={`flex items-center text-sm ${neutralTextLight}`}>
                    {getAmenityIcon(amenity, "h-4 w-4")}
                    <span className="truncate" title={amenity}>{amenity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`${neutralTextLight}`}>No specific amenities listed for this hotel.</p>
            )}
          </div>

          {/* Reviews Section (Placeholder) */}
          <div id="reviews" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Guest Reviews</h2>
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-yellow-400 fill-yellow-400 mr-2" />
              <span className="text-3xl font-bold text-gray-800">{selectedHotel.rating?.toFixed(1) || 'N/A'}</span>
              <span className="text-gray-600 ml-2">({/* Placeholder */}150 Reviews)</span>
            </div>
            {/* Placeholder for reviews list */}
            <p className={`${neutralTextLight}`}>Reviews are not available at the moment.</p>
          </div>

          {/* Policies Section (Placeholder) */}
          <div id="policies" className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className={`${sectionHeadingStyle} mb-4`}>Hotel Policies</h2>
            <div className="text-gray-700 space-y-2">
              <p><strong>Check-in:</strong> {selectedHotel.check_in_time || 'From 2:00 PM'}</p>
              <p><strong>Check-out:</strong> {selectedHotel.check_out_time || 'Until 12:00 PM'}</p>
              <p><strong>Cancellation/Prepayment:</strong> {selectedHotel.cancellation_policy || 'Policies vary. Please check during booking.'}</p>
              <p><strong>Children and beds:</strong> {selectedHotel.children_allowed ? 'Children are welcome.' : 'Policy not specified.'}</p>
              <p><strong>Pets:</strong> {selectedHotel.pets_allowed ? 'Pets are allowed on request. Charges may apply.' : 'Pets are not allowed.'}</p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- Main Page View (List of Hotels) ---
  return (
    <div className={`container mx-auto px-4 ${sectionPadding}`}>
      <div className="text-center mb-8 md:mb-12">
        <h1 className={`${sectionHeadingStyle} text-3xl md:text-4xl`}>Explore Our Hotels</h1>
        <p className={`mt-2 text-base sm:text-lg ${neutralTextLight} max-w-2xl mx-auto`}>Find the perfect stay for your next adventure from our curated selection of hotels.</p>
      </div>

      <div className={`mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md ${neutralBorderLight}`}>
        <h2 className={`text-lg font-semibold ${neutralText} mb-3 text-center sm:text-left`}>Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <label htmlFor="searchTerm" className={`${labelBaseStyle}`}>Search by Name</label>
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-2 ${neutralIconColor} pointer-events-none`} size={18} />
            <input
              type="text"
              id="searchTerm"
              placeholder="e.g., Sunset Paradise"
              className={`${inputBaseStyle} pl-10`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="locationFilter" className={`${labelBaseStyle}`}>Filter by Location</label>
            <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-2 ${neutralIconColor} pointer-events-none`} size={18} />
            <input
              type="text"
              id="locationFilter"
              placeholder="e.g., Port Blair"
              className={`${inputBaseStyle} pl-10`}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="minRating" className={`${labelBaseStyle}`}>Minimum Rating</label>
            <div className="relative">
              <Star className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-0.5 ${neutralIconColor} pointer-events-none`} size={18} />
              <select
                id="minRating"
                className={`${inputBaseStyle} pl-10 appearance-none`}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <option value="0">Any Rating</option>
                <option value="1">1+ Star</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${neutralIconColor} pointer-events-none`} size={18} />
            </div>
          </div>
        </div>
      </div>

      {isLoadingHotels && loadingIndicator}
      {hotelsError && errorIndicator(hotelsError.message, () => setRetryHotelsToken(c => c + 1))}
      {!isLoadingHotels && !hotelsError && (!hotelsList || hotelsList.length === 0) && noDataIndicator("hotels", "No hotels found matching your criteria. Try adjusting your filters.")}

      {!isLoadingHotels && !hotelsError && hotelsList && hotelsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsList.map((hotel) => (
            <div key={hotel.id} className={`${cardBaseStyle} group cursor-pointer`} onClick={() => handleSelectHotel(hotel.id)}>
              <div className={`${cardImageContainerStyle}`}>
                <Image
                  src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "/images/placeholder.jpg"}
                  alt={hotel.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  onError={(e: any) => { if (e.target.src !== '/images/placeholder.jpg') e.target.src = '/images/placeholder.jpg'; }}
                  priority={hotelsList.indexOf(hotel) < 3}
                />
              </div>
              <div className={`${cardContentStyle}`}>
                <h2 className={`${cardTitleStyle}`}>{hotel.name}</h2>
                <div className={`flex items-center text-xs ${neutralTextLight} mb-1`}>
                  <MapPin className={`h-3.5 w-3.5 mr-1 ${neutralIconColor}`} /> {hotel.city}, {hotel.country}
                </div>
                <div className="mb-2">{renderStars(hotel.rating, "h-4 w-4", true)}</div>
                {hotel.description && <p className={`text-xs ${neutralTextLight} mb-3 line-clamp-2`}>{hotel.description}</p>}

                {hotel.rooms && hotel.rooms.length > 0 && hotel.rooms[0].price_per_night ? (
                  <div className={`text-base font-semibold ${successText} mb-2`}>
                    <IndianRupee className={`inline h-4 w-4 mr-0.5 ${successIconColor}`} />
                    {hotel.rooms[0].price_per_night} <span className={`text-xs ${neutralTextLight} font-normal`}>/ night (from)</span>
                  </div>
                ) : (
                  <p className={`text-xs ${neutralTextLight} mb-2`}>Check availability for prices</p>
                )}

                <button
                  onClick={(e) => { e.stopPropagation(); handleSelectHotel(hotel.id); }}
                  className={`${buttonPrimaryStyle} w-full text-sm py-2.5 mt-auto`}
                >
                  View Details <ChevronRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && hotelsList && hotelsList.length > 0 && (
        <div className="mt-8 md:mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoadingHotels}
            className={`${buttonSecondaryStyle} px-3 py-2 sm:px-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </button>
          <span className={`px-3 py-2 text-sm ${neutralTextLight}`}>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || isLoadingHotels || !hotelsList || hotelsList.length < ITEMS_PER_PAGE}
            className={`${buttonSecondaryStyle} px-3 py-2 sm:px-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;

