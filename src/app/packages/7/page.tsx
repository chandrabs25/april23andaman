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
    TreePine, // For Forests/Baratang
    Waves, // For Beaches/Water
    Anchor, // For Ferry/Jetty
    Sunrise, // For Sunrise points
    Sunset, // For Sunset points
    Fish, // For Scuba/Snorkeling
    CameraOff // Placeholder for missing specific images if needed
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
                        6 Nights 7 Days Andaman Tour Package
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the stunning beauty of Port Blair, Baratang, Havelock (Swaraj Dweep), and Neil (Shaheed Dweep) islands. Discover historic sites, pristine beaches, limestone caves, and vibrant marine life.
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
                        We ensure a safe, comfortable, and memorable experience for all our guests visiting the Andaman Islands.
                    </p>

                    {/* Added image gallery before features (Using placeholders from template) */}
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

            {/* Itinerary Section */}
            <section className="py-16 md:py-24 bg-blue-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <Route className="text-blue-600 mr-3 flex-shrink-0" size={24} />
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 7-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        A detailed plan for your unforgettable Andaman adventure.
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
                                    <span>Day 1: Airport Pickup, Corbyn's Cove Beach & Cellular Jail Light and Sound Show</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Upon arrival at the airport, you'll be greeted by a private driver who will escort you to your hotel. After checking in and resting, your cab will pick you up post-lunch for a visit to the historic Cellular Jail (Kala Paani). Explore its architecture and learn about its history.
                                    </p>
                                    <p>
                                        Next, head to Corbyn's Cove Beach. Enjoy the scenic beauty or indulge in water sports like jet skiing, speed boating, or parasailing to Snake Island (activities self-paid).
                                    </p>
                                    <p>
                                        In the evening, return to Cellular Jail for the captivating Light and Sound Show, retelling the jail's history. Afterward, your cab will drop you back at the hotel.
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
                                        src="/images/baratang-limestone.jpg" // Placeholder - Need an image for Baratang/Limestone
                                        alt="Limestone Caves, Baratang Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <TreePine className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 2: Journey to Baratang Island, Limestone Caves & Mud Volcano (via Road)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        An early start at 4:00 AM from your Port Blair hotel. Embark on a scenic drive through the Jarawa Reserve forests (no stopping allowed).
                                    </p>
                                    <p>
                                        On arrival at Baratang, take a short boat ride followed by a brief trek to explore the fascinating Limestone Caves.
                                    </p>
                                    <p>
                                        Visit the unique Mud Volcano. Enjoy lunch at a local restaurant (self-arranged). Return journey to Port Blair, arriving back at your hotel by 6:00 PM.
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
                                        src="/images/kalapathar-beach.jpg" // Placeholder - Need an image for Kalapathar
                                        alt="Kalapathar Beach, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Ship className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 3: Explore Swaraj Dweep (Havelock) Island & Overnight Stay</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Your cab picks you up at 7:00 AM for the 8:00 AM cruise to Swaraj Dweep (Havelock). Arrive at Port Blair jetty by 7:15 AM. The journey takes about 2.5 hours.
                                    </p>
                                    <p>
                                        Arrive at Havelock by 9:45 AM. A private AC cab will transfer you to your hotel. After check-in, visit the stunning Kalapathar Beach. Relax and enjoy the pristine blue waters.
                                    </p>
                                    <p>
                                        After lunch (self-arranged), head to Radhanagar Beach (Asia's 7th best). Stay until sunset for a mesmerizing experience. Return to your hotel for the night.
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
                                        src="/images/elephant-beach.jpg" // Placeholder - Need image for Elephant Beach/Scuba
                                        alt="Elephant Beach / Scuba Diving, Havelock Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Fish className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 4: Scuba Diving Day (Optional) and Visit Elephant Beach</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Based on your choice (Scuba Diving optional), transfer to Havelock jetty to board a speedboat to Elephant Beach, known for pristine shores and vibrant corals.
                                    </p>
                                    <p>
                                        Complimentary snorkeling is provided by the speedboat operator. Sea walking is available via Sea Link Adventures (additional cost).
                                    </p>
                                    <p>
                                        Return to Swaraj Dweep Jetty by lunchtime. Head back to the hotel to relax for the rest of the day.
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
                                        src="/images/bharatpur-beach.jpg" // Placeholder - Need image for Neil Island/Bharatpur
                                        alt="Bharatpur Beach, Neil Island"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 5: Journey to Shaheed Dweep (Neil Island) from Swaraj Dweep (Havelock)</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early, have breakfast, and check out. Head to Havelock jetty to board the 8:00 AM cruise for the 10:15 AM sailing to Shaheed Dweep (Neil Island).
                                    </p>
                                    <p>
                                        Arrive at Neil Island by 11:15 AM. An AC cab will transfer you to your hotel for check-in. After rest, visit Bharatpur Beach. Enjoy water sports like jet skiing or a glass-bottom boat ride (on-site payment).
                                    </p>
                                    <p>
                                        In the evening, head to Laxmanpur Beach for a breathtaking sunset view. Return to the hotel for the night.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/chidiyatapu-sunset.jpg" // Placeholder - Need image for Sitapur/Chidiyatapu
                                        alt="Sitapur Beach Sunrise / Chidiyatapu Sunset"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <Sunset className="mr-2 flex-shrink-0" size={20} /> {/* Or Sunrise */}
                                    <span>Day 6: Return from Shaheed Dweep (Neil Island) & Chidiyatapu Sunset Point</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Rise early (4:00 AM) for a cab ride to Sitapur Beach, known for stunning sunrises. After soaking in the beauty, return to the hotel for breakfast.
                                    </p>
                                    <p>
                                        Check out and head to Neil Jetty for the 11:30 AM cruise back to Port Blair, arriving by 12:40 PM. Transfer to your hotel for check-in.
                                    </p>
                                    <p>
                                        After lunch and rest, visit Chidiyatapu (bird sanctuary and mini zoo). End the day at Mundapahad Beach for a breathtaking sunset. Return to your Port Blair hotel.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 7 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative">
                                <div className="h-64 md:h-full relative">
                                    <Image
                                        src="/images/port-blair-market.jpg" // Placeholder
                                        alt="Port Blair Market / Airport"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="p-6 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-blue-600 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0" size={20} />
                                    <span>Day 7: Departure with Fond Memories</span>
                                </h3>
                                <div className="space-y-3 text-gray-600">
                                    <p>
                                        Start your day early, and after breakfast, head to the airport as per your flight schedule.
                                    </p>
                                    <p>
                                        If time allows, enjoy some last-minute shopping on the way to bring home a piece of the islands with you. Depart with cherished memories of your Andaman trip.
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/cellular-jail-highlight.jpg" alt="Cellular Jail" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Cellular Jail & Light Show</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Explore history and witness the moving Light & Sound show.</p></div>
                        </div>
                        {/* Highlight 2: Corbyn's Cove */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/corbyns-cove.jpg" alt="Corbyn's Cove Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Relax and enjoy water sports at this scenic Port Blair beach.</p></div>
                        </div>
                        {/* Highlight 3: Baratang */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/baratang-limestone.jpg" alt="Baratang Island" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Baratang Island</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Discover Limestone Caves and Mud Volcano via forest reserves.</p></div>
                        </div>
                        {/* Highlight 4: Radhanagar Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/radhanagar-highlight.jpg" alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Radhanagar Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Visit one of Asia's best beaches on Havelock Island.</p></div>
                        </div>
                        {/* Highlight 5: Elephant Beach */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/elephant-beach.jpg" alt="Elephant Beach" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Elephant Beach</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Ideal spot for snorkeling, diving, and seeing coral reefs.</p></div>
                        </div>
                        {/* Highlight 6: Neil Island */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/neil-island-beach.jpg" alt="Neil Island Beaches" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Neil Island Beaches</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Explore Bharatpur, Laxmanpur, and Sitapur beaches.</p></div>
                        </div>
                        {/* Highlight 7: Island Hopping */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/havelock-ferry.jpg" alt="Ferry Transfer" fill style={{ objectFit: 'cover' }} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Scenic Ferry Rides</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Enjoy cruise transfers between Port Blair, Havelock, and Neil.</p></div>
                        </div>
                        {/* Highlight 8: Sunsets/Sunrises */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100">
                            <div className="h-48 relative">
                                <Image src="/images/chidiyatapu-sunset.jpg" alt="Andaman Sunset" fill style={{ objectFit: 'cover' }} /> {/* Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold">Stunning Sunsets & Sunrises</div>
                            </div>
                            <div className="p-4"><p className="text-gray-600 text-sm">Witness beautiful moments at Laxmanpur, Sitapur & Chidiyatapu.</p></div>
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
                        Choose from our curated hotel tiers for your 6-night stay (2N Port Blair, 3N Havelock, 1N Neil). Prices are for 2 Adults.
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
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Package Hotels</h3>
                                <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-600 text-sm">
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Port Blair:</b> Sea Gull (Deluxe AC) / The Pearl / Blue Marlin or similar</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Havelock:</b> Blue Island Beach Resort (Bamboo Cottage) / Eldorado / Radhakrishna resort or similar</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Neil:</b> CS Empire (Standard Room) / Coral Garden or similar</div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                                    <div className="text-2xl font-bold text-blue-600 mb-3 sm:mb-0">
                                        ₹54,425/-
                                        <span className="text-sm font-normal text-gray-600 block">Total for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto">
                                        Select Standard Package
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Package Hotels</h3>
                                <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-600 text-sm">
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Port Blair:</b> Bay Walk By Sea Side (Premium AC) / Andaman Galley / Marina Manor or similar</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Havelock:</b> Blue Island Beach Resort (Andaman Cottage) / Shangrilas / Blue Bird Resort or similar</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Neil:</b> Tango Beach Resort (Tango Premium Room) or similar</div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                                    <div className="text-2xl font-bold text-blue-600 mb-3 sm:mb-0">
                                        ₹61,875/-
                                        <span className="text-sm font-normal text-gray-600 block">Total for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto">
                                        Select Deluxe Package
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Package Hotels</h3>
                                <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-600 text-sm">
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Port Blair:</b> Hotel Shompen (Deluxe AC) / Olive hotel / Luxor or similar ***</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Havelock:</b> Aquays Beach Resort / Havelock Plaza Holiday & Holiday resort / Hotel Haywizz or similar ***</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Neil:</b> Pearl Park Beach Resort (Standard AC Garden View) or similar ***</div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                                    <div className="text-2xl font-bold text-blue-600 mb-3 sm:mb-0">
                                        ₹73,425/-
                                        <span className="text-sm font-normal text-gray-600 block">Total for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto">
                                        Select Premium Package
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Package Hotels</h3>
                                <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-600 text-sm">
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Port Blair:</b> Mansha Regency (Deluxe Room) / Sand Heaven / The Escape (Farm Villa) or similar ****</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Havelock:</b> Symphony palms Beach Resort (Cottage) / Sands Marina or similar ****</div>
                                    <div><MapPin size={16} className="inline mr-1 text-blue-600" /><b>Neil:</b> Summer Sand / Casa Earthor similar ****</div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center justify-between mt-auto">
                                    <div className="text-2xl font-bold text-blue-600 mb-3 sm:mb-0">
                                        ₹91,575/-
                                        <span className="text-sm font-normal text-gray-600 block">Total for 2 Adults (Inc. Stay, Transfers, Sightseeing, & GST)</span>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto">
                                        Select Luxury Package
                                    </button>
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
                            <div className="h-48 relative"> <Image src="/images/beaches.jpg" alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3> <p className="text-gray-600">Relax on world-class beaches like Radhanagar, Laxmanpur, Bharatpur, and Corbyn's Cove.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"> <Image src="/images/historical-sites.jpg" alt="Historical & Natural Wonders" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Historical & Natural Wonders</h3> <p className="text-gray-600">Explore Cellular Jail, Limestone Caves, Mud Volcano, and lush tropical forests.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="h-48 relative"> <Image src="/images/water-activities.jpg" alt="Island Hopping & Activities" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping & Activities</h3> <p className="text-gray-600">Enjoy scenic ferry rides, optional water sports, snorkeling, and stunning sunsets/sunrises.</p> </div>
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
                        What's included in your package and what's not.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"> <Check className="text-green-600" size={20} /> </div> What's Included
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Accommodation: 2N Port Blair, 3N Havelock, 1N Neil in selected hotel category.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Complimentary Breakfast at hotels.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Private AC Cab for transfers & sightseeing (Airport, Hotel, Jetty, Beaches as per itinerary).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Entry Tickets: Cellular Jail Entry, Cellular Jail Light & Sound Show.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Ferry Tickets: Cruise Port Blair to Havelock, Havelock to Neil, Neil to Port Blair.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Activity Tickets: Elephant Beach Boat Ride.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">All applicable taxes (GST).</span> </li>
                            </ul>
                        </div>

                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3"> <X className="text-red-600" size={20} /> </div> What's Not Included
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Flight Tickets are not included.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Lunch and dinner are not included.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Optional activities like Scuba Diving, Sea Walking, Jet Ski etc.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Anything which is not mentioned in inclusions.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Any expense arising due to unforeseen circumstances.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span className="text-gray-700">Personal expenses. Room service and special orders. Alcoholic and non-alcoholic beverages.</span> </li>
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
                            <Image src="/images/seafood.jpg" alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"> <h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3> <p className="text-sm text-white/80">Enjoy the freshest catch from the Andaman Sea.</p> </div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                            <Image src="/images/local-cuisine.jpg" alt="Local Cuisine" fill style={{ objectFit: 'cover' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white"> <h3 className="text-xl font-semibold mb-2">Local Cuisine</h3> <p className="text-sm text-white/80">Try authentic local dishes with unique island flavors.</p> </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <p className="text-gray-600 mb-4">
                            While lunch and dinner are not included in the package, Port Blair, Havelock, and Neil Island offer a variety of dining options ranging from local eateries to upscale restaurants. Your driver or hotel can provide recommendations.
                        </p>
                        <p className="text-gray-600">
                            Don't miss trying the fresh seafood, a specialty of the islands. Continental and Indian cuisines are also widely available.
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
                        Please review our cancellation terms before booking.
                    </p>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-3xl mx-auto">
                        <ul className="space-y-4">
                            <li className="flex items-start"> <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /> <span className="text-gray-700">Cancellation charge of rupees 2500 per person is applicable any time after the advance is paid.</span> </li>
                            <li className="flex items-start"> <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /> <span className="text-gray-700">No refund, if cancellation is received less than 10 days before arrival.</span> </li>
                            <li className="flex items-start"> <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /> <span className="text-gray-700">50% of the total package amount is applicable if cancellation is received between 11 - 20 days before arrival.</span> </li>
                            <li className="flex items-start"> <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /> <span className="text-gray-700">25% of the total package amount is applicable if cancellation is received between 21 - 30 days before arrival.</span> </li>
                            <li className="flex items-start"> <AlertTriangle className="text-amber-500 mr-3 mt-1 flex-shrink-0" size={18} /> <span className="text-gray-700">100% cancellation charges is applicable any time after the advance is paid for the arrivals between 15 Dec - 15 Jan.</span> </li>
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
                        Preview the beautiful locations you might visit during your trip (representative images).
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[ /* Using placeholders from template, adjust alt text */
                            { src: '/images/gallery-1.jpg', alt: 'Cellular Jail, Port Blair' },
                            { src: '/images/gallery-2.jpg', alt: 'Radhanagar Beach, Havelock Island' },
                            { src: '/images/gallery-3.jpg', alt: 'Corbyn\'s Cove Beach' },
                            { src: '/images/gallery-4.jpg', alt: 'Ferry Transfer Andaman' },
                            { src: '/images/gallery-5.jpg', alt: 'Snorkeling at Elephant Beach' },
                            { src: '/images/gallery-6.jpg', alt: 'Sunset at Laxmanpur Beach' },
                            { src: '/images/gallery-7.jpg', alt: 'Andaman Resort View' },
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
                    <Image src="/images/andaman-beach.jpg" alt="Andaman Beach" fill style={{ objectFit: 'cover' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/80"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Andaman Adventure?</h2>
                        <p className="text-lg mb-8">
                            Contact our travel experts today to customize and book your perfect 7-day Andaman island getaway.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+91XXXXXXXXXX" /* Replace with actual number */ className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center">
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