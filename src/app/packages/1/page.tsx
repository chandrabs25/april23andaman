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
    ArrowRight
} from 'lucide-react';

export default function AndamanPackagePage() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    return (
        // Changed background to plain white
        <main className="bg-white min-h-screen">
            {/* Hero Section - No changes needed here, text is already white on overlay */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src="/images/andaman-hero.jpg"
                        alt="Andaman Islands beaches and clear waters"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>

                {/* Hero content - Changed button color */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        2 Nights 3 Days Andaman Package
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Experience the beauty of Port Blair & Havelock Island with our exclusive package. Explore historic sites, relax on pristine beaches, and create unforgettable memories.
                    </p>
                    {/* Changed button color to dark gray */}
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Features Section with Images - Adjusted colors for white theme */}
            <section className="py-10 sm:py-16 md:py-24"> {/* Reduced mobile padding */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background to light gray, icon color to dark gray */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Star className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    {/* Ensured text is dark */}
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests
                    </p>

                    {/* Image gallery - No theme changes needed */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/images/andaman-beach-1.jpg"
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/images/andaman-beach-2.jpg"
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image
                                src="/images/andaman-beach-3.jpg"
                                alt="Tropical Paradise in Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Feature Cards - Adjusted colors for white theme */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card background is white by default, adjust icon bg/color and text */}
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
                                We personally visit the hotels and resorts before recommending them to any of our guests visiting the Andaman Islands.
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

            {/* Itinerary Section - Changed section background to light gray, adjusted colors */}
            {/* Changed section background from cyan-50 to light gray for slight contrast */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 3-Day Itinerary</h2>
                    </div>
                    {/* Ensured text is dark */}
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A carefully crafted journey to experience the best of Andaman
                    </p>

                    {/* Day 1 - Card background is white, adjust text colors */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/cellular-jail.jpg"
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                {/* Changed title color from cyan to dark gray */}
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Icon color */}
                                    <span>Day 1: Arrival, Corbyn's Cove Beach & Cellular Jail</span>
                                </h3>
                                {/* Ensured text is dark */}
                                <div className="space-y-4 text-gray-700">
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

                    {/* Day 2 - Card background is white, adjust text colors */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/radhanagar-beach.jpg"
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                {/* Changed title color */}
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Icon color */}
                                    <span>Day 2: Excursion to SwarajDweep (Havelock Island)</span>
                                </h3>
                                {/* Ensured text is dark */}
                                <div className="space-y-4 text-gray-700">
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

                    {/* Day 3 - Card background is white, adjust text colors */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg"
                                        alt="Port Blair Market"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                {/* Changed title color */}
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} /> {/* Icon color */}
                                    <span>Day 3: Return Home with Sweet Memories</span>
                                </h3>
                                {/* Ensured text is dark */}
                                <div className="space-y-4 text-gray-700">
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

            {/* Highlights Section - Adjusted colors for white theme */}
            <section className="py-10 sm:py-16 md:py-24"> {/* Reduced mobile padding */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    {/* Highlight Cards - Card background white, ensure text dark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/cellular-jail-highlight.jpg"
                                    alt="Cellular Jail"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Explore the historic Cellular Jail and witness the Light and Sound show depicting India's freedom struggle.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/corbyns-cove.jpg"
                                    alt="Corbyn's Cove Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Relax at this beautiful beach and enjoy various water sports activities.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/havelock-ferry.jpg"
                                    alt="Ferry to Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Ferry to Havelock</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Enjoy a scenic cruise journey to Havelock Island with beautiful ocean views.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/radhanagar-highlight.jpg"
                                    alt="Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div>
                            </div>
                            <div className="p-5">
                                <p className="text-gray-600 text-sm">
                                    Visit one of Asia's best beaches with pristine white sand and crystal clear waters.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Section - Changed section background, tab styles, card colors */}
            {/* Changed section background to light gray */}
            <section className="py-16 md:py-24 bg-gray-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        {/* Changed icon background/color */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Bed className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options</h2>
                    </div>
                    {/* Ensured text is dark */}
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels to suit your preferences and budget
                    </p>

                    {/* Tabs - Adjusted styles for white theme (dark active, light inactive) */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        <button
                            onClick={() => handleTabChange('standard')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'standard'
                                ? 'bg-gray-800 text-white shadow-md' // Dark Active
                                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200' // Light Inactive
                                }`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => handleTabChange('deluxe')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'deluxe'
                                ? 'bg-gray-800 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                }`}
                        >
                            Deluxe
                        </button>
                        <button
                            onClick={() => handleTabChange('premium')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'premium'
                                ? 'bg-gray-800 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                }`}
                        >
                            Premium
                        </button>
                        <button
                            onClick={() => handleTabChange('luxury')}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === 'luxury'
                                ? 'bg-gray-800 text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                }`}
                        >
                            Luxury
                        </button>
                    </div>

                    {/* Tab Content - Card background white, adjust text/button colors */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {
                            activeTab === 'standard' && (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 h-64 md:h-auto relative group">
                                            <Image
                                                src="/images/hotel-standard.jpg"
                                                alt="Hotel Royal Palace"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 md:w-2/3">
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Royal Palace - Deluxe AC Room</h3>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                {/* Changed icon color */}
                                                <MapPin size={18} className="text-gray-500 mr-2" />
                                                <span>Port Blair</span>
                                            </div>
                                            <p className="text-gray-700 mb-6">
                                                Comfortable accommodation with all essential amenities for a pleasant stay. Also available: The Pearl, Blue Marlin or similar hotels.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                                {/* Changed price color */}
                                                <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                    ₹20,020/-
                                                    <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                                </div>
                                                {/* Changed button color to dark */}
                                                <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                    Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Deluxe Tab */}
                        {
                            activeTab === 'deluxe' && (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 h-64 md:h-auto relative group">
                                            <Image
                                                src="/images/hotel-deluxe.jpg"
                                                alt="Bay Walk By Sea Side"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 md:w-2/3">
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bay Walk By Sea Side - Premium AC Room</h3>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <MapPin size={18} className="text-gray-500 mr-2" />
                                                <span>Port Blair</span>
                                            </div>
                                            <p className="text-gray-700 mb-6">
                                                Upgraded accommodations with additional amenities and better views. Also available: Bell Elite, Marina Manor or similar hotels.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                                <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                    ₹23,320/-
                                                    <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                                </div>
                                                <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                    Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Premium Tab */}
                        {
                            activeTab === 'premium' && (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 h-64 md:h-auto relative group">
                                            <Image
                                                src="/images/hotel-premium.jpg"
                                                alt="Sea Shell Port Blair"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 md:w-2/3">
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sea Shell Port Blair - Executive Room</h3>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <MapPin size={18} className="text-gray-500 mr-2" />
                                                <span>Port Blair</span>
                                            </div>
                                            <p className="text-gray-700 mb-6">
                                                Experience superior comfort and service with premium amenities. Also available: Peerless Sarovar Portico, Lemon Tree or similar hotels.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                                <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                    ₹27,720/-
                                                    <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                                </div>
                                                <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                    Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {/* Luxury Tab */}
                        {
                            activeTab === 'luxury' && (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                    <div className="md:flex">
                                        <div className="md:w-1/3 h-64 md:h-auto relative group">
                                            <Image
                                                src="/images/hotel-luxury.jpg"
                                                alt="Welcomhotel By ITC Hotels"
                                                fill
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 md:w-2/3">
                                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Welcomhotel By ITC Hotels - Deluxe Room</h3>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <MapPin size={18} className="text-gray-500 mr-2" />
                                                <span>Port Blair</span>
                                            </div>
                                            <p className="text-gray-700 mb-6">
                                                Indulge in the finest accommodations with top-tier amenities and exceptional service. Also available: Symphony Samudra, Munjoh Ocean Resort or similar hotels.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                                <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                                                    ₹32,120/-
                                                    <span className="text-sm font-normal text-gray-600 block">inclusive of GST, Stay, Transfers & Sightseeing</span>
                                                </div>
                                                <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center">
                                                    Select Package <ArrowRight className="ml-1.5 h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>

            {/* Inclusions & Exclusions Section - Adjusted colors for white theme */}
            <section className="py-16 md:py-24"> {/* Removed bg-cyan-50 if it was there */}
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        {/* Changed icon background/color */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <ClipboardList className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        {/* Card background white, ensure text dark */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <Check className="text-green-500 mr-3 flex-shrink-0" size={24} />
                                What's Included
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Accommodation in AC rooms as per selected category.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Daily breakfast at the hotel.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>All transfers and sightseeing by private AC vehicle.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Entry tickets, permits, and ferry tickets as per itinerary.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Airport pick-up and drop-off.</span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>All applicable taxes (GST).</span>
                                </li>
                            </ul>
                        </div>

                        {/* Exclusions */}
                        {/* Card background white, ensure text dark */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <X className="text-red-500 mr-3 flex-shrink-0" size={24} />
                                What's Not Included
                            </h3>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Airfare to and from Port Blair.</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Lunch and dinner unless specified.</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Water sports activities charges.</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Camera fees (still or video).</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Personal expenses like tips, laundry, phone calls.</span>
                                </li>
                                <li className="flex items-start">
                                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                    <span>Anything not mentioned in the inclusions.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - Changed section background, adjusted colors */}
            {/* Changed section background to light gray */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        {/* Changed icon background/color */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <AlertTriangle className="text-gray-700" size={24} />
                        </div>
                        {/* Ensured text is dark */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cancellation Policy</h2>
                    </div>
                    {/* Card background white, ensure text dark */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto border border-gray-100">
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>If cancellations are made 30 days before the start date of the trip, 25% of total tour cost will be charged as cancellation fees.</span>
                            </li>
                            <li className="flex items-start">
                                <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>If cancellations are made 15-30 days before the start date of the trip, 50% of total tour cost will be charged as cancellation fees.</span>
                            </li>
                            <li className="flex items-start">
                                <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>If cancellations are made within 0-15 days before the start date of the trip, 100% of total tour cost will be charged as cancellation fees.</span>
                            </li>
                            <li className="flex items-start">
                                <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                <span>In case of unforeseen weather conditions or government restrictions, certain activities may be cancelled and in such cases the operator will try his best to provide an alternate feasible activity. However no refund will be provided for the same.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Call to Action Section - Changed background, adjusted button styles */}
            {/* Changed background gradient to light gray */}
            <section className="relative py-20 md:py-32 bg-gray-100"> {/* Changed background */}
                {/* Removed image overlay as it might clash with light theme, or keep if desired */}
                {/* <div className="absolute inset-0 opacity-10">
                    <Image
                        src="/images/andaman-beach.jpg"
                        alt="Andaman Beach CTA Background"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div> */}
                <div className="container mx-auto px-4 relative z-10 text-center">
                    {/* Ensure text is dark */}
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready for Your Andaman Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Book this exclusive 2 Nights 3 Days package today and create memories that will last a lifetime. Our travel experts are ready to assist you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Changed button to dark background, light text */}
                        <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                            Book This Package Now <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        {/* Changed button to dark outline */}
                        <Link
                            href="/contact"
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