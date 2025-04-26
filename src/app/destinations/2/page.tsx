// Path: src/app/destinations/2/page.tsx // Assuming Havelock is destination #2
'use client'; // Needed because we use useState for the toggle

import { useState } from 'react'; // Import useState for the toggle
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, Info, Calendar, Home, Utensils, MapIcon, Users, Shield, Leaf, Camera, Ship, Bike, BedDouble, Sprout, Heart, Anchor, Sun, Waves, Sparkles, Route, LifeBuoy, Recycle } from 'lucide-react'; // Import additional relevant icons

// Assuming you have Header and Footer components imported via a layout typically
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function HavelockIslandPage() {
    // State to manage the toggle switch
    const [showComprehensive, setShowComprehensive] = useState(false);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    return (
        // Assumes Header/Footer are handled by a layout file (e.g., src/app/layout.tsx)
        <main className="container mx-auto px-4 py-8 md:py-12 bg-gradient-to-b from-cyan-50 to-white min-h-screen">
            {/* Hero section with image and button */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
                {/* Hero image */}
                <div className="relative h-[450px] w-full">
                    <Image
                        src="/images/havelock-hero.jpg" // Placeholder image path
                        alt="Radhanagar Beach, Havelock Island (Swaraj Dweep)"
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
                        Havelock Island (Swaraj Dweep) Travel Guide
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Experience the jewel of the Andamans: pristine beaches, vibrant reefs, world-class diving, and stays from rustic huts to luxury resorts.
                    </p>
                    <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Book Havelock Packages
                    </button>
                </div>
            </div>

            {/* Toggle Switch with improved styling */}
            <div className="flex items-center justify-center md:justify-start mb-8 bg-white p-4 rounded-full shadow-md">
                <label htmlFor="guide-toggle" className="mr-3 text-sm font-medium text-gray-600">Brief Guide</label>
                <label className="relative inline-block w-14 h-7">
                    <input
                        type="checkbox"
                        id="guide-toggle"
                        className="opacity-0 w-0 h-0"
                        checked={showComprehensive}
                        onChange={handleToggle} // Use React's onChange
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${showComprehensive ? 'bg-cyan-600' : 'bg-gray-300'}`}>
                        <span className={`absolute h-5 w-5 bg-white rounded-full top-1 transition-all duration-300 ${showComprehensive ? 'left-8' : 'left-1'}`}></span>
                    </span>
                </label>
                <label htmlFor="guide-toggle" className="ml-3 text-sm font-medium text-gray-600">Comprehensive Guide</label>
            </div>

            {/* Conditional Rendering based on state */}
            {!showComprehensive && (
                // Brief Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-cyan-700 mt-8 mb-6 pb-2 border-b-2 border-cyan-200">Havelock Island: Brief Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            The Andamans’ most popular island: white-sand beaches, vibrant coral reefs, world-class diving, with options from bamboo huts to five-star resorts.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Around</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[200px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-ferry.jpg" // Placeholder image
                                    alt="Ferry arriving at Havelock Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 md:w-2/3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Ferries:</strong> Private (Makruzz, Nautika) 1.5–2.5 hr; govt 2.5–3 hr.</li>
                                <li><strong className="text-gray-800">On-island:</strong> Scooter rentals (~₹500/day), autos (₹50–700), point-to-point taxis, shared jeeps, occasional bus, bicycles.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Nov–Feb:</strong> Peak season, calm seas.</li>
                            <li><strong className="text-gray-800">Mar–May:</strong> Warmer, good visibility.</li>
                            <li><strong className="text-gray-800">Jun–Sep:</strong> Monsoon—fewer activities, lush greenery.</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹500–3k):</strong> Huts/dorms near Govind Nagar & Beach 5.</li>
                            <li><strong className="text-gray-800">Mid-range (₹4k–8k):</strong> Resorts with AC, pools (Dolphin Resort, Symphony Palms).</li>
                            <li><strong className="text-gray-800">Luxury (₹10k+):</strong> Taj Exotica, Barefoot, SeaShell, Jalakara.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-cyan-600 bg-cyan-50 p-3 rounded-xl mt-4">
                            Recommendation: Book well in advance, especially for peak season (Dec-Jan).
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Utensils className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Local:</strong> Fish thalis (₹200), grilled catch of the day.</li>
                            <li><strong className="text-gray-800">Cafés:</strong> Full Moon, Anju Coco, Something Different.</li>
                            <li><strong className="text-gray-800">International:</strong> Sea Dragon (Chinese/Thai), B3 at Barefoot.</li>
                            <li><strong className="text-gray-800">Nightlife:</strong> Venom Bar, Bonova; no clubs—acoustic jams.</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <MapPin className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/radhanagar-beach.jpg" // Placeholder
                                    alt="Radhanagar Beach sunset"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/elephant-beach-snorkeling.jpg" // Placeholder
                                    alt="Snorkeling at Elephant Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Radhanagar Beach (No. 7):</strong> White sand, sunsets, Neil’s Cove trail.</li>
                            <li><strong className="text-gray-800">Elephant Beach:</strong> Snorkeling, water sports, boat or jungle trek.</li>
                            <li><strong className="text-gray-800">Kalapathar Beach:</strong> Black rocks, sunrise.</li>
                            <li><strong className="text-gray-800">Vijaynagar (Beach 5):</strong> Kayaking, sunrise, bioluminescence tours.</li>
                            <li><strong className="text-gray-800">Diving:</strong> Sites like Seduction Point, Jackson’s Bar, Barren Island trips available.</li>
                        </ul>
                    </section>

                    {/* Styled Table Card */}
                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities by Traveler Type</h3>
                        </div>
                        <div className="overflow-hidden mb-6">
                            <div className="overflow-x-auto"> {/* Wrapper for responsiveness */}
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-cyan-50 text-cyan-700 font-semibold uppercase">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-cyan-100 rounded-tl-xl">Traveler</th>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-cyan-100 rounded-tr-xl">Highlights</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Backpackers</td>
                                            <td className="px-4 py-3">Budget PADI courses + dorms, beach-café social scene, sunrise at Kalapathar</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Families</td>
                                            <td className="px-4 py-3">Glass-bottom boat, sea walk for kids, calm beaches, playgrounds in resorts</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Couples</td>
                                            <td className="px-4 py-3">Candlelight dinners, private dives, spa treatments, sunset picnics</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Adventure Seekers</td>
                                            <td className="px-4 py-3">Night diving, game fishing, off-road mountain biking, freediving courses</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium rounded-bl-xl">Luxury Travelers</td>
                                            <td className="px-4 py-3 rounded-br-xl">Helicopter transfers (weather-dependent), private yacht cruises, bespoke island tours</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Users className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} /> {/* Using Users icon for cultural aspect */}
                                <h3 className="text-xl font-semibold text-gray-800">Cultural & Etiquette</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Beachwear on beaches; cover up in villages/market.</li>
                                <li>Ask before photographing locals.</li>
                                <li>Respect marine life; no feeding or touching coral.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Shield className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Safety & Health</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Reef-safe sunscreen, hydration, flag warnings.</li>
                                <li>Wear aqua shoes on rocky beaches; heed croc advisories.</li>
                                <li>Basic health centre + pharmacies on island.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Leaf className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Reusable bottles, no plastics.</li>
                                <li>Coral-safe practices; support eco-friendly dive shops.</li>
                                <li>Beach clean-ups; respect turtle nesting seasons.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}

            {showComprehensive && (
                // Comprehensive Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-cyan-700 mt-8 mb-6 pb-2 border-b-2 border-cyan-200">Havelock Island: Comprehensive Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-overview.jpg" // Placeholder
                                    alt="Aerial view of Havelock Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-base leading-relaxed mb-4">
                                    Havelock Island, officially renamed Swaraj Dweep, is the jewel of the Andamans – a tropical paradise famed for its powdery white beaches, turquoise waters, and world-class scuba diving. It’s the most visited island in the archipelago, yet still offers a laid-back vibe that appeals to all traveler types. Whether you’re a backpacker on a budget or a honeymooner seeking luxury, Havelock has something special: picture-perfect sunsets at Radhanagar Beach, vibrant coral reefs off Elephant Beach, dense jungles, and a range of accommodations from bamboo huts to five-star resorts. Time moves slower here, and most visitors end up extending their stay once they fall in love with Havelock’s charm.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Getting Around</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/havelock-map-transport.jpg" // Placeholder
                                alt="Map showing Havelock transport options"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Getting There (By Sea):</strong> Havelock Island lies about 70 km northeast of Port Blair and is primarily accessed by ferry. Multiple ferry services operate daily:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Private Ferries:</strong> Modern high-speed catamarans (Makruzz, Nautika, etc.) take 1.5–2.5 hours. Book online in advance. Preferred for comfort and speed.</li>
                            <li><strong className="text-gray-800">Government Ferry:</strong> Cheaper but slower (2.5-3 hours), seats fill fast (local priority). Buy tickets at the counter. Open deck offers views.</li>
                        </ul>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">By Helicopter/Sea Plane:</strong> Seaplane services are currently not operational. Helicopter seats are very limited, primarily for locals/emergencies. Ferries are the standard mode of transport. Ferries also connect Havelock directly with Neil Island (1 hr trip).
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Getting Around:</strong> Havelock is small (18 km end-to-end) with one main road. Options include:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Two-Wheeler Rentals:</strong> Most popular (~₹500/day + fuel). Explore freely. Drive carefully, especially after dark (minimal lighting). Petrol pump closes by 5 PM.</li>
                            <li><strong className="text-gray-800">Taxis:</strong> Available at jetty. Fixed point-to-point rates (Jetty to Radhanagar ~₹1000). Can hire for a day (~₹2000-2500). Good for families.</li>
                            <li><strong className="text-gray-800">Auto-Rickshaws:</strong> Budget option (short rides ₹50-100, longer rides ₹500-700). Agree on fare beforehand.</li>
                            <li><strong className="text-gray-800">Public Bus & Shared Jeeps:</strong> Infrequent local bus. Shared jeeps used by locals (very cheap). Ask locals for timings/routes.</li>
                            <li><strong className="text-gray-800">Bicycles:</strong> Rentable at some guesthouses. Eco-friendly way to explore nearby areas. Hot midday; carry light for night biking.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-cyan-600 bg-cyan-50 p-3 rounded-xl mb-4">
                            Orientation Tip: Areas referred by village/beach numbers (e.g., Beach No. 5 = Vijaynagar). Main clusters: Govind Nagar (Jetty/Market), Vijay Nagar (Resorts), Radhanagar (West Coast). Hard to get lost.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-winter.jpg" // Placeholder
                                    alt="Havelock beach in winter"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Nov-Feb (Peak)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-summer.jpg" // Placeholder
                                    alt="Havelock under the summer sun"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Mar-May (Warm)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-monsoon.jpg" // Placeholder
                                    alt="Lush green Havelock in monsoon"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Jun-Sep (Rainy)
                                </div>
                            </div>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Havelock has a tropical climate. The best time is the dry season:
                            <ul className="list-disc list-inside space-y-2 my-3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">October – February (Winter):</strong> Pleasant weather (25-30°C), calm seas, excellent for water sports. Dec-Jan is peak season (book ahead!).</li>
                                <li><strong className="text-gray-800">March – May (Spring/Summer):</strong> Warmer, still good conditions. Feb-Mar often have the BEST underwater visibility for diving/snorkeling due to calm waters and low plankton.</li>
                                <li><strong className="text-gray-800">June – September (Monsoon):</strong> Heavy rains, occasional storms. Lush greenery, but many activities might be limited or cancelled. Ferries can be erratic.</li>
                            </ul>
                            Plan for November to early May for the ideal experience. Brief showers can occur anytime.
                        </p>
                        <p className="text-base leading-relaxed font-medium text-cyan-600 bg-cyan-50 p-3 rounded-xl mb-4">
                            Diving Tip: February and March usually offer the calmest seas and clearest water for underwater activities.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation (Budget to Luxury)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/havelock-resort.jpg" // Placeholder
                                alt="Beachfront resort in Havelock"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Havelock offers the widest accommodation range in Andamans:
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹500–3000):</strong> Beach huts (e.g., Flying Elephant, Emerald Gecko), dorms, simple cottages near Govind Nagar & Beach No.5. Basic amenities (fan, shared/cold bath). Perfect for backpackers. Camping is not allowed.</li>
                            <li><strong className="text-gray-800">Mid-Range (₹4000–8000):</strong> Comfortable cottages/bungalows, often beachfront. Examples: Havelock Island Beach Resort, TSG Blue, Symphony Palms, Dolphin Resort (govt-run, great location). AC rooms, private baths, often pools/restaurants. Book ahead in peak season.</li>
                            <li><strong className="text-gray-800">Premium (₹10,000+):</strong> Luxury resorts blending with nature. Examples: Taj Exotica (pool villas on Radhanagar), Barefoot at Havelock (jungle cottages near Radhanagar), SeaShell Havelock (infinity pool), Jalakara (exclusive boutique hotel inland). Offer spas, fine dining, top service.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-cyan-600 bg-cyan-50 p-3 rounded-xl mb-4">
                            Booking Advice: Reserve accommodation well in advance, especially for peak season (Dec-Jan) and mid-range/luxury options. Many places arrange jetty pickups.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Utensils className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/havelock-food.jpg" // Placeholder
                                alt="Seafood meal in Havelock"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Havelock is a relative foodie paradise with diverse options:
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Seafood & Local Cuisine:</strong> Fresh grilled fish, lobster, crab curry are staples. Try local fish thalis (₹200+) at beach shacks or market dhabas. New Lighthouse Restaurant is famed for pick-your-own seafood.</li>
                            <li><strong className="text-gray-800">Popular Cafés & Restaurants:</strong> Full Moon Café (eclectic, chill vibe), Anju Coco (seafood BBQ, continental), Something Different (seafront lounge, varied menu), Nemo Café (beachfront), Venom Bar (snacks, drinks). Icy Spicy (veg chaat/sweets). Annapurna (pure-veg North/South Indian).</li>
                            <li><strong className="text-gray-800">International Flavors:</strong> Pizza, Israeli, Thai widely available. Sea Dragon (SeaShell resort - upscale Chinese/Thai), B3 (Barefoot resort - gourmet local ingredients). Dive center cafés often serve good breakfast/espresso.</li>
                            <li><strong className="text-gray-800">Nightlife & Drinks:</strong> Not a party island. Bars like Venom Bar, Bonova Café (SeaShell) offer cocktails/music. Most resorts serve beer. Evenings are relaxed; places close by 10:30-11 PM.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-cyan-600 bg-cyan-50 p-3 rounded-xl mb-4">
                            Dining Etiquette: Service charge often added (5-10%). Be patient ("island time"). Menu items might be unavailable based on catch/supply. Must-try: Grilled fish, coconut milk curry.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <MapPin className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/radhanagar-beach-day.jpg" // Placeholder
                                    alt="Daytime at Radhanagar Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Radhanagar Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/elephant-beach-watersports.jpg" // Placeholder
                                    alt="Water sports at Elephant Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Elephant Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/kalapathar-beach.jpg" // Placeholder
                                    alt="Kalapathar Beach sunrise"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Kalapathar Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/vijaynagar-beach.jpg" // Placeholder
                                    alt="Vijaynagar Beach tranquility"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Vijaynagar Beach (No. 5)</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-diving.jpg" // Placeholder
                                    alt="Scuba diving in Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Scuba Diving Sites</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/havelock-kayaking.jpg" // Placeholder
                                    alt="Kayaking through mangroves"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Mangrove Kayaking</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Radhanagar Beach (Beach No.7):</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Asia’s best beach contender. Powdery white sand, turquoise water, stunning sunsets. Perfect for swimming. Basic facilities (changing rooms, snacks). Neil's Cove trail nearby (lagoon walk). Heed lifeguard flags. Pristine & protected.
                                </p>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Elephant Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Adventure & coral hub. Access via speedboat (20 min) or jungle trek (40 min). Excellent shallow snorkeling near shore. Hub for water sports (jetski, sea walk, banana boat). Can get busy midday. Go early. Limited refreshments.
                                </p>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Kalapathar Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    East coast beach with black rocks, emerald water. Scenic, great for photos, especially sunrise. Not ideal for swimming (rocks). Good for quiet walks, picnics. Basic stalls at entrance.
                                </p>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Vijaynagar (Beach No.5) & Govind Nagar Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Long eastern coastline with many resorts. Calm lagoons, good for swimming/kayaking at high tide. Tide pools at low tide (wear aqua shoes). Great for sunrise walks. Quieter than Radhanagar.
                                </p>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Scuba Diving & Snorkeling Sites:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Havelock is a diver's paradise. Numerous dive shops offer courses & fun dives. Popular sites: Elephant Beach Reef (beginners), Seduction Point, Aquarium, Jackson’s Bar, The Wall. Excellent visibility Nov-Apr. Snorkeling trips widely available.
                                </p>
                            </div>
                            <div className="border-l-4 border-cyan-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Others:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Mangrove kayaking (daytime or night bioluminescence tours). Neil's Cove near Radhanagar (quiet snorkel spot). Govind Nagar Beach #2 Lagoon (spot juvenile sharks seasonally).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities & Experiences (By Traveler Type)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/havelock-activities.jpg" // Placeholder
                                alt="Diverse activities in Havelock"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-cyan-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-cyan-700 mb-2">Backpackers</h4>
                                <p className="text-base leading-relaxed">Stay in beach huts/dorms. Affordable PADI courses. Rent scooters. Socialize at cafés (Full Moon, Anju Coco). Eat at local dhabas. Catch sunrise at Kalapathar. Safe for solo travelers.</p>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-cyan-700 mb-2">Families</h4>
                                <p className="text-base leading-relaxed">Gentle beaches (Radhanagar). Glass-bottom boat, Sea Walk at Elephant Beach. Kid-friendly resorts with play areas. Neil's Cove trek. Stargazing. Easy food options. Carry beach toys!</p>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-cyan-700 mb-2">Couples & Honeymooners</h4>
                                <p className="text-base leading-relaxed">Private scuba dives. Candlelight beach dinners. Couples spa treatments. Sunset picnics at Radhanagar. Quiet beach walks (Vijaynagar). Mangrove kayaking. Romantic photo ops.</p>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-cyan-700 mb-2">Adventure Seekers</h4>
                                <p className="text-base leading-relaxed">Advanced/Night Diving. Game fishing trips. Mountain biking inland trails. Parasailing. Night kayaking (bioluminescence). Forest trekking. Freediving courses.</p>
                            </div>
                            <div className="bg-cyan-50 p-4 rounded-xl lg:col-span-2">
                                <h4 className="text-lg font-semibold text-cyan-700 mb-2">Luxury Travelers</h4>
                                <p className="text-base leading-relaxed">Pool villas (Taj Exotica). Private yacht trips. Bespoke tours/nature walks. Fine dining (Turtle House, Mahua). Helicopter transfers (arrange ahead). Exclusive spa treatments (Jalakara). Personalized service at high-end resorts.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} /> {/* Keeping Users icon */}
                            <h3 className="text-xl font-semibold text-gray-800">Cultural Insights & Local Etiquette</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/havelock-local-life.jpg" // Placeholder
                                alt="Local market scene in Havelock"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Local Community:</strong> Settlers from mainland India (mostly Bengali). Friendly, laid-back. No indigenous tribes on Havelock. Many work in tourism/fishing. "Namaste" or "Hello" appreciated.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Lifestyle:</strong> Slower pace ("island time"). Be patient with service. Locals are curious and conversational.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Dress Code:</strong> Beachwear fine on beaches. Cover up (shirt/sarong) in villages/market. Modest attire respected. No topless sunbathing.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Photography Etiquette:</strong> Always ask permission before photographing people, especially children/women. Most are happy to oblige.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Language:</strong> Hindi & Bengali common. English widely understood in tourist areas.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Environment & Respect:</strong> Locals value the environment. Avoid littering. Respect marine life. Joining community clean-ups earns goodwill.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Religion & Culture Mix:</strong> Small temples/churches. Welcoming during festivals (e.g., Durga Puja). Remove shoes at temples. Strong diving sub-culture adds cosmopolitan vibe.
                            </p>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <LifeBuoy className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} /> {/* Using LifeBuoy for safety */}
                                <h3 className="text-xl font-semibold text-gray-800">Safety Tips & Health Advice</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/havelock-safety-sign.jpg" // Placeholder
                                    alt="Beach safety sign in Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Sun & Heat:</strong> Use high SPF reef-safe sunscreen. Stay hydrated (coconut water!). Hat/sunglasses. Take shade breaks midday.</li>
                                <li><strong className="text-gray-800">Swimming:</strong> Observe beach flags (Red=No Swim). Don't swim too far out. Avoid dawn/dusk swimming near mangroves (rare croc advisory). Use life vest if unsure.</li>
                                <li><strong className="text-gray-800">Marine Life:</strong> Don't touch coral/creatures. Watch for jellyfish (carry vinegar). Wear water shoes in rocky shallows (stonefish risk).</li>
                                <li><strong className="text-gray-800">Night Safety:</strong> Very low crime. Minimal street lights - use flashlight. Drive scooters slowly at night. Lock rooms/valuables.</li>
                                <li><strong className="text-gray-800">Wildlife & Trekking:</strong> Watch step in forests (snakes rare). Use repellent (mosquitoes). Guide recommended for long treks.</li>
                                <li><strong className="text-gray-800">Transport Safety:</strong> Wear helmet on scooter. Beware potholes/animals. Allow buffer time for return ferries before flights.</li>
                                <li><strong className="text-gray-800">Health:</strong> Basic PHC & pharmacies available. Serious issues require evacuation to Port Blair. Carry first-aid kit, personal meds. Drink bottled/filtered water. Be mindful with street food.</li>
                                <li><strong className="text-gray-800">Communication:</strong> BSNL/Airtel work best; Jio spotty. Data slow (3G/4G). Wi-Fi limited, often slow.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Recycle className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} /> {/* Using Recycle for sustainability */}
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability Tips</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/havelock-sustainability.jpg" // Placeholder
                                    alt="Eco-friendly practices in Havelock"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Reduce Plastics:</strong> Use reusable water bottles/bags. Refill water at resorts. Avoid single-use plastics.</li>
                                <li><strong className="text-gray-800">No Littering:</strong> Dispose of waste properly. Pick up extra trash if you can ("+1 rule"). Join beach clean-ups.</li>
                                <li><strong className="text-gray-800">Protect Coral:</strong> Don't touch/stand on coral. Use reef-safe sunscreen (oxybenzone-free). Practice good buoyancy.</li>
                                <li><strong className="text-gray-800">Respect Wildlife:</strong> Observe turtles/marine life from distance. No flash photography for nesting turtles. Don't chase animals.</li>
                                <li><strong className="text-gray-800">Choose Eco-Options:</strong> Support sustainable operators/dive shops/resorts. Prefer boats using moorings.</li>
                                <li><strong className="text-gray-800">Conserve Resources:</strong> Turn off AC/lights. Take shorter showers. Reuse towels. Water/power can be limited.</li>
                                <li><strong className="text-gray-800">Leave No Trace:</strong> Don't collect shells/coral (illegal). Buy local handicrafts instead.</li>
                                <li><strong className="text-gray-800">Support Local:</strong> Eat local, buy local souvenirs. Ensure community benefits from tourism.</li>
                            </ul>
                            <p className="text-base leading-relaxed mt-4 font-medium text-cyan-600">
                                Help keep Havelock pristine for future generations. Travel responsibly.
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {/* Photo gallery section */}
            <section className="mb-10 bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-start mb-6">
                    <Camera className="text-cyan-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/havelock-gallery-1.jpg" // Placeholder
                            alt="Havelock Island Gallery Image 1 - Beach view"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/havelock-gallery-2.jpg" // Placeholder
                            alt="Havelock Island Gallery Image 2 - Diving scene"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/havelock-gallery-3.jpg" // Placeholder
                            alt="Havelock Island Gallery Image 3 - Resort ambiance"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/havelock-gallery-4.jpg" // Placeholder
                            alt="Havelock Island Gallery Image 4 - Sunset colors"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Footer section */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Last updated: May 2025 • Havelock Island (Swaraj Dweep) Travel Guide</p>
            </div>
        </main>
    );
}