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
    Umbrella, // Consider replacing with Sparkles or CheckCircle for "What to Expect"?
    Utensils,
    Sailboat, // Added for Neil Island
    Waves // Added for Beaches/Water
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
                        src="/images/andaman-hero-generic.jpg" // Placeholder Image
                        alt="Andaman Islands beach panorama"
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
                        Explore the historic charm of Port Blair, the stunning beaches of Havelock, and the serene beauty of Neil Island on this unforgettable Andaman adventure.
                    </p>
                    {/* Add Quote Date, Adults/Children info if needed */}
                    {/* <p className="text-sm text-white/80 mb-1">Quote Date: [Insert Date]</p> */}
                    <p className="text-sm text-white/80 mb-6">Guests: 2 Adults</p>
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
                        We ensure a safe, comfortable, and memorable experience for all our guests.
                    </p>

                    {/* Optional: Add image gallery here if desired */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"> ... </div> */}

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

            {/* Itinerary Section */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 4-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A perfectly planned journey through the highlights of the Andaman Islands.
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
                                    <span>Day 1: Discover Port Blair: History and Adventure</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Begin your adventure with a private airport pick-up, heading straight to your hotel for a relaxing check-in and some much-needed rest. In the afternoon, explore the iconic Cellular Jail (Kala Paani), steeped in history and stories of valor.
                                    </p>
                                    <p>
                                        Afterward, head to Corbyn's Cove Beach, a stunning beach where you can enjoy thrilling water sports like jet skiing, speed boat rides, and parasailing to Snake Island.
                                    </p>
                                    <p>
                                        In the evening, return to the Cellular Jail for a captivating light and sound show that tells the story of the prison's past. This experience is the perfect blend of history and adventure.
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
                                    <span>Day 2: Island Bliss: Explore SwaraajDweep (Havelock)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Early morning rise (cab pick up at 7:00 AM) for the 8:00 AM cruise to SwaraajDweep (Havelock). Arrive at Port Blair jetty by 7:15 AM. The cruise takes about 2.5 hours.
                                    </p>
                                    <p>
                                        Reach Havelock by 9:45 AM. An AC cab will pick you up and take you to your hotel. After check-in, visit Kalapathar Beach, known for its pristine blue water. Spend quality time there.
                                    </p>
                                    <p>
                                        After lunch (at hotel or restaurant), head to Radhanagar Beach (Asia's 7th best, World's 25th best by Times). Enjoy the stunning sunset, one of the best in the islands, before returning to the hotel for the night.
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
                                        src="/images/neil-island-beach.jpg" // Placeholder Image
                                        alt="Bharatpur Beach, Neil Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Sailboat className="mr-2 flex-shrink-0" size={20} /> {/* Changed icon */}
                                    <span>Day 3: Neil Island Adventures & Return to Port Blair</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your journey from Havelock Jetty with an early morning ferry to Neil Island. Upon arrival, begin exploration at Bharatpur Beach, renowned for calm waters and vibrant marine life – perfect for a swim or snorkel.
                                    </p>
                                    <p>
                                        Next, head to Sitapur Beach for its secluded scenic beauty. Then visit Laxmanpur Beach, popular for beachcombing, stunning views, photography, and relaxation.
                                    </p>
                                    <p>
                                        After your beach excursions, return to Neil Island Jetty for your ferry transfer back to Port Blair. Once back, head to your hotel for a relaxing evening.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex flex-row-reverse"> {/* Changed direction for variety */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-airport.jpg" // Placeholder Image
                                        alt="Port Blair Airport Departure"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 4: Return Home with Sweet Memories</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early and enjoy breakfast before heading to the airport as per your flight schedule.
                                    </p>
                                    <p>
                                        If time allows, indulge in some last-minute shopping on the way. Depart with beautiful memories of your Andaman adventure.
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
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/cellular-jail-highlight.jpg" // Placeholder
                                    alt="Cellular Jail"
                                    fill style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Show</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">Explore the historic jail and witness the captivating Light and Sound show.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/corbyns-cove.jpg" // Placeholder
                                    alt="Corbyn's Cove Beach"
                                    fill style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">Relax and enjoy optional water sports at this picturesque Port Blair beach.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/radhanagar-highlight.jpg" // Placeholder
                                    alt="Radhanagar Beach"
                                    fill style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">Visit Havelock's world-famous beach, known for white sands and stunning sunsets.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image
                                    src="/images/neil-island-highlight.jpg" // Placeholder
                                    alt="Neil Island Beaches"
                                    fill style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Neil Island Exploration</div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 text-sm">Discover the tranquil beaches of Neil Island: Bharatpur, Sitapur & Laxmanpur.</p>
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
                        Choose from our carefully selected hotels across Port Blair & Havelock Island. Prices include Stay, Transfers, Sightseeing & GST.
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
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Package</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Port Blair:</p>
                                            <p className="text-gray-600 ml-6">Hotel Royal Palace (Deluxe AC Room), Blue Marlin or similar</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Havelock:</p>
                                            <p className="text-gray-600 ml-6">Blue Island Beach Resort (Bamboo Cottage), Radha Krishna Resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹30,030/-
                                            <span className="text-sm font-normal text-gray-600 block">per couple</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                            Select Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Package</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Port Blair:</p>
                                            <p className="text-gray-600 ml-6">Bay Walk By Sea Side (Premium AC Room), Andaman Galley, Marina Manor or similar</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Havelock:</p>
                                            <p className="text-gray-600 ml-6">Blue Island Beach Resort (Bamboo Cottage), Eldorado, Radha Krishna Resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹34,980/-
                                            <span className="text-sm font-normal text-gray-600 block">per couple</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                            Select Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Package</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Port Blair:</p>
                                            <p className="text-gray-600 ml-6">Hotel Shompen (Deluxe AC Room), Olive Hotel, Luxor or similar</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Havelock:</p>
                                            <p className="text-gray-600 ml-6">Blue Island Beach Resort (Andaman Cottage), Shangrilas, Blue Bird Resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹40,480/-
                                            <span className="text-sm font-normal text-gray-600 block">per couple</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                            Select Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Package</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Port Blair:</p>
                                            <p className="text-gray-600 ml-6">Mansha Regency (Deluxe Room), Sand Heaven or similar</p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700 flex items-center mb-1"><MapPin size={16} className="mr-2 text-blue-600" />Havelock:</p>
                                            <p className="text-gray-600 ml-6">Symphony Palms Beach Resort (Cottage), Sands Marina or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹49,280/-
                                            <span className="text-sm font-normal text-gray-600 block">per couple</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                            Select Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Note: Displaying images for each hotel within the tabs might require a more complex structure or focusing on one representative image per category. */}
                    </div>
                </div>
            </section>

            {/* What to Expect Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Waves className="text-blue-600 mr-3 flex-shrink-0" size={24} /> {/* Changed icon */}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src="/images/beaches.jpg" alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="p-5"><h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3><p className="text-gray-600">Relax on world-renowned beaches like Radhanagar and explore the unique beauty of Kalapathar, Bharatpur, Sitapur, and Laxmanpur.</p></div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src="/images/historical-sites.jpg" alt="Historical Sites" fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="p-5"><h3 className="text-xl font-semibold mb-3 text-gray-800">Historical Immersion</h3><p className="text-gray-600">Delve into India's freedom struggle at the Cellular Jail and witness the moving Light and Sound Show.</p></div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative">
                                <Image src="/images/island-hopping.jpg" alt="Island Hopping" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                            </div>
                            <div className="p-5"><h3 className="text-xl font-semibold mb-3 text-gray-800">Seamless Island Hopping</h3><p className="text-gray-600">Enjoy comfortable ferry transfers between Port Blair, Havelock, and Neil Island, experiencing the diverse landscapes of Andaman.</p></div>
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
                        Clear overview of what your Andaman package covers.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"><Check className="text-green-600" size={20} /></div>What's Included
                            </h3>
                            <ul className="space-y-3">
                                {[ // Inferred inclusions based on pricing notes and typical packages
                                    'Accommodation in selected hotel category (Port Blair & Havelock)',
                                    'Private AC cab for airport/jetty transfers & sightseeing',
                                    'All sightseeing entries/tickets as per itinerary (Cellular Jail, Light & Sound Show)',
                                    'Ferry tickets (Port Blair - Havelock - Neil Island - Port Blair)',
                                    'Breakfast at hotels (verify, often included but not explicitly stated in PDF)',
                                    'All applicable taxes (GST included in price)'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start"><Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /><span className="text-gray-700">{item}</span></li>
                                ))}
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3"><X className="text-red-600" size={20} /></div>What's Not Included
                            </h3>
                            <ul className="space-y-3">
                                {[ // From PDF
                                    'Flight Tickets',
                                    'Lunch and dinner',
                                    'Anything which is not mentioned in inclusions',
                                    'Any expense arising due to unforeseen circumstances',
                                    'Personal expenses (Room service, special orders, alcoholic/non-alcoholic beverages)',
                                    'Water sports activities charges' // Implicitly excluded
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start"><X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /><span className="text-gray-700">{item}</span></li>
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
                            <Image src="/images/seafood.jpg" alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/80">Indulge in the freshest catch from the Andaman Sea.</p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/local-cuisine.jpg" alt="Local Cuisine" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"><h3 className="text-xl font-semibold mb-2">Local & Varied Cuisine</h3><p className="text-sm text-white/80">Explore local flavors and diverse restaurant options.</p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">While lunch and dinner are not included, Port Blair, Havelock, and Neil Island offer a wide array of dining options, from local shacks serving fresh seafood to multi-cuisine restaurants. Your driver/guide can provide recommendations.</p>
                        <p className="text-gray-600">Don't miss trying the delicious seafood. Continental and Indian dishes are also readily available.</p>
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
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Please review our cancellation terms carefully before booking.</p>
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
                        <ul className="space-y-4">
                            {[ // From PDF
                                'Cancellation charge of rupees 2500 per person is applicable any time after the advance is paid.',
                                'No refund, if cancellation is received less than 10 days before arrival.',
                                '50% of the total package amount is applicable if cancellation is received between 11-20 days before arrival.',
                                '25% of the total package amount is applicable if cancellation is received between 21-30 days before arrival.',
                                '100% cancellation charges is applicable any time after the advance is paid for the arrivals between 15 Dec - 15 Jan.'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start"><AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /><span className="text-gray-700">{item}</span></li>
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
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Glimpses of your Andaman journey.</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[ // Placeholder images and alt text based on itinerary
                            { src: '/images/gallery-cellular-jail.jpg', alt: 'Cellular Jail Exterior' },
                            { src: '/images/gallery-corbyns-cove.jpg', alt: 'Corbyn\'s Cove Beach View' },
                            { src: '/images/gallery-havelock-ferry.jpg', alt: 'Ferry approaching Havelock Island' },
                            { src: '/images/gallery-radhanagar.jpg', alt: 'Sunset at Radhanagar Beach' },
                            { src: '/images/gallery-kalapathar.jpg', alt: 'Kalapathar Beach Rocks' },
                            { src: '/images/gallery-neil-bharatpur.jpg', alt: 'Boats at Bharatpur Beach, Neil Island' },
                            { src: '/images/gallery-neil-laxmanpur.jpg', alt: 'Natural Bridge, Laxmanpur Beach' },
                            { src: '/images/gallery-andaman-waters.jpg', alt: 'Clear Turquoise Waters of Andaman' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-all duration-500 hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 md:py-24" id="contact">
                <div className="absolute inset-0 z-0">
                    <Image src="/images/andaman-beach-cta.jpg" alt="Andaman Beach Sunset" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your 4-Day Andaman Escape!</h2>
                        <p className="text-lg mb-8">Ready for history, beaches, and island charm? Contact us to customize and book your perfect Andaman holiday today.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+910000000000" // Placeholder number
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
                                <Phone className="mr-2" size={18} /> Call Us Now
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