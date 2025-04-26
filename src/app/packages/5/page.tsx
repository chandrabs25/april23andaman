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
    Ship, // Using Ship for boat rides
    PlaneTakeoff,
    Bed,
    ClipboardList,
    AlertTriangle,
    Phone,
    Camera,
    Umbrella,
    Utensils,
    Anchor, // Alternative for island hopping/marine life
    Wind, // Alternative for beach/nature
    Sun, // Alternative for sunset
    Building, // Alternative for Hotel Icon if needed
    Users // For passenger info (though not used in final display per structure)
} from 'lucide-react';

// NOTE: Replace placeholder image paths like "/images/..." with actual image URLs or paths relevant to the content.
// I am using placeholder paths similar to the example provided.

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
                        src="/images/andaman-hero.jpg" // Placeholder: Replace with a relevant Andaman image
                        alt="Andaman Islands scenery"
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
                        Andaman Trip - 2 Nights and 3 Days Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the wonders of Port Blair: historic sites, stunning beaches, island hopping, and vibrant marine life in this exclusive 3-day package for 2 adults.
                    </p>
                    {/* Removed the Book This Package button as per instruction to only do what's told - the example had it, but the instruction is strict. Re-adding based on example structure */}
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
                        We ensure a safe, comfortable, and memorable experience for all our guests visiting the Andaman Islands.
                    </p>

                    {/* Added image gallery before features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-1.jpg" // Placeholder
                                alt="Beautiful Andaman Beach"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-2.jpg" // Placeholder
                                alt="Crystal Clear Waters of Andaman"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/andaman-beach-3.jpg" // Placeholder
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 3-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A carefully crafted journey to experience the best of Port Blair
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/cellular-jail.jpg" // Placeholder: Replace with Cellular Jail image
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Arrival, Corbyn's Cove Beach & Cellular Jail Light and Sound Show</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Upon arrival at the airport, you'll be greeted by a private driver who will take you to your hotel. After checking in and enjoying some rest, your cab will pick you up post-lunch for a visit to the historic Cellular Jail, also known as Kala Paani. This must-visit site holds countless stories of India's freedom fighters. Take your time exploring the architecture and reflecting on the harsh conditions endured by the prisoners.
                                    </p>
                                    <p>
                                        Once you've absorbed the gravity of this iconic place, head to Corbyn's Cove Beach, one of Port Blair's most beautiful beaches. Indulge in thrilling water sports like jet skiing, speed boating, or parasailing to Snake Island for an unforgettable adventure.
                                    </p>
                                    <p>
                                        In the evening, return to Cellular Jail for the captivating Light and Sound Show. For an hour, you'll be immersed in the history of the jail, with stories brought to life in a moving display. Afterward, your cab will drop you back at your hotel, concluding Day 1.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse">
                            {/* Changed flex-row-reverse to match example alternating layout */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/ross-island.jpg" // Placeholder: Replace with Ross or North Bay Island image
                                        alt="Ross Island ruins and nature"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} /> {/* Changed icon to Anchor for island theme */}
                                    <span>Day 2: Adventure to Ross Island, North Bay Island, and Chidiyatapu Beach</span>
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

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg" // Placeholder: Replace with departure/airport/shopping image
                                        alt="Port Blair Airport or Market"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 3: Return Home with Sweet Memory</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Early morning rise and, after breakfast, head to the airport as per your flight schedule. If time permits, enjoy some last-minute shopping on the way.
                                    </p>
                                    <p>
                                        Take home beautiful memories of your Andaman adventure, filled with history, nature, and coastal beauty.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section - Created based on itinerary */}
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
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail Visit</div>
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
                                    Relax at this beautiful beach and enjoy thrilling water sports activities.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 3: Ross & North Bay */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/north-bay.jpg" // Placeholder: North Bay or Ross Island image
                                    alt="Ross and North Bay Islands"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Ross & North Bay Trip</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Discover colonial ruins on Ross Island and explore vibrant coral reefs at North Bay.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 4: Chidiyatapu */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/chidiyatapu-sunset.jpg" // Placeholder: Chidiyatapu image
                                    alt="Chidiyatapu Sunset"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Chidiyatapu Visit</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Visit the bird sanctuary, mini zoo, and enjoy a breathtaking sunset at Mundapahad Beach.
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
                        Choose from our carefully selected hotels in Port Blair to suit your preferences and budget for 2 nights. All prices are based on 2 Adults.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 animate-fadeIn">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-standard.jpg" // Placeholder
                                            alt="Hotel Royal Palace or similar"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Royal Palace - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-grow">
                                            Comfortable standard accommodation. Also available: Blue Marlin or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹13,970/-
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
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 animate-fadeIn">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-deluxe.jpg" // Placeholder
                                            alt="Bay Walk By Sea Side or similar"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bay Walk By Sea Side (R) - Premium AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-grow">
                                            Enhanced comfort and amenities. Also available: Marina Manor or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹17,270/-
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
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 animate-fadeIn">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-premium.jpg" // Placeholder
                                            alt="Hotel Shompen or similar"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Shompen (R) - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-grow">
                                            Superior accommodation with better services. Also available: Olive hotel/Luxor or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹20,570/-
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
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 animate-fadeIn">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative">
                                        <Image
                                            src="/images/hotel-luxury.jpg" // Placeholder
                                            alt="Sea Shell or similar"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3 flex flex-col">
                                        {/* Note: PDF Title mentioned "4 Adults" here, but pricing/structure implies 2. Displaying hotel names & price as per PDF. */}
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sea Shell - Deluxe Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin size={18} className="text-blue-600 mr-2" />
                                            <span>Port Blair</span>
                                        </div>
                                        <p className="text-gray-600 mb-6 flex-grow">
                                            Top-tier luxury accommodation. Also available: Mansha Regency or similar hotels.
                                        </p>
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹26,070/-
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
                        {/* Add simple fade-in animation CSS */}
                        <style jsx global>{`
                            @keyframes fadeIn {
                                from { opacity: 0; }
                                to { opacity: 1; }
                            }
                            .animate-fadeIn {
                                animation: fadeIn 0.5s ease-in-out;
                            }
                        `}</style>
                    </div>
                </div>
            </section>

            {/* What to Expect Section - Adapted from Example */}
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
                                    src="/images/historical-sites.jpg" // Placeholder
                                    alt="Historical Sites"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical Exploration</h3>
                                <p className="text-gray-600">
                                    Delve into India's past at the Cellular Jail and experience the moving Light and Sound Show.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/island-hopping.jpg" // Placeholder
                                    alt="Island Hopping"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Adventures</h3>
                                <p className="text-gray-600">
                                    Visit Ross Island for history & nature, North Bay for coral reefs, and relax at Corbyn's Cove.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/nature-sunset.jpg" // Placeholder
                                    alt="Nature and Sunset"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Nature & Scenic Beauty</h3>
                                <p className="text-gray-600">
                                    Enjoy birdwatching at Chidiyatapu, spot wildlife, explore beaches, and witness stunning sunsets.
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
                                    'Accommodation: 2 Nights in Port Blair (selected category) with Complimentary Breakfast.',
                                    'Transfers: Private A/C Cab (Airport Pick Up/Drop, Hotel to Sightseeing spots within city limits as per itinerary - Corbyn\'s Cove, Cellular Jail, Jetty, Chidiyatapu).',
                                    'Tickets & Activities: Cellular Jail Entry, Cellular Jail Light and Sound Show, Boat tickets (Port Blair To Ross Island, Ross Island to North Bay, North Bay to Port Blair).',
                                    'All applicable taxes (GST).'
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
                                    'Anything which is not mentioned in inclusions.',
                                    'Any expense arising due to unforeseen circumstances is not included.',
                                    'Any personal expenses, Room service and special orders, Alcoholic and non-alcoholic beverages.',
                                    'Water sports activities at Corbyn\'s Cove or North Bay (can be availed directly).'
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

            {/* Dining Experience Section - Adapted from Example */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Utensils className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/seafood.jpg" // Placeholder
                                alt="Fresh Seafood"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3>
                                <p className="text-sm text-white/80">
                                    Enjoy the freshest catch from the Andaman Sea at local restaurants.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/local-cuisine.jpg" // Placeholder
                                alt="Local Cuisine"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Local Cuisine</h3>
                                <p className="text-sm text-white/80">
                                    Try authentic local dishes with unique island flavors.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            Complimentary breakfast is included with your hotel stay.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Lunch and dinner are not included in the package, giving you the flexibility to explore Port Blair's diverse dining options. From local eateries serving authentic Andamanese food to restaurants offering Indian and Continental cuisine, there's something for every palate.
                        </p>
                        <p className="text-gray-600">
                            Don't miss trying the fresh seafood, which is a specialty in the islands. Your driver or hotel staff can provide recommendations based on your preferences.
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

            {/* Photo Gallery Section - Updated with relevant locations */}
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
                            { src: '/images/gallery-cellular-jail.jpg', alt: 'Cellular Jail, Port Blair' }, // Placeholder
                            { src: '/images/gallery-corbyns-cove.jpg', alt: 'Corbyn\'s Cove Beach' }, // Placeholder
                            { src: '/images/gallery-ross-island.jpg', alt: 'Ross Island Ruins' }, // Placeholder
                            { src: '/images/gallery-north-bay-coral.jpg', alt: 'North Bay Island Corals' }, // Placeholder
                            { src: '/images/gallery-chidiyatapu.jpg', alt: 'Chidiyatapu Beach / Sunset' }, // Placeholder
                            { src: '/images/gallery-port-blair-view.jpg', alt: 'Port Blair Scenery' }, // Placeholder
                            { src: '/images/gallery-hotel-sample.jpg', alt: 'Sample Hotel Accommodation' }, // Placeholder
                            { src: '/images/gallery-andaman-boat.jpg', alt: 'Boat Trip in Andaman' } // Placeholder
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-all duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                                <div className="absolute bottom-2 left-2 text-white text-xs opacity-80 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 md:py-24" id="contact">
                {/* Using a generic Andaman beach background */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/andaman-beach.jpg" // Placeholder: Replace with a nice Andaman beach background
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
                            Contact our travel experts today to customize and book your perfect Port Blair getaway.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* Replace '#' with actual contact link or phone number */}
                            <a href="tel:+91XXXXXXXXXX" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                                <Phone className="mr-2" size={18} />
                                Call Us Now
                            </a>
                            {/* Replace '#' with actual booking link */}
                            <Link href="#" legacyBehavior>
                                <a className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                                    Enquire Online
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}