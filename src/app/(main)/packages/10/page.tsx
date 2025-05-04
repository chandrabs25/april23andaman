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
    Sailboat, // For Elephant Beach boat
    Waves, // For Beaches/Water
    Sunset, // Added for Sunset explicitly
    Bird, // For Chidiyatapu
    ArrowRight // Added for buttons
} from 'lucide-react';

// NOTE: Replace placeholder image paths like "/images/..." with actual image URLs.

// Updated Component Name
export default function AndamanPackagePage4D3N_HavelockChidiya() { // Specific name
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Defined keys for all sections
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        radhanagar: '/images/radhanagar-beach.jpg',
        elephantBeach: '/images/elephant-beach.jpg', // Used for Day 3 image
        portBlairAirport: '/images/port-blair-airport.jpg', // Used for Day 4 image
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg',
        highlightHavelockFerry: '/images/havelock-ferry.jpg', // Highlight for ferry
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
        highlightElephant: '/images/elephant-beach-highlight.jpg', // Placeholder highlight
        highlightChidiyatapu: '/images/chidiyatapu-highlight.jpg', // Placeholder highlight
        expectBeaches: '/images/beaches.jpg',
        expectWater: '/images/water-activities.jpg',
        expectHistorical: '/images/historical-sites.jpg',
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        gallery1: '/images/gallery-1.jpg', // Cell Jail
        gallery2: '/images/gallery-2.jpg', // Radhanagar
        gallery3: '/images/gallery-3.jpg', // Corbyns
        gallery4: '/images/gallery-4.jpg', // Ferry
        gallery5: '/images/gallery-5.jpg', // Elephant Beach
        gallery6: '/images/gallery-6.jpg', // Chidiyatapu Sunset
        gallery7: '/images/gallery-7.jpg', // Hotel Example
        gallery8: '/images/gallery-8.jpg', // Andaman Waters
        ctaBackground: '/images/andaman-beach.jpg' // Not used in refactored CTA
    };


    return (
        // Changed background to plain white (matching sample)
        <main className="bg-white min-h-screen">
            {/* Hero Section - Matched sample styling */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src={placeholderImages.hero}
                        alt="Andaman Islands beaches and clear waters"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        3 Nights and 4 Days Andaman Tour Package
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore historic Port Blair, relax on Havelock's stunning beaches, discover marine life at Elephant Beach, and enjoy the sunset at Chidiyatapu. (2 Adults)
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
                        We ensure a safe, comfortable, and memorable experience for all our guests
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
                            <p className="text-gray-600"> We ensure all cabs are sanitized before every trip for a safe holiday experience. </p>
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
                        A carefully crafted journey to experience the best of Andaman.
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
                                    <p> Visit Corbyn's Cove Beach for relaxation or optional water sports. </p>
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
                                    <p> Visit Kalapathar Beach. After lunch (own cost), head to Radhanagar Beach (Asia's 7th best). </p>
                                    <p> Enjoy the stunning sunset at Radhanagar. Overnight in Havelock. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.elephantBeach} alt="Elephant Beach, Havelock Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Sailboat className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 3: Elephant Beach, Return & Chidiyatapu Sunset</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Morning speedboat trip to Elephant Beach, famous for corals. Enjoy included snorkeling/optional sea walking (own cost). </p>
                                    <p> Return to Havelock jetty for lunch (own cost), then ferry back to Port Blair. Check into hotel. </p>
                                    <p> Visit Chidiyatapu (Bird Island) & Mundapahad Beach for a breathtaking sunset. Overnight in Port Blair. </p>
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
                                    <p> Transfer to Veer Savarkar International Airport for departure. </p>
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
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore the historic jail and witness the Light & Sound show. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCorbyns} alt="Corbyn's Cove Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Relax and enjoy optional water sports at this picturesque beach. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightHavelockFerry} alt="Ferry to Havelock" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Havelock Ferry</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Enjoy a scenic cruise journey to Havelock Island (Swaraj Dweep). </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Visit one of Asia's best beaches for stunning sunsets. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightElephant} alt="Elephant Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Elephant Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore vibrant coral reefs via speedboat & optional snorkeling. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightChidiyatapu} alt="Chidiyatapu Sunset" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Chidiyataapu</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Visit the bird sanctuary and witness a beautiful sunset. </p> </div>
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
                        {['standard', 'deluxe', 'premium', 'luxury'].map((tabId) => (
                            <button
                                key={tabId}
                                onClick={() => handleTabChange(tabId)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tabId
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                    }`}
                            >
                                {tabId}
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
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Sea Gull / Blue Marlin (Deluxe AC)</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radha krishna</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹29,370/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
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
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Bay Walk By Sea Side / Marina Manor (Premium AC)</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Bamboo Cottage) / Radhakrishna</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹34,320/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
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
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Hotel Shompen / Olive hotel / Luxor (Deluxe AC)</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹39,820/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
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
                                        <div> <p className="font-semibold text-gray-700">Port Blair (2N):</p> <p className="text-gray-600">Mansha Regency / Sand Heaven (Deluxe Room)</p> </div>
                                        <div> <p className="font-semibold text-gray-700">Havelock (1N):</p> <p className="text-gray-600">Symphony palms Beach Resort (Cottage) / Sands Marina</p> </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                        <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹48,620/- <span className="text-sm font-normal text-gray-600 block">per couple</span> </div>
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
                            <Waves className="text-gray-700" size={24} /> {/* Using Waves */}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectBeaches} alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3> <p className="text-gray-600 text-sm"> Experience beautiful beaches like Radhanagar, Kalapathar, and Corbyn's Cove. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectWater} alt="Water Activities" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Water Activities</h3> <p className="text-gray-600 text-sm"> Enjoy optional water sports at Corbyn's Cove and explore marine life at Elephant Beach. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectHistorical} alt="Historical Sites" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">History & Nature</h3> <p className="text-gray-600 text-sm"> Explore Cellular Jail, witness the Light & Sound Show, and visit Chidiyatapu bird sanctuary. </p> </div>
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
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Entry tickets (Cellular Jail).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Ferry tickets (Port Blair - Havelock - Port Blair).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Speed boat tickets (Elephant Beach).</span> </li>
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
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/90"> Enjoy the freshest catch from the Andaman Sea. </p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Local Cuisine</h3><p className="text-sm text-white/90"> Try authentic local dishes with unique island flavors. </p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4"> Complimentary breakfast included. Lunch and dinner offer flexibility to explore Port Blair & Havelock's diverse dining scene. </p>
                        <p className="text-gray-700"> From local eateries to restaurants, savor fresh seafood, Indian, Continental, and Andamanese dishes. Ask for recommendations! </p>
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
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12"> Preview the beautiful locations you'll visit during your trip. </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail, Port Blair' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach, Havelock Island' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach' },
                            { src: placeholderImages.gallery4, alt: 'Ferry to Havelock Island' },
                            { src: placeholderImages.gallery5, alt: 'Elephant Beach View' },
                            { src: placeholderImages.gallery6, alt: 'Chidiyatapu Sunset' },
                            { src: placeholderImages.gallery7, alt: 'Hotel Accommodation Example' },
                            { src: placeholderImages.gallery8, alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                {/* Removed text overlay */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100" id="contact">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready for Your Andaman Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Contact our travel experts today to secure your booking and start planning your perfect island getaway.
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