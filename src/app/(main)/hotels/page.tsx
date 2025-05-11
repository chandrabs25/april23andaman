// /home/ubuntu/codebase/test 3/src/app/(main)/hotels/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useFetch } from "@/hooks/useFetch"; // Import useFetch
import type { Hotel, Room, PaginatedHotelsResponse } from "@/types/hotel"; // Import types
import { Loader2, AlertTriangle } from "lucide-react"; // For loading/error indicators

const ITEMS_PER_PAGE = 9;

const HotelsPage = () => {
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);

  // Filters and pagination state
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounced search term for API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedLocationFilter, setDebouncedLocationFilter] = useState(locationFilter);

  // Debounce effect for search term and location
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedLocationFilter(locationFilter);
      setCurrentPage(1); // Reset to first page on new filter
    }, 500);
    return () => clearTimeout(timerId);
  }, [locationFilter]);
  
  // Effect for minRating to reset page
   useEffect(() => {
    setCurrentPage(1); // Reset to first page on new rating filter
  }, [minRating]);

  // Construct API URL for fetching hotels list
  const getHotelsListUrl = useCallback(() => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("limit", ITEMS_PER_PAGE.toString());
    if (debouncedSearchTerm) params.append("name", debouncedSearchTerm);
    if (debouncedLocationFilter) params.append("location", debouncedLocationFilter);
    if (minRating > 0) params.append("minRating", minRating.toString());
    return `/api/hotels?${params.toString()}`;
  }, [currentPage, debouncedSearchTerm, debouncedLocationFilter, minRating]);

  const { 
    data: hotelsResponse,
    error: hotelsError,
    isLoading: isLoadingHotels,
  } = useFetch<PaginatedHotelsResponse>(getHotelsListUrl());

  // Defensive extraction for hotels list and pagination
  const hotelsList = Array.isArray(hotelsResponse)
    ? hotelsResponse
    : hotelsResponse?.data || [];

  const totalHotels = Array.isArray(hotelsResponse)
    ? hotelsResponse.length
    : hotelsResponse?.total || 0;

  const totalPages = Math.ceil(totalHotels / ITEMS_PER_PAGE);

  // Fetch selected hotel details
  const { 
    data: selectedHotelDetailsResponse, 
    error: selectedHotelError, 
    isLoading: isLoadingSelectedHotel 
  } = useFetch<Hotel>(selectedHotelId ? `/api/hotels/${selectedHotelId}` : null);
  
  const selectedHotel = selectedHotelDetailsResponse;

  const handleSelectHotel = (hotelId: number) => {
    setSelectedHotelId(hotelId);
  };

  const handleBackToList = () => {
    setSelectedHotelId(null);
  };
  
  // Render selected hotel details
  if (selectedHotelId) {
    if (isLoadingSelectedHotel) {
      return <div className="container mx-auto p-4 text-center"><Loader2 className="h-8 w-8 animate-spin inline-block" /> Loading hotel details...</div>;
    }
    if (selectedHotelError) {
      return <div className="container mx-auto p-4 text-center text-red-500"><AlertTriangle className="inline-block mr-2" />Error loading hotel details: {selectedHotelError.message}</div>;
    }
    if (!selectedHotel) {
      return <div className="container mx-auto p-4 text-center">Hotel not found.</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <button onClick={handleBackToList} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          &larr; Back to Hotels List
        </button>
        <h1 className="text-3xl font-bold mb-2">{selectedHotel.name}</h1>
        <p className="text-gray-600 mb-1">{selectedHotel.address}, {selectedHotel.city}, {selectedHotel.country}</p>
        {selectedHotel.rating !== null && selectedHotel.rating !== undefined && <p className="mb-4">Rating: {selectedHotel.rating.toFixed(1)} / 5</p>}
        
        {selectedHotel.images && selectedHotel.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {selectedHotel.images.map((img, index) => (
                <img key={index} src={img || "/images/placeholder_hotel.png"} alt={`${selectedHotel.name} image ${index + 1}`} className="rounded-lg shadow-md w-full h-64 object-cover" onError={(e) => (e.currentTarget.src = '/images/placeholder_hotel.png')} />
            ))}
            </div>
        )}

        {selectedHotel.description && <p className="text-lg mb-4">{selectedHotel.description}</p>}
        
        {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
            <>
                <h3 className="text-xl font-semibold mb-2">Amenities:</h3>
                <ul className="list-disc list-inside mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {selectedHotel.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
                </ul>
            </>
        )}

        <h2 className="text-2xl font-bold mb-4">Rooms</h2>
        {selectedHotel.rooms && selectedHotel.rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedHotel.rooms.map((room: Room) => (
              <div key={room.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
                <h3 className="text-xl font-semibold mb-1">{room.room_type_name}</h3>
                {room.description && <p className="text-sm text-gray-600 mb-2">{room.description}</p>}
                <p className="text-gray-700 mb-1">Capacity: {room.capacity_adults} Adults{room.capacity_children ? ` + ${room.capacity_children} Children` : ""}</p>
                <p className="text-lg font-medium text-green-600">${room.price_per_night} / night</p>
                {room.amenities && room.amenities.length > 0 && (
                    <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500">Room Amenities:</p>
                        <ul className="list-disc list-inside text-xs text-gray-600">
                            {room.amenities.map(ra => <li key={ra}>{ra}</li>)}
                        </ul>
                    </div>
                )}
                 {room.images && room.images.length > 0 && (
                    <img src={room.images[0] || "/images/placeholder_room.png"} alt={room.room_type_name} className="w-full h-32 object-cover rounded-md mt-3" onError={(e) => (e.currentTarget.src = '/images/placeholder_room.png')} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No rooms listed for this hotel at the moment.</p>
        )}
      </div>
    );
  }

  // Render hotels list and filters
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Our Hotels</h1>

      {/* Filters */}
      <div className="mb-8 p-4 border rounded-lg shadow-sm bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="e.g., Sunset Paradise"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="locationFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Location (City/Country)</label>
            <input
              type="text"
              id="locationFilter"
              placeholder="e.g., Maldives or Switzerland"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
            <select
              id="minRating"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        </div>
      </div>

      {/* Hotels List */}
      {isLoadingHotels && <div className="text-center"><Loader2 className="h-8 w-8 animate-spin inline-block" /> Loading hotels...</div>}
      {hotelsError && <div className="text-center text-red-500"><AlertTriangle className="inline-block mr-2" />Error loading hotels: {hotelsError.message}</div>}
      
      {!isLoadingHotels && !hotelsError && hotelsList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelsList.map((hotel: Hotel) => (
            <div
              key={hotel.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer bg-white flex flex-col justify-between"
              onClick={() => handleSelectHotel(hotel.id)}
            >
              <div>
                <img 
                    src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : "/images/placeholder_hotel.png"} 
                    alt={hotel.name} 
                    className="w-full h-48 object-cover rounded-md mb-3" 
                    onError={(e) => (e.currentTarget.src = '/images/placeholder_hotel.png')}
                />
                <h2 className="text-xl font-semibold mb-1">{hotel.name}</h2>
                <p className="text-gray-600 text-sm mb-1">{hotel.address}, {hotel.city}</p>
                {hotel.rating !== null && hotel.rating !== undefined && <p className="text-yellow-500 mb-2">Rating: {hotel.rating.toFixed(1)} / 5</p>}
                {hotel.description && <p className="text-sm text-gray-700 truncate mb-2">{hotel.description}</p>}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleSelectHotel(hotel.id); }}
                className="mt-auto w-full px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      {!isLoadingHotels && !hotelsError && hotelsList.length === 0 && (
        <p className="text-center text-gray-500">No hotels found matching your criteria. Try adjusting your filters.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1 || isLoadingHotels}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button 
              key={pageNumber} 
              onClick={() => setCurrentPage(pageNumber)} 
              disabled={isLoadingHotels}
              className={`px-4 py-2 border rounded-md ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {pageNumber}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages || isLoadingHotels}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;

