"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { useFetch } from "@/hooks/useFetch";
import type { Hotel, Room } from "@/types/hotel";
import {
  Loader2, AlertTriangle, MapPin, Star, ChevronLeft, Users, IndianRupee, ListChecks, Search, Filter as FilterIcon, BedDouble, Wifi, ParkingCircle, Utensils, Briefcase, Building, ChevronRight, XCircle, Heart, DollarSign, Calendar, Clock, ChevronDown, CreditCard, Info, ExternalLink, MessageSquare, Share2, ThumbsUp, ThumbsDown, Award, CheckCircle, X, Phone, Mail, Globe, ImageOff
} from "lucide-react";

// --- Import Common Styles (from the shared theme.ts file) ---
import {
  errorBg as themeErrorBg,
  errorBorder as themeErrorBorder,
  errorText as themeErrorText,
  errorIconColor as themeErrorIconColor,
  neutralBgLight as themeNeutralBgLight,
  neutralBorderLight as themeNeutralBorderLight,
  // neutralBg as themeNeutralBg, // Not directly used, but good to have for context
  neutralBorder as themeNeutralBorder,
  neutralText as themeNeutralText,
  neutralTextLight as themeNeutralTextLight,
  neutralIconColor as themeNeutralIconColor,
  sectionPadding as themeSectionPadding,
  cardBaseStyle as themeCardBaseStyle,
  buttonPrimaryStyle as themeButtonPrimaryStyle, // Use this for primary actions
  buttonSecondaryStyle as themeButtonSecondaryStyle,
  primaryButtonBg as themePrimaryButtonBg, // For focus rings
  primaryButtonText, // text-white, for buttons
} from "@/styles/theme";
// --- End Common Styles Import ---


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

  // --- Page-Specific Styles (Now aligned with theme) ---
  // Focus rings will use the theme's primary color (gray-800 based)
  const themeFocusRingColor = `focus:ring-[${themePrimaryButtonBg.replace('bg-', '').split('-')[0]}-${themePrimaryButtonBg.replace('bg-', '').split('-')[1]}]`; // e.g. focus:ring-gray-800
  const themeFocusBorderColor = `focus:border-[${themePrimaryButtonBg.replace('bg-', '').split('-')[0]}-${themePrimaryButtonBg.replace('bg-', '').split('-')[1]}]`; // e.g. focus:border-gray-800


  const inputBaseStyle = `w-full p-2.5 text-sm ${themeNeutralText} bg-white border ${themeNeutralBorder} rounded-md focus:outline-none focus:ring-2 ${themeFocusRingColor} ${themeFocusBorderColor}`;
  const labelBaseStyle = `block text-sm font-medium ${themeNeutralTextLight} mb-1`;

  const hotelListItemCardStyle = `bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border ${themeNeutralBorder} flex flex-col h-full`;
  const cardImageContainerStyle = "h-48 sm:h-52 w-full relative flex-shrink-0";
  const cardContentStyle = "p-4 flex flex-col flex-grow";
  const cardTitleStyle = `text-lg font-semibold mb-1 ${themeNeutralText} line-clamp-2`;

  const loadingErrorBaseStyle = "text-center py-10 px-4 rounded-lg shadow-md";
  const hotelPageSectionHeadingStyle = `text-2xl font-semibold ${themeNeutralText}`;
  // --- End Page-Specific Styles ---

  const loadingIndicator = (
    <div className={`flex justify-center items-center ${loadingErrorBaseStyle} bg-white min-h-[300px]`}>
      <Loader2 className={`h-8 w-8 animate-spin ${themeNeutralIconColor}`} />
      <span className={`ml-3 ${themeNeutralText} font-medium text-base`}>Loading...</span>
    </div>
  );

  const errorIndicator = (message: string | undefined, onRetry?: () => void) => (
    <div className={`${loadingErrorBaseStyle} ${themeErrorBg} border ${themeErrorBorder} min-h-[300px]`}>
      <AlertTriangle className={`h-8 w-8 ${themeErrorIconColor} mx-auto mb-3`} />
      <p className={`${themeErrorText} font-semibold text-base`}>Could not load data.</p>
      <p className={`${themeErrorText} text-sm mt-1`}>{message || 'Please try again later.'}</p>
      {onRetry &&
        <button onClick={onRetry} className={`mt-4 px-4 py-2 bg-red-100 ${themeErrorText} rounded-md hover:bg-red-200 transition-colors font-medium text-sm`}>
          Try Again
        </button>
      }
    </div>
  );

  const noDataIndicator = (itemType: string, message?: string) => (
    <div className={`${loadingErrorBaseStyle} bg-white ${themeNeutralTextLight} flex flex-col items-center min-h-[300px]`}>
      <div className={`w-16 h-16 ${themeNeutralBgLight} rounded-full flex items-center justify-center mb-4 border ${themeNeutralBorderLight}`}>
        <Building className={`h-8 w-8 ${themeNeutralIconColor} opacity-70`} />
      </div>
      <p className={`${themeNeutralText} font-medium text-base`}>No {itemType} found.</p>
      <p className={`${themeNeutralTextLight} text-sm mt-1`}>{message || 'Please check back soon or try different filters.'}</p>
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
    if (rating === undefined || rating === null || rating === 0) return <span className={`text-xs ${themeNeutralTextLight}`}>Not rated</span>;

    const fullStars = Math.floor(rating);
    const halfStar = !isHotelClass && (rating % 1 >= 0.5);
    const emptyStars = 5 - fullStars - (halfStar && fullStars < 5 ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className={`${starSize} text-yellow-400 fill-yellow-400`} />)}
        {halfStar && fullStars < 5 && <Star key="half" className={`${starSize} text-yellow-400 fill-yellow-400`} />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className={`${starSize} text-gray-300`} />)}
        {isHotelClass ? (
          <span className={`ml-1.5 text-xs font-medium ${themeNeutralTextLight}`}>({fullStars}-Star Hotel)</span>
        ) : (
          <span className={`ml-1.5 text-xs font-medium ${themeNeutralTextLight}`}>({rating.toFixed(1)})</span>
        )}
      </div>
    );
  };

  const getAmenityIcon = (amenity: string, size = "h-5 w-5") => {
    const lowerAmenity = amenity.toLowerCase();
    const iconClass = `${size} mr-2 ${themeNeutralIconColor}`;
    if (lowerAmenity.includes("wifi")) return <Wifi className={iconClass} />;
    if (lowerAmenity.includes("parking")) return <ParkingCircle className={iconClass} />;
    if (lowerAmenity.includes("restaurant") || lowerAmenity.includes("dining")) return <Utensils className={iconClass} />;
    return <ListChecks className={iconClass} />;
  };

  const handleBookRoom = (roomId: number, hotelName: string | undefined, roomTypeName: string) => {
    alert(`Booking room: ${roomTypeName} at ${hotelName || 'this hotel'} (Room ID: ${roomId}). Integration pending.`);
  };

  // --- Hotel Detail View ---
  if (selectedHotelId) {
    if (isLoadingSelectedHotel) return loadingIndicator;
    if (selectedHotelError) return errorIndicator(selectedHotelError.message, () => setRetrySelectedHotelToken(c => c + 1));
    if (!selectedHotel) return noDataIndicator("hotel details", "The selected hotel details could not be found.");

    const mainPrice = selectedHotel.rooms && selectedHotel.rooms.length > 0 && typeof selectedHotel.rooms[0].price_per_night === 'number'
      ? selectedHotel.rooms[0].price_per_night.toLocaleString()
      : 'N/A';

    return (
      <div className={`${themeNeutralBgLight} min-h-screen`}>
        <div className={`container mx-auto px-4 ${themeSectionPadding}`}>
          <button onClick={handleBackToList} className={`${themeButtonSecondaryStyle} mb-6 text-sm`}>
            <ChevronLeft className="mr-1.5 h-4 w-4" /> Back to Search Results
          </button>

          <div className={`bg-white p-6 rounded-lg shadow-lg mb-8 border ${themeNeutralBorderLight}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h1 className={`text-3xl font-bold ${themeNeutralText} mb-2`}>{selectedHotel.name}</h1>
                <div className={`flex items-center ${themeNeutralTextLight} mb-1`}>
                  <MapPin className={`h-5 w-5 mr-2 ${themeNeutralIconColor} flex-shrink-0`} />
                  <span>{selectedHotel.address}</span>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  <button className={`${themeButtonSecondaryStyle} text-sm`}><Share2 className="mr-1.5 h-4 w-4" /> Share</button>
                  <button className={`${themeButtonSecondaryStyle} text-sm`}><Heart className="mr-1.5 h-4 w-4" /> Save</button>
                </div>
              </div>
              <div className="md:col-span-1 flex flex-col items-start md:items-end">
                <div className="text-left md:text-right mb-2">
                  <p className={`text-xs ${themeNeutralTextLight}`}>Price starts from</p>
                  <p className={`text-3xl font-bold ${themeNeutralText}`}>
                    <IndianRupee className="inline h-6 w-6" />
                    {mainPrice}
                  </p>
                  <p className={`text-xs ${themeNeutralTextLight}`}>per night, excl. taxes & fees</p>
                </div>
                <button className={`${themeButtonPrimaryStyle} w-full text-lg py-3`}>View Deals</button>
              </div>
            </div>
            {selectedHotel.images && selectedHotel.images.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                {selectedHotel.images.slice(0, 4).map((imgSrc, index) => (
                  <div key={index} className={`relative rounded-md overflow-hidden shadow-sm ${index === 0 ? 'col-span-2 row-span-2 h-64 sm:h-80' : 'h-32 sm:h-40'}`}>
                    <Image
                      src={imgSrc || "/images/placeholder_service.jpg"}
                      alt={`${selectedHotel.name} image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="hover:scale-105 transition-transform duration-300 bg-gray-100"
                      onError={(e: any) => { if (e.target.src !== '/images/placeholder_service.jpg') e.target.src = '/images/placeholder_service.jpg'; }}
                      priority={index < 2}
                    />
                    {(imgSrc || "/images/placeholder_service.jpg") === "/images/placeholder_service.jpg" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 pointer-events-none">
                        <ImageOff size={index === 0 ? 40 : 24} className={`${themeNeutralIconColor} opacity-60`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`bg-white p-2 rounded-lg shadow-md mb-8 sticky top-[70px] z-30 border ${themeNeutralBorderLight}`}>
            <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto">
              {['Overview', 'Rooms', 'Location', 'Amenities', 'Reviews', 'Policies'].map(tab => (
                <a key={tab} href={`#${tab.toLowerCase()}`} className={`px-3 py-2 ${themeNeutralTextLight} font-medium hover:bg-gray-100 hover:text-[${themePrimaryButtonBg.replace('bg-', '').split('-')[0]}-${themePrimaryButtonBg.replace('bg-', '').split('-')[1]}] rounded-md transition-colors text-sm whitespace-nowrap`}>
                  {tab}
                </a>
              ))}
            </nav>
          </div>

          <div id="overview" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Overview</h2>
            {selectedHotel.description && <p className={`${themeNeutralTextLight} leading-relaxed whitespace-pre-line mb-4`}>{selectedHotel.description}</p>}
          </div>

          <div id="rooms" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Available Rooms</h2>
            {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
              <div className="space-y-6">
                {selectedHotel.rooms.map((room: Room) => {
                  const roomPrice = typeof room.price_per_night === 'number'
                    ? room.price_per_night.toLocaleString()
                    : 'N/A';
                  return (
                    <div key={room.id} className={`border ${themeNeutralBorderLight} rounded-lg overflow-hidden md:flex`}>
                      {room.images && room.images.length > 0 && (
                        <div className="md:w-1/3 relative h-48 md:h-auto flex-shrink-0 bg-gray-100">
                          <Image
                            src={room.images[0] || "/images/placeholder_service.jpg"}
                            alt={room.room_type_name} layout="fill" objectFit="cover"
                            onError={(e: any) => { if (e.target.src !== '/images/placeholder_service.jpg') e.target.src = '/images/placeholder_service.jpg'; }}
                          />
                          {(room.images[0] || "/images/placeholder_service.jpg") === "/images/placeholder_service.jpg" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 pointer-events-none">
                              <ImageOff size={32} className={`${themeNeutralIconColor} opacity-60`} />
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-4 md:p-6 flex-grow">
                        <h3 className={`text-xl font-semibold ${themeNeutralText} mb-1`}>{room.room_type_name}</h3>
                        {room.description && <p className={`text-sm ${themeNeutralTextLight} mb-3 line-clamp-2`}>{room.description}</p>}
                        <div className={`grid grid-cols-2 gap-x-4 gap-y-2 text-sm ${themeNeutralTextLight} mb-3`}>
                          <div className="flex items-center"><Users className={`h-4 w-4 mr-2 ${themeNeutralIconColor}`} /> {room.capacity_adults} Adults{room.capacity_children ? `, ${room.capacity_children} Children` : ""}</div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="mb-3 md:mb-0">
                            <p className={`text-2xl font-bold ${themeNeutralText}`}><IndianRupee className="inline h-5 w-5" />{roomPrice}</p>
                            <p className={`text-xs ${themeNeutralTextLight}`}>per night, + taxes & fees</p>
                          </div>
                          <button
                            onClick={() => handleBookRoom(room.id, selectedHotel.name, room.room_type_name)}
                            className={`${themeButtonPrimaryStyle} text-base py-3 px-6 w-full md:w-auto`}
                          >
                            Book This Room
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (noDataIndicator("rooms", "No rooms are currently listed for this hotel."))}
          </div>

          <div id="location" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Location</h2>
            <div className={`h-64 ${themeNeutralBgLight} rounded-md flex items-center justify-center ${themeNeutralTextLight} border ${themeNeutralBorderLight}`}>
              Map Placeholder (Integration with a map service needed)
            </div>
            <p className={`mt-4 ${themeNeutralTextLight}`}>Exact location provided after booking.</p>
          </div>

          <div id="amenities" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Amenities</h2>
            {selectedHotel.amenities && selectedHotel.amenities.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                {selectedHotel.amenities.map(amenity => (
                  <li key={amenity} className={`flex items-center text-sm ${themeNeutralTextLight}`}>
                    {getAmenityIcon(amenity, "h-4 w-4")}
                    <span className="truncate" title={amenity}>{amenity}</span>
                  </li>
                ))}
              </ul>
            ) : (<p className={`${themeNeutralTextLight}`}>No specific amenities listed for this hotel.</p>)}
          </div>

          <div id="reviews" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Guest Reviews</h2>
            <p className={`${themeNeutralTextLight}`}>Reviews are not available at the moment.</p>
          </div>

          <div id="policies" className={`${themeCardBaseStyle} mb-8`}>
            <h2 className={`${hotelPageSectionHeadingStyle} mb-4`}>Hotel Policies</h2>
            <div className={`${themeNeutralTextLight} space-y-2 text-sm`}>
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
    <div className={`container mx-auto px-4 ${themeSectionPadding}`}>
      <div className="text-center mb-8 md:mb-12">
        <h1 className={`${hotelPageSectionHeadingStyle} text-3xl md:text-4xl`}>Explore Our Hotels</h1>
        <p className={`mt-2 text-base sm:text-lg ${themeNeutralTextLight} max-w-2xl mx-auto`}>Find the perfect stay for your next adventure from our curated selection of hotels.</p>
      </div>

      <div className={`${themeCardBaseStyle} mb-8 p-4 sm:p-6`}>
        <h2 className={`text-lg font-semibold ${themeNeutralText} mb-3 text-center sm:text-left`}>Filter Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <label htmlFor="searchTerm" className={`${labelBaseStyle}`}>Search by Name</label>
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-3 sm:mt-2.5 ${themeNeutralIconColor} pointer-events-none`} size={18} />
            <input type="text" id="searchTerm" placeholder="e.g., Sunset Paradise" className={`${inputBaseStyle} pl-10`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="relative">
            <label htmlFor="locationFilter" className={`${labelBaseStyle}`}>Filter by Location</label>
            <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-3 sm:mt-2.5 ${themeNeutralIconColor} pointer-events-none`} size={18} />
            <input type="text" id="locationFilter" placeholder="e.g., Port Blair" className={`${inputBaseStyle} pl-10`} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
          </div>
          <div>
            <label htmlFor="minRating" className={`${labelBaseStyle}`}>Minimum Rating</label>
            <div className="relative">
              <Star className={`absolute left-3 top-1/2 transform -translate-y-1/2 mt-0.5 ${themeNeutralIconColor} pointer-events-none`} size={18} />
              <select id="minRating" className={`${inputBaseStyle} pl-10 appearance-none`} value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                <option value="0">Any Rating</option>
                <option value="1">1+ Star</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeNeutralIconColor} pointer-events-none`} size={18} />
            </div>
          </div>
        </div>
      </div>

      {isLoadingHotels && loadingIndicator}
      {hotelsError && errorIndicator(hotelsError.message, () => setRetryHotelsToken(c => c + 1))}
      {!isLoadingHotels && !hotelsError && (!hotelsList || hotelsList.length === 0) && noDataIndicator("hotels", "No hotels found matching your criteria. Try adjusting your filters.")}

      {!isLoadingHotels && !hotelsError && hotelsList && hotelsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsList.map((hotel) => {
            const cardPrice = hotel.rooms && hotel.rooms.length > 0 && typeof hotel.rooms[0].price_per_night === 'number'
              ? hotel.rooms[0].price_per_night.toLocaleString()
              : null;
            return (
              <div key={hotel.id} className={`${hotelListItemCardStyle} group cursor-pointer`} onClick={() => handleSelectHotel(hotel.id)}>
                <div className={`${cardImageContainerStyle}`}>
                  <Image
                    src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "/images/placeholder_service.jpg"}
                    alt={hotel.name} layout="fill" objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105 bg-gray-100"
                    onError={(e: any) => { if (e.target.src !== '/images/placeholder_service.jpg') e.target.src = '/images/placeholder_service.jpg'; }}
                    priority={hotelsList.indexOf(hotel) < 3}
                  />
                  {(hotel.images && hotel.images.length > 0 ? hotel.images[0] : "/images/placeholder_service.jpg") === "/images/placeholder_service.jpg" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 pointer-events-none">
                      <ImageOff size={32} className={`${themeNeutralIconColor} opacity-60`} />
                    </div>
                  )}
                </div>
                <div className={`${cardContentStyle}`}>
                  <h2 className={`${cardTitleStyle}`}>{hotel.name}</h2>
                  <div className={`flex items-center text-xs ${themeNeutralTextLight} mb-1`}>
                    <MapPin className={`h-3.5 w-3.5 mr-1 ${themeNeutralIconColor}`} /> <span>{hotel.address}</span>
                  </div>
                
                  {hotel.description && <p className={`text-xs ${themeNeutralTextLight} mt-2 mb-3 line-clamp-2`}>{hotel.description}</p>}

                  {cardPrice ? (
                    <div className={`text-base font-semibold text-green-600 mb-2`}>
                      <IndianRupee className={`inline h-4 w-4 mr-0.5 text-green-500`} />
                      {cardPrice} <span className={`text-xs ${themeNeutralTextLight} font-normal`}>/ night (from)</span>
                    </div>
                  ) : (<p className={`text-xs ${themeNeutralTextLight} mb-2`}>Check availability for prices</p>)}

                  <button
                    onClick={(e) => { e.stopPropagation(); handleSelectHotel(hotel.id); }}
                    className={`${themeButtonPrimaryStyle} w-full text-sm py-2.5 mt-auto`}
                  >
                    View Details <ChevronRight className="ml-1.5 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && hotelsList && hotelsList.length > 0 && (
        <div className="mt-8 md:mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoadingHotels}
            className={`${themeButtonSecondaryStyle} px-3 py-2 sm:px-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </button>
          <span className={`px-3 py-2 text-sm ${themeNeutralTextLight}`}>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || isLoadingHotels || !hotelsList || hotelsList.length < ITEMS_PER_PAGE}
            className={`${themeButtonSecondaryStyle} px-3 py-2 sm:px-4 text-sm disabled:opacity-60 disabled:cursor-not-allowed`}
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
