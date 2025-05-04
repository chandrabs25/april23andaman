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
    Anchor, // For Neil Island
    Bird, // For Chidiyatapu / Sitapur
    Sunset, // Added for Sunset Point explicitly if needed, covered by Bird for Chidiyatapu
    ArrowRight // For buttons
} from 'lucide-react';

// Updated Component Name
export default function AndamanPackagePage5D4N_Neil() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Add/Update as needed
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        radhanagar: '/images/radhanagar-beach.jpg',
        neilIsland: '/images/neil-island.jpg', // Bharatpur Beach Image
        chidiyatapu: '/images/chidiyatapu.jpg', // Sunset at Chidiyatapu/Mundapahad
        portBlairAirport: '/images/port-blair-airport.jpg',
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg',
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
        highlightNeil: '/images/neil-island-highlight.jpg', // Specific Neil Highlight
        expectBeaches: '/images/beaches.jpg',
        expectWater: '/images/water-activities.jpg',
        expectHistorical: '/images/historical-sites.jpg',
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        gallery1: '/images/gallery-1.jpg', // Cellular Jail Exterior
        gallery2: '/images/gallery-2.jpg', // Radhanagar Beach Aerial
        gallery3: '/images/gallery-3.jpg', // Corbyn's Cove Beach Shoreline
        gallery4: '/images/gallery-4.jpg', // Ferry approaching Havelock Island
        gallery5: '/images/gallery-5.jpg', // Natural Bridge formation, Neil Island
        gallery6: '/images/gallery-6.jpg', // Sunset view from Laxmanpur Beach
        gallery7: '/images/gallery-7.jpg', // Typical Resort View in Andaman
        gallery8: '/images/gallery-8.jpg', // Chidiyatapu Bird Sanctuary View
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
                        alt="Andaman Islands tropical beach and turquoise water"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        4 Nights 5 Days Andaman Tour Package (with Neil Island)
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore the wonders of Port Blair, Havelock (Swaraj Dweep), and Neil Island (Shaheed Dweep) with our comprehensive 5-day package. Discover history, relax on pristine beaches, and create lasting memories.
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

            {/* Itinerary Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 5-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A detailed plan for your unforgettable 5-day journey through the Andaman Islands.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.cellularJail}
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 1: Arrival, Corbyn's Cove & Cellular Jail Show</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Upon arrival, be greeted by our driver and transferred to your hotel. Post-lunch, visit the historic Cellular Jail (Kala Paani) to explore its architecture and poignant history.
                                    </p>
                                    <p>
                                        Next, head to Corbyn's Cove Beach for relaxation or optional water sports like jet skiing and speed boating.
                                    </p>
                                    <p>
                                        In the evening, witness the moving Light and Sound Show at Cellular Jail, recounting the saga of freedom fighters. Return to your hotel.
                                    </p>
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
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 2: Swaraj Dweep (Havelock) Exploration & Overnight Stay</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Early morning transfer to Port Blair jetty for your cruise to Swaraj Dweep (Havelock). Enjoy the scenic ~2.5-hour journey. Upon arrival, check into your Havelock hotel.
                                    </p>
                                    <p>
                                        Visit the beautiful Kalapathar Beach. After lunch (own expense), proceed to the world-famous Radhanagar Beach, renowned as one of Asia's best.
                                    </p>
                                    <p>
                                        Relax, swim, and witness a breathtaking sunset at Radhanagar Beach before returning to your hotel for an overnight stay.
                                    </p>
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
                                        src={placeholderImages.neilIsland}
                                        alt="Bharatpur Beach, Neil Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Matched icon style */}
                                    <span>Day 3: Journey to Shaheed Dweep (Neil Island)</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        After breakfast, check out and transfer to Havelock jetty for your cruise to Shaheed Dweep (Neil Island). Upon arrival, check into your Neil Island hotel.
                                    </p>
                                    <p>
                                        Visit Bharatpur Beach, known for its coral reefs and clear waters, ideal for optional glass-bottom boat rides or jet skiing (payable on site).
                                    </p>
                                    <p>
                                        Later, proceed to Laxmanpur Beach (Beach No. 1) to witness a spectacular sunset. Return to your hotel for overnight stay.
                                    </p>
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
                                        src={placeholderImages.chidiyatapu}
                                        alt="Sunset at Mundapahad Beach near Chidiyatapu"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Bird className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Matched icon style */}
                                    <Sunset className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Matched icon style */}
                                    <span>Day 4: Neil Island Sunrise, Return & Chidiyatapu Sunset</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Optionally rise early (around 4:00 AM) for a cab visit to Sitapur Beach (Beach No. 5) for a stunning sunrise. Return for breakfast, check out, and transfer to Neil Jetty for your cruise back to Port Blair.
                                    </p>
                                    <p>
                                        Upon arrival in Port Blair, check into your hotel. After rest, visit Chidiyatapu - the "Bird Island" - known for its lush mangroves and diverse birdlife. Explore the biological park.
                                    </p>
                                    <p>
                                        Conclude the day at Mundapahad Beach near Chidiyatapu, enjoying another mesmerizing sunset before returning to your hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.portBlairAirport}
                                        alt="Port Blair Airport Departure"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 5: Departure with Fond Memories</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p>
                                        Enjoy your final breakfast in the Andamans. Depending on your flight schedule, you will be transferred to Veer Savarkar International Airport.
                                    </p>
                                    <p>
                                        Take home cherished memories of the sun-kissed beaches, turquoise waters, and unique experiences of the Andaman Islands.
                                    </p>
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
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.highlightCellular}
                                    alt="Cellular Jail"
                                    fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail & Show</div>
                            </div>
                            <div className="p-5"> {/* Padding matches sample */}
                                <p className="text-gray-600 text-sm">
                                    Explore history at Cellular Jail and experience the moving Light & Sound Show.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 2: Corbyn's Cove */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.highlightCorbyns}
                                    alt="Corbyn's Cove Beach"
                                    fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Relax and enjoy optional water sports at this popular Port Blair beach.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 3: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.highlightRadhanagar}
                                    alt="Radhanagar Beach"
                                    fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Visit Havelock's world-renowned beach with pristine sands and turquoise waters.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 4: Neil Island */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.highlightNeil}
                                    alt="Neil Island Beaches"
                                    fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Neil Island Gems</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Discover the beauty of Bharatpur, Laxmanpur, and Sitapur beaches on Neil Island.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Accommodation Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Bed className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from selected hotels in Port Blair (2N), Havelock (1N) & Neil Island (1N) for 2 Adults.
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
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image
                                            src={placeholderImages.hotelStandard}
                                            alt="Standard Accommodation Example"
                                            fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6"> {/* Adjusted spacing */}
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Sea Gull (Deluxe AC) / The Pearl / Blue Marlin or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Havelock (1N):</strong> Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radhakrishna or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> CS Empire (Standard Room) / Coral Garden or similar</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹36,465/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image
                                            src={placeholderImages.hotelDeluxe}
                                            alt="Deluxe Accommodation Example"
                                            fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Bay Walk By Sea Side (Premium AC) / Andaman Galley / Marina Manor or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Havelock (1N):</strong> Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird Resort or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Tango Beach Resort (Tango Premium Room) or similar</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹42,735/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image
                                            src={placeholderImages.hotelPremium}
                                            alt="Premium Accommodation Example"
                                            fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Hotel Shompen (Deluxe AC) / Olive Hotel / Luxor or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Havelock (1N):</strong> Aquays Beach Resort / Havelock Plaza Holiday / Hotel Haywizz or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Pearl Park Beach Resort (Standard AC Garden View) or similar</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹50,435/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image
                                            src={placeholderImages.hotelLuxury}
                                            alt="Luxury Accommodation Example"
                                            fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Port Blair (2N):</strong> Mansha Regency (Deluxe Room) / Sand Heaven / The Escape (Farm Villa) or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Havelock (1N):</strong> Symphony Palms Beach Resort (Cottage) / Sands Marina or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-gray-500" /> <strong>Neil (1N):</strong> Summer Sand / Casa Earthor or similar</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                ₹62,535/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                        {/* Card structure matches sample info cards */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.expectBeaches}
                                    alt="Pristine Beaches of Andaman"
                                    fill style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3>
                                <p className="text-gray-600">
                                    Relax on world-class beaches like Radhanagar, Bharatpur, Laxmanpur, and Corbyn's Cove.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.expectWater}
                                    alt="Scenic Ferry Rides and Water Activities"
                                    fill style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping Fun</h3>
                                <p className="text-gray-600">
                                    Enjoy comfortable ferry rides between Port Blair, Havelock, and Neil Island. Opportunities for water sports.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src={placeholderImages.expectHistorical}
                                    alt="Historical Sites and Natural Beauty"
                                    fill style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">History & Nature</h3>
                                <p className="text-gray-600">
                                    Explore Cellular Jail's past, witness stunning sunrises/sunsets, and visit Chidiyatapu bird sanctuary.
                                </p>
                            </div>
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
                        Here's what your 4 Nights / 5 Days package (including Neil Island) includes and excludes.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Check className="text-green-500 mr-3 flex-shrink-0" size={24} />
                                What's Included
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    'Hotel Stay: 2N Port Blair, 1N Havelock, 1N Neil Island in selected category with Breakfast.',
                                    'Private AC Cab: Airport/Jetty transfers & sightseeing per itinerary (city limits).',
                                    'Transfers: Hotel-Jail-Corbyn-Jetty (PB); Jetty-Hotel-Radhanagar-Jetty (Havelock); Jetty-Hotel-Beaches-Jetty (Neil); Jetty-Hotel-Chidiyatapu-Hotel (PB); Hotel-Airport Drop.',
                                    'Tickets: Cellular Jail Entry & Light/Sound Show.',
                                    'Cruise Tickets: Port Blair <> Havelock, Havelock <> Neil, Neil <> Port Blair.',
                                    'All applicable taxes (GST included).'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <X className="text-red-500 mr-3 flex-shrink-0" size={24} />
                                What's Not Included
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                {[
                                    'Flight Tickets.',
                                    'Lunch and dinner.',
                                    'Water sports activities not mentioned (e.g., Jet Ski, Glass Bottom Boat).',
                                    'Camera fees (still or video).',
                                    'Personal expenses (tips, laundry, calls, etc.).',
                                    'Anything not explicitly mentioned in inclusions.',
                                    'Expenses due to unforeseen circumstances (delays, cancellations, etc.).'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                        <span>{item}</span>
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
                        {/* Image cards match sample highlight structure */}
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood Platter" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow">
                                <h3 className="text-xl font-semibold mb-2">Fresh Seafood Delights</h3>
                                <p className="text-sm text-white/90">Savor the delicious and fresh catch from the Andaman Sea.</p>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local Andaman Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow">
                                <h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3>
                                <p className="text-sm text-white/90">Explore local flavors or find familiar Indian and continental dishes.</p>
                            </div>
                        </div>
                    </div>

                    {/* Text card matches sample card style */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4">
                            While breakfast is included, lunch and dinner are yours to explore. Port Blair, Havelock, and Neil Island offer diverse dining options, from budget-friendly local eateries to upscale restaurants.
                        </p>
                        <p className="text-gray-700">
                            Seafood is a must-try! Ask your driver or hotel staff for recommendations tailored to your taste and budget.
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
                        Please review our cancellation terms carefully before booking your trip.
                    </p>

                    {/* Card styling matches sample */}
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
                        Glimpses of the beautiful locations and experiences awaiting you.
                    </p>
                    {/* Grid and image styling matches sample's image grids */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail Exterior' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach Aerial' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach Shoreline' },
                            { src: placeholderImages.gallery4, alt: 'Ferry approaching Havelock Island' },
                            { src: placeholderImages.gallery5, alt: 'Natural Bridge formation, Neil Island' },
                            { src: placeholderImages.gallery6, alt: 'Sunset view from Laxmanpur Beach' },
                            { src: placeholderImages.gallery7, alt: 'Typical Resort View in Andaman' },
                            { src: placeholderImages.gallery8, alt: 'Chidiyatapu Bird Sanctuary View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready for Your 5-Day Andaman Adventure (with Neil)?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Contact our travel experts today to customize and book your unforgettable island getaway covering Port Blair, Havelock, and Neil Island.
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