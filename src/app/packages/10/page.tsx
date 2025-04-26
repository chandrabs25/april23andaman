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
    Sailboat // Added for Elephant Beach boat
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
                        src="/images/andaman-hero.jpg" // Placeholder image
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
                        3 Nights and 4 Days Andaman Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the historic Port Blair, relax on Havelock's stunning beaches, discover vibrant marine life at Elephant Beach, and enjoy the sunset at Chidiyataapu. (Based on 2 Adults)
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
                                src="/images/andaman-beach-1.jpg" // Placeholder image
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-2.jpg" // Placeholder image
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-3.jpg" // Placeholder image
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
                                        src="/images/cellular-jail.jpg" // Placeholder image
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
                                        Afterward, head to Corbyn's Cove Beach, a stunning beach where you can enjoy thrilling water sports like jet skiing, speed boat rides, and parasailing to Snake Island.
                                    </p>
                                    <p>
                                        In the evening, return to the Cellular Jail for a captivating light and sound show that tells the story of the prison's past. This experience is the perfect blend of history and adventure. Join us for a day filled with exploration, relaxation, and thrill in Port Blair.
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
                                        src="/images/radhanagar-beach.jpg" // Placeholder image
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
                                        Early morning rise and the cab will pick up at 7:00 AM for the 8:00 AM cruise. Be dropped at Port Blair jetty at 7:15 AM. Cruise sailing to SwaraajDweep (Havelock) is two hour thirty minutes on a good weather day. Reach SwaraajDweep (Havelock) by 9:45 AM. An A/C cab with a private driver will pick you up from SwaraajDweep (Havelock) jetty and drop you to the respective hotel. After check-in, rest for a while.
                                    </p>
                                    <p>
                                        First trip will be a visit to Kalapathar beach. It's one of the most beautiful beaches in SwaraajDweep (Havelock) Island. Pristine blue water welcomes you. Spend quality time at the beach and return to the hotel or any restaurant for lunch.
                                    </p>
                                    <p>
                                        After lunch head towards Radhanagar beach. Radhanagar beach is the 7th best beach in Asia, rated by Times and is the 25th best beach in the world. The sunset at Radhanagar beach is one of the best in the islands. After sunset return to the hotel and retire for the day.
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
                                        src="/images/water-activities.jpg" // Placeholder image for Elephant Beach
                                        alt="Elephant Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Sailboat className="mr-2 flex-shrink-0" size={20} /> {/* Updated Icon */}
                                    <span>Day 3: Island Adventures and Wildlife Wonders: A Day Full of Exploration</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day with an early breakfast and head to SwaraajDweep Jetty by 7:45 AM. Board a speed boat to Elephant Beach, famous for its vibrant coral reefs and clear waters. Enjoy snorkeling and sea walking, exploring the rich marine life. (Activities at own cost)
                                    </p>
                                    <p>
                                        Return to the jetty for lunch before heading back to Port Blair. After checking in and resting, visit Chidiyataapu, a peaceful bird sanctuary with a mini zoo and the beautiful Mundapahad Beach.
                                    </p>
                                    <p>
                                        Stay until sunset, then return to your hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex flex-row-reverse"> {/* Changed flex direction */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg" // Placeholder image
                                        alt="Port Blair Airport Departure"
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
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/cellular-jail-highlight.jpg" // Placeholder
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

                        {/* Highlight 2: Corbyn's Cove */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/corbyns-cove.jpg" // Placeholder
                                    alt="Corbyn's Cove Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Relax at this beautiful beach and enjoy optional water sports activities.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 3: Havelock Ferry */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/havelock-ferry.jpg" // Placeholder
                                    alt="Ferry to Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Ferry to Havelock</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Enjoy a scenic cruise journey to Havelock Island (Swaraj Dweep).
                                </p>
                            </div>
                        </div>

                        {/* Highlight 4: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/radhanagar-highlight.jpg" // Placeholder
                                    alt="Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Visit one of Asia's best beaches with pristine white sand and crystal clear waters. Enjoy the sunset.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 5: Elephant Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/water-activities.jpg" // Placeholder
                                    alt="Elephant Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Elephant Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Explore vibrant coral reefs via speedboat. Optional snorkeling & sea walking available.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 6: Chidiyataapu */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/historical-sites.jpg" // Placeholder - needs better image
                                    alt="Chidiyataapu Sunset"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Chidiyataapu</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Visit the bird sanctuary, mini zoo, and witness a beautiful sunset at Mundapahad Beach.
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (2 Adults)</h2>
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
                                            src="/images/hotel-standard.jpg" // Placeholder image
                                            alt="Standard Hotel Example"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Port Blair: Sea Gull / Blue Marlin (Deluxe AC Room)</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Havelock: Blue Island Beach Resort (R) - Bamboo Cottage / Eldorado / Radha krishna resort or similar. Comfortable stay with essential amenities.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹29,370/-
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
                                            src="/images/hotel-deluxe.jpg" // Placeholder image
                                            alt="Deluxe Hotel Example"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Port Blair: Bay Walk By Sea Side(R) / Marina Manor (Premium AC Room)</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Havelock: Blue Island Beach resort (R) - Bamboo Cottage / Radhakrishna resort or similar. Upgraded accommodations.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹34,320/-
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
                                            src="/images/hotel-premium.jpg" // Placeholder image
                                            alt="Premium Hotel Example"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Port Blair: Hotel Shompen (R) / Olive hotel / Luxor (Deluxe AC Room)</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Havelock: Blue Island Beach Resort (R) - Andaman Cottage / Shangrilas / Blue Bird Resort or similar. Superior accommodations.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹39,820/-
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
                                            src="/images/hotel-luxury.jpg" // Placeholder image
                                            alt="Luxury Hotel Example"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Port Blair: Mansha Regency(R) / Sand Heaven (Deluxe Room)</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair & Havelock</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">
                                            Havelock: Symphony palms Beach Resort (R) - Cottage / Sands Marina or similar. Premium luxury accommodations.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹48,620/-
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
                                    src="/images/beaches.jpg" // Placeholder image
                                    alt="Pristine Beaches"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3>
                                <p className="text-gray-600">
                                    Experience some of the most beautiful beaches in the world like Radhanagar, Kalapathar, and Corbyn's Cove.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/water-activities.jpg" // Placeholder image
                                    alt="Water Activities"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Water Activities</h3>
                                <p className="text-gray-600">
                                    Enjoy optional water sports like jet skiing at Corbyn's Cove or snorkeling & sea walking at Elephant Beach.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/historical-sites.jpg" // Placeholder image
                                    alt="Historical Sites"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical & Natural Sites</h3>
                                <p className="text-gray-600">
                                    Explore the Cellular Jail, witness the Light and Sound show, and visit the Chidiyataapu bird sanctuary.
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
                                {[ // Based on template & PDF context
                                    'Accommodation in selected hotel category (2 Nights Port Blair, 1 Night Havelock)',
                                    'Airport/Jetty transfers',
                                    'All sightseeing as per itinerary (Corbyns Cove, Cellular Jail, Kalapathar, Radhanagar, Elephant Beach, Chidiyataapu)',
                                    'Private AC cab with driver for sightseeing & transfers',
                                    'Ferry tickets to Havelock Island (Swaraj Dweep) - Return',
                                    'Speed boat tickets to Elephant Beach - Return',
                                    'Cellular Jail Light and Sound Show tickets',
                                    'All applicable taxes (GST)',

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
                                {[ // Directly from PDF
                                    'Flight Tickets',
                                    'Lunch and dinner',
                                    'Anything which is not mentioned in inclusions',
                                    'Any expense arising due to unforeseen circumstances',
                                    'Any personal expenses. Room service and special orders.',
                                    'Alcoholic and non-alcoholic beverages',
                                    'Water sports activities (Jet Ski, Parasailing, Snorkeling, Sea Walking etc.)' // Added for clarity
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
                                src="/images/seafood.jpg" // Placeholder image
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
                                src="/images/local-cuisine.jpg" // Placeholder image
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
                            While lunch and dinner are not included in the package, Port Blair and Havelock Island offer a variety of dining options ranging from local eateries to upscale restaurants. Your guide can recommend the best places based on your preferences.
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
                            {[ // Directly from PDF
                                'Cancellation charge of rupees 2500 per person is applicable any time after the advance is paid.',
                                'No refund, if cancellation is received less than 10 days before arrival.',
                                '50% of the total package amount is applicable if cancellation is received between 11-20 days before arrival.',
                                '25% of the total package amount is applicable if cancellation is received between 21-30 days before arrival.',
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
                        {[ // Using template images, adjusted alt text
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' },
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' },
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' },
                            { src: '/images/gallery-4.jpg', alt: 'Ferry to Havelock Island' },
                            { src: '/images/gallery-5.jpg', alt: 'Water Sports in Andaman / Elephant Beach' },
                            { src: '/images/gallery-6.jpg', alt: 'Sunset at Radhanagar / Chidiyataapu' },
                            { src: '/images/gallery-7.jpg', alt: 'Hotel Accommodation Example' },
                            { src: '/images/gallery-8.jpg', alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                                <Image
                                    src={image.src} // Placeholder image
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
                        src="/images/andaman-beach.jpg" // Placeholder image
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
                                Call Us Now {/* Using template phone number */}
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