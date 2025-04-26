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
    Anchor, // Added for Ross/North Bay
    Sun, // Added for Sunset
    Bird, // Added for Chidiyatapu
    Fish // Added for North Bay marine life
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
            {/* Hero Section - Adapted from PDF */}
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
                        Explore the historic Port Blair, relax on Havelock's stunning beaches, and discover the unique charm of Ross & North Bay Islands. An unforgettable 4-day adventure awaits! (Adults: 2, Child: 0, Infant: 0)
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book This Package
                    </button>
                </div>
            </div>

            {/* Features Section with Images - Adapted from PDF */}
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

            {/* Itinerary Section with Images - Adapted from PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 4-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A carefully crafted journey to experience the best of Andaman's history, beaches, and islands.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/cellular-jail.jpg" // Placeholder
                                        alt="Cellular Jail, Port Blair"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 1: Discover Port Blair: History and Adventure!</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Begin your adventure with a private airport pick-up, heading straight to your hotel for a relaxing check-in and some much-needed rest.
                                    </p>
                                    <p>
                                        In the afternoon, explore the iconic Cellular Jail, known as Kala Paani. A place where India's freedom fighters were imprisoned, it is steeped in history and stories of valor. Witness the architectural marvel and feel the weight of history.
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
                                        src="/images/radhanagar-beach.jpg" // Placeholder
                                        alt="Radhanagar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: Island Bliss: Explore SwaraajDweep (Havelock)!</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Early morning rise and the cab will pick you up at 7:00 am for the 8:00 am cruise. Be dropped at Port Blair jetty at 7:15am. Cruise sailing to SwaraajDweep (Havelock) is two hour thirty minutes on a good weather day. Reach SwaraajDweep (Havelock) by 9:45am.
                                    </p>
                                    <p>
                                        An A/c cab with private driver will pick you from SwaraajDweep (Havelock) jetty and drop you to the respective hotel. After check in, rest for a while.
                                    </p>
                                    <p>
                                        First trip will be a visit to Kalapathar beach. It's one of the most beautiful beaches in SwaraajDweep (Havelock) Island. Pristine blue water welcomes you. Spend quality time at the beach and return to the hotel or any restaurant for lunch.
                                    </p>
                                    <p>
                                        After lunch head towards Radhanagar beach. Recognized as the 7th best beach in Asia by Times and the 25th best beach in the world. The sunset at Radhanagar beach is one of the best in the islands. After sunset return to the hotel and retire for the day.
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
                                        src="/images/ross-island.jpg" // Placeholder - Needs an image for Ross/North Bay/Chidiyatapu
                                        alt="Ross Island ruins and deer"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} /> {/* Changed icon */}
                                    <span>Day 3: Adventure to Ross, North Bay & Chidiyatapu</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your journey from Havelock Jetty with an early morning ferry to Port Blair. Upon arrival, check in to your hotel, relax for a bit and head towards Water sports complex for a boat ride.
                                    </p>
                                    <p>
                                        First stop: Ross Island, a captivating blend of British colonial history and natural beauty. Wander through ancient ruins, spot roaming deer and peacocks, and soak in the island's unique charm.
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
                        <div className="md:flex flex-row-reverse"> {/* Changed flex direction */}
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg" // Placeholder
                                        alt="Port Blair Airport or market for departure"
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
                                        Rise early and enjoy breakfast before heading to the airport as per your flight schedule. If time allows, indulge in some last-minute shopping on the way.
                                    </p>
                                    <p>
                                        Take home beautiful memories of your Andaman adventure, from the historic sites to the pristine beaches, vibrant islands, and crystal-clear waters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section with Images - Adapted from PDF */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Highlight Card 1 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/cellular-jail-highlight.jpg" alt="Cellular Jail" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Show</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Explore history and witness the Light & Sound show.</p></div>
                        </div>
                        {/* Highlight Card 2 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/radhanagar-highlight.jpg" alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Relax on one of Asia's best beaches.</p></div>
                        </div>
                        {/* Highlight Card 3 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/ross-island-highlight.jpg" alt="Ross Island" fill style={{ objectFit: 'cover' }} /> {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Ross & North Bay</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Discover colonial ruins and vibrant marine life.</p></div>
                        </div>
                        {/* Highlight Card 4 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/chidiyatapu-highlight.jpg" alt="Chidiyatapu Sunset" fill style={{ objectFit: 'cover' }} /> {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Chidiyatapu Sunset</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Witness breathtaking sunsets and birdlife.</p></div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Accommodation Section - Adapted from PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Bed className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (2 Adults)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from our carefully selected hotels across Port Blair & Havelock to suit your preferences and budget. Prices are for 2 adults.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map(tab => (
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
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Hotels</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Port Blair:</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Hotel Royal Palace - Deluxe AC Room</p>
                                            <p className="text-sm text-gray-500">or Blue Marlin or similar</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Havelock (Swaraj Dweep):</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Blue Island Beach Resort (R) - Bamboo Cottage</p>
                                            <p className="text-sm text-gray-500">or Eldorado/ Radhakrishna resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹29,370/-
                                            <span className="text-sm font-normal text-gray-600 block">Total Cost (incl. Stay, Transfers, Sightseeing, GST)</span>
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
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Hotels</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Port Blair:</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Bay Walk By Sea Side(R)- Premium AC Room</p>
                                            <p className="text-sm text-gray-500">or Andaman Galley/ Marina Manor or similar</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Havelock (Swaraj Dweep):</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Blue Island Beach resort (R) - Bamboo Cottage</p>
                                            <p className="text-sm text-gray-500">or Eldorado, Radha krishna resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹34,320/-
                                            <span className="text-sm font-normal text-gray-600 block">Total Cost (incl. Stay, Transfers, Sightseeing, GST)</span>
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
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Hotels</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Port Blair:</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Hotel Shompen (R) - Deluxe AC Room</p>
                                            <p className="text-sm text-gray-500">or Olive hotel/ Luxor or similar</p>
                                        </div>
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Havelock (Swaraj Dweep):</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Blue Island Beach Resort (R) - Andaman Cottage</p>
                                            <p className="text-sm text-gray-500">or Shangrilas / Blue Bird Resort or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹39,820/-
                                            <span className="text-sm font-normal text-gray-600 block">Total Cost (incl. Stay, Transfers, Sightseeing, GST)</span>
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
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Hotels</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Port Blair:</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Mansha Regency(R)-Deluxe Room</p>
                                            <p className="text-sm text-gray-500">or Sand Heaven or similar</p> {/* Assuming Sea Shells from template was example */}
                                        </div>
                                        <div>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={18} className="text-blue-600 mr-2" />
                                                <span>Havelock (Swaraj Dweep):</span>
                                            </div>
                                            <p className="text-gray-700 font-medium">Symphony palms Beach Resort (R) - Cottage</p>
                                            <p className="text-sm text-gray-500">or Sands Marina or similar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                                        <div className="text-2xl font-bold text-blue-600">
                                            ₹48,620/-
                                            <span className="text-sm font-normal text-gray-600 block">Total Cost (incl. Stay, Transfers, Sightseeing, GST)</span>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                                            Select Package
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What to Expect Section with Images - Adapted */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Umbrella className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"><Image src="/images/beaches.jpg" alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /></div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Stunning Beaches</h3>
                                <p className="text-gray-600">Relax on world-class beaches like Radhanagar, Corbyn's Cove, and Kalapathar.</p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"><Image src="/images/historical-sites.jpg" alt="Historical Sites" fill style={{ objectFit: 'cover' }} /></div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Rich History & Culture</h3>
                                <p className="text-gray-600">Explore Cellular Jail's past and Ross Island's colonial ruins.</p>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"><Image src="/images/island-hopping.jpg" alt="Island Hopping" fill style={{ objectFit: 'cover' }} /></div> {/* Placeholder */}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Adventures</h3>
                                <p className="text-gray-600">Experience scenic ferry rides and explore diverse islands like Havelock, Ross, and North Bay.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section - Adapted from PDF */}
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
                                {[ // Inferred based on itinerary and pricing notes
                                    '3 Nights Accommodation in selected hotel category (2N Port Blair, 1N Havelock)',
                                    'Airport pick-up and drop',
                                    'Private AC cab for sightseeing & transfers as per itinerary',
                                    'Entry tickets, permits, and ferry tickets where applicable (Cellular Jail, Ross, North Bay)',
                                    'Inter-island ferry tickets (Port Blair - Havelock - Port Blair)',
                                    'Cellular Jail Light and Sound Show tickets',
                                    'All applicable taxes (GST Included)'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Exclusions - Directly from PDF */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                                    <X className="text-red-600" size={20} />
                                </div>
                                What's Not Included
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Flight Tickets',
                                    'Lunch and dinner',
                                    'Anything which is not mentioned in inclusions', // Combined point
                                    'Water sports activities & camera permits', // Added detail
                                    'Any expense arising due to unforeseen circumstances',
                                    'Any personal expenses. Room service and special orders',
                                    'Alcoholic and non-alcoholic beverages'
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

            {/* Dining Experience Section - Kept generic */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Utensils className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Image 1 */}
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/seafood.jpg" alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Fresh Seafood Delights</h3>
                                <p className="text-sm text-white/80">Savor the freshest catch from the Andaman Sea.</p>
                            </div>
                        </div>
                        {/* Image 2 */}
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/local-cuisine.jpg" alt="Local Cuisine" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-semibold mb-2">Diverse Culinary Options</h3>
                                <p className="text-sm text-white/80">Explore local eateries and multi-cuisine restaurants.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            While lunch and dinner are not included in the package, Port Blair and Havelock Island offer a wide variety of dining options to suit every palate and budget, from beachside shacks to fine dining restaurants.
                        </p>
                        <p className="text-gray-600">
                            Don't miss trying the incredibly fresh seafood. You'll also find plenty of Indian, Continental, and local Andamanese dishes to explore during your stay. Ask your driver or hotel staff for recommendations!
                        </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - From PDF */}
            <section className="py-16 md:py-24 bg-blue-50" id="cancellation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <AlertTriangle className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cancellation Policy</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Please review our cancellation terms before booking.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
                        <ul className="space-y-4">
                            {[
                                'Cancellation charge of rupees 2500 per person is applicable any time after the advance is paid.',
                                'No refund, if cancellation is received less than 10 days before arrival.',
                                '50% of the total package amount is applicable if cancellation is received between 11-20 days before arrival.',
                                '25% of the total package amount is applicable if cancellation is received between 21-30 days before arrival.',
                                '100% cancellation charges is applicable anytime after the advance is paid for the arrivals between 15 Dec - 15 Jan.' // Corrected date format
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

            {/* Photo Gallery Section - Kept generic */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Camera className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Glimpses of the stunning locations included in your Andaman trip.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' },
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' },
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' },
                            { src: '/images/gallery-4.jpg', alt: 'Ross Island Scenery' }, // Updated Alt
                            { src: '/images/gallery-5.jpg', alt: 'North Bay Island Coral Reefs' }, // Updated Alt
                            { src: '/images/gallery-6.jpg', alt: 'Sunset View in Andaman' }, // Updated Alt
                            { src: '/images/gallery-7.jpg', alt: 'Typical Hotel Accommodation' }, // Updated Alt
                            { src: '/images/gallery-8.jpg', alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-lg group">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                <p className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow-md">{image.alt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Kept generic */}
            <section className="relative py-16 md:py-24" id="contact">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/andaman-beach.jpg" // Placeholder
                        alt="Andaman Beach Sunset"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            This 4-day package offers an amazing blend of history, nature, and beach relaxation. Contact us to customize or book your trip!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+91XXXXXXXXXX" // Add actual phone number if available
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg">
                                <Phone className="mr-2" size={18} />
                                Call Us Now (Quote Request)
                            </a>
                            <button className="bg-blue-600 text-white border-2 border-white hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                                Enquire Online
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}