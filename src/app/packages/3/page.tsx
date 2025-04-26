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
    Anchor, // Added for Neil Island Day 3
    Bird, // Added for Chidiyatapu Day 4
    Sailboat // Could use for ferry highlight
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
                        src="/images/andaman-hero.jpg" // Placeholder image
                        alt="Andaman Islands tropical beach"
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
                        4 Nights 5 Days Andaman Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the wonders of Port Blair, Havelock (Swaraj Dweep), and Neil Island (Shaheed Dweep) with our comprehensive 5-day package. Discover history, relax on pristine beaches, and create lasting memories.
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

                    {/* Image gallery */}
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 5-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A detailed plan for your unforgettable 5-day journey through the Andaman Islands.
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
                                    <span>Day 1: Airport Pickup, Corbyn's Cove Beach & Cellular Jail Light and Sound Show</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Upon arrival at the airport, you'll be greeted by a private driver who will escort you to your hotel. After checking in and resting, your cab will pick you up post-lunch for a visit to the historic Cellular Jail, also known as Kala Paani. This iconic site holds powerful stories of sacrifice and patriotism. Take your time exploring the architecture and learning about the harsh conditions endured by the prisoners.
                                    </p>
                                    <p>
                                        Next, head to Corbyn's Cove Beach, one of the most attractive beaches in Port Blair. Indulge in thrilling water sports like jet skiing, speed boating, or parasailing to Snake Island for an exhilarating experience.
                                    </p>
                                    <p>
                                        In the evening, return to the Cellular Jail for the Light and Sound Show. For an hour, you'll be captivated by the moving retelling of the jail's history. After the show, your cab will take you back to the hotel, marking the end of Day 1.
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
                                    <span>Day 2: Explore Swaraj Dweep (Havelock) Island & Overnight Stay</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early as your cab will pick you up at 7:00 AM for an 8:00 AM boat ride to Swaraj Dweep (Havelock). You'll be dropped off at the Port Blair jetty by 7:15 AM. The scenic journey takes about two and a half hours. Upon arrival at Swaraj Dweep by 9:45 AM, a private AC cab will take you to your hotel. Check in, rest, and unwind.
                                    </p>
                                    <p>
                                        Begin your day with a visit to the stunning Kalapathar Beach, known for its pristine blue waters. Spend quality time relaxing before heading back to your hotel or a local restaurant for lunch.
                                    </p>
                                    <p>
                                        After lunch, set off for Radhanagar Beach, ranked among Asia's best beaches. Stay until sunset for a mesmerizing experience. Once the sun dips below the horizon, return to your hotel and relax for the night.
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
                                        src="/images/neil-island.jpg" // Placeholder image
                                        alt="Bharatpur Beach, Neil Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} /> {/* Changed Icon */}
                                    <span>Day 3: Journey to Shaheed Dweep (Neil Island) from Swaraj Dweep (Havelock)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early, enjoy breakfast, and check out of the hotel. Head to the Swaraj Dweep (Havelock) jetty to board the 8:00 AM cruise for the 10:15 AM sailing to Shaheed Dweep (Neil Island). You'll arrive by 11:15 AM, where an air-conditioned cab will transfer you to your hotel for check-in.
                                    </p>
                                    <p>
                                        After resting, head to Bharatpur Beach, one of Neil Island's finest. Indulge in exciting water sports like jet skiing or take a glass-bottom boat ride (on-site payment required).
                                    </p>
                                    <p>
                                        As evening approaches, head to Laxmanpur Beach to witness a breathtaking sunset. Afterward, return to the hotel and retire for the night.
                                    </p>
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
                                        src="/images/chidiyatapu.jpg" // Placeholder image
                                        alt="Sunset at Chidiyatapu, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Bird className="mr-2 flex-shrink-0" size={20} /> {/* Changed Icon */}
                                    <span>Day 4: Return from Shaheed Dweep (Neil Island) & Chidiyatapu Sunset Point</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early at 4:00 AM and take a cab to Sitapur Beach, renowned for stunning sunrise views. After soaking in the morning beauty, return to your hotel for breakfast. Then, check out and head to Neil Jetty to board the 11:30 AM cruise back to Port Blair, arriving around 12:40 PM.
                                    </p>
                                    <p>
                                        Upon arrival, you'll be transferred to your Port Blair hotel for check-in. After lunch and rest, visit Chidiyatapu, a serene bird sanctuary, and explore the nearby mini zoo.
                                    </p>
                                    <p>
                                        End the day at Mundapahad Beach, one of Port Blair's finest spots, to enjoy a breathtaking sunset before heading back to your hotel.
                                    </p>
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
                                        src="/images/port-blair-airport.jpg" // Placeholder image
                                        alt="Port Blair Airport Departure"
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
                                    <p>
                                        Start your day early, and after breakfast, head to the airport according to your flight schedule.
                                    </p>
                                    <p>
                                        If time allows, enjoy some last-minute shopping on the way to bring home a piece of the islands with you. Depart with beautiful memories of your Andaman adventure.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
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
                                    src="/images/cellular-jail-highlight.jpg" // Placeholder image
                                    alt="Cellular Jail"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Show</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Explore history at Cellular Jail and experience the moving Light & Sound Show.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 2: Corbyn's Cove */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/corbyns-cove.jpg" // Placeholder image
                                    alt="Corbyn's Cove Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Relax and enjoy water sports at this popular Port Blair beach.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 3: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/radhanagar-highlight.jpg" // Placeholder image
                                    alt="Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Visit Havelock's world-renowned beach with pristine sands and turquoise waters.
                                </p>
                            </div>
                        </div>

                        {/* Highlight 4: Neil Island */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/neil-island-highlight.jpg" // Placeholder image
                                    alt="Neil Island Beaches"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Neil Island Gems</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">
                                    Discover the beauty of Bharatpur, Laxmanpur, and Sitapur beaches on Neil Island.
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
                        Choose from our carefully selected hotels across Port Blair, Havelock & Neil Island to suit your preferences and budget (based on 2 Adults).
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
                                        <Image
                                            src="/images/hotel-standard.jpg" // Placeholder image
                                            alt="Standard Accommodation"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Hotels</h3>
                                        <div className="space-y-3 text-gray-600 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Port Blair:</strong> Sea Gull (Deluxe AC) / The Pearl / Blue Marlin or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Havelock:</strong> Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radhakrishna or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Neil:</strong> CS Empire (Standard Room) / Coral Garden or similar</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹36,465/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                            alt="Deluxe Accommodation"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Hotels</h3>
                                        <div className="space-y-3 text-gray-600 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Port Blair:</strong> Bay Walk By Sea Side (Premium AC) / Andaman Galley / Marina Manor or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Havelock:</strong> Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird Resort or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Neil:</strong> Tango Beach Resort (Tango Premium Room) or similar</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹42,735/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                            alt="Premium Accommodation"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Hotels</h3>
                                        <div className="space-y-3 text-gray-600 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Port Blair:</strong> Hotel Shompen (Deluxe AC) / Olive Hotel / Luxor or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Havelock:</strong> Aquays Beach Resort / Havelock Plaza Holiday / Hotel Haywizz or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Neil:</strong> Pearl Park Beach Resort (Standard AC Garden View) or similar</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹50,435/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                            alt="Luxury Accommodation"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="p-6 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Hotels</h3>
                                        <div className="space-y-3 text-gray-600 mb-6">
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Port Blair:</strong> Mansha Regency (Deluxe Room) / Sand Heaven / The Escape (Farm Villa) or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Havelock:</strong> Symphony Palms Beach Resort (Cottage) / Sands Marina or similar</p>
                                            <p><MapPin size={16} className="inline mr-1 text-blue-600" /> <strong>Neil:</strong> Summer Sand / Casa Earthor or similar</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ₹62,535/-
                                                <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span>
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
                                    Relax on world-class beaches like Radhanagar, Kalapathar, Bharatpur, Laxmanpur, and Corbyn's Cove.
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
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Adventures</h3>
                                <p className="text-gray-600">
                                    Enjoy scenic ferry rides between islands and opportunities for water sports like jet skiing and boat rides.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/historical-sites.jpg" // Placeholder image
                                    alt="Historical & Natural Sites"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical & Natural Sites</h3>
                                <p className="text-gray-600">
                                    Explore Cellular Jail's history, witness stunning sunrises/sunsets, and visit the Chidiyatapu bird sanctuary.
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
                        Here's what your 4 Nights / 5 Days package includes and excludes.
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
                                    'Hotel Stay: 2N Port Blair, 1N Havelock (Swaraj Dweep), 1N Neil (Shaheed Dweep) in selected category with Complimentary Breakfast.',
                                    'Private AC Cab for all airport/jetty transfers and sightseeing within city limits as per itinerary.',
                                    'Specific Transfers: Hotel to Cellular Jail, Corbyn\'s Cove, PB Jetty; Havelock Jetty to Hotel, Radhanagar, Elephant Beach P&D point, back to Jetty; Neil Jetty to Hotel, Laxmanpur, Bharatpur, Sitapur, back to Jetty; PB Jetty to Hotel, Airport Drop.',
                                    'Tickets & Activities: Cellular Jail Entry, Cellular Jail Light & Sound Show, Cruise Port Blair <> Havelock, Elephant Beach Boat Ride Ticket, Cruise Havelock <> Neil, Cruise Neil <> Port Blair.',
                                    'All applicable taxes (GST included).'
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
                                    'Flight Tickets.',
                                    'Lunch and dinner.',
                                    'Water sports activities not mentioned in inclusions (e.g., Jet Ski, Glass Bottom Boat at Bharatpur).',
                                    'Anything which is not mentioned in inclusions.',
                                    'Any expense arising due to unforeseen circumstances.',
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
                                    Savor the delicious and fresh catch from the Andaman Sea.
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
                                <h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3>
                                <p className="text-sm text-white/80">
                                    Explore local flavors or find familiar Indian and continental dishes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            While lunch and dinner are not included in the package, Port Blair, Havelock, and Neil Island offer diverse dining options, from budget-friendly local eateries to fine dining restaurants.
                        </p>
                        <p className="text-gray-600">
                            Seafood is a must-try! Your driver or hotel can provide recommendations based on your culinary preferences and budget.
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
                        Please review our cancellation terms carefully before booking your trip.
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

            {/* Photo Gallery Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Glimpses of the beautiful locations and experiences awaiting you in Andaman.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail Exterior' }, // Placeholder image
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach Aerial' }, // Placeholder image
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach Shoreline' }, // Placeholder image
                            { src: '/images/gallery-4.jpg', alt: 'Ferry approaching Havelock Island' }, // Placeholder image
                            { src: '/images/gallery-5.jpg', alt: 'Natural Bridge formation, Neil Island' }, // Placeholder image (Update alt text)
                            { src: '/images/gallery-6.jpg', alt: 'Sunset view from Laxmanpur Beach' }, // Placeholder image (Update alt text)
                            { src: '/images/gallery-7.jpg', alt: 'Typical Resort View in Andaman' }, // Placeholder image (Update alt text)
                            { src: '/images/gallery-8.jpg', alt: 'Chidiyatapu Bird Sanctuary View' } // Placeholder image (Update alt text)
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
                        src="/images/andaman-beach.jpg" // Placeholder image
                        alt="Andaman Beach Sunset"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your 5-Day Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            Contact our travel experts today to customize and secure your booking for an unforgettable island getaway.
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