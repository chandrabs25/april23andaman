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
    Sun, // For sunrise
    Anchor, // For Elephant Beach/Snorkeling
    Moon, // For Sunset (Can reuse Sunset icon if preferred)
    Bird, // For Chidiyatapu
    ArrowRight // For buttons
} from 'lucide-react';

// Updated Component Name
export default function AndamanPackagePage6D5N() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Add/Update as needed for 6-day tour
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        radhanagar: '/images/radhanagar-beach.jpg',
        elephantBeach: '/images/elephant-beach.jpg',
        neilIslandBeach: '/images/neil-island-beach.jpg', // Generic Neil beach
        chidiyatapu: '/images/chidiyatapu.jpg',
        portBlairAirport: '/images/port-blair-airport.jpg',
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
        highlightElephant: '/images/elephant-beach-highlight.jpg', // May need specific highlight image
        highlightNeil: '/images/neil-island-highlight.jpg', // May need specific highlight image
        expectBeaches: '/images/beaches.jpg',
        expectWater: '/images/water-activities.jpg',
        expectHistorical: '/images/historical-sites.jpg',
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        gallery1: '/images/gallery-1.jpg',
        gallery2: '/images/gallery-2.jpg',
        gallery3: '/images/gallery-3.jpg',
        gallery4: '/images/gallery-4.jpg',
        gallery5: '/images/gallery-5.jpg',
        gallery6: '/images/gallery-6.jpg',
        gallery7: '/images/gallery-7.jpg',
        gallery8: '/images/gallery-8.jpg',
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
                        alt="Andaman Islands beautiful tropical scenery"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        Andaman Trip: 5 Nights and 6 Days Tour Package
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore the stunning beauty of Port Blair, Havelock (Swaraj Dweep), and Neil Island (Shaheed Dweep) with our comprehensive 6-day package designed for 2 adults.
                    </p>
                    {/* Changed button color to dark gray (matching sample) */}
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Features Section with Images - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
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
                            <Image
                                src={placeholderImages.feature1}
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src={placeholderImages.feature2}
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src={placeholderImages.feature3}
                                alt="Tropical Paradise in Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Feature Cards - Matched sample styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Car className="text-gray-700" size={28} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Sanitized Vehicles</h3>
                            <p className="text-gray-600">
                                We make sure all the cabs we provide are sanitized before every trip to provide you a safe holiday experience.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Hotel className="text-gray-700" size={28} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Handpicked Hotels & Resorts</h3>
                            <p className="text-gray-600">
                                We personally visit the hotels and resorts before recommending them to any of our guests visiting Andaman Islands.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="text-gray-700" size={28} />
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Verified Operators & Travel Partners</h3>
                            <p className="text-gray-600">
                                We give you the best safe experience with our verified partners for water activities at each location.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Section - Matched sample styling, updated to 6 days */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 6-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A carefully crafted journey to experience the best of the Andaman Islands.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.cellularJail}
                                        alt="Cellular Jail, Port Blair"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 1: Arrival, Corbyn's Cove & Cellular Jail Show</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Arrive at Port Blair airport, meet our representative, and transfer to your hotel. Post-lunch, visit the historic Cellular Jail (Kala Paani).</p>
                                    <p>Next, head to Corbyn's Cove Beach for relaxation or optional water sports (own cost).</p>
                                    <p>Conclude the day with the moving Light and Sound Show at Cellular Jail, depicting India's freedom struggle.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.radhanagar}
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 2: Swaraj Dweep (Havelock) Exploration & Overnight Stay</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Early morning transfer to the jetty for your cruise to Swaraj Dweep (Havelock). Check into your hotel upon arrival.</p>
                                    <p>Visit the serene Kalapathar Beach. After lunch (own cost), head to the world-renowned Radhanagar Beach (Asia's 7th best).</p>
                                    <p>Enjoy the stunning white sands and turquoise waters, staying until sunset for a mesmerizing view. Return to the hotel.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.elephantBeach}
                                        alt="Elephant Beach, Havelock Island"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 3: Elephant Beach Excursion: Snorkeling Included</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Transfer to Havelock Jetty and board a speedboat to Elephant Beach, famous for its clear waters and vibrant coral reefs.</p>
                                    <p>Enjoy complimentary snorkeling session provided by the boat operator. Other activities like sea walking are available at extra cost.</p>
                                    <p>Return to the jetty around lunchtime and head back to your hotel to relax for the remainder of the day.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.neilIslandBeach}
                                        alt="Bharatpur Beach, Neil Island"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Reusing Ship icon */}
                                    <span>Day 4: Journey to Shaheed Dweep (Neil Island) & Beach Visits</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Check out from Havelock hotel after breakfast and proceed to the jetty for your cruise to Shaheed Dweep (Neil Island).</p>
                                    <p>Upon arrival, check into your Neil Island hotel. Visit Bharatpur Beach, known for water sports (optional, own cost).</p>
                                    <p>Later, head to Laxmanpur Beach to witness a spectacular sunset. Return to your hotel for overnight stay.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.chidiyatapu}
                                        alt="Chidiyatapu Sunset Point, Port Blair"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Sun className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Sunrise */}
                                    / <Moon className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Sunset */}
                                    <span>Day 5: Neil Sunrise, Return to Port Blair & Chidiyatapu Sunset</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Optional early morning (4 AM) visit to Sitapur Beach for sunrise. Return for breakfast, check out, and cruise back to Port Blair.</p>
                                    <p>Check into your Port Blair hotel. After rest, visit Chidiyatapu ("Bird Island"), exploring the biological park.</p>
                                    <p>End the day at Mundapahad Beach near Chidiyatapu for a beautiful sunset view before returning to the hotel.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.portBlairAirport}
                                        alt="Port Blair Airport for Departure"
                                        fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 6: Departure with Fond Memories</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>Enjoy breakfast at the hotel. Proceed to Veer Savarkar International Airport for your departure.</p>
                                    <p>Take home cherished memories of your 6-day Andaman adventure, filled with stunning beaches and unique experiences.</p>
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
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail & Show</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm">Explore history and witness the Light & Sound show.</p> </div>
                        </div>
                        {/* Highlight 2: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm">Relax on one of Asia's best beaches in Havelock.</p> </div>
                        </div>
                        {/* Highlight 3: Elephant Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightElephant} alt="Elephant Beach Snorkeling" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Elephant Beach</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm">Enjoy complimentary snorkeling and see vibrant corals.</p> </div>
                        </div>
                        {/* Highlight 4: Neil Island */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightNeil} alt="Neil Island Beaches" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Neil Island Beaches</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm">Visit Bharatpur, Laxmanpur & Sitapur beaches.</p> </div>
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
                        Choose from selected hotels: Port Blair (2N), Havelock (2N - *Note: Itinerary is 3N, PDF price is 2N*), Neil Island (1N). Prices per couple.
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

                    {/* Tab Content - Matched sample styling */}
                    <div className="mt-8 max-w-4xl mx-auto"> {/* Added max-width */}
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelStandard} alt="Standard Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Standard Hotels</h3>
                                        <div className="text-gray-700 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Sea Gull / The Pearl / Blue Marlin</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Havelock (2N):</strong> Blue Island (Bamboo Cottage) / Eldorado / Radhakrishna</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> C S Empire / Coral Garden</p>
                                        </div>
                                        <p className="text-gray-600 mb-6 text-sm">Comfortable stays with essential amenities.</p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹43,175/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelDeluxe} alt="Deluxe Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deluxe Hotels</h3>
                                        <div className="text-gray-700 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Bay Walk By Sea Side / Andaman Galley / Marina Manor</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Havelock (2N):</strong> Blue Island (Andaman Cottage) / Shangrilas / Blue Bird</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Tango Beach Resort (Premium Room)</p>
                                        </div>
                                        <p className="text-gray-600 mb-6 text-sm">Upgraded accommodations with enhanced amenities.</p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹51,425/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelPremium} alt="Premium Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Premium Hotels</h3>
                                        <div className="text-gray-700 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Hotel Shompen / Olive hotel / Luxor</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Havelock (2N):</strong> Aquays Beach Resort / Havelock Plaza / Hotel Haywizz</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Pearl Park Beach Resort (Standard AC Garden view)</p>
                                        </div>
                                        <p className="text-gray-600 mb-6 text-sm">Superior accommodations with excellent service.</p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹61,325/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelLuxury} alt="Luxury Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Luxury Hotels</h3>
                                        <div className="text-gray-700 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Mansha Regency / Sand Heaven / The Escape</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Havelock (2N):</strong> Symphony palms (Cottage) / Sands Marina</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Summer Sand (Casa Earthor)</p>
                                        </div>
                                        <p className="text-gray-600 mb-6 text-sm">Premium luxury stays with top-tier amenities.</p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹76,725/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Important Note */}
                    <p className="text-center text-gray-500 text-xs mt-8 italic">
                        *Note: Accommodation pricing based on 2 nights in Havelock as per PDF, while itinerary shows 3 nights. Please confirm final pricing and duration.
                    </p>
                </div>
            </section>

            {/* What to Expect Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Umbrella className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectBeaches} alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Stunning Beaches</h3> <p className="text-gray-600 text-sm">Experience world-class beaches: Radhanagar, Kalapathar, Elephant, Bharatpur, Laxmanpur, Sitapur & Corbyn's Cove.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectWater} alt="Water Activities" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping & Water Fun</h3> <p className="text-gray-600 text-sm">Enjoy scenic ferry rides, included snorkeling at Elephant Beach, and optional water sports across islands.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectHistorical} alt="Historical Sites & Sunsets" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Culture & Natural Beauty</h3> <p className="text-gray-600 text-sm">Explore Cellular Jail's history, witness stunning sunrises/sunsets, and visit Chidiyatapu bird sanctuary.</p> </div>
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
                        What's included in your 5 Nights / 6 Days package and what's not.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Check className="text-green-500 mr-3 flex-shrink-0" size={24} /> What's Included
                            </h3>
                            <ul className="space-y-3 text-gray-700 text-sm"> {/* Reduced font size */}
                                {[
                                    'Accommodation: 2N Port Blair, 3N Havelock, 1N Neil in selected category with Breakfast.',
                                    'Private AC Cab for all transfers & sightseeing (Airport, Jetty, Hotels, Beaches per itinerary).',
                                    'Tickets: Cellular Jail Entry & Light/Sound Show.',
                                    'Cruise Tickets: Port Blair <> Havelock.',
                                    'Tickets: Elephant Beach Boat Ride (incl. complimentary snorkeling).',
                                    'Cruise Tickets: Havelock <> Neil.',
                                    'Cruise Tickets: Neil <> Port Blair.',
                                    'All applicable taxes (GST).'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <X className="text-red-500 mr-3 flex-shrink-0" size={24} /> What's Not Included
                            </h3>
                            <ul className="space-y-3 text-gray-700 text-sm"> {/* Reduced font size */}
                                {[
                                    'Flight Tickets.',
                                    'Lunch and Dinner.',
                                    'Optional water sports (Jet Ski, Sea Walking, Glass Bottom Boat etc.) & camera fees.',
                                    'Anything not mentioned in inclusions.',
                                    'Expenses due to unforeseen circumstances (flight delays, cancellations, natural calamities).',
                                    'Personal expenses: Room service, tips, laundry, alcoholic & non-alcoholic beverages.'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>{item}</span>
                                    </li>
                                ))}
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
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood Platter" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/90">Enjoy the freshest catch from the Andaman Sea</p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local Andaman Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3><p className="text-sm text-white/90">Explore diverse dining options</p></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4">
                            Your package includes complimentary breakfast. Lunch and dinner are flexible, allowing you to explore the diverse culinary scene of Port Blair, Havelock, and Neil Island at your own pace.
                        </p>
                        <p className="text-gray-700">
                            From local shacks serving authentic dishes to restaurants offering fresh seafood, Indian, and continental fare, find options for every taste and budget. Ask for recommendations!
                        </p>
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
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Please review our cancellation terms before booking.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto border border-gray-100">
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { text: 'Cancellation charge of ₹2500 per person applicable any time after advance payment.', color: 'yellow' },
                                { text: 'No refund if cancellation is received less than 10 days before arrival.', color: 'red' },
                                { text: '50% of total package cost applicable if cancellation is 11-20 days before arrival.', color: 'yellow' },
                                { text: '25% of total package cost applicable if cancellation is 21-30 days before arrival.', color: 'yellow' },
                                { text: '100% cancellation charge applicable for arrivals between 15 Dec - 15 Jan (Post Advance).', color: 'red' }
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <AlertTriangle className={`${item.color === 'red' ? 'text-red-500' : 'text-yellow-500'} mr-2 mt-1 flex-shrink-0`} size={16} />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                            <li className="flex items-start">
                                <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>In case of unforeseen weather/government restrictions, operator will try to provide alternatives, but no refund is provided for cancelled activities.</span>
                            </li>
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
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        Preview the beautiful locations you might experience during your trip.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail, Port Blair' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach, Havelock Island' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach' },
                            { src: placeholderImages.gallery4, alt: 'Ferry between Islands' },
                            { src: placeholderImages.gallery5, alt: 'Water Sports in Andaman' },
                            { src: placeholderImages.gallery6, alt: 'Sunset at Laxmanpur Beach' },
                            { src: placeholderImages.gallery7, alt: 'Typical Hotel Accommodation' },
                            { src: placeholderImages.gallery8, alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100" id="contact">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready to Book Your 6-Day Andaman Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Contact our travel experts today to customize and secure your booking for this unforgettable 6-day island getaway.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                            Book This Package Now <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <Link
                            href="/contact" // Use appropriate contact link
                            className="bg-transparent border-2 border-gray-700 text-gray-700 hover:bg-gray-200 font-semibold py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center"
                        >
                            <Phone className="mr-2 h-5 w-5" /> Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}