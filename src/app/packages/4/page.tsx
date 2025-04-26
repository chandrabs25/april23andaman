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
    Sun, // Added for sunrise
    Anchor, // Added for Elephant Beach/Snorkeling
    Moon, // Added for Sunset
    Bird, // Added for Chidiyatapu
} from 'lucide-react'; // Added necessary icons

export default function AndamanPackagePage() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            {/* Hero Section - Adapted from example */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        // Keeping example image path, user should replace
                        src="/images/andaman-hero.jpg"
                        alt="Andaman Islands beautiful scenery"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Hero content - Updated based on PDF */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        Andaman Trip: 5 Nights and 6 Days Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the stunning beauty of Port Blair, Havelock (Swaraj Dweep), and Neil Island (Shaheed Dweep) with our comprehensive 6-day package designed for 2 adults.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book This Package
                    </button>
                </div>
            </div>

            {/* Features Section with Images - Adapted from example, text from PDF */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Star className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests
                    </p>

                    {/* Added image gallery before features - Kept from example */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-1.jpg"
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-2.jpg"
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-3.jpg"
                                alt="Tropical Paradise in Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Features grid - Content from PDF */}
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
                                We personally visit the hotels and resorts before recommending to any of our guests visiting Andaman Islands.
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

            {/* Itinerary Section with Images - Updated to 6 days from PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 6-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A carefully crafted journey to experience the best of the Andaman Islands.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/cellular-jail.jpg" // Example image
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Airport Pickup, Corbyn's Cove & Cellular Jail Show</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Upon arrival at the airport, you'll be greeted by a private driver and escorted to your hotel. After check-in and rest, your cab picks you up post-lunch for a visit to the historic Cellular Jail (Kala Paani). Explore the architecture and learn about its poignant history.
                                    </p>
                                    <p>
                                        Next, head to Corbyn's Cove Beach, one of Port Blair's most attractive spots. Indulge in thrilling water sports like jet skiing, speed boating, or parasailing to Snake Island (activities optional, at own cost).
                                    </p>
                                    <p>
                                        In the evening, return to the Cellular Jail for the captivating Light and Sound Show, retelling the jail's history. Afterward, your cab takes you back to the hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse"> {/* Image on the right */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/radhanagar-beach.jpg" // Example image
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: Explore Swaraj Dweep (Havelock) & Overnight Stay</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early! Your cab picks you up at 7:00 AM for the 8:00 AM cruise. Be dropped at Port Blair jetty by 7:15 AM to board for Swaraj Dweep (Havelock). The scenic journey takes ~2.5 hours.
                                    </p>
                                    <p>
                                        Arrive at Swaraj Dweep by 9:45 AM. A private AC cab waits to take you to your hotel. After check-in and rest, visit the stunning Kalapathar Beach with its pristine blue waters. Relax before heading back for lunch (at own cost).
                                    </p>
                                    <p>
                                        After lunch, set off for Radhanagar Beach (Asia's 7th best). Stay until sunset for a mesmerizing experience. Return to your hotel for the night.
                                    </p>
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
                                        src="/images/elephant-beach.jpg" // Example image, user should replace
                                        alt="Elephant Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 3: Elephant Beach Excursion: Snorkeling & Adventure</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Based on your preference (Scuba diving can be arranged separately), you'll be transferred to Swaraj Dweep (Havelock) Jetty. Board a speedboat to Elephant Beach, famed for pristine shores and vibrant coral reefs.
                                    </p>
                                    <p>
                                        Enjoy complimentary snorkeling provided by the boat operator. For more adventure, sea walking can be arranged through Sea Link Adventures (optional, at own cost).
                                    </p>
                                    <p>
                                        By lunchtime, return to Swaraj Dweep Jetty, then head back to your hotel to relax and retire for the day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse"> {/* Image on the right */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/neil-island-beach.jpg" // Example image, user should replace
                                        alt="Bharatpur Beach, Neil Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 4: Journey to Shaheed Dweep (Neil Island)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early, enjoy breakfast, and check out from your Havelock hotel. Head to the jetty to board the 8:00 AM cruise, sailing at 10:15 AM to Shaheed Dweep (Neil Island). Arrive by 11:15 AM.
                                    </p>
                                    <p>
                                        An air-conditioned cab with a private driver will take you to your hotel for check-in. After resting, head to Bharatpur Beach, one of Neil's finest. Enjoy exciting water sports like jet skiing or a glass-bottom boat ride (on-site payment required).
                                    </p>
                                    <p>
                                        As evening approaches, visit Laxmanpur Beach for a breathtaking sunset. Afterward, return to your hotel and retire for the night.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/chidiyatapu.jpg" // Example image, user should replace
                                        alt="Chidiyatapu Sunset Point"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Sun className="mr-2 flex-shrink-0" size={20} /> / <Moon className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 5: Neil Sunrise, Return to Port Blair & Chidiyatapu Sunset</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day early at 4:00 AM with a cab ride to Sitapur Beach to witness a stunning sunrise. After enjoying the morning views, return to your hotel for breakfast.
                                    </p>
                                    <p>
                                        Post-breakfast, check out and head to Neil Jetty to board the 11:30 AM cruise back to Port Blair, arriving by 12:40 PM. Check into your Port Blair hotel, have lunch (own cost), and rest.
                                    </p>
                                    <p>
                                        Later, visit Chidiyatapu, a peaceful bird sanctuary with a nearby mini zoo. End your day at Mundapahad Beach, taking in a beautiful sunset before returning to your hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex flex-row-reverse"> {/* Image on the right */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-airport.jpg" // Example image, user should replace
                                        alt="Port Blair Airport Departure"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 6: Departure with Fond Memories</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day early, and after breakfast, head to the airport as per your flight schedule.
                                    </p>
                                    <p>
                                        If time allows, enjoy some last-minute shopping on the way to bring home a piece of the islands with you. Depart with cherished memories of your Andaman adventure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section with Images - Adapted from example, based on itinerary */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/cellular-jail-highlight.jpg" alt="Cellular Jail" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Show</div>
                            </div>
                            <div className="p-4"> <p className="text-gray-600 text-sm">Explore history and witness the Light & Sound show.</p> </div>
                        </div>
                        {/* Highlight 2: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/radhanagar-highlight.jpg" alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4"> <p className="text-gray-600 text-sm">Relax on one of Asia's best beaches in Havelock.</p> </div>
                        </div>
                        {/* Highlight 3: Elephant Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/elephant-beach-highlight.jpg" alt="Elephant Beach Snorkeling" fill style={{ objectFit: 'cover' }} /> {/* Example Path */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Elephant Beach</div>
                            </div>
                            <div className="p-4"> <p className="text-gray-600 text-sm">Enjoy snorkeling and see vibrant coral reefs.</p> </div>
                        </div>
                        {/* Highlight 4: Neil Island */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/neil-island-highlight.jpg" alt="Neil Island Beaches" fill style={{ objectFit: 'cover' }} /> {/* Example Path */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Neil Island Beaches</div>
                            </div>
                            <div className="p-4"> <p className="text-gray-600 text-sm">Visit Bharatpur, Laxmanpur & Sitapur beaches.</p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Section - Updated with 4 tiers from PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Bed className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (2 Adults)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels across Port Blair (2N), Havelock (3N), and Neil Island (1N) to suit your preferences and budget. Prices are per couple.
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
                    <div className="mt-8 max-w-4xl mx-auto">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image src="/images/hotel-standard.jpg" alt="Standard Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Standard Package Hotels</h3>
                                        <div className="text-gray-600 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Port Blair (2N):</strong> Sea Gull (Deluxe AC Room) / The Pearl / Blue Marlin or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Havelock (3N):</strong> Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radhakrishna resort or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Neil Island (1N):</strong> C S Empire (Standard Room) / Coral Garden or similar</p>
                                        </div>
                                        <p className="text-gray-600 mb-6">Comfortable stays with essential amenities.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹43,175/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image src="/images/hotel-deluxe.jpg" alt="Deluxe Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Deluxe Package Hotels</h3>
                                        <div className="text-gray-600 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Port Blair (2N):</strong> Bay Walk By Sea Side (Premium AC Room) / Andaman Galley / Marina Manor or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Havelock (3N):</strong> Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird Resort or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Neil Island (1N):</strong> Tango Beach Resort (Tango Premium Room) or similar</p>
                                        </div>
                                        <p className="text-gray-600 mb-6">Upgraded accommodations with enhanced amenities.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹51,425/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image src="/images/hotel-premium.jpg" alt="Premium Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Premium Package Hotels</h3>
                                        <div className="text-gray-600 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Port Blair (2N):</strong> Hotel Shompen (Deluxe AC Room) / Olive hotel / Luxor or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Havelock (3N):</strong> Aquays Beach Resort / Havelock Plaza Holiday / Hotel Haywizz or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Neil Island (1N):</strong> Pearl Park Beach Resort (Standard AC Room - Garden view) or similar</p>
                                        </div>
                                        <p className="text-gray-600 mb-6">Superior accommodations with excellent service.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹61,325/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                        <Image src="/images/hotel-luxury.jpg" alt="Luxury Hotel Example" fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Luxury Package Hotels</h3>
                                        <div className="text-gray-600 mb-4 space-y-1 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Port Blair (2N):</strong> Mansha Regency (Deluxe Room) / Sand Heaven / The Escape (Farm Villa) or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Havelock (3N):</strong> Symphony palms Beach Resort (Cottage) / Sands Marina or similar</p>
                                            <p><MapPin size={14} className="inline mr-1 text-blue-600" /> <strong>Neil Island (1N):</strong> Summer Sand (Casa Earthor) or similar</p>
                                        </div>
                                        <p className="text-gray-600 mb-6">Premium luxury stays with top-tier amenities.</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹76,725/-
                                                <span className="text-sm font-normal text-gray-600 block">Per Couple (incl. GST, Stay, Transfers, Sightseeing)</span>
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

            {/* What to Expect Section with Images - Kept from example, content relevant */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Umbrella className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"> <Image src="/images/beaches.jpg" alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3> <p className="text-gray-600">Experience world-class beaches like Radhanagar, Kalapathar, Bharatpur, and Laxmanpur.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"> <Image src="/images/water-activities.jpg" alt="Water Activities" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping & Water Fun</h3> <p className="text-gray-600">Enjoy scenic ferry rides, included snorkeling at Elephant Beach, and optional water sports.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"> <Image src="/images/historical-sites.jpg" alt="Historical Sites & Sunsets" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Culture & Natural Beauty</h3> <p className="text-gray-600">Explore Cellular Jail's history and witness stunning sunrises and sunsets.</p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section - Updated Inclusions/Exclusions from PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="details">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <ClipboardList className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Details</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        What's included in your package and what's not
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"><Check className="text-green-600" size={20} /></div> What's Included
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Accommodation: 2N Port Blair, 3N Havelock, 1N Neil in selected category with Breakfast.',
                                    'Private AC Cab for all transfers & sightseeing (Airport, Jetty, Hotels, Beaches as per itinerary).',
                                    'Tickets: Cellular Jail Entry & Light/Sound Show.',
                                    'Tickets: Cruise Port Blair To Havelock.',
                                    'Tickets: Elephant Beach Boat Ride (incl. complimentary snorkeling).',
                                    'Tickets: Cruise From Havelock To Neil.',
                                    'Tickets: Cruise From Neil To Port Blair.',
                                    'All applicable taxes (GST).'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3"><X className="text-red-600" size={20} /></div> What's Not Included
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Flight Tickets.',
                                    'Lunch and Dinner.',
                                    'Anything not mentioned in inclusions.',
                                    'Optional water sports (Jet Ski, Sea Walking, Glass Bottom Boat etc.) & camera fees.',
                                    'Any expense arising due to unforeseen circumstances (flight delays, cancellations, natural calamities).',
                                    'Personal expenses: Room service, special orders, alcoholic & non-alcoholic beverages.'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining Experience Section with Images - Adapted from example, info from PDF */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Utensils className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>

                    {/* Kept example image structure */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/seafood.jpg" alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/80">Enjoy the freshest catch from the Andaman Sea</p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/local-cuisine.jpg" alt="Local Cuisine" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3><p className="text-sm text-white/80">Explore diverse dining options</p></div>
                        </div>
                    </div>

                    {/* Text based on PDF exclusions/inclusions */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            Your package includes complimentary breakfast at the hotels. Lunch and dinner are not included, giving you the flexibility to explore the diverse culinary scene in Port Blair, Havelock, and Neil Island.
                        </p>
                        <p className="text-gray-600">
                            From local eateries serving authentic Andamanese dishes to restaurants offering fresh seafood, Indian, and continental cuisines, there are plenty of options to suit every palate and budget. Ask your driver or hotel staff for recommendations!
                        </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - Updated from PDF */}
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

            {/* Photo Gallery Section - Kept example structure and images */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Preview the beautiful locations you might experience during your trip
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[ // Using example image paths
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' },
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' },
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' },
                            { src: '/images/gallery-4.jpg', alt: 'Ferry between Islands' },
                            { src: '/images/gallery-5.jpg', alt: 'Water Sports in Andaman' },
                            { src: '/images/gallery-6.jpg', alt: 'Sunset at Laxmanpur Beach' },
                            { src: '/images/gallery-7.jpg', alt: 'Typical Hotel Accommodation' },
                            { src: '/images/gallery-8.jpg', alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-all duration-500 hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Kept example structure */}
            <section className="relative py-16 md:py-24" id="contact">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/andaman-beach.jpg" alt="Andaman Beach" fill style={{ objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your 6-Day Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            Contact our travel experts today to customize and secure your booking for an unforgettable island getaway.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+91XXXXXXXXXX" /* Replace number */ className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                                <Phone className="mr-2" size={18} /> Call Us Now
                            </a>
                            <button className="bg-blue-600 text-white border-2 border-white hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                                Book Online
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}