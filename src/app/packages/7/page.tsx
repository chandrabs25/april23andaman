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
    TreePine, // For Baratang
    Waves,    // For Beaches/Water (or use Umbrella)
    Anchor,   // For Ferry/Neil/Elephant
    Sunrise,  // For Sunrise points
    Sunset,   // For Sunset points
    Fish,     // For Scuba/Snorkeling
    ArrowRight // For buttons
} from 'lucide-react';

// NOTE: Replace placeholder image paths like "/images/..." with actual image URLs.

// Updated Component Name
export default function AndamanPackagePage7D6N() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Add/Update as needed for 7-day tour
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        baratangLimestone: '/images/baratang-limestone.jpg', // Need image
        kalapatharBeach: '/images/kalapathar-beach.jpg', // Need image
        elephantBeach: '/images/elephant-beach.jpg', // Need image
        bharatpurBeach: '/images/bharatpur-beach.jpg', // Need image (Neil)
        chidiyatapuSunset: '/images/chidiyatapu-sunset.jpg', // Need image
        portBlairMarket: '/images/port-blair-market.jpg', // For departure
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg',
        highlightBaratang: '/images/baratang-limestone.jpg', // Reuse main image
        highlightRadhanagar: '/images/radhanagar-highlight.jpg',
        highlightElephant: '/images/elephant-beach-highlight.jpg', // Reuse main image
        highlightNeil: '/images/neil-island-highlight.jpg', // Reuse main image
        highlightFerry: '/images/havelock-ferry.jpg', // Reuse ferry image
        highlightSunset: '/images/chidiyatapu-sunset.jpg', // Reuse sunset image
        expectBeaches: '/images/beaches.jpg',
        expectHistorical: '/images/historical-sites.jpg', // Reusing expect images
        expectWater: '/images/water-activities.jpg',
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        gallery1: '/images/gallery-1.jpg',
        gallery2: '/images/gallery-2.jpg',
        gallery3: '/images/gallery-3.jpg',
        gallery4: '/images/gallery-4.jpg',
        gallery5: '/images/gallery-5.jpg',
        gallery6: '/images/gallery-6.jpg',
        gallery7: '/images/gallery-7.jpg',
        gallery8: '/images/gallery-8.jpg',
        ctaBackground: '/images/andaman-beach.jpg' // Not used in refactored CTA
    };

    return (
        // Changed background to plain white (matching sample)
        <main className="bg-white min-h-screen">
            {/* Hero Section - Matched sample styling */}
            <div className="relative">
                <div className="relative h-[500px] w-full">
                    <Image
                        src={placeholderImages.hero}
                        alt="Andaman Islands beaches and clear waters"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        6 Nights 7 Days Andaman Tour Package
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore Port Blair, Baratang, Havelock (Swaraj Dweep), and Neil (Shaheed Dweep). Discover historic sites, pristine beaches, limestone caves, and vibrant marine life.
                    </p>
                    {/* Changed button color to dark gray (matching sample) */}
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Features Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Star className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests visiting the Andaman Islands.
                    </p>

                    {/* Image gallery - Structure matches sample */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature1} alt="Beautiful Andaman Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature2} alt="Crystal Clear Waters of Andaman" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.feature3} alt="Tropical Paradise in Andaman" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                        </div>
                    </div>

                    {/* Feature Cards - Matched sample styling */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Car className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Sanitized Vehicles</h3>
                            <p className="text-gray-600"> We ensure all cabs are sanitized before every trip for a safe holiday experience. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Hotel className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Handpicked Hotels</h3>
                            <p className="text-gray-600"> We personally visit hotels before recommending them to our guests visiting Andaman Islands. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Award className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Verified Partners</h3>
                            <p className="text-gray-600"> We provide the best safe experience with our verified partners for all activities. </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 7-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A detailed plan for your unforgettable Andaman adventure.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.cellularJail} alt="Cellular Jail, Port Blair" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 1: Arrival, Corbyn's Cove & Cellular Jail Show</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Arrive at Port Blair airport, meet our representative, transfer to hotel. Post-lunch, visit historic Cellular Jail. </p>
                                    <p> Head to Corbyn's Cove Beach for relaxation/optional water sports. </p>
                                    <p> Conclude with the moving Light and Sound Show at Cellular Jail. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.baratangLimestone} alt="Limestone Caves, Baratang Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <TreePine className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 2: Baratang: Limestone Caves & Mud Volcano</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Early 4 AM start for a scenic drive through Jarawa Reserve forests to Baratang. </p>
                                    <p> Enjoy a boat ride and trek to explore the fascinating Limestone Caves. </p>
                                    <p> Visit the unique Mud Volcano. Return to Port Blair hotel by evening. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.kalapatharBeach} alt="Kalapathar Beach, Havelock Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 3: Swaraj Dweep (Havelock) Arrival & Beach Bliss</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Morning cruise to Swaraj Dweep (Havelock). Transfer to hotel upon arrival. </p>
                                    <p> Visit the stunning Kalapathar Beach. Relax and enjoy the pristine blue waters. </p>
                                    <p> After lunch (own cost), head to Radhanagar Beach (Asia's 7th best) for relaxation and a mesmerizing sunset. Overnight in Havelock. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.elephantBeach} alt="Elephant Beach / Scuba Diving, Havelock Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Fish className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 4: Elephant Beach Excursion (Snorkeling Included)</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Transfer to Havelock Jetty for a speedboat trip to Elephant Beach, famed for clear waters and corals. </p>
                                    <p> Enjoy complimentary snorkeling. Optional activities like Sea Walking available (extra cost). </p>
                                    <p> Return to jetty by lunchtime and relax at your hotel for the rest of the day. Overnight in Havelock. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 5 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.bharatpurBeach} alt="Bharatpur Beach, Neil Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Anchor className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 5: Journey to Shaheed Dweep (Neil Island)</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Morning cruise from Havelock to Shaheed Dweep (Neil Island). Check into your Neil Island hotel. </p>
                                    <p> Visit Bharatpur Beach, known for clear waters and optional water sports (jet ski, glass-bottom boat - own cost). </p>
                                    <p> Later, head to Laxmanpur Beach to witness a spectacular sunset. Overnight in Neil Island. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 6 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.chidiyatapuSunset} alt="Sitapur Beach Sunrise / Chidiyatapu Sunset" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <Sunrise className="mr-2 flex-shrink-0 text-gray-500" size={20} /> / <Sunset className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 6: Neil Sunrise, Return & Chidiyatapu Sunset</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Optional early morning visit to Sitapur Beach for sunrise. After breakfast, cruise back to Port Blair. </p>
                                    <p> Check into Port Blair hotel. After rest, visit Chidiyatapu (Bird Island) and explore the biological park. </p>
                                    <p> Conclude the day at Mundapahad Beach near Chidiyatapu for a beautiful sunset. Overnight in Port Blair. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 7 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative"> <Image src={placeholderImages.portBlairMarket} alt="Port Blair Market / Airport" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4"> <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} /> <span>Day 7: Departure with Fond Memories</span> </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Enjoy breakfast. Depending on your flight, potentially visit Anthropological Museum or enjoy last-minute shopping. </p>
                                    <p> Transfer to Veer Savarkar International Airport for your departure, filled with cherished memories. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section - Matched sample styling (8 highlights) */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail & Show</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore history and witness the moving Light & Sound show. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightCorbyns} alt="Corbyn's Cove Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Relax and enjoy optional water sports at this scenic beach. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightBaratang} alt="Baratang Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Baratang Island</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Discover Limestone Caves and Mud Volcano via forest reserves. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Radhanagar Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Visit one of Asia's best beaches on Havelock Island. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightElephant} alt="Elephant Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Elephant Beach</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Ideal spot for snorkeling and seeing vibrant coral reefs. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightNeil} alt="Neil Island Beaches" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Neil Island Beaches</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore beautiful Bharatpur, Laxmanpur & Sitapur beaches. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightFerry} alt="Ferry Transfer" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Scenic Ferry Rides</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Enjoy comfortable cruise transfers between islands. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative"> <Image src={placeholderImages.highlightSunset} alt="Andaman Sunset" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" /> <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div> <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Sunsets & Sunrises</div> </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Witness stunning moments at various island viewpoints. </p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="accommodation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Bed className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from curated hotel tiers for your 6-night stay (2N Port Blair, 3N Havelock, 1N Neil). Prices for 2 Adults.
                    </p>

                    {/* Tabs - Matched sample styling */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map((tabId) => (
                            <button
                                key={tabId}
                                onClick={() => handleTabChange(tabId)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tabId
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                    }`}
                            >
                                {tabId}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content - Matched sample styling */}
                    <div className="mt-8">
                        {/* Standard Tab */}
                        {activeTab === 'standard' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelStandard} alt="Standard Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Standard Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Port Blair (2N):</b> Sea Gull / The Pearl / Blue Marlin</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Havelock (3N):</b> Blue Island (Bamboo Cottage) / Eldorado / Radhakrishna</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Neil (1N):</b> CS Empire / Coral Garden</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹54,425/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span> </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Deluxe Tab */}
                        {activeTab === 'deluxe' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelDeluxe} alt="Deluxe Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Deluxe Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Port Blair (2N):</b> Bay Walk By Sea Side / Andaman Galley / Marina Manor</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Havelock (3N):</b> Blue Island (Andaman Cottage) / Shangrilas / Blue Bird</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Neil (1N):</b> Tango Beach Resort (Premium Room)</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹61,875/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span> </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Premium Tab */}
                        {activeTab === 'premium' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelPremium} alt="Premium Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Premium Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Port Blair (2N):</b> Hotel Shompen / Olive hotel / Luxor ***</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Havelock (3N):</b> Aquays Beach Resort / Havelock Plaza / Hotel Haywizz ***</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Neil (1N):</b> Pearl Park Beach Resort (Standard AC Garden View) ***</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹73,425/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span> </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Luxury Tab */}
                        {activeTab === 'luxury' && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
                                <div className="md:flex">
                                    <div className="md:w-1/3 h-64 md:h-auto relative group">
                                        <Image src={placeholderImages.hotelLuxury} alt="Luxury Hotel Example" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Luxury Hotels</h3>
                                        <div className="space-y-2 text-gray-700 mb-6 text-sm">
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Port Blair (2N):</b> Mansha Regency / Sand Heaven / The Escape ****</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Havelock (3N):</b> Symphony palms (Cottage) / Sands Marina ****</p>
                                            <p><MapPin size={14} className="inline mr-1 text-gray-500" /> <b>Neil (1N):</b> Summer Sand / Casa Earthor ****</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹91,575/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (Inc. Stay, Transfers, Sightseeing, GST)</span> </div>
                                            <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow hover:shadow-md flex items-center"> Select Package <ArrowRight className="ml-1.5 h-4 w-4" /> </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* What to Expect Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Umbrella className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What to Expect</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectBeaches} alt="Pristine Beaches" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Pristine Beaches</h3> <p className="text-gray-600 text-sm">Relax on world-class beaches like Radhanagar, Laxmanpur, Bharatpur, & Corbyn's Cove.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectHistorical} alt="Historical & Natural Wonders" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">History & Nature Wonders</h3> <p className="text-gray-600 text-sm">Explore Cellular Jail, Limestone Caves, Mud Volcano, and lush tropical forests.</p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectWater} alt="Island Hopping & Activities" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping & Activities</h3> <p className="text-gray-600 text-sm">Enjoy scenic ferry rides, snorkeling at Elephant Beach, & stunning sunsets/sunrises.</p> </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Package Details Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="details">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <ClipboardList className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Details</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        What's included in your 6 Nights / 7 Days package and what's not.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <Check className="text-green-500 mr-3 flex-shrink-0" size={24} /> What's Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Accommodation: 2N Port Blair, 3N Havelock, 1N Neil (Selected category).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Complimentary Breakfast at hotels.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Private AC Cab for transfers & sightseeing per itinerary.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Entry Tickets: Cellular Jail & Light/Sound Show.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Ferry Tickets: PB-Havelock, Havelock-Neil, Neil-PB.</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Activity Tickets: Elephant Beach Boat Ride (incl. snorkeling).</span> </li>
                                <li className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>All applicable taxes (GST).</span> </li>
                            </ul>
                        </div>
                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <X className="text-red-500 mr-3 flex-shrink-0" size={24} /> What's Not Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Flight Tickets.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Lunch and Dinner.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Optional activities (Scuba, Sea Walking, Jet Ski etc.) & camera fees.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Anything not mentioned in inclusions.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Expenses due to unforeseen circumstances.</span> </li>
                                <li className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>Personal expenses (laundry, tips, beverages etc.).</span> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dining Experience Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Utensils className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Dining Experience</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningSeafood} alt="Fresh Seafood" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/90"> Enjoy the freshest catch from the Andaman Sea. </p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Local Cuisine</h3><p className="text-sm text-white/90"> Try authentic local dishes with unique island flavors. </p></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4"> Complimentary breakfast is included. Lunch and dinner offer a chance to explore the diverse cuisines of Port Blair, Havelock, and Neil Island. </p>
                        <p className="text-gray-700"> From local eateries to multi-cuisine restaurants, find options for every palate. Fresh seafood is a must-try! Ask for recommendations. </p>
                    </div>
                </div>
            </section>

            {/* Cancellation Policy Section - Matched sample styling */}
            <section className="py-16 md:py-24 bg-gray-50" id="cancellation">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <AlertTriangle className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Cancellation Policy</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Please review our cancellation terms before booking.
                    </p>
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto border border-gray-100">
                        <ul className="space-y-3 text-gray-700">
                            {[
                                { text: 'Cancellation charge of ₹2500 per person applicable any time after advance payment.', color: 'yellow' },
                                { text: 'No refund if cancellation is received less than 10 days before arrival.', color: 'red' },
                                { text: '50% of total package cost applicable if cancellation is 11-20 days before arrival.', color: 'yellow' },
                                { text: '25% of total package cost applicable if cancellation is 21-30 days before arrival.', color: 'yellow' },
                                { text: '100% cancellation charge applicable for arrivals between 15 Dec - 15 Jan (Post Advance).', color: 'red' }
                            ].map((item, index) => (<li key={index} className="flex items-start"> <AlertTriangle className={`${item.color === 'red' ? 'text-red-500' : 'text-yellow-500'} mr-2 mt-1 flex-shrink-0`} size={16} /> <span>{item.text}</span> </li>))}
                            <li className="flex items-start"> <AlertTriangle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>In case of unforeseen weather/government restrictions, operator will try to provide alternatives, but no refund is provided for cancelled activities.</span> </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Photo Gallery Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Gallery</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        Preview the beautiful locations you might visit during your trip (representative images).
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail, Port Blair' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach, Havelock Island' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach' },
                            { src: placeholderImages.gallery4, alt: 'Ferry Transfer Andaman' },
                            { src: placeholderImages.gallery5, alt: 'Snorkeling at Elephant Beach' },
                            { src: placeholderImages.gallery6, alt: 'Sunset at Laxmanpur Beach' },
                            { src: placeholderImages.gallery7, alt: 'Andaman Resort View' },
                            { src: placeholderImages.gallery8, alt: 'Andaman Islands Aerial View' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                {/* Removed text overlay */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100" id="contact">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready for Your 7-Day Andaman Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Contact our travel experts today to customize and book your perfect 7-day Andaman island getaway.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"> Book This Package Now <ArrowRight className="ml-2 h-5 w-5" /> </button>
                        <Link href="/contact" className="bg-transparent border-2 border-gray-700 text-gray-700 hover:bg-gray-200 font-semibold py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center"> <Phone className="mr-2 h-5 w-5" /> Contact Us </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}