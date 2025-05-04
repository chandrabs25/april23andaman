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
    Anchor, // For Ross/North Bay
    Bird,   // For Chidiyatapu
    Moon,   // For Sunset (using this for consistency, could use Sunset icon too)
    ArrowRight // Added for buttons
} from 'lucide-react';

// NOTE: Replace placeholder image paths like "/images/..." with actual image URLs or paths relevant to the content.
// Using placeholder paths similar to the example provided.

// Updated Component Name for clarity
export default function AndamanPackagePage4D3N() {
    // State for accommodation tabs
    const [activeTab, setActiveTab] = useState('standard');

    // Handler for tab switching
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Placeholder image paths - Add/Update as needed for 4-day tour
    const placeholderImages = {
        hero: '/images/andaman-hero.jpg',
        feature1: '/images/andaman-beach-1.jpg',
        feature2: '/images/andaman-beach-2.jpg',
        feature3: '/images/andaman-beach-3.jpg',
        cellularJail: '/images/cellular-jail.jpg',
        radhanagar: '/images/radhanagar-beach.jpg', // For Havelock Day
        rossIsland: '/images/ross-island.jpg', // For Ross/North Bay Day
        portBlairMarket: '/images/port-blair-market.jpg', // For departure day
        hotelStandard: '/images/hotel-standard.jpg',
        hotelDeluxe: '/images/hotel-deluxe.jpg',
        hotelPremium: '/images/hotel-premium.jpg',
        hotelLuxury: '/images/hotel-luxury.jpg',
        highlightCellular: '/images/cellular-jail-highlight.jpg',
        highlightCorbyns: '/images/corbyns-cove.jpg', // Used on Day 1
        highlightRadhanagar: '/images/radhanagar-highlight.jpg', // Used for Havelock highlight
        highlightRossIsland: '/images/ross-island-highlight.jpg', // Used for Ross/North Bay highlight
        expectBeaches: '/images/beaches.jpg',
        expectWater: '/images/water-activities.jpg',
        expectHistorical: '/images/historical-sites.jpg',
        diningSeafood: '/images/seafood.jpg',
        diningLocal: '/images/local-cuisine.jpg',
        gallery1: '/images/gallery-1.jpg', // Cellular Jail
        gallery2: '/images/gallery-2.jpg', // Radhanagar Beach
        gallery3: '/images/gallery-3.jpg', // Corbyn's Cove
        gallery4: '/images/gallery-4.jpg', // Ferry
        gallery5: '/images/gallery-5.jpg', // Ross Island
        gallery6: '/images/gallery-6.jpg', // Chidiyatapu Sunset
        gallery7: '/images/gallery-7.jpg', // North Bay Corals
        gallery8: '/images/gallery-8.jpg', // Hotel Example
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
                        alt="Andaman Islands tropical landscape with clear water"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                        3 Nights and 4 Days Andaman Tour Package
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mb-5 sm:mb-6 drop-shadow-md">
                        Explore historic Port Blair, stunning Havelock Island (Swaraj Dweep), adventurous Ross & North Bay Islands, and serene Chidiyatapu in this compact 4-day tour.
                    </p>
                    {/* Changed button color to dark gray (matching sample) */}
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                        Book This Package <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Features Section with Images - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Star className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Why Choose Our Package</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        We ensure a safe, comfortable, and memorable experience for all our guests
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
                            <p className="text-gray-600"> We make sure all cabs are sanitized before every trip for a safe holiday experience. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Hotel className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Handpicked Hotels</h3>
                            <p className="text-gray-600"> We personally visit hotels before recommending them to guests visiting the Andamans. </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"> <Award className="text-gray-700" size={28} /> </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Verified Partners</h3>
                            <p className="text-gray-600"> We provide the best safe experience with verified partners for water activities. </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Itinerary Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24 bg-gray-50" id="itinerary">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        {/* Changed icon background/color (matching sample) */}
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <Route className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your 4-Day Itinerary</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">
                        A carefully crafted journey to experience the best of Andaman in 4 days.
                    </p>

                    {/* Day 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image src={placeholderImages.cellularJail} alt="Cellular Jail, Port Blair" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Calendar className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 1: Arrival, Corbyn's Cove & Cellular Jail Show</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Arrive at Port Blair airport, meet our representative, and transfer to your hotel. Post-lunch, visit the historic Cellular Jail (Kala Paani). </p>
                                    <p> Next, head to Corbyn's Cove Beach for relaxation or optional water sports (own cost). </p>
                                    <p> Conclude with the moving Light and Sound Show at Cellular Jail, bringing history to life. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image src={placeholderImages.radhanagar} alt="Radhanagar Beach, Havelock Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Ship className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 2: Swaraj Dweep (Havelock) Day Trip & Radhanagar Beach</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Early morning transfer to the jetty for your cruise to Swaraj Dweep (Havelock Island). Enjoy the scenic ~2.5-hour journey. </p>
                                    <p> A private AC cab will take you directly to the world-famous Radhanagar Beach (Asia's 7th best). Relax, swim, and soak in the beauty. </p>
                                    <p> After spending quality time, head back to the Havelock jetty for your evening cruise back to Port Blair. Transfer to your hotel. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 3 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
                        <div className="md:flex">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image src={placeholderImages.rossIsland} alt="Ross Island ruins" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <Anchor className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 3: Ross Island, North Bay & Chidiyatapu Sunset</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> After breakfast, embark on a boat trip to Ross Island, the former British administrative HQ. Explore ruins amidst nature, spotting deer and peacocks. </p>
                                    <p> Proceed to North Bay Island (Coral Island) for underwater exploration (snorkeling/glass-bottom boat optional, own cost). </p>
                                    <p> Return to Port Blair jetty. Later, visit Chidiyatapu (Bird Island) and Mundapahad Beach for a breathtaking sunset. </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Day 4 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="md:flex flex-row-reverse">
                            <div className="md:w-1/2 relative group">
                                <div className="h-64 md:h-full relative">
                                    <Image src={placeholderImages.portBlairMarket} alt="Port Blair Market/Airport" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="p-6 md:p-8 md:w-1/2">
                                <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
                                    <PlaneTakeoff className="mr-2 flex-shrink-0 text-gray-500" size={20} />
                                    <span>Day 4: Departure with Sweet Memories</span>
                                </h3>
                                <div className="space-y-4 text-gray-700">
                                    <p> Enjoy breakfast at the hotel. Depending on your flight schedule, you might have time for last-minute souvenir shopping. </p>
                                    <p> Proceed to Veer Savarkar International Airport for departure, taking home wonderful memories of Andaman. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section - Matched sample styling */}
            <section className="py-10 sm:py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-14">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <Camera className="text-gray-700" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Package Highlights</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Highlight 1: Cellular Jail */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightCellular} alt="Cellular Jail" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Cellular Jail & Show</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore historic Cellular Jail & witness the moving Light and Sound show. </p> </div>
                        </div>
                        {/* Highlight 2: Corbyn's Cove */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightCorbyns} alt="Corbyn's Cove Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Corbyn's Cove Beach</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Relax at this scenic beach and enjoy optional water sports. </p> </div>
                        </div>
                        {/* Highlight 3: Havelock Day Trip */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightRadhanagar} alt="Radhanagar Beach" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Havelock Day Trip</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Enjoy a scenic cruise to Havelock & visit Asia's best beach, Radhanagar. </p> </div>
                        </div>
                        {/* Highlight 4: Ross & North Bay */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100 group">
                            <div className="h-48 relative">
                                <Image src={placeholderImages.highlightRossIsland} alt="Ross Island" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-white font-semibold drop-shadow">Ross & North Bay Islands</div>
                            </div>
                            <div className="p-5"> <p className="text-gray-600 text-sm"> Explore British ruins on Ross Island and see coral reefs at North Bay. </p> </div>
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
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Accommodation Options (Port Blair)</h2>
                    </div>
                    <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                        Choose from selected hotels in Port Blair for 3 nights (based on 2 Adults).
                    </p>

                    {/* Tabs - Matched sample styling */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {['standard', 'deluxe', 'premium', 'luxury'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${activeTab === tab
                                    ? 'bg-gray-800 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                                    }`}
                            >
                                {tab}
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
                                        <Image src={placeholderImages.hotelStandard} alt="Hotel Royal Palace or similar" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Royal Palace - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4"> <MapPin size={18} className="text-gray-500 mr-2" /> <span>Port Blair</span> </div>
                                        <p className="text-gray-700 mb-6"> Comfortable accommodation. Also available: Blue Marlin or similar. (1 Room / 3 Nights) </p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹29,040/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span> </div>
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
                                        <Image src={placeholderImages.hotelDeluxe} alt="Bay Walk By Sea Side or similar" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Bay Walk By Sea Side - Premium AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4"> <MapPin size={18} className="text-gray-500 mr-2" /> <span>Port Blair</span> </div>
                                        <p className="text-gray-700 mb-6"> Upgraded stay with good amenities. Also available: Marina Manor or similar. (1 Room / 3 Nights) </p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹33,990/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span> </div>
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
                                        <Image src={placeholderImages.hotelPremium} alt="Hotel Shompen or similar" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Hotel Shompen - Deluxe AC Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4"> <MapPin size={18} className="text-gray-500 mr-2" /> <span>Port Blair</span> </div>
                                        <p className="text-gray-700 mb-6"> Superior accommodation with excellent service. Also available: Olive hotel or similar. (1 Room / 3 Nights) </p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹39,490/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span> </div>
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
                                        <Image src={placeholderImages.hotelLuxury} alt="Sea Shell / Mansha Regency or similar" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-2/3">
                                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sea Shell / Mansha Regency - Deluxe Room</h3>
                                        <div className="flex items-center text-gray-600 mb-4"> <MapPin size={18} className="text-gray-500 mr-2" /> <span>Port Blair</span> </div>
                                        <p className="text-gray-700 mb-6"> Premium luxury stay with top-tier amenities. (1 Room / 3 Nights) </p>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto">
                                            <div className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0"> ₹48,290/- <span className="text-sm font-normal text-gray-600 block">for 2 Adults (incl. GST, Stay, Transfers, Sightseeing)</span> </div>
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
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Beautiful Beaches</h3> <p className="text-gray-600 text-sm"> Experience stunning beaches like Radhanagar and Corbyn's Cove, plus serene Mundapahad Beach. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectWater} alt="Water Activities & Cruises" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">Island Hopping & Water Fun</h3> <p className="text-gray-600 text-sm"> Enjoy scenic cruises to Havelock, boat trips to Ross/North Bay, and optional water sports. </p> </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="h-48 relative"> <Image src={placeholderImages.expectHistorical} alt="Historical Sites & Nature" fill style={{ objectFit: 'cover' }} /> </div>
                            <div className="p-5"> <h3 className="text-xl font-semibold mb-3 text-gray-800">History & Natural Beauty</h3> <p className="text-gray-600 text-sm"> Explore Cellular Jail, Ross Island ruins, Chidiyatapu bird sanctuary, and witness amazing sunsets. </p> </div>
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
                        What's included in your 3 Nights / 4 Days package and what's not.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Inclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <Check className="text-green-500 mr-3 flex-shrink-0" size={24} /> What's Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                {[
                                    'Accommodation: 3 Nights in Port Blair (selected category) with Breakfast.',
                                    'Transfers: Private AC Cab (Airport Pick Up/Drop, Sightseeing per itinerary).',
                                    'Ferry/Cruise Tickets: Port Blair <> Havelock Island (Both ways).',
                                    'Boat Tickets: Ross Island & North Bay Island trip.',
                                    'Entry Tickets/Permits: Cellular Jail, Ross Island, etc.',
                                    'Tickets: Cellular Jail Light and Sound Show.',
                                    'Assistance at all arrival/departure points.',
                                    'All applicable taxes (GST).'
                                ].map((item, index) => (<li key={index} className="flex items-start"> <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>{item}</span> </li>))}
                            </ul>
                        </div>
                        {/* Exclusions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center"> <X className="text-red-500 mr-3 flex-shrink-0" size={24} /> What's Not Included </h3>
                            <ul className="space-y-3 text-gray-700 text-sm">
                                {[
                                    'Flight Tickets.',
                                    'Lunch and Dinner.',
                                    'Water sports activities cost (Jet Ski, Snorkeling, etc.).',
                                    'Camera fees (still or video).',
                                    'Anything not explicitly mentioned in inclusions.',
                                    'Expenses due to unforeseen circumstances.',
                                    'Personal expenses (tips, laundry, beverages etc.).'
                                ].map((item, index) => (<li key={index} className="flex items-start"> <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} /> <span>{item}</span> </li>))}
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
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Fresh Seafood</h3><p className="text-sm text-white/90"> Enjoy the freshest catch from the Andaman Sea </p></div>
                        </div>
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
                            <Image src={placeholderImages.diningLocal} alt="Local Cuisine" fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white drop-shadow"><h3 className="text-xl font-semibold mb-2">Local Cuisine</h3><p className="text-sm text-white/90"> Try authentic local dishes with unique island flavors </p></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 max-w-3xl mx-auto">
                        <p className="text-gray-700 mb-4"> Complimentary breakfast is included. Lunch and dinner are not included, allowing you to explore Port Blair's diverse dining options. </p>
                        <p className="text-gray-700"> From local eateries to multi-cuisine restaurants, find choices for every palate. Fresh seafood is highly recommended! </p>
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
                        Preview the beautiful locations you'll visit during your trip.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            { src: placeholderImages.gallery1, alt: 'Cellular Jail, Port Blair' },
                            { src: placeholderImages.gallery2, alt: 'Radhanagar Beach, Havelock Island' },
                            { src: placeholderImages.gallery3, alt: 'Corbyn\'s Cove Beach' },
                            { src: placeholderImages.gallery4, alt: 'Ferry to Havelock Island' },
                            { src: placeholderImages.gallery5, alt: 'Ross Island View' },
                            { src: placeholderImages.gallery6, alt: 'Sunset at Chidiyatapu/Mundapahad Beach' },
                            { src: placeholderImages.gallery7, alt: 'North Bay Island Corals' },
                            { src: placeholderImages.gallery8, alt: 'Hotel Accommodation Example' }
                        ].map((image, index) => (
                            <div key={index} className="relative h-48 md:h-64 rounded-2xl overflow-hidden group">
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} className="transition-transform duration-500 group-hover:scale-110" />
                                {/* Removed text overlay to match Sample A */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Matched sample styling */}
            <section className="relative py-20 md:py-32 bg-gray-100" id="contact">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 drop-shadow-sm">
                        Ready for Your 4-Day Andaman Adventure?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 drop-shadow-sm">
                        Contact our travel experts today to secure your booking and start planning your perfect 4-day island getaway.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                            Book This Package Now <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                        <Link
                            href="/contact" // Use appropriate contact link
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