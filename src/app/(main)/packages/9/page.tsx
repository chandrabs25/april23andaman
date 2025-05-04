'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MapPin,
    Calendar,
    Check,
    X,
    Star,
    Car,
    Hotel,
    Award,
    Route,
    Ship,
    PlaneTakeoff,
    Bed,
    ClipboardList,
    AlertTriangle,
    Phone,
    Camera,
    Umbrella,
    Utensils,
    Sailboat, // For Neil Island Day
    Waves,    // Alt icon for beaches
    ArrowRight // Added for buttons
} from 'lucide-react';

// NOTE: Replace placeholder image paths like "/images/..." with actual image URLs.

// Updated Component Name
export default function AndamanPackagePage4D3N_Neil() { // Added suffix for clarity
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Defined keys for all sections
    const placeholderImages = {
        hero: '/images/andaman-hero-generic.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        radhanagar: '/images/radhanagar-beach.jpg',
        neilIslandBeach: '/images/neil-island-beach.jpg', // Neil Island image
        portBlairAirport: '/images/port-blair-airport.jpg',
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg', // Placeholder for highlight
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
        highlightNeil: '/images/neil-island-highlight.jpg', // Placeholder for highlight
        // Defined keys for "What to Expect" section
        expectBeaches: '/images/beaches.jpg',
        expectHistorical: '/images/historical-sites.jpg',
        expectIsland: '/images/island-hopping.jpg', // Placeholder
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        galleryCellularJail: '/images/gallery-cellular-jail.jpg', // Placeholder
        galleryCorbynsCove: '/images/gallery-corbyns-cove.jpg', // Placeholder
        galleryHavelockFerry: '/images/gallery-havelock-ferry.jpg', // Placeholder
        galleryRadhanagar: '/images/gallery-radhanagar.jpg', // Placeholder
        galleryKalapathar: '/images/gallery-kalapathar.jpg', // Placeholder
        galleryNeilBharatpur: '/images/gallery-neil-bharatpur.jpg', // Placeholder
        galleryNeilLaxmanpur: '/images/gallery-neil-laxmanpur.jpg', // Placeholder
        galleryAndamanWaters: '/images/gallery-andaman-waters.jpg', // Placeholder
        ctaBackground: '/images/andaman-beach-cta.jpg' // Not used in refactored CTA
    };

    return (
        // Changed background to plain white (matching sample)
        <main className="bg-white min-h-screen">
            {/* Hero Section - Matched sample styling */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src={placeholderImages.hero}
                        alt="Andaman Islands beach panorama"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        3 Nights and 4 Days Andaman Tour Package (Neil Included)
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore the historic charm of Port Blair, stunning beaches of Havelock, and serene beauty of Neil Island on this unforgettable Andaman adventure. (2 Adults)
                    </p>
                    {/* Changed button color to dark gray (matching sample) */}
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Features Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Star className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests.
                    </p>

                    {/* Image gallery - Structure matches sample */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature1} alt="Beautiful Andaman Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature2} alt="Crystal Clear Waters of Andaman" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature3} alt="Tropical Paradise in Andaman" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    </div>

                    {/* Feature Cards - Matched sample styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Car className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Sanitized Vehicles</h3>
                            <p className="text-gray-600"> We make sure all cabs are sanitized before every trip for a safe holiday experience. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Hotel className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Handpicked Hotels</h3>
                            <p className="text-gray-600"> We personally visit hotels before recommending them to guests visiting Andaman Islands. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Award className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Verified Partners</h3>
                            <p className="text-gray-600"> We give you the best safe experience with verified partners for activities. </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 4-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A perfectly planned journey through the highlights of the Andaman Islands.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.cellularJail} alt="Cellular Jail, Port Blair" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 1: Discover Port Blair: History & Adventure!</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Arrive, check into hotel. Post-lunch, explore the historic Cellular Jail. </p>
                                    <p> Visit Corbyn's Cove Beach for relaxation/optional water sports. </p>
                                    <p> Experience the captivating Light & Sound Show at Cellular Jail. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.radhanagar} alt="Radhanagar Beach, Havelock Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 2: Island Bliss: Explore SwaraajDweep (Havelock)</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Early cruise to Havelock. Check into hotel. </p>
                                    <p> Visit Kalapathar Beach, then the world-renowned Radhanagar Beach. </p>
                                    <p> Enjoy the stunning sunset at Radhanagar before overnight stay in Havelock. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.neilIslandBeach} alt="Bharatpur Beach, Neil Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Sailboat className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 3: Neil Island Adventures & Return to Port Blair</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Early ferry from Havelock to Neil Island. Explore Bharatpur Beach (calm waters, marine life). </p>
                                    <p> Visit scenic Sitapur Beach and Laxmanpur Beach (sunsets, beachcombing). </p>
                                    <p> Return ferry to Port Blair in the evening. Check into Port Blair hotel. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.portBlairAirport} alt="Port Blair Airport Departure" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 4: Return Home with Sweet Memories</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Enjoy breakfast. Optional last-minute shopping if time permits. </p>
                                    <p> Transfer to Veer Savarkar International Airport for your departure. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail & Show</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore the historic jail and witness the captivating Light and Sound show. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCorbyns} alt="Corbyn's Cove Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Relax and enjoy optional water sports at this picturesque Port Blair beach. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Visit Havelock's world-famous beach, known for white sands and stunning sunsets. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightNeil} alt="Neil Island Beaches" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Neil Island Exploration</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Discover the tranquil beaches of Neil Island: Bharatpur, Sitapur & Laxmanpur. </p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Bed className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (2 Adults)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from selected hotels (2N Port Blair, 1N Havelock). Prices include Stay, Transfers, Sightseeing & GST.
                    </p>
                    {/* Tabs - Matched sample styling */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tab
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {/* Tab Content - Matched sample styling (Simplified Card Structure) */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Package</h3>
                                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Hotel Royal Palace (Deluxe AC) / Blue Marlin or similar</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Bamboo Cottage) / Radha Krishna Resort or similar</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹30,030/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Package</h3>
                                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Bay Walk By Sea Side (Premium AC) / Andaman Galley / Marina Manor or similar</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radha Krishna Resort or similar</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹34,980/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Package</h3>
                                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Hotel Shompen (Deluxe AC) / Olive Hotel / Luxor or similar</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird Resort or similar</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹40,480/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6 md:p-8">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Package</h3>
                                    <div className="grid md:grid-cols-2 gap-4 mb-6 text-sm">
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Mansha Regency (Deluxe Room) / Sand Heaven or similar</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Symphony palms Beach Resort (Cottage) / Sands Marina or similar</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹49,280/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
                                        <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What to Expect Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Waves className="text-gray-700" size={24} /> {/* Using Waves icon */}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectBeaches} alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3> <p className="text-gray-600 text-sm">Relax on world-renowned Radhanagar, Kalapathar, Bharatpur, Sitapur, and Laxmanpur beaches.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectHistorical} alt="Historical Immersion" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical Immersion</h3> <p className="text-gray-600 text-sm">Delve into India's freedom struggle at the Cellular Jail & witness the Light & Sound Show.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectIsland} alt="Seamless Island Hopping" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Seamless Island Hopping</h3> <p className="text-gray-600 text-sm">Enjoy comfortable ferry transfers between Port Blair, Havelock, and Neil Island.</p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="details">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <ClipboardList className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Details</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Clear overview of what your Andaman package covers.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <Check className="text-green-500 mr-3 flex-shrink-0" size={24} /> What's Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Accommodation (2N Port Blair, 1N Havelock) with Breakfast.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Airport/Jetty transfers & sightseeing via Private AC Cab.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Entry tickets/permits (Cellular Jail, Ross, North Bay).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Ferry tickets (PB - Havelock - Neil - PB).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Cellular Jail Light & Sound Show tickets.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>All applicable taxes (GST Included).</span> </li>
                            </ul>
                        </div>
                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <X className="text-red-500 mr-3 flex-shrink-0" size={24} /> What's Not Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Flight Tickets.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Lunch and Dinner.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Water sports activities & camera permits.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Anything not mentioned in inclusions.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Expenses due to unforeseen circumstances.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Personal expenses (laundry, tips, beverages etc.).</span> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining Experience Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Utensils className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood Delights" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Fresh Seafood Delights</h3><p className="text-sm text-white/90"> Indulge in the freshest catch from the Andaman Sea. </p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local & Varied Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3><p className="text-sm text-white/90"> Explore local flavors and diverse restaurant options. </p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4"> Complimentary breakfast is included. Lunch and dinner are flexible, letting you explore the diverse culinary scene of Port Blair, Havelock, and Neil Island. </p>
                        <p className="text-gray-700"> From beach shacks to restaurants, savor fresh seafood, Indian, Continental, and local dishes. Ask for recommendations! </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="cancellation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <AlertTriangle className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cancellation Policy</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12"> Please review our cancellation terms carefully before booking. </p>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto border border-gray-100">
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { text: 'Cancellation charge of ₹2500 per person applicable any time after advance payment.', color: 'yellow' },
                                { text: 'No refund if cancellation is received less than 10 days before arrival.', color: 'red' },
                                { text: '50% of total package cost applicable if cancellation is 11-20 days before arrival.', color: 'yellow' },
                                { text: '25% of total package cost applicable if cancellation is 21-30 days before arrival.', color: 'yellow' },
                                { text: '100% cancellation charge applicable for arrivals between 15 Dec - 15 Jan (Post Advance).', color: 'red' }
                            ].map((item, index) => (<li key={index} className="flex items-start"> <AlertTriangle className={`${item.color === 'red' ? 'text-red-500' : 'text-yellow-500'} mr-2 mt-1 flex-shrink-0`} size={16} /> <span>{item.text}</span> </li>))}
                            <li className="flex items-start"> <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>In case of unforeseen weather/government restrictions, operator will try to provide alternatives, but no refund is provided for cancelled activities.</span> </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12"> Glimpses of your Andaman journey. </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.galleryCellularJail, alt: 'Cellular Jail Exterior' },
                            { src: placeholderImages.galleryCorbynsCove, alt: 'Corbyn\'s Cove Beach View' },
                            { src: placeholderImages.galleryHavelockFerry, alt: 'Ferry approaching Havelock Island' },
                            { src: placeholderImages.galleryRadhanagar, alt: 'Sunset at Radhanagar Beach' },
                            { src: placeholderImages.galleryKalapathar, alt: 'Kalapathar Beach Rocks' },
                            { src: placeholderImages.galleryNeilBharatpur, alt: 'Boats at Bharatpur Beach, Neil Island' },
                            { src: placeholderImages.galleryNeilLaxmanpur, alt: 'Natural Bridge, Laxmanpur Beach' },
                            { src: placeholderImages.galleryAndamanWaters, alt: 'Clear Turquoise Waters of Andaman' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                {/* Overlay removed */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100" id="contact">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Book Your 4-Day Andaman Escape!
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Ready for history, beaches, and island charm? Contact us to customize and book your perfect Andaman holiday today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"> Book This Package Now <ArrowRight className="ml-2 h-5 w-5" /> </button>
                        <Link href="/contact" className="bg-transparent border-2 border-gray-700 text-gray-700 hover:bg-gray-200 font-semibold py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center"> <Phone className="mr-2 h-5 w-5" /> Contact Us </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}