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
    Anchor, // Added for Elephant Beach/Barren Island
    Bird, // Added for Chidiyatapu
    Sunset // Added for Sunset Point
} from 'lucide-react';

export default function AndamanPackagePage() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths (replace with actual image paths if available)
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        kalapathar: '/images/andaman-beach-kalapathar.jpg', // Placeholder
        barrenIsland: '/images/andaman-barren-island.jpg', // Placeholder
        elephantBeach: '/images/andaman-elephant-beach.jpg', // Placeholder
        chidiyatapu: '/images/andaman-chidiyatapu.jpg', // Placeholder
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg',
        highlightHavelock: '/images/havelock-ferry.jpg',
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
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
        ctaBackground: '/images/andaman-beach.jpg'
    };


    return (
        <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src={placeholderImages.hero}
                        alt="Andaman Islands beaches and clear waters"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        4 Nights 5 Days Andaman Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the stunning beauty of Port Blair, Havelock (Swaraj Dweep), and unique island experiences. A perfect getaway for 2 Adults.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book This Package
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Star className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={placeholderImages.feature1}
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={placeholderImages.feature2}
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={placeholderImages.feature3}
                                alt="Tropical Paradise in Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Car className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Sanitized Vehicles</h3>
                            <p className="text-gray-600">
                                We make sure all the cabs we provide are sanitized before every trip to provide you a safe holiday experience.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Hotel className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Handpicked Hotels & Resorts</h3>
                            <p className="text-gray-600">
                                We personally visit the hotels and resorts before recommending to any of our guests visiting the Andaman Islands.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="text-blue-600" size={28} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Verified Operators & Travel Partners</h3>
                            <p className="text-gray-600">
                                We give you the best safe experience with our verified partners for water activities at each location.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Section */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 5-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A detailed plan for your Andaman adventure (2 Adults)
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.cellularJail}
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Airport Pickup, Corbyn's Cove Beach & Cellular Jail Light and Sound Show</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>Upon arrival at the airport, you'll be greeted by a private driver who will escort you to your hotel. After checking in and resting, your cab will pick you up post-lunch for a visit to the historic Cellular Jail (Kala Paani). Explore its architecture and learn about its history.</p>
                                    <p>Next, head to Corbyn's Cove Beach, one of Port Blair's most attractive beaches. Indulge in thrilling water sports like jet skiing, speed boating, or parasailing to Snake Island.</p>
                                    <p>In the evening, return to the Cellular Jail for the captivating Light and Sound Show, retelling the jail's history. Afterward, your cab will take you back to the hotel.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse">
                             <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.kalapathar}
                                        alt="Kalapathar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                           <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: Explore Swaraj Dweep (Havelock) Island & Overnight Stay</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>Rise early! Your cab picks you up at 7:00 AM for the 8:00 AM cruise to Swaraj Dweep (Havelock). Arrive at Port Blair jetty by 7:15 AM. The scenic journey takes about 2.5 hours.</p>
                                    <p>Reach Swaraj Dweep by 9:45 AM. A private AC cab awaits to take you to your hotel. After check-in, visit the stunning Kalapathar Beach with its pristine blue waters. Relax before heading back for lunch (at hotel or local restaurant).</p>
                                    <p>After lunch, visit Radhanagar Beach (Asia's 7th best). Stay until sunset for a mesmerizing experience. Return to your hotel and relax for the night.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.barrenIsland}
                                        alt="Boat trip near Barren Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 3: Adventurous Trip to Barren Island</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>Depart early from your hotel and head to Swaraaj Dweep Jetty by 5:00 AM to board a speed boat to Barren Island, known for its stunning coral reefs and diverse marine life.</p>
                                    <p>Enjoy snorkeling and game fishing in the crystal-clear waters. The excursion lasts approximately 10 hours, including a 3-hour travel time each way.</p>
                                    <p>Breakfast, lunch, and refreshments are provided during the trip. <strong className="text-amber-700">Note:</strong> Permit charges (₹500 for Indians, ₹2500 for foreigners) are borne by the client.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                     {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse">
                             <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src={placeholderImages.elephantBeach}
                                        alt="Elephant Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                           <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Bird className="mr-2 flex-shrink-0" size={20} /> <Sunset className="mr-2 flex-shrink-0" size={20}/>
                                    <span>Day 4: Elephant Beach, Return to Port Blair & Chidiyataapu Sunset</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>Start early with breakfast and depart for Swaraaj Dweep Jetty by 7:45 AM. Board a speed boat to Elephant Beach, famous for vibrant coral reefs and marine life. Enjoy snorkeling and sea walking (activities extra).</p>
                                    <p>Return to the jetty for lunch at a nearby restaurant.</p>
                                    <p>At 1:30 PM, board a cruise back to Port Blair. After checking into your hotel and freshening up, head to Chidiyatapu Beach (Bird Sanctuary) for a mesmerizing sunset. Return to the hotel for a restful night.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                     <Image
                                        src={placeholderImages.ctaBackground} // Using CTA background as placeholder
                                        alt="Airport Departure"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 5: Departure with Fond Memories</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>Start your day early, and after breakfast, head to the airport as per your flight schedule.</p>
                                    <p>If time allows, enjoy some last-minute shopping on the way to bring home a piece of the islands with you.</p>
                                    <p>Depart with cherished memories of your Andaman adventure.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section - Updated for 5 days */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Show</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Explore history and witness the Light & Sound show.</p></div>
                        </div>
                         <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Relax on one of Asia's best beaches.</p></div>
                        </div>
                         <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.elephantBeach} alt="Elephant Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Elephant Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Discover vibrant coral reefs and marine life.</p></div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.chidiyatapu} alt="Chidiyatapu Sunset" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Chidiyatapu Sunset</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Witness a breathtaking sunset at the bird sanctuary.</p></div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Accommodation Section - Updated with 4 Tiers & Prices */}
            <section className="py-16 md:py-24 bg-blue-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Bed className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (4 Nights)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels (2N Port Blair, 2N Havelock) for 2 Adults.
                    </p>

                     {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map((tabId) => (
                            <button
                                key={tabId}
                                onClick={() => handleTabChange(tabId)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tabId
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {tabId}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image src={placeholderImages.hotelStandard} alt="Standard Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Standard Hotels</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-1"><strong>Port Blair (2N):</strong> Hotel Royal Palace (Deluxe AC Room), Blue Marlin or similar.</p>
                                        <p className="text-gray-600 mb-6"><strong>Havelock (2N):</strong> Blue Island Beach Resort (Bamboo Cottage), Eldorado/Radha krishna resort or similar.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹88,880/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">Select Package</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                           <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image src={placeholderImages.hotelDeluxe} alt="Deluxe Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deluxe Hotels</h3>
                                         <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-1"><strong>Port Blair (2N):</strong> Bay Walk By Sea Side (Premium AC Room), Andaman Galley/Marina Manor or similar.</p>
                                        <p className="text-gray-600 mb-6"><strong>Havelock (2N):</strong> Blue Island Beach Resort (Andaman Cottage), Shangrilas/Blue Bird Resort or similar.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹95,480/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">Select Package</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                             <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image src={placeholderImages.hotelPremium} alt="Premium Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Premium Hotels</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-1"><strong>Port Blair (2N):</strong> Hotel Shompen (Deluxe AC Room), Olive hotel/Luxor or similar.</p>
                                        <p className="text-gray-600 mb-6"><strong>Havelock (2N):</strong> Aquays Beach Resort, Havelock Plaza Holiday/Holiday resort/Hotel Haywizz or similar.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹1,03,180/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">Select Package</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image src={placeholderImages.hotelLuxury} alt="Luxury Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Luxury Hotels</h3>
                                         <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-1"><strong>Port Blair (2N):</strong> Mansha Regency (Deluxe Room), Sand Heaven/The Escape (Farm Villa) or similar ****</p>
                                        <p className="text-gray-600 mb-6"><strong>Havelock (2N):</strong> Symphony palms Beach Resort (Cottage), Sands Marina or similar ****</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹1,15,280/-
                                                 <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Incl. GST, Stay, Transfers, Sightseeing)</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">Select Package</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

             {/* What to Expect Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Umbrella className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.expectBeaches} alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3>
                                <p className="text-gray-600">Relax on world-class beaches like Radhanagar, Kalapathar, and Corbyn's Cove.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.expectWater} alt="Water Activities" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Exploration</h3>
                                <p className="text-gray-600">Discover diverse marine life at Elephant Beach & potentially Barren Island (optional trip).</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.expectHistorical} alt="Historical & Cultural Sites" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">History & Sunsets</h3>
                                <p className="text-gray-600">Explore Cellular Jail's history and witness stunning sunsets at Radhanagar & Chidiyatapu.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section - Updated */}
            <section className="py-16 md:py-24 bg-blue-50" id="details">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <ClipboardList className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Details</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Details for 4 Nights / 5 Days Package for 2 Adults
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <Check className="text-green-600" size={20} />
                                </div>
                                What's Included
                            </h3>
                            <ul className="space-y-3">
                                 <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-gray-700"><strong>HOTEL STAY:</strong> 2 Nights in Port Blair, 2 Nights in Havelock (Swaraj Dweep) in selected category with Complimentary Breakfast.</span>
                                </li>
                                 <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-gray-700"><strong>PRIVATE A/C CAB:</strong> Airport Pick Up & Drop, All sightseeing transfers (Port Blair & Havelock) as per itinerary (Within City Limits). Includes transfers Hotel-Jetty-Hotel.</span>
                                </li>
                                 <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-gray-700"><strong>TICKETS & ACTIVITIES:</strong> Cellular Jail Entry, Cellular Jail Light and Sound Show, Cruise Port Blair To Havelock, Cruise From Havelock To Port Blair, Elephant Beach Boat Ride Tickets.</span>
                                </li>
                                 <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-gray-700">All applicable taxes (GST).</span>
                                </li>
                                {/* Note: Barren Island trip includes transfers, boat, food but permit is extra */}
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span className="text-gray-700">Barren Island Trip: Speed boat, transfers, breakfast, lunch, refreshments (Permit charges extra).</span>
                                </li>
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                    <X className="text-red-600" size={20} />
                                </div>
                                What's Not Included
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Flight Tickets.',
                                    'Lunch and dinner.',
                                    'Water sports activities (e.g., Jet Ski, Snorkeling, Sea Walking at Corbyn\'s Cove/Elephant Beach) unless specified.',
                                    'Permit charges for Barren Island trip (₹500 Indian / ₹2500 Foreigner per person).',
                                    'Anything which is not mentioned in inclusions.',
                                    'Any expense arising due to unforeseen circumstances (flight delays, cancellations, natural calamities etc.).',
                                    'Personal expenses. Room service and special orders. Alcoholic and non-alcoholic beverages.'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining Experience Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Utensils className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3>
                                <p className="text-sm text-white/80">Enjoy the freshest catch from the Andaman Sea</p>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src={placeholderImages.diningLocal} alt="Local Cuisine" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Local Cuisine</h3>
                                <p className="text-sm text-white/80">Try authentic local dishes with unique island flavors</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            Lunch and dinner are not included in the package, allowing you flexibility. Port Blair and Havelock Island offer a variety of dining options from local eateries to multi-cuisine restaurants.
                        </p>
                        <p className="text-gray-600">
                            Don't miss trying the fresh seafood, a specialty of the islands. Your driver or hotel can provide recommendations based on your preferences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - Updated */}
            <section className="py-16 md:py-24 bg-blue-50" id="cancellation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <AlertTriangle className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cancellation Policy</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Please review our cancellation terms before booking
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
                        <ul className="space-y-4">
                            {[
                                'Cancellation charge of rupees 2500 per person is applicable any time after the advance is paid.',
                                'No refund, if cancellation is received less than 10 days before arrival.',
                                '50% of the total package amount is applicable if cancellation is received between 11 - 20 days before arrival.',
                                '25% of the total package amount is applicable if cancellation is received between 21 - 30 days before arrival.',
                                '100% cancellation charges is applicable any time after the advance is paid for the arrivals between 15 Dec - 15 Jan.'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section - Using placeholders */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Preview the beautiful locations you might visit during your trip
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail, Port Blair' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach, Havelock Island' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach' },
                            { src: placeholderImages.gallery4, alt: 'Ferry to Havelock Island' },
                            { src: placeholderImages.gallery5, alt: 'Water Sports in Andaman' },
                            { src: placeholderImages.gallery6, alt: 'Sunset at Radhanagar Beach' },
                            { src: placeholderImages.gallery7, alt: 'Hotel Accommodation View' },
                            { src: placeholderImages.gallery8, alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-all duration-500 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 md:py-24" id="contact">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={placeholderImages.ctaBackground}
                        alt="Andaman Beach background"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            Contact our travel experts today to customize and book your 5-day Andaman getaway!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+91XXXXXXXXXX" /* Replace with actual phone number */ className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                                <Phone className="mr-2" size={18} />
                                Call Us Now
                            </a>
                            <button className="bg-blue-600 text-white border-2 border-white hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                                Enquire Online
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}