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
    Utensils
} from 'lucide-react';

export default function AndamanPackagePage() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            {/* Hero Section - Removed wave decoration that was blocking button */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src="/images/andaman-hero.jpg"
                        alt="Andaman Islands beaches and clear waters"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>

                {/* Hero content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        2 Nights 3 Days Andaman Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Experience the beauty of Port Blair & Havelock Island with our exclusive package. Explore historic sites, relax on pristine beaches, and create unforgettable memories.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book This Package
                    </button>
                </div>
            </div>

            {/* Features Section with Images */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Star className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests
                    </p>

                    {/* Added image gallery before features */}
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
                                We personally visit the hotels and resorts before recommending them to any of our guests visiting the Andaman Islands.
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

            {/* Itinerary Section with Images */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 3-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A carefully crafted journey to experience the best of Andaman
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/cellular-jail.jpg"
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Arrival, Corbyn's Cove Beach & Cellular Jail</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Upon your arrival, you'll be warmly greeted at the airport and transferred to your hotel. After settling in and having lunch, your private cab will take you to the historic Cellular Jail, also known as Kala Paani.
                                    </p>
                                    <p>
                                        After immersing yourself in its rich history, head to Corbyn's Cove Beach, one of Port Blair's most beautiful spots. Dive into thrilling water sports like jet skiing, speed boating, or even parasailing to Snake Island for an adrenaline rush.
                                    </p>
                                    <p>
                                        As the day winds down, return to the Cellular Jail for the mesmerizing Light and Sound Show. For an hour, you'll be taken through the powerful history of the jail, leaving you deeply moved. Afterward, your cab will drop you back at the hotel.
                                    </p>
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
                                        src="/images/radhanagar-beach.jpg"
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: Excursion to SwarajDweep (Havelock Island)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day early, as your cab will pick you up at 7:00 AM for the 8:00 AM cruise to SwarajDweep (Havelock). You'll arrive at the Port Blair jetty by 7:15 AM, ready to board. The cruise journey to Havelock lasts approximately two and a half hours on a pleasant day.
                                    </p>
                                    <p>
                                        By 9:45 AM, you'll reach SwarajDweep, where an air-conditioned cab with a private driver will greet you at the jetty and whisk you away to the famous Radhanagar Beach. Recognized as the 7th best beach in Asia and 25th in the world by Times, Radhanagar's pristine shores will captivate you.
                                    </p>
                                    <p>
                                        Relax and soak in its beauty before heading back for your evening cruise to Port Blair.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg"
                                        alt="Port Blair Market"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 3: Return Home with Sweet Memories</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Early morning rise and, after breakfast, head to the airport as per your flight schedule. If time permits, enjoy some last-minute shopping on the way.
                                    </p>
                                    <p>
                                        Take home beautiful memories of your Andaman adventure, from the historic sites to the pristine beaches and crystal-clear waters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section with Images */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/cellular-jail-highlight.jpg"
                                    alt="Cellular Jail"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Explore the historic Cellular Jail and witness the Light and Sound show depicting India's freedom struggle.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/corbyns-cove.jpg"
                                    alt="Corbyn's Cove Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Relax at this beautiful beach and enjoy various water sports activities.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/havelock-ferry.jpg"
                                    alt="Ferry to Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Ferry to Havelock</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Enjoy a scenic cruise journey to Havelock Island with beautiful ocean views.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/radhanagar-highlight.jpg"
                                    alt="Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Visit one of Asia's best beaches with pristine white sand and crystal clear waters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Section */}
            <section className="py-16 md:py-24 bg-blue-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Bed className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels to suit your preferences and budget
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => handleTabChange('standard')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'standard'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => handleTabChange('deluxe')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'deluxe'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Deluxe
                        </button>
                        <button
                            onClick={() => handleTabChange('premium')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'premium'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Premium
                        </button>
                        <button
                            onClick={() => handleTabChange('luxury')}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'luxury'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            Luxury
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-standard.jpg"
                                            alt="Hotel Royal Palace"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Royal Palace - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Comfortable accommodation with all essential amenities for a pleasant stay. Also available: The Pearl, Blue Marlin or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹20,020/-
                                                <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                                Select Package
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
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-deluxe.jpg"
                                            alt="Bay Walk By Sea Side"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bay Walk By Sea Side - Premium AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Upgraded accommodations with additional amenities and better views. Also available: Bell Elite, Marina Manor or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹23,320/-
                                                <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                                Select Package
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
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-premium.jpg"
                                            alt="Hotel Shompen"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Shompen - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Superior accommodations with excellent amenities and service. Also available: Olive Hotel, Luxor or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹26,620/-
                                                <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                                Select Package
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
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-luxury.jpg"
                                            alt="Sea Shells"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sea Shells</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Premium luxury accommodations with top-tier amenities and service. Also available: Mansha Regency or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹32,120/-
                                                <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                            </div>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                                Select Package
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What to Expect Section with Images */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Umbrella className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/beaches.jpg"
                                    alt="Pristine Beaches"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3>
                                <p className="text-gray-600">
                                    Experience some of the most beautiful beaches in the world with crystal clear waters and white sand.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/water-activities.jpg"
                                    alt="Water Activities"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Water Activities</h3>
                                <p className="text-gray-600">
                                    Enjoy various water sports like jet skiing, parasailing, and speed boating at Corbyn's Cove Beach.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/historical-sites.jpg"
                                    alt="Historical Sites"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical Sites</h3>
                                <p className="text-gray-600">
                                    Explore the rich history of the Cellular Jail and learn about India's freedom struggle through the Light and Sound show.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section */}
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
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <Check className="text-green-600" size={20} />
                                </div>
                                What's Included
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Accommodation in selected hotel category',
                                    'Airport/Jetty transfers',
                                    'All sightseeing as per itinerary',
                                    'Private AC cab with driver',
                                    'Ferry tickets to Havelock Island',
                                    'All applicable taxes (GST)',
                                    'Cellular Jail Light and Sound Show tickets'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
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
                                    'Flight tickets',
                                    'Lunch and dinner',
                                    'Water sports activities',
                                    'Personal expenses',
                                    'Room service and special orders',
                                    'Alcoholic and non-alcoholic beverages',
                                    'Any expense arising due to unforeseen circumstances'
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

            {/* Dining Experience Section with Images */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Utensils className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/seafood.jpg"
                                alt="Fresh Seafood"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3>
                                <p className="text-sm text-white/80">
                                    Enjoy the freshest catch from the Andaman Sea
                                </p>
                            </div>
                        </div>

                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/local-cuisine.jpg"
                                alt="Local Cuisine"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Local Cuisine</h3>
                                <p className="text-sm text-white/80">
                                    Try authentic local dishes with unique island flavors
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            While meals are not included in the package, Port Blair and Havelock Island offer a variety of dining options ranging from local eateries to upscale restaurants. Your guide can recommend the best places based on your preferences.
                        </p>
                        <p className="text-gray-600">
                            Don't miss trying the fresh seafood, which is a specialty in the islands. Many restaurants also offer continental and Indian cuisine for those who prefer familiar flavors.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section */}
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
                                '50% of the total package amount is applicable if cancellation is received between 11-20 days before arrival.',
                                '25% of the total package amount is applicable if cancellation is received between 21-30 days before arrival.',
                                '100% cancellation charges is applicable any time after the advance is paid for the arrivals between 15 Dec-15 Jan.'
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

            {/* Photo Gallery Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Preview the beautiful locations you'll visit during your trip
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' },
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' },
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' },
                            { src: '/images/gallery-4.jpg', alt: 'Ferry to Havelock Island' },
                            { src: '/images/gallery-5.jpg', alt: 'Water Sports in Andaman' },
                            { src: '/images/gallery-6.jpg', alt: 'Sunset at Radhanagar Beach' },
                            { src: '/images/gallery-7.jpg', alt: 'Hotel Accommodation' },
                            { src: '/images/gallery-8.jpg', alt: 'Andaman Islands Aerial View' }
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
                        src="/images/andaman-beach.jpg"
                        alt="Andaman Beach"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            Contact our travel experts today to secure your booking and start planning your perfect island getaway.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+919876543210" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                                <Phone className="mr-2" size={18} />
                                Call Us Now
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

