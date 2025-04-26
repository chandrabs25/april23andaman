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
    Anchor // Added Anchor for Day 3 icon
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
            {/* Hero Section */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src="/images/andaman-hero.jpg" // Placeholder Image
                        alt="Andaman Islands tropical landscape"
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
                        3 Nights and 4 Days Andaman Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the historic Port Blair, stunning Havelock Island (Swaraj Dweep), adventurous Ross & North Bay Islands, and the serene Chidiyatapu.
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

                    {/* Image gallery before features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-1.jpg" // Placeholder Image
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-2.jpg" // Placeholder Image
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-3.jpg" // Placeholder Image
                                alt="Tropical Paradise in Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Features */}
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

            {/* Itinerary Section with Images */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 4-Day Itinerary</h2>
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
                                        src="/images/cellular-jail.jpg" // Placeholder Image
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Discover Port Blair: A Journey Through History and Adventure!</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Begin your adventure with a private airport pick-up, heading straight to your hotel for a relaxing check-in and some much-needed rest. In the afternoon, explore the iconic Cellular Jail, known as Kala Paani. A place where India's freedom fighters were imprisoned, it is steeped in history and stories of valor. Witness the architectural marvel and feel the weight of history as you walk through this unforgettable site.
                                    </p>
                                    <p>
                                        Afterward, head to Corbyn's Cove Beach, a stunning beach where you can enjoy thrilling water sports like jet skiing, speed boat rides, and parasailing to Snake Island. In the evening, return to the Cellular Jail for a captivating light and sound show that tells the story of the prison's past. This experience is the perfect blend of history and adventure.
                                    </p>
                                    <p>
                                        Join us for a day filled with exploration, relaxation, and thrill in Port Blair.
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
                                        src="/images/radhanagar-beach.jpg" // Placeholder Image
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: A Day of Island Bliss: Explore the Gems of SwaraajDweep (Havelock)!</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day early, as your cab will pick you up at 7:00 AM for the 8:00 AM cruise to Swaraj Dweep (Havelock). You'll arrive at the Port Blair jetty by 7:15 AM, ready to board. The cruise journey to Havelock lasts approximately two and a half hours on a pleasant day.
                                    </p>
                                    <p>
                                        By 9:45 AM, you'll reach Swaraj Dweep, where an air-conditioned cab with a private driver will greet you at the jetty and whisk you away to the famous Radhanagar Beach. Recognized as the 7th best beach in Asia and 25th in the world by Times, Radhanagar's pristine shores will captivate you. Relax and soak in its beauty before heading back for your evening cruise to Port Blair.
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
                                        src="/images/ross-island.jpg" // Placeholder Image for Ross Island/North Bay
                                        alt="Ross Island ruins"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} /> {/* Changed icon */}
                                    <span>Day 3: Adventure to Ross Island, North Bay Island, and Chidiyatapu Beach</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early as your cab will pick you up at 7:00 AM for an 8:00 AM boat ride. First stop: Ross Island, a captivating blend of British colonial history and natural beauty. Wander through ancient ruins, spot roaming deer and peacocks, and soak in the island's unique charm.
                                    </p>
                                    <p>
                                        Next, gear up for North Bay Island, a snorkeler's dream. Explore vibrant coral reefs, swim among exotic marine life, and experience the stunning underwater world.
                                    </p>
                                    <p>
                                        Upon returning to the Port Blair jetty, check into your hotel. After lunch and some relaxation, set out to visit Chidiyatapu, a bird sanctuary teeming with vibrant birdlife. You can also stop by the mini zoo. End the day at Mundapahad Beach, one of Port Blair's hidden gems, where you can unwind and enjoy a breathtaking sunset before returning to your hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg" // Placeholder Image
                                        alt="Port Blair Market/Airport"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 4: Return Home with Sweet Memory.</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early and enjoy breakfast before heading to the airport as per your flight schedule. If time allows, indulge in some last-minute shopping on the way.
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
                                    src="/images/cellular-jail-highlight.jpg" // Placeholder Image
                                    alt="Cellular Jail"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Light Show</div>
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
                                    src="/images/corbyns-cove.jpg" // Placeholder Image
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
                                    src="/images/radhanagar-highlight.jpg" // Placeholder Image
                                    alt="Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Havelock & Radhanagar Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Enjoy a scenic cruise to Havelock and visit one of Asia's best beaches.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/ross-island-highlight.jpg" // Placeholder Image
                                    alt="Ross Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Ross & North Bay Islands</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Explore British colonial ruins on Ross Island and snorkel at North Bay.
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (Port Blair)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels in Port Blair to suit your preferences and budget (Based on 2 Adults)
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
                                            src="/images/hotel-standard.jpg" // Placeholder Image
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
                                            Comfortable accommodation with essential amenities. Also available: Blue Marlin or similar hotels. (1 Room)
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹29,040/-
                                                <span className="text-sm font-normal text-gray-600 block">Inc Of Stay, Transfers, Sightseeing, & GST</span>
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
                                            src="/images/hotel-deluxe.jpg" // Placeholder Image
                                            alt="Bay Walk By Sea Side"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bay Walk By Sea Side (R) - Premium AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Upgraded accommodations with good amenities. Also available: Marina Manor or similar hotels. (1 Room)
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹33,990/-
                                                <span className="text-sm font-normal text-gray-600 block">Inc Of Stay, Transfers, Sightseeing, & GST</span>
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
                                            src="/images/hotel-premium.jpg" // Placeholder Image
                                            alt="Hotel Shompen"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Shompen (R) - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Superior accommodations with excellent amenities and service. Also available: Olive hotel or similar hotels. (1 Room)
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹39,490/-
                                                <span className="text-sm font-normal text-gray-600 block">Inc Of Stay, Transfers, Sightseeing, & GST</span>
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
                                            src="/images/hotel-luxury.jpg" // Placeholder Image
                                            alt="Sea Shell Hotel"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sea Shell / Mansha Regency (R) - Deluxe Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Premium luxury accommodations with top-tier amenities and service. (1 Room)
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹48,290/-
                                                <span className="text-sm font-normal text-gray-600 block">Inc Of Stay, Transfers, Sightseeing, & GST</span>
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
                                    src="/images/beaches.jpg" // Placeholder Image
                                    alt="Pristine Beaches"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3>
                                <p className="text-gray-600">
                                    Experience some of the most beautiful beaches like Radhanagar, Corbyn's Cove, and serene spots like Mundapahad Beach.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/water-activities.jpg" // Placeholder Image
                                    alt="Water Activities"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Water Activities</h3>
                                <p className="text-gray-600">
                                    Enjoy various water sports like jet skiing, parasailing at Corbyn's Cove, and snorkeling at North Bay Island.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/historical-sites.jpg" // Placeholder Image
                                    alt="Historical Sites"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical & Natural Sites</h3>
                                <p className="text-gray-600">
                                    Explore the Cellular Jail, British ruins on Ross Island, and enjoy birdwatching at Chidiyatapu.
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
                                    'Accommodation in selected hotel category in Port Blair (3 Nights)',
                                    'Airport transfers (Pick up and Drop)',
                                    'Private AC cab with driver for all sightseeing as per itinerary',
                                    'Ferry/Cruise tickets to Havelock Island (Swaraj Dweep) - Both ways',
                                    'Boat tickets for Ross Island & North Bay Island trip',
                                    'Entry tickets/permits for Cellular Jail, Ross Island, etc.',
                                    'Cellular Jail Light and Sound Show tickets',
                                    'Assistance at all arrival and departure points',
                                    'All applicable taxes (GST)'
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
                                    'Flight Tickets are not included.',
                                    'Lunch and dinner are not included.',
                                    'Water sports activities cost (Jet Ski, Snorkeling, Parasailing etc.)',
                                    'Camera fees (still or video) at monuments or attractions',
                                    'Anything which is not mentioned in inclusions.',
                                    'Any expense arising due to unforeseen circumstances is not included.',
                                    'Any personal expenses. Room service and special orders. Alcoholic and non-alcoholic beverages.'
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
                                src="/images/seafood.jpg" // Placeholder Image
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
                                src="/images/local-cuisine.jpg" // Placeholder Image
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
                            While meals (lunch and dinner) are not included in the package, Port Blair offers a variety of dining options ranging from local eateries to upscale restaurants. Your guide can recommend the best places based on your preferences.
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
                                '100% cancellation charges is applicable anytime after the advance is paid for the arrivals between 15 Dec - 15 Jan.'
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
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' }, // Placeholder Image
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' }, // Placeholder Image
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' }, // Placeholder Image
                            { src: '/images/gallery-4.jpg', alt: 'Ferry to Havelock Island' }, // Placeholder Image
                            { src: '/images/gallery-5.jpg', alt: 'Ross Island View' }, // Placeholder Image
                            { src: '/images/gallery-6.jpg', alt: 'Sunset at Chidiyatapu/Mundapahad Beach' }, // Placeholder Image
                            { src: '/images/gallery-7.jpg', alt: 'North Bay Island Corals' }, // Placeholder Image
                            { src: '/images/gallery-8.jpg', alt: 'Hotel Accommodation Example' } // Placeholder Image
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
                        src="/images/andaman-beach.jpg" // Placeholder Image
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
                            Contact our travel experts today to secure your booking and start planning your perfect 4-day island getaway.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+91XXXXXXXXXX" // Replace with actual phone number
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
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