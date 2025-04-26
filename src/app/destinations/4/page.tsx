// Path: src/app/destinations/4/page.tsx // Assuming Port Blair is destination #4
'use client'; // Needed because we use useState for the toggle

import { useState } from 'react'; // Import useState for the toggle
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, Info, Calendar, Home, Utensils, MapIcon, Users, Shield, Leaf, Camera, UtensilsCrossed, Plane, Ship, Bus, Landmark, Waves, Anchor, Route, LifeBuoy, Recycle } from 'lucide-react'; // Import relevant icons

// Assuming you have Header and Footer components imported via a layout typically
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function PortBlairPage() {
    // State to manage the toggle switch
    const [showComprehensive, setShowComprehensive] = useState(false);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    return (
        // Assumes Header/Footer are handled by a layout file (e.g., src/app/layout.tsx)
        <main className="container mx-auto px-4 py-8 md:py-12 bg-gradient-to-b from-indigo-50 to-white min-h-screen">
            {/* Hero section with image and button */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
                {/* Hero image */}
                <div className="relative h-[450px] w-full">
                    <Image
                        src="/images/portblair-hero.jpg" // Placeholder image path
                        alt="Cellular Jail view, Port Blair"
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
                        Port Blair Travel Guide
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6 drop-shadow-md">
                        Explore the gateway to the Andamans: historical Cellular Jail, museums, island hopping hubs, and vibrant local life.
                    </p>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Discover Port Blair Tours
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
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${showComprehensive ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                        <span className={`absolute h-5 w-5 bg-white rounded-full top-1 transition-all duration-300 ${showComprehensive ? 'left-8' : 'left-1'}`}></span>
                    </span>
                </label>
                <label htmlFor="guide-toggle" className="ml-3 text-sm font-medium text-gray-600">Comprehensive Guide</label>
            </div>

            {/* Conditional Rendering based on state */}
            {!showComprehensive && (
                // Brief Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-6 pb-2 border-b-2 border-indigo-200">Port Blair: Brief Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Capital and “gateway” to the Andamans: mix of colonial history (Cellular Jail), beaches, museums and ferry hubs.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Around</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[200px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/portblair-airport.jpg" // Placeholder image
                                    alt="Veer Savarkar International Airport, Port Blair"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 md:w-2/3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Air:</strong> Veer Savarkar Int’l Airport (IXZ).</li>
                                <li><strong className="text-gray-800">Road:</strong> Autos (₹50–100), taxis, local buses (₹10–30), scooter rentals (₹400–500), cycle rickshaws.</li>
                                <li><strong className="text-gray-800">Ferries:</strong> Private & govt from Phoenix Bay (Havelock/Neil), Aberdeen Jetty (Ross, North Bay).</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Nov–Feb:</strong> Dry, comfortable.</li>
                            <li><strong className="text-gray-800">Mar–May:</strong> Hot, good visibility for marine trips.</li>
                            <li><strong className="text-gray-800">Jun–Sep:</strong> Monsoon—museum days, off-season rates.</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹1k–3k):</strong> Guesthouses in Aberdeen, Phoenix Bay.</li>
                            <li><strong className="text-gray-800">Mid-range (₹3k–7k):</strong> Sinclairs Bayview, Fortune/Welcomhotel Bay Island, Peerless Sarovar.</li>
                            <li><strong className="text-gray-800">Luxury (₹8k+):</strong> SeaShell Suites, top suites at Welcomhotel.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-indigo-600 bg-indigo-50 p-3 rounded-xl mt-4">
                            Recommendation: Book hotels in advance, especially for first/last nights connecting to flights/ferries.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <UtensilsCrossed className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} /> {/* UtensilsSquare for variety */}
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Seafood:</strong> New Lighthouse, Mandalay at Fortune.</li>
                            <li><strong className="text-gray-800">Veg:</strong> Annapurna, Icy Spicy.</li>
                            <li><strong className="text-gray-800">Cafés:</strong> Ripple Coffee, Brewberry’s.</li>
                            <li><strong className="text-gray-800">Rooftop Bars:</strong> Amaya (SeaShell), Nico Bar (Fortune).</li>
                        </ul>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Landmark className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-4">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/cellular-jail.jpg" // Placeholder
                                    alt="Cellular Jail National Memorial"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/ross-island-ruins.jpg" // Placeholder
                                    alt="Ruins overgrown with roots on Ross Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Cellular Jail + Light & Sound Show</strong> (evening).</li>
                            <li><strong className="text-gray-800">Ross Island:</strong> Ruins, deer, peacocks.</li>
                            <li><strong className="text-gray-800">Corbyn’s Cove:</strong> Beach, water sports.</li>
                            <li><strong className="text-gray-800">Samudrika & Anthropological Museums.</strong></li>
                            <li><strong className="text-gray-800">Chatham Saw Mill, Jolly Buoy/Red Skin day-trips</strong> (permit).</li>
                        </ul>
                    </section>

                    {/* Styled Table Card */}
                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities by Traveler Type</h3>
                        </div>
                        <div className="overflow-hidden mb-6">
                            <div className="overflow-x-auto"> {/* Wrapper for responsiveness */}
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-indigo-50 text-indigo-700 font-semibold uppercase">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-indigo-100 rounded-tl-xl">Traveler</th>
                                            <th scope="col" className="px-4 py-3 border-b-2 border-indigo-100 rounded-tr-xl">Highlights</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Backpackers</td>
                                            <td className="px-4 py-3">Free jail tours, budget hostels, Ross Island ruins, street food, Chidiya Tapu bus adventure.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Families</td>
                                            <td className="px-4 py-3">Cellular Jail storytime, marine museum, glass-bottom boat, North Bay sea walk, Corbyn’s Cove swim.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Couples</td>
                                            <td className="px-4 py-3">Mt. Harriet sunrise, Ross Island photography, sunset cruise, candlelight dinners, private photo shoots.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium">Adventure Seekers</td>
                                            <td className="px-4 py-3">Sea karting, sea walk/parasailing at North Bay, shipwreck dive, night kayak, ATV to Baratang.</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-3 font-medium rounded-bl-xl">Luxury Travelers</td>
                                            <td className="px-4 py-3 rounded-br-xl">VIP jail tour, private yacht cruises, bespoke island hops, helicopter transfers, fine-dining.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Users className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Cultural & Etiquette</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Modest dress in town; swimwear only on beaches.</li>
                                <li>Remove shoes in temples/tribal exhibits.</li>
                                <li>Ask before photos; no photography of naval/security zones.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Shield className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Safety & Health</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Low crime; basic vigilance. Road caution; helmets mandatory.</li>
                                <li>Mosquito repellent (dengue occasional).</li>
                                <li>Tap water best boiled/filtered. Emergency: 100 (police), 102 (ambulance).</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Leaf className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability</h3>
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li>Reuse bottles, avoid plastics. Conserve water/energy.</li>
                                <li>Respect coral & wildlife (no touching/feeding).</li>
                                <li>Support local conservation (museum fees help), join clean-ups.</li>
                            </ul>
                        </section>
                    </div>
                </div>
            )}

            {showComprehensive && (
                // Comprehensive Guide Content
                <div>
                    <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-6 pb-2 border-b-2 border-indigo-200">Port Blair: Comprehensive Guide</h2>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Info className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Overview</h3>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <div className="md:w-1/3 relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/portblair-overview.jpg" // Placeholder
                                    alt="Port Blair cityscape with harbor view"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-base leading-relaxed mb-4">
                                    Port Blair, the capital city of the Andaman & Nicobar Islands, is more than just a transit hub – it’s a vibrant town steeped in history and set against picturesque seaside backdrops. It proudly houses the Cellular Jail, a poignant colonial-era prison turned memorial, and offers a mix of cultural museums, lively markets, and nearby natural escapes. While not an island resort, Port Blair gives travelers a dose of urban comforts (hotels, restaurants, shops) before they venture to the more remote isles. It’s a city where you can learn about the islands’ past, savor diverse Indian cuisines with a tropical twist, and launch off to numerous surrounding attractions (Ross Island, North Bay, Jolly Buoy, and more). Friendly and laid-back, Port Blair is the gateway that warmly introduces you to the Andamans.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Route className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Getting There & Getting Around</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/portblair-transport.jpg" // Placeholder
                                alt="Auto rickshaws and buses in Port Blair"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Getting There (By Air):</strong> Veer Savarkar International Airport (IXZ) is the main entry point. Direct flights from major Indian cities (Chennai, Kolkata, Delhi, etc.). Airport is 4km south of city center. Taxis/autos available.
                        </p>
                        <p className="text-base leading-relaxed mb-4"><strong className="text-gray-800">Getting There (By Sea):</strong> Passenger ships from Kolkata/Chennai (~3 days). Adventurous but slow. Book ahead. Docks at Haddo Wharf.</p>

                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Getting Around (Within City):</strong> Hilly but compact.
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Auto-Rickshaws:</strong> Most convenient (₹50-100 intra-city). Agree on fare beforehand.</li>
                            <li><strong className="text-gray-800">Taxis:</strong> Available for hire (full day ~₹2500). Good for city tours/luggage.</li>
                            <li><strong className="text-gray-800">Buses:</strong> Cheap local buses connect areas (₹10-30). Good for budget travel to Corbyn's Cove, Chidiya Tapu. Central stand at Mohanpura.</li>
                            <li><strong className="text-gray-800">Two-Wheeler Rentals:</strong> Scooters/bikes (~₹400-500/day). Great for exploring outskirts. Wear helmet, drive cautiously on hilly roads.</li>
                            <li><strong className="text-gray-800">Cycle Rickshaws:</strong> Available for short hops in Aberdeen Bazaar (nostalgic).</li>
                        </ul>
                        <p className="text-base leading-relaxed mb-4">
                            <strong className="text-gray-800">Transfers to Other Islands:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Havelock/Neil Ferries:</strong> Depart from Phoenix Bay Jetty (private) or Chennai Street Jetty (govt).</li>
                            <li><strong className="text-gray-800">Ross/North Bay Boats:</strong> Depart from Rajiv Gandhi Water Sports Complex (Aberdeen Jetty). Buy tickets on spot.</li>
                            <li><strong className="text-gray-800">Baratang/North Andaman:</strong> Road trips start early morning via ATR road (permits needed). Buses available from STS Bus Terminal.</li>
                            <li><strong className="text-gray-800">Wandoor/Chidiya Tapu:</strong> Accessible by bus or taxi/auto (25-30km).</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-indigo-600 bg-indigo-50 p-3 rounded-xl mb-4">
                            Key Areas: Aberdeen Bazaar (heart of town), Phoenix Bay (jetty), Marine Hill (hotels), Corbyn's Cove (beach).
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Calendar className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Best Time to Visit</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/portblair-winter.jpg" // Placeholder
                                    alt="Pleasant weather at Marina Park, Port Blair"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Nov-Feb (Peak)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/portblair-summer.jpg" // Placeholder
                                    alt="Sunny day at Corbyn's Cove"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Mar-May (Warm)
                                </div>
                            </div>
                            <div className="relative h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/portblair-monsoon.jpg" // Placeholder
                                    alt="Rainy day view of Port Blair harbor"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-center">
                                    Jun-Sep (Rainy)
                                </div>
                            </div>
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Port Blair has a tropical climate with distinct seasons:
                            <ul className="list-disc list-inside space-y-2 my-3 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">October to May (Best time):</strong> Dry season. Pleasant temps (Nov-Feb, 23-30°C), ideal for sightseeing & boat trips. Mar-May hotter (32-34°C), good water visibility. Peak tourist season.</li>
                                <li><strong className="text-gray-800">June to September (Monsoon/off-season):</strong> Heavy rains, especially Jun-Jul. Ferry schedules may be disrupted. Jolly Buoy/Red Skin usually closed. Indoor attractions (museums, jail) remain open. Lush greenery, fewer crowds, lower rates.</li>
                                <li><strong className="text-gray-800">Festivals:</strong> Republic Day (Jan), Island Tourism Festival (Mar - check dates), Bengali New Year (Apr), Independence Day (Aug), Diwali (Oct/Nov).</li>
                            </ul>
                            Ideal time is Nov-Feb for best weather and full activities. Monsoon offers a different, quieter experience. Check weather bulletins during cyclone season (May, Oct-Nov).
                        </p>
                        <p className="text-base leading-relaxed font-medium text-indigo-600 bg-indigo-50 p-3 rounded-xl mb-4">
                            Travel Tip: If visiting during monsoon, be flexible with island trip plans and prioritize indoor attractions.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Home className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Accommodation (Budget to Luxury)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/portblair-hotel.jpg" // Placeholder
                                alt="Hotel with sea view in Port Blair"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Port Blair offers the widest accommodation range in Andamans, catering to all budgets.
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Budget (₹1000–₹3000):</strong> Guesthouses/basic hotels in Aberdeen Bazaar, Phoenix Bay (e.g., Aashiana, Hotel Lalaji). Simple rooms, fan/basic AC. Good for backpackers. Book ahead in peak season.</li>
                            <li><strong className="text-gray-800">Mid-Range (₹3000–₹7000):</strong> Comfortable 3-star hotels/resorts. Examples: Hotel Sinclairs Bayview (sea view, pool), Peerless Sarovar Portico (on Corbyn's Cove beach), TSG Emerald/Grand (city locations). AC rooms, restaurants, often pool/views. Govt-run Hornbill Nest (near Corbyn's, budget-mid).</li>
                            <li><strong className="text-gray-800">Luxury (₹8000+):</strong> Limited but growing. Welcomhotel Bay Island by ITC (heritage feel, sea view, Nico Bar), SeaShell Port Blair (modern boutique, Amaya rooftop bar), Top suites at Sinclairs. Focus on comfort, service, views.</li>
                            <li><strong className="text-gray-800">Special Stays:</strong> Homestays, eco-retreats on outskirts (e.g., near Chidiya Tapu). Govt guest houses (availability varies).</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-indigo-600 bg-indigo-50 p-3 rounded-xl mb-4">
                            Booking Advice: Book your first/last nights in Port Blair in advance, especially if connecting flights/ferries. Hotels often store luggage during island hops.
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <UtensilsCrossed className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Food & Dining</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/portblair-food.jpg" // Placeholder
                                alt="Seafood platter at a Port Blair restaurant"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <p className="text-base leading-relaxed mb-4">
                            Port Blair offers diverse cuisines reflecting its mixed population.
                        </p>
                        <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                            <li><strong className="text-gray-800">Local Andamani & Seafood:</strong> New Lighthouse Restaurant (iconic, sea view, choose fresh catch), Mandalay (Fortune Bay - upscale seafood), Street seafood near Marina Park (fish pakora).</li>
                            <li><strong className="text-gray-800">Indian Cuisine:</strong> Annapurna Cafeteria (South Indian dosa/thali - veg), Icy Spicy (veg North Indian/chaat), Sri Karpagam (Tamil meals), Zaffran (Hyderabadi biryani), Gabriel Restaurant (Bengali thali).</li>
                            <li><strong className="text-gray-800">International & Cafés:</strong> Amaya (SeaShell - rooftop multi-cuisine, cocktails), Ripple Coffee/Brewberry’s (modern cafes, espresso), Gagan Restaurant & Bakery (pastries, snacks), New India Cafe (Thai).</li>
                            <li><strong className="text-gray-800">Alcohol / Nightlife:</strong> Subdued. Bars at Peerless, Amaya (SeaShell), Nico Bar (Fortune). Local wine shops available. No major nightclubs.</li>
                            <li><strong className="text-gray-800">Local Markets & Street Food:</strong> Aberdeen Bazaar (chaat, pakoras). Mohanpura fruit market. Dairy Farm bakeries.</li>
                        </ul>
                        <p className="text-base leading-relaxed font-medium text-indigo-600 bg-indigo-50 p-3 rounded-xl mb-4">
                            Dining Etiquette: Casual. Tipping (5-10%) appreciated. Drink bottled/filtered water. Enjoy the culinary diversity!
                        </p>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Landmark className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Key Attractions</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/cellular-jail-day.jpg" // Placeholder
                                    alt="Cellular Jail complex during the day"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Cellular Jail</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/ross-island-deer.jpg" // Placeholder
                                    alt="Deer roaming freely on Ross Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Ross Island</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/corbyns-cove.jpg" // Placeholder
                                    alt="Corbyn's Cove beach view"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Corbyn's Cove</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/samudrika-museum.jpg" // Placeholder
                                    alt="Inside Samudrika Naval Marine Museum"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Museums</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/chatham-sawmill.jpg" // Placeholder
                                    alt="Chatham Saw Mill operations"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Chatham Saw Mill</div>
                            </div>
                            <div className="relative h-[250px] rounded-xl overflow-hidden">
                                <Image
                                    src="/images/jolly-buoy.jpg" // Placeholder
                                    alt="Snorkeling at Jolly Buoy Island"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">Jolly Buoy/Red Skin</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Cellular Jail (Kala Pani):</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Historic colonial prison, now a National Memorial. Tour the cells, museum, execution room. Attend the moving Light & Sound Show in the evening (Hindi/English). Closed Mondays.
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Ross Island (Netaji Subhas Dweep):</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Former British HQ, now scenic ruins overgrown by roots. Explore church, Chief Commissioner's house ruins. See friendly deer, peacocks. Short boat ride from Aberdeen Jetty. Closed Wednesdays.
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Corbyn’s Cove Beach:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Closest beach to city (8km). Coconut-palm lined cove. Good for swimming, jet skiing. Snack shacks, changing rooms available. Pleasant evening spot.
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Museums:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    <strong className="text-gray-800">Samudrika Naval Marine Museum:</strong> Intro to island ecosystems, geography, tribes. Aquarium section. <strong className="text-gray-800">Anthropological Museum:</strong> Focus on indigenous tribes (Jarawa, Sentinelese etc.), their culture, tools. Both closed Mondays.
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Chatham Saw Mill:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Asia's oldest sawmill. Guided tour shows log processing, vintage machinery. Forest museum displays local timber. Buy wooden souvenirs. Wear covered shoes.
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Jolly Buoy / Red Skin Islands:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Day trip from Wandoor (permit required). Part of Marine National Park. Pristine beaches, amazing snorkeling over live corals. Plastic-free zone. One island open at a time (Nov-May Jolly Buoy, monsoon Red Skin).
                                </p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                                <p className="text-base font-semibold text-gray-800 mb-2">Other Points:</p>
                                <p className="text-base leading-relaxed mb-4">
                                    Mount Harriet (Mt. Manipur - viewpoint, birding), Chidiya Tapu (sunset point, biological park), Marina Park & Aquarium, Sagarika Emporium (handicrafts).
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Activities & Experiences (By Traveler Type)</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/portblair-activities.jpg" // Placeholder
                                alt="Tourists enjoying activities like boating near Port Blair"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-indigo-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-2">Backpackers</h4>
                                <p className="text-base leading-relaxed">Explore Cellular Jail/Ross Island ruins affordably. Stay in budget hostels/guesthouses. Enjoy street food. Take local bus to Chidiya Tapu. Socialize at hostels/rooftop bars.</p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-2">Families</h4>
                                <p className="text-base leading-relaxed">Engaging Cellular Jail tour/show. Samudrika museum. Glass-bottom boat/sea walk at North Bay. Swim at Corbyn's Cove. Visit Chidiya Tapu zoo. Playgrounds at Marina Park.</p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-2">Couples</h4>
                                <p className="text-base leading-relaxed">Sunrise from Mt. Harriet. Romantic strolls on Ross Island. Sunset cruise/Chidiya Tapu visit. Candlelight dinners (Fortune/SeaShell). Spa sessions. Private photo shoots.</p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-2">Adventure Seekers</h4>
                                <p className="text-base leading-relaxed">Scuba diving (shipwrecks). Sea Karting at Corbyn's. Sea walk/parasailing at North Bay. Mt. Harriet trek. Night kayaking. Explore WWII bunkers. Bike trip to Baratang.</p>
                            </div>
                            <div className="bg-indigo-50 p-4 rounded-xl lg:col-span-2">
                                <h4 className="text-lg font-semibold text-indigo-700 mb-2">Luxury Travelers</h4>
                                <p className="text-base leading-relaxed">Exclusive jail tours. Private yacht charters for island hopping/sunset cruise. Bespoke guided tours. Helicopter transfers. Chef-led cooking demos. Fine dining at rooftop bars. VIP treatment.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8 bg-white p-6 rounded-2xl shadow-md">
                        <div className="flex items-start mb-3">
                            <Users className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                            <h3 className="text-xl font-semibold text-gray-800">Cultural Insights & Local Etiquette</h3>
                        </div>
                        <div className="relative h-[250px] w-full rounded-xl overflow-hidden mb-6">
                            <Image
                                src="/images/portblair-market.jpg" // Placeholder
                                alt="Aberdeen Bazaar local market scene"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div className="space-y-4">
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Diverse Community:</strong> "Mini-India" with settlers from Bengal, Tamil Nadu, Kerala, etc. Multiple languages (Hindi/Bengali common), religions coexist peacefully. Embrace the diversity.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Etiquette:</strong> Casual but modest dress in town; swimwear for beaches only. Remove shoes at homes/temples. Greet with "Namaste" or "Hello". Address elders respectfully ("Ji", "Dada/Didi").
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Photography:</strong> Ask permission before photographing locals. Avoid naval/security areas. No photography inside tribal exhibits at museum.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Indigenous People (Jarawa):</strong> If encountered on ATR road, NO interaction/photography. Respect their privacy and reserve status strictly.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                <strong className="text-gray-800">Respect for Nature:</strong> Locals value environment. Avoid littering. Follow eco-friendly practices. Support local handicrafts over shell/coral souvenirs.
                            </p>
                            <p className="text-base leading-relaxed mb-4">
                                Locals are friendly and curious. Be patient, polite, and open-minded. Show genuine interest and respect, and you'll be welcomed warmly.
                            </p>
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <LifeBuoy className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Safety Tips & Health Advice</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/portblair-pharmacy.jpg" // Placeholder
                                    alt="A local pharmacy (Medical Store) in Port Blair"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">General Safety:</strong> Very safe city, low crime. Basic vigilance with belongings advised. Walkable main areas at night.</li>
                                <li><strong className="text-gray-800">Road Safety:</strong> Drive cautiously (hilly/winding roads). Wear helmet on two-wheelers. Watch for pedestrians/animals.</li>
                                <li><strong className="text-gray-800">Water Safety:</strong> Swim only at designated beaches like Corbyn's Cove (near shore). Heed crocodile warnings (rare but possible near creeks). Listen to guides/locals.</li>
                                <li><strong className="text-gray-800">Natural Calamities:</strong> Aware of seismic activity/tsunami risk (warning systems in place). Follow instructions during cyclones/heavy weather.</li>
                                <li><strong className="text-gray-800">Health:</strong> Good hospitals (GB Pant) & clinics. Pharmacies available. Carry personal meds. Use mosquito repellent (dengue risk). Drink bottled/filtered water. Be cautious with street food hygiene.</li>
                                <li><strong className="text-gray-800">Sun Protection:</strong> Use sunscreen, hat, stay hydrated.</li>
                                <li><strong className="text-gray-800">Emergency:</strong> Police 100, Ambulance 102. Keep hotel/agent contacts.</li>
                            </ul>
                        </section>

                        <section className="bg-white p-6 rounded-2xl shadow-md">
                            <div className="flex items-start mb-3">
                                <Recycle className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                                <h3 className="text-xl font-semibold text-gray-800">Sustainability Tips</h3>
                            </div>
                            <div className="relative h-[200px] w-full rounded-xl overflow-hidden mb-6">
                                <Image
                                    src="/images/portblair-cleanup.jpg" // Placeholder
                                    alt="Volunteers during a beach cleanup drive near Port Blair"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <ul className="list-disc list-inside space-y-3 mb-4 pl-4 text-gray-700">
                                <li><strong className="text-gray-800">Reduce Plastic:</strong> Carry reusable bottles/bags. Refuse single-use plastics. Dispose waste properly in bins.</li>
                                <li><strong className="text-gray-800">Conserve Water/Energy:</strong> Take shorter showers. Turn off lights/AC when not needed. Support eco-conscious hotels.</li>
                                <li><strong className="text-gray-800">Respect Wildlife/Marine Life:</strong> Do not touch/feed animals/coral. Use reef-safe sunscreen. Choose responsible tour operators.</li>
                                <li><strong className="text-gray-800">Support Conservation:</strong> Visit museums/parks (fees help). Join clean-ups if possible.</li>
                                <li><strong className="text-gray-800">Respect Heritage:</strong> Do not deface historical sites. Learn about tribal cultures ethically (museums, not exploitative tours).</li>
                                <li><strong className="text-gray-800">Support Local Economy:</strong> Buy local handicrafts (Sagarika). Eat at local restaurants.</li>
                            </ul>
                            <p className="text-base leading-relaxed mt-4 font-medium text-indigo-600">
                                Travel responsibly to help preserve Port Blair's unique environment and culture.
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {/* Photo gallery section */}
            <section className="mb-10 bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-start mb-6">
                    <Camera className="text-indigo-600 mr-2 mt-1 flex-shrink-0" size={20} />
                    <h3 className="text-xl font-semibold text-gray-800">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/portblair-gallery-1.jpg" // Placeholder
                            alt="Port Blair Gallery Image 1 - Cellular Jail Light Show"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/portblair-gallery-2.jpg" // Placeholder
                            alt="Port Blair Gallery Image 2 - Ross Island Church Ruins"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/portblair-gallery-3.jpg" // Placeholder
                            alt="Port Blair Gallery Image 3 - Corbyn's Cove Beach"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className="relative h-[150px] rounded-xl overflow-hidden">
                        <Image
                            src="/images/portblair-gallery-4.jpg" // Placeholder
                            alt="Port Blair Gallery Image 4 - Harbor View"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Footer section */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>Last updated: July 2025 • Port Blair Travel Guide</p>
            </div>
        </main>
    );
}