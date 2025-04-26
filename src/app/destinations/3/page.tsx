// Path: src/app/destinations/3/page.tsx // Assuming Neil Island is destination #3
'use client'; // Needed because we use useState for the toggle

import { useState } from 'react'; // Import useState for the toggle
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, Info, Calendar, Home, Utensils, MapIcon, Users, Shield, Leaf, Camera, Ship, Bike, BedDouble, Sprout, Heart, Anchor, Sun, Sunset, Waves, Recycle, LifeBuoy, Route } from 'lucide-react'; // Import relevant icons

// Assuming you have Header and Footer components imported via a layout typically
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function NeilIslandPage() {
    // State to manage the toggle switch
    const [showComprehensive, setShowComprehensive] = useState(false);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    return (
        // Assumes Header/Footer are handled by a layout file (e.g., src/app/layout.tsx)
        <main className="container mx-auto px-4 py-8 md:py-12 bg-gradient-to-b from-green-50 to-white min-h-screen">
            {/* Hero section with image and button */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
                {/* Hero image */}
                <div className="relative h-[450px] w-full">
                    <Image
                        src="/images/neil-hero.jpg" // Placeholder image path
                        alt="Bharatpur Beach lagoon, Neil Island (Shaheed Dweep)"
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
                        Neil Island (Shaheed Dweep) Travel Guide
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Discover Andaman's serene "vegetable bowl"—pristine beaches, natural bridges, and an unhurried pace perfect for relaxation and cycling.
                    </p>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Explore Neil Island Packages
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
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${showComprehensive ? 'bg-green-600' : 'bg-gray-300'}`}>
                        <span className={`absolute h-5 w-5 bg-white rounded-full top-1 transition-all duration-300 ${showComprehensive ? 'left-8' : 'left-1'}`}></span>
                    </span>
                </label>
                <label htmlFor="guide-toggle" className="ml-3 text-sm font-medium text-gray-600">Comprehensive Guide</label>
            </div>

            {/* Conditional Rendering based on state */}
            {!showComprehensive && (
                // Brief Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-6 pb-2 border-b-2 border-green-200">Neil Island: Brief Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            A serene, small island famed for its “vegetable bowl” farms, pristine beaches, the Natural Bridge rock formation and unhurried pace.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Around</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[200px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-jetty.jpg" // Placeholder image
                                    alt="Ferry at Neil Island Jetty (Bharatpur)"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 md:w-2/3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Ferries:</strong> Port Blair ~2 hr; Havelock ~1 hr (private recommended).</li>
                                <li><strong className="text-gray-800">On-island:</strong> Bicycle (₹150–200/day), scooter (₹400–500), autos (₹50–150), walking, occasional bus.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Nov–May:</strong> Ideal beaches, snorkeling.</li>
                            <li><strong className="text-gray-800">Jun–Sep:</strong> Monsoon—fewer tourists, lush vegetation, some closures.</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹500–1.5k):</strong> Homestays, huts, basic camps.</li>
                            <li><strong className="text-gray-800">Mid-range (₹2k–5k):</strong> Pearl Park, TSG Aura, Summer Sands.</li>
                            <li><strong className="text-gray-800">Luxury (₹6k+):</strong> SeaShell Neil, eco-cottages.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-green-600 bg-green-50 p-3 rounded-xl mt-4">
                            Recommendation: Book ahead as options are fewer than Havelock, especially during peak season.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Utensils className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Local dhabas:</strong> Fish thalis (₹150–200); Ganesh Restaurant.</li>
                            <li><strong className="text-gray-800">Resort eateries:</strong> Dugong (SeaShell), Organic Khao (Summer Sands).</li>
                            <li><strong className="text-gray-800">Street fruit:</strong> Coconuts (₹30–40), farm stands.</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <MapPin className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/bharatpur-beach-neil.jpg" // Placeholder
                                    alt="Bharatpur Beach lagoon"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/natural-bridge-neil.jpg" // Placeholder
                                    alt="Natural Bridge rock formation at low tide"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Bharatpur Beach:</strong> Lagoon, snorkeling, glass-bottom boats.</li>
                            <li><strong className="text-gray-800">Natural Bridge:</strong> Coral rock arch at Laxmanpur (low tide).</li>
                            <li><strong className="text-gray-800">Laxmanpur Beach:</strong> Sunset, golden sand.</li>
                            <li><strong className="text-gray-800">Sitapur Beach:</strong> Sunrise, limestone cliffs.</li>
                            <li><strong className="text-gray-800">Snorkeling/Diving:</strong> Junction, Bus Stop, rare dugong sightings.</li>
                        </ul>
                    </section>

                    {/* Styled Table Card */}
                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities by Traveler Type</h3>
                        </div>
                        <div className="overflow-hidden mb-6">
                            <div className="overflow-x-auto"> {/* Wrapper for responsiveness */}
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-green-50 text-green-700 font-semibold uppercase">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-green-100 rounded-tl-xl">Traveler</th>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-green-100 rounded-tr-xl">Highlights</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Backpackers</td>
                                            <td className="px-4 py-3">Cycle the island, sunrise & sunset points, hammock time, local tea-stall socializing</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Families</td>
                                            <td className="px-4 py-3">Glass-bottom boat, safe wading at Bharatpur, gentle cycling, beach picnics</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Couples</td>
                                            <td className="px-4 py-3">Sunrise at Sitapur, sunset at Laxmanpur, picnic on beach, private candlelight dinner at resort</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Adventure Seekers</td>
                                            <td className="px-4 py-3">Drift dives with currents, night snorkeling with bioluminescence, deep-sea fishing, offbeat coral exploration</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium rounded-bl-xl">Luxury Travelers</td>
                                            <td className="px-4 py-3 rounded-br-xl">Private speedboat snorkel charters, sandbank picnics, in-resort spa, helicopter transfers + yacht day trips</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Users className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Cultural & Etiquette</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Village wear modest in market; beachwear only on beaches.</li>
                                <li>Greet with “Namaste,” “Dada/Didi.”</li>
                                <li>No shell/coral souvenirs—buy local handicrafts instead.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Shield className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Safety & Health</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Mosquito repellent, sun protection.</li>
                                <li>Tap water not reliably treated—use bottled/RO water.</li>
                                <li>Primary Health Centre on-island; major care in Port Blair.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Leaf className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Reduce plastic, reef-safe sunscreen, trench your trash.</li>
                                <li>Respect turtle nesting (Nov–Feb).</li>
                                <li>Support local farmers & eco-lodges.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}

            {showComprehensive && (
                // Comprehensive Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-green-700 mt-8 mb-6 pb-2 border-b-2 border-green-200">Neil Island: Comprehensive Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-overview.jpg" // Placeholder
                                    alt="Lush green fields and coastline of Neil Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-base leading-relaxed mb-4">
                                    Neil Island, officially Shaheed Dweep, is a tranquil emerald isle known as the “vegetable bowl” of Andamans for its rich soil and agricultural produce. It’s smaller and far quieter than Havelock, exuding a serene rural charm. Neil is beloved for its picture-postcard beaches, spectacular coral reefs, and a signature natural rock formation aptly nicknamed the “Howrah Bridge.” Life on Neil moves at a gentle pace – perfect for travelers looking to unwind, cycle through sleepy villages, and enjoy nature without crowds. With just 13.7 sq km area, you can cover the whole island in a day or two, yet many end up lingering, seduced by its simplicity and raw beauty.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Getting Around</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/neil-cycling.jpg" // Placeholder
                                alt="Cycling on a quiet road in Neil Island"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Getting There (Ferry):</strong> The only practical way is by sea. Frequent ferries connect Neil with Port Blair (~2 hours) and Havelock (~1 hour).
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Private Ferries:</strong> Makruzz, Nautika, etc. Recommended; book online in advance.</li>
                            <li><strong className="text-gray-800">Government Ferries:</strong> Cheaper, harder for tourists to book (local priority).</li>
                        </ul>
                        <p className="text-base leading-relaxed mb-4">No airport or helicopter service for tourists.</p>

                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Local Transportation:</strong> Neil is delightfully small (5km end-to-end).
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Bicycle Rentals:</strong> Highly recommended (~₹150-200/day). Flat terrain, low traffic. Perfect for exploring.</li>
                            <li><strong className="text-gray-800">Two-Wheeler Rentals:</strong> Scooters/bikes available (~₹400-500/day). Convenient for quicker coverage. Fuel station available.</li>
                            <li><strong className="text-gray-800">Auto-Rickshaws:</strong> Point-to-point rides (₹50-150). Can hire for island tour (~₹500-800).</li>
                            <li><strong className="text-gray-800">Buses/Shared Jeep:</strong> Infrequent local bus service exists. Shared jeeps also used. Very cheap, good for local interaction.</li>
                            <li><strong className="text-gray-800">On Foot:</strong> Many spots walkable, especially near jetty/market. Lovely in cooler hours.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-green-600 bg-green-50 p-3 rounded-xl mb-4">
                            Layout: Jetty at Bharatpur (NW). Neil Kendra (market) central. Laxmanpur (NW), Sitapur (E). Very compact, hard to get lost. Locals helpful.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-winter.jpg" // Placeholder
                                    alt="Sunny beach day in Neil Island winter"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Nov-Feb (Ideal)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-spring.jpg" // Placeholder
                                    alt="Flowering trees in Neil Island spring"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Mar-May (Warm)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-monsoon.jpg" // Placeholder
                                    alt="Lush greenery during Neil Island monsoon"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Jun-Sep (Rainy)
                                </div>
                            </div>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Neil welcomes visitors year-round, but experiences differ:
                            <ul className="list-disc list-inside space-y-2 my-3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">October to May (Best time):</strong> Ideal window. Pleasant weather (Nov-Feb, 28°C), calm clear seas for activities. Peak season but never feels overcrowded. Mar-May warmer, good visibility, flowering trees, abundant farm produce.</li>
                                <li><strong className="text-gray-800">June to September (Monsoon off-season):</strong> Heavy showers, possible ferry disruptions. Low tourism, some resorts may close. Lush green landscapes. Good for solitude if rain doesn't bother you; water activities limited.</li>
                                <li><strong className="text-gray-800">Shoulder Months (Sep/Oct, May/Jun):</strong> Mixed weather. Fewer tourists, reopening/closing infrastructure. Can be a good balance.</li>
                            </ul>
                            December to March is highly recommended for perfect beach weather and fully operational services.
                        </p>
                        <p className="text-base leading-relaxed font-medium text-green-600 bg-green-50 p-3 rounded-xl mb-4">
                            Travel Tip: Allocate buffer days if traveling during monsoon or shoulder seasons due to potential ferry rescheduling.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation (Budget to Luxury)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/neil-resort.jpg" // Placeholder
                                alt="Cozy resort cottage in Neil Island"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Neil offers fewer options than Havelock, focusing on eco-friendly resorts and cottages. Vibe is low-key.
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹500–₹1500):</strong> Homestays, basic huts (e.g., Tango Beach Resort - check status), tented camps near Sitapur or Bharatpur. Fan rooms, basic amenities, often shared/cold baths. Great for backpackers.</li>
                            <li><strong className="text-gray-800">Mid-Range (₹2000–₹5000):</strong> Comfortable AC rooms/cottages. Examples: Pearl Park Beach Resort (Laxmanpur, sunset views), TSG Aura (Sitapur, modern rooms), Kalapani, Coconhuts. Often include hot water, dining, activity booking.</li>
                            <li><strong className="text-gray-800">Luxury (₹6000+):</strong> Limited but growing. SeaShell Neil (stylish cottages, upscale dining), Summer Sands Beach Resort (pool, spa access). Focus on tranquility and nature integration. Treehouses/eco-cottages may exist.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-green-600 bg-green-50 p-3 rounded-xl mb-4">
                            Booking Advice: Essential to book mid-range/luxury ahead, especially in peak season, due to limited capacity. Budget travelers can often find walk-in options (except peak holidays). Most resorts can arrange jetty pickup.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Utensils className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/neil-food.jpg" // Placeholder
                                alt="Fresh fish thali meal in Neil Island"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Neil’s dining is modest but delightful, emphasizing fresh, local ingredients.
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Local Eateries (Dhabas):</strong> Neil Kendra market has shacks serving cheap, tasty thalis (fish thali ₹150-200). Ganesh Restaurant is popular. Homestyle cooking, Bengali influence.</li>
                            <li><strong className="text-gray-800">Resort Restaurants:</strong> Most mid-range+ resorts have restaurants (open to non-guests). Dugong (SeaShell Neil - upscale mix), Organic Khao (Summer Sands - organic focus), Pearl Park restaurant (buffet options).</li>
                            <li><strong className="text-gray-800">Seafood Delicacies:</strong> Fresh grilled fish, lobster, crab curry widely available. Try fish cooked in banana leaf. Check beach vendors near Bharatpur for grilled fish.</li>
                            <li><strong className="text-gray-800">Vegetarian Options:</strong> Excellent local vegetables (pumpkin, okra). Veg thalis available. Icy Spicy branch for North Indian/snacks. Resorts cater to vegetarians.</li>
                            <li><strong className="text-gray-800">Fruits and Drinks:</strong> Abundant coconuts (₹30-40), watermelons, bananas from farm stands. Basic chai/coffee available. Limited alcohol (only in some resort bars); BYOB responsibly from Port Blair.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-green-600 bg-green-50 p-3 rounded-xl mb-4">
                            Dining Etiquette: Casual. Island pace (food prepared fresh). Pre-order if in a rush. Tipping appreciated at local places. Try the farm-fresh produce!
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <MapPin className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/bharatpur-beach-neil-activities.jpg" // Placeholder
                                    alt="Glass bottom boat at Bharatpur Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Bharatpur Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/natural-bridge-neil-lowtide.jpg" // Placeholder
                                    alt="Exploring tide pools near Natural Bridge"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Natural Bridge</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/laxmanpur-beach-sunset.jpg" // Placeholder
                                    alt="Sunset view at Laxmanpur Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Laxmanpur Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/sitapur-beach-sunrise.jpg" // Placeholder
                                    alt="Sunrise colors at Sitapur Beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Sitapur Beach</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-snorkeling.jpg" // Placeholder
                                    alt="Snorkeling over coral reefs in Neil Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Snorkeling/Diving</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/neil-village-life.jpg" // Placeholder
                                    alt="Cycling past paddy fields in Neil Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Village Exploration</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Bharatpur Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Near jetty. Picturesque lagoon with clear, shallow water. Best swimming beach. Hub for glass-bottom boats, snorkeling rentals. Good coral reef visibility in mornings. Relaxing spot with snack stalls. Check tide timings.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Natural Rock Formation (Howrah Bridge):</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Iconic coral rock arch near Laxmanpur Beach 2. Best visited at low tide. Great for photos. Explore tide pools nearby (starfish, sea cucumbers). Walk carefully on sharp/slippery rocks. Local guides available.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Laxmanpur Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    West-facing beach (No.1) famous for stunning sunsets. Wide stretch of white shell sand. Tranquil atmosphere. Snack stalls available. Good for evening walks and stargazing. Not ideal for swimming (corals/currents).
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Sitapur Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Eastern tip (Beach No.5), known for beautiful sunrises over the sea. Half-moon bay with limestone cliffs. Golden sand, tidal pools at low tide. Rocky, not great for swimming. Very secluded, especially early morning.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Snorkeling/Diving:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Neil offers rich coral reefs. Snorkel off Bharatpur or Natural Bridge area (low tide). Dive sites include Junction, Bus Stop. A couple of dive shops operate on the island. Chance to spot rare dugongs (sea cows).
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Village Exploration:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Cycle or walk through the island's interior. Observe farming activities (vegetable fields, paddy, plantations). Visit Neil Kendra market for a slice of local life. Enjoy the unhurried pace.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities & Experiences (By Traveler Type)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/neil-activities-diverse.jpg" // Placeholder
                                alt="People enjoying various activities on Neil Island"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-green-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-green-700 mb-2">Backpackers</h4>
                                <p className="text-base leading-relaxed">Rent bicycle, explore freely. Stay in homestays/huts. Enjoy cheap thalis. Catch sunrise/sunset. Hammock time. Socialize at tea stalls. Relaxed vibe, budget-friendly.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-green-700 mb-2">Families</h4>
                                <p className="text-base leading-relaxed">Safe wading at Bharatpur. Glass-bottom boat rides. Gentle cycling routes. Sandcastle building. Picnic spots. Quiet, safe environment for kids.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-green-700 mb-2">Couples</h4>
                                <p className="text-base leading-relaxed">Romantic sunrise at Sitapur, sunset at Laxmanpur. Cycle together. Beach picnics. Private dinners at resorts. Stargazing. Tranquil and intimate setting.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-green-700 mb-2">Adventure Seekers</h4>
                                <p className="text-base leading-relaxed">Drift diving (experienced). Night snorkeling (bioluminescence). Try hand-line fishing with locals. Explore offbeat coral areas. Cycle the island end-to-end.</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl lg:col-span-2">
                                <h4 className="text-lg font-semibold text-green-700 mb-2">Luxury Travelers</h4>
                                <p className="text-base leading-relaxed">Stay at SeaShell/Summer Sands. Arrange private guided tours/snorkel charters. Sandbank picnics. In-resort spa. Curated dining experiences. Enjoy tranquility in comfort.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Cultural Insights & Local Etiquette</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/neil-local-market.jpg" // Placeholder
                                alt="Neil Kendra market scene"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Local Lifestyle:</strong> Predominantly rural, community-driven. Farming ("vegetable bowl") and fishing are mainstays. Early risers. Close-knit community.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Language & Communication:</strong> Bengali and Hindi primary. English understood in tourism sector. "Namaste" or "Dada/Didi" appreciated. Locals are hospitable.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Dress and Behaviour:</strong> Beachwear on beaches, modest attire (cover up) in village/market. Respectful conduct. Low crime. Ask permission before entering farms/property.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Visiting Local Spots:</strong> Remove shoes at temples. Ask before interacting at schools. Participate respectfully if invited to festivals.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Purchasing Local Goods:</strong> Bargaining minimal. Buy local produce/handicrafts. Avoid illegal shells/coral.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Respect for Environment:</strong> Locals value cleanliness. Do not litter. Respect quiet village life, especially at night.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                Embrace the simplicity, warmth, and harmony with nature that defines Neil's culture.
                            </p>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <LifeBuoy className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Safety Tips & Health Advice</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/neil-first-aid.jpg" // Placeholder
                                    alt="Basic first aid supplies"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">General Safety:</strong> Extremely safe island (low crime). Use common sense for valuables. Small police outpost near jetty.</li>
                                <li><strong className="text-gray-800">Beach Safety:</strong> Bharatpur safest for swimming. Other beaches have rocks/currents (better for wading). No lifeguards. Avoid swimming at night/under influence. Check tides.</li>
                                <li><strong className="text-gray-800">Snorkeling/Diving:</strong> Use life jacket if needed. Don't touch coral. Heed dive instructor advice. Allow no-fly time after diving.</li>
                                <li><strong className="text-gray-800">Medical Facilities:</strong> Basic PHC available. Serious issues require transfer to Port Blair. Carry personal meds & first-aid kit. Pharmacy in market (limited stock).</li>
                                <li><strong className="text-gray-800">Mosquitoes & Insects:</strong> Use repellent (esp. dawn/dusk). Beware sandflies on some beaches (use repellent/oil).</li>
                                <li><strong className="text-gray-800">Cash & Connectivity:</strong> Carry sufficient cash (ATMs unreliable). Limited card acceptance/money exchange. BSNL/Airtel work best, data spotty. Inform family of potential low connectivity.</li>
                                <li><strong className="text-gray-800">Emergency Contacts:</strong> Dial 100/102. Keep hotel/ferry agent numbers. Heed weather warnings.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Recycle className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability Tips</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/neil-eco-friendly.jpg" // Placeholder
                                    alt="Reusable bottle on a Neil Island beach"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Minimize Plastic:</strong> Use reusable bottles/bags. Refuse single-use items. Dispose waste responsibly.</li>
                                <li><strong className="text-gray-800">Protect Reefs:</strong> Don't touch/stand on coral. Use reef-safe sunscreen. Choose responsible operators. Participate in beach clean-ups.</li>
                                <li><strong className="text-gray-800">Conserve Water & Energy:</strong> Take shorter showers. Turn off lights/AC. Support resorts using solar/rainwater harvesting.</li>
                                <li><strong className="text-gray-800">Respect Wildlife:</strong> Observe turtles from distance, no lights/flash. Don't disturb nesting sites. Avoid hitting roaming animals.</li>
                                <li><strong className="text-gray-800">Support Local & Sustainable:</strong> Eat local produce. Buy local handicrafts (avoid illegal shells/coral). Choose eco-lodges.</li>
                                <li><strong className="text-gray-800">Leave Only Footprints:</strong> Don't remove natural items. Stick to paths. Clean up after any activities (e.g., picnics, bonfires).</li>
                                <li><strong className="text-gray-800">Educate Others:</strong> Gently encourage responsible behaviour in fellow travelers.</li>
                            </ul>
                            <p className="text-base leading-relaxed mt-4 font-medium text-green-600">
                                Help preserve Neil's charm by traveling mindfully and respecting its delicate environment and community.
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {/* Photo gallery section */}
            <section className="mb-10 bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-start mb-6">
                    <Camera className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/neil-gallery-1.jpg" // Placeholder
                            alt="Neil Island Gallery Image 1 - Beach landscape"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/neil-gallery-2.jpg" // Placeholder
                            alt="Neil Island Gallery Image 2 - Natural Bridge detail"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/neil-gallery-3.jpg" // Placeholder
                            alt="Neil Island Gallery Image 3 - Cycling path"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/neil-gallery-4.jpg" // Placeholder
                            alt="Neil Island Gallery Image 4 - Sunset silhouette"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Footer section */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Last updated: June 2025 • Neil Island (Shaheed Dweep) Travel Guide</p>
            </div>
        </main>
    );
}