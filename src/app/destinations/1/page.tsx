// Path: src/app/destinations/1/page.tsx
'use client'; // Needed because we use useState for the toggle

import { useState } from 'react'; // Import useState for the toggle
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Check, Info } from 'lucide-react'; // Import any needed icons

// Assuming you have Header and Footer components imported via a layout typically
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

export default function Destination1Page() {
    // State to manage the toggle switch
    const [showComprehensive, setShowComprehensive] = useState(false);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    return (
        // Removed <html>, <head>, <body> - Next.js handles this.
        // Assumes Header/Footer are handled by a layout file (e.g., src/app/layout.tsx)
        // If not using a layout, you'd import and render Header/Footer here.

        // Apply base body styles via globals.css or layout, not directly here usually.
        // The `bg-gray-50 text-gray-700` would typically be on the <body> tag in layout.tsx
        <main className="container mx-auto px-4 py-8 md:py-12">

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
                Baratang Island Travel Guide
            </h1>

            {/* Toggle Switch */}
            <div className="flex items-center justify-center md:justify-start mb-8">
                <label htmlFor="guide-toggle" className="mr-3 text-sm font-medium text-gray-600">Brief Guide</label>
                <label className="switch">
                    <input
                        type="checkbox"
                        id="guide-toggle"
                        checked={showComprehensive}
                        onChange={handleToggle} // Use React's onChange
                    />
                    <span className="slider round"></span>
                </label>
                <label htmlFor="guide-toggle" className="ml-3 text-sm font-medium text-gray-600">Comprehensive Guide</label>
            </div>

            {/* Conditional Rendering based on state */}
            {!showComprehensive && (
                // Brief Guide Content (id no longer needed for JS)
                <div>
                    <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">Baratang Island: Brief Guide</h2>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Overview</h3>
                        <p className="text-base leading-relaxed mb-4">
                            Offbeat, jungle-lined Baratang is famed for its mangrove creeks, limestone caves and unique mud volcanoes. It’s visited almost exclusively as a day-trip from Port Blair via a government convoy through the Jarawa tribal reserve.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Getting There & Around</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Road Convoy (6 AM start, 3–4 hr):</strong> Port Blair → Jirkatang (check-in) → vehicle ferry → Baratang jetty.</li>
                            <li><strong>Ferry (2½ hr govt):</strong> Port Blair → Nilambur Jetty (infrequent; no same-day return).</li>
                            <li><strong>On-island transport:</strong> No scooters. Hire private jeep (₹400) or use sparse govt bus between jetty, mud volcano & Baludera Beach.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Best Time to Visit</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Nov–Feb:</strong> Dry, cool, easy cave trek.</li>
                            <li><strong>Mar–May:</strong> Hotter but doable.</li>
                            <li><strong>Jun–Sep:</strong> Monsoon—muddy trails, occasional closures.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Accommodation</h3>
                        <p className="text-base leading-relaxed mb-4">
                            None for tourists except rarely bookable govt guesthouses (apply months ahead).
                        </p>
                        <p className="text-base leading-relaxed font-medium text-blue-600">
                            Recommendation: Stay Port Blair; treat Baratang as a day trip.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Food & Dining</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Jetty area dhabas:</strong> South Indian, Bengali thalis (₹150), occasional fresh seafood.</li>
                            <li>Pack snacks—few stalls beyond jetty.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Attractions</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Limestone Caves:</strong> Mangrove boat (30 min) + 1.2 km trek → stalactites/stalagmites.</li>
                            <li><strong>Mud Volcano:</strong> 160 m walk to bubbling craters.</li>
                            <li><strong>Parrot Island (overnight only):</strong> Sunset roost of thousands of parrots.</li>
                            <li><strong>Baludera Beach:</strong> Secluded sandy bay—take own snorkel gear.</li>
                        </ul>
                    </section>

                    {/* Styled Table Card */}
                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Activities by Traveler Type</h3>
                        {/* Using Tailwind classes directly as in original code - assumes they are configured */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 p-6">
                            <div className="overflow-x-auto"> {/* Wrapper for responsiveness */}
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-100 text-gray-600 font-semibold uppercase border-b border-gray-300">
                                        <tr>
                                            <th scope="col" className="px-4 py-3">Traveler</th>
                                            <th scope="col" className="px-4 py-3">Highlights</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Backpackers</td>
                                            <td className="px-4 py-3">Early convoy, hammock camping, parrot-island boat trip</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Families</td>
                                            <td className="px-4 py-3">Mangrove cruise, cave walk, mud volcano boardwalk, packaged snacks</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Adventure Seekers</td>
                                            <td className="px-4 py-3">Guided off-trail cave extensions, jungle hikes, kayaking in creeks (arrange locally)</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Luxury Travelers</td>
                                            <td className="px-4 py-3">Private SUV + speedboat to caves, curated picnic at Baludera, exclusive guesthouse booking + candlelight dinner</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Nature Buffs</td>
                                            <td className="px-4 py-3">Birding (kingfishers, hornbills), stargazing, tidal-pool explorations</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cultural & Etiquette</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Jarawa Reserve:</strong> No photos, no stops, no feeding.</li>
                            <li>Greet locals with “Namaste,” dress modestly in villages, remove shoes at small temples.</li>
                            <li>Respect mangroves and wildlife; no littering.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Safety & Health</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li>Follow convoy rules; take motion-sickness meds.</li>
                            <li>Wear sturdy, non-slip footwear for caves.</li>
                            <li>Carry water, sun protection, insect repellent.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sustainability</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li>Pack out all trash; avoid single-use plastics.</li>
                            <li>Don’t touch corals or cave formations.</li>
                            <li>Support local eateries.</li>
                        </ul>
                    </section>
                </div>
            )}

            {showComprehensive && (
                // Comprehensive Guide Content (id no longer needed for JS)
                <div>
                    <h2 className="text-2xl font-semibold text-blue-700 mt-8 mb-4">Baratang Island: Comprehensive Guide</h2>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Overview</h3>
                        <p className="text-base leading-relaxed mb-4">
                            Baratang is a wild, nature-rich island about 100 km north of Port Blair. It’s a gateway to Middle Andamans and known for its mangrove creeks, limestone caves, and the unique mud volcanoes. A trip here offers a mix of adventure and pristine scenery, often done as a long day trip from Port Blair. Tourism infrastructure is minimal – which means Baratang retains an offbeat charm. Expect bumpy convoy rides through jungles, tranquil beaches with hardly a soul, and glimpses of indigenous culture along the way.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Getting There & Getting Around</h3>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Getting There:</strong> The most common way to reach Baratang is by road from Port Blair via the Andaman Trunk Road (ATR). This 3-4 hour journey includes driving in a government-regulated convoy (to ensure safety while passing through tribal reserve areas) and a short vehicle ferry crossing at Middle Strait. Two-wheelers are not allowed beyond Jirkatang checkpoint, so travelers must go by car, bus, or jeep. Government and private buses depart early morning from Port Blair (STS bus terminal or tour operators) – an affordable option for backpackers. Private taxis can also be hired for the day. An alternative is the government ferry from Port Blair to Baratang (via Nilambur Jetty), which is inexpensive and takes ~2.5 hours, but it runs infrequently and typically does not return the same day (that ferry usually continues onward to Havelock). Due to these constraints, most visitors opt for the road convoy in the morning, which allows a return by evening.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Getting Around:</strong> Baratang is small and sites are spread out from the jetty. There is no public transport once you’re on the island except a very limited bus service and some shared jeeps. Most day-tour visitors will have their hired vehicle take them around. If you arrive by ferry or independent of a tour, you can hire Private Jeeps at the Nilambur jetty to reach places like the mud volcano or limestone cave trailhead (fares around ₹400 per jeep). A government bus shuttles a few times a day between the jetty, mud volcano and Baludera Beach – check timing at the jetty if you plan to use it. Auto-rickshaws are not available and no scooter rentals exist here. Essentially, arrange transportation in advance (a car with driver for the day is most convenient).
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Convoy & Tribal Reserve:</strong> The ATR road passes through the Jarawa Tribal Reserve. Vehicles move in convoys at scheduled times with police escort. Stopping midway is prohibited, and interaction with the Jarawa tribe is strictly banned by law. You may see a few Jarawa by the roadside as you drive through, but do not photograph or feed them (penalties are severe for any violation). Treat this unique cultural zone with respect – think of it as passing through someone’s home uninvited, so no attempts to disturb.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Best Time to Visit</h3>
                        <p className="text-base leading-relaxed mb-4">
                            Baratang can be visited year-round, but winter and early spring offer the best experience. The dry season from <strong>November to February</strong> is ideal, with calmer seas and cooler temperatures perfect for the boat ride through mangroves and jungle trekking. These months have minimal rain, so the limestone cave path (and the mud volcano site) will be less muddy and more accessible. <strong>March to May</strong> is also decent, though temperatures and humidity rise – carry water and sun protection if visiting in these months. The <strong>monsoon season (June to September)</strong> brings heavy rains which can cause road conditions to deteriorate and occasional flooding of paths (the limestone cave trek might be slushy or closed during extreme rain). Additionally, convoys may run less frequently or boats to limestone caves might pause on very stormy days. Therefore, it’s advisable to avoid the peak monsoon for Baratang, or plan a buffer day in Port Blair in case your trip needs to shift. If you do visit in monsoon, you’ll still find the forests lush and green – just come prepared with rain gear and expect minor delays or reroutes.
                        </p>
                        <p className="text-base leading-relaxed font-medium text-blue-600 mb-4">
                            Travel Tip: Start from Port Blair by the first convoy (around 6AM) to beat the crowds and noon heat. This early start also increases the chances of completing all sights (caves, mud volcano, etc.) comfortably and returning before late evening.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Accommodation (Budget to Luxury)</h3>
                        <p className="text-base leading-relaxed mb-4">
                            Staying overnight in Baratang is uncommon but possible. Infrastructure is very limited – think basic government rest houses rather than resorts. There are no luxury hotels or resorts here (those are concentrated on Havelock/Port Blair). Baratang has three government guest houses near the jetty (Forest, APWD, and Panchayat guest houses), but they are mostly meant for officials and local needs. It is sometimes possible for tourists to book a room by applying through the authorities in Port Blair, but you must do so months in advance and have flexibility. Walk-in bookings are generally not accepted, and those who show up without prior arrangement are usually out of luck.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            For budget travelers, unless you’re on a mission to see the evening parrot spectacle (more on that under attractions), it’s recommended to treat Baratang as a day trip and stay in Port Blair or Rangat. If you do secure a guesthouse spot, expect very basic amenities (clean bed and bath, but no frills). There used to be one private hotel (Dew Dale Resort) en route to Baratang, but it has now shut down. Homestays are nearly non-existent for tourists.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            In summary, accommodation ranges from spartan to none – plan to return to base. Those determined to stay overnight should coordinate with a local tour operator or the Andaman tourism office well ahead of time. The reward for overnighting is experiencing Baratang’s raw nature in solitude once the day-trippers leave.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Food & Dining</h3>
                        <p className="text-base leading-relaxed mb-4">
                            Dining options in Baratang are limited but will cover your basic needs. Near Nilambur Jetty (the hub where road and ferries converge) you’ll find a handful of small eateries and food shacks. These family-run dhabas serve simple South Indian and Bengali dishes – think rice plates, dal, fish curry, dosa, samosas, and snacks. The food is homely, tasty and very affordable (a veg Thali meal for ₹150 or so). Don’t expect ambiance – these are simple bamboo or tin shacks with plastic chairs, but the service comes with a smile. <strong>Seafood:</strong> If available, try the fresh catch of the day (sometimes they’ll have fish fry or curry) – it’s likely caught that morning by local fishermen.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            There are no upscale restaurants or bars in Baratang. It’s wise to carry some packed snacks, fruits, and sufficient water, especially if you have specific diet preferences. Near popular sites like the Limestone Caves entrance and mud volcano, there might be a lone tea stall or two selling coconuts, biscuits, and bottled drinks – but not always, so having your own supplies is handy.
                        </p>
                        <p className="text-base leading-relaxed font-medium text-blue-600 mb-4">
                            Pro tip: Pick up some bakery items or fruit from Port Blair the day before, so you have something to munch if local eateries are closed or unappealing to you. And definitely grab a cup of chai at the jetty; sipping hot tea with a view of Baratang’s mangrove-lined waters is part of the experience.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Attractions</h3>
                        <p className="text-base leading-relaxed mb-2"><strong>Limestone Caves:</strong></p>
                        <p className="text-base leading-relaxed mb-4">
                            The highlight of Baratang is undoubtedly its limestone caves, accessed via an adventurous journey. From Baratang’s Nilambur Jetty, hop on a small motorboat through picturesque mangrove creeks for about 30-40 minutes. The ride itself is magical – at one point the creek narrows and forms a green tunnel of arching mangrove roots. The boat drops you at a wooden jetty, and from there it’s a 1.2 km trek through tropical forest (15-30 minutes) to the caves. Inside, find stunning stalactite and stalagmite formations. Guides can be hired (work for tips). Carry a flashlight. Please do not touch or damage the formations. The entire visit takes around 2–3 hours.
                        </p>
                        <p className="text-base leading-relaxed mb-2"><strong>Mud Volcano:</strong></p>
                        <p className="text-base leading-relaxed mb-4">
                            Baratang hosts India’s only known mud volcanoes. Expect small muddy craters periodically gurgling mud and gases. It's a 15-20 minute drive from the jetty + 160 m walk. It's a geologically fascinating phenomenon, though visually underwhelming for some. Wear closed footwear.
                        </p>
                        <p className="text-base leading-relaxed mb-2"><strong>Parrot Island:</strong></p>
                        <p className="text-base leading-relaxed mb-4">
                            A tiny uninhabited island famed for thousands of parrots roosting at sunset. Requires staying overnight in Baratang as trips depart late afternoon (around 4:30 PM). Local boat owners organize trips from the jetty. An unforgettable spectacle for bird lovers.
                        </p>
                        <p className="text-base leading-relaxed mb-2"><strong>Baludera Beach:</strong></p>
                        <p className="text-base leading-relaxed mb-4">
                            An offbeat, usually deserted sandy beach about 9 km from the jetty. Calm, shallow waters suitable for swimming (no lifeguard). Great for solitude. Low tide reveals tidal pools. Bring your own snorkel gear if interested; beware of sandflies (use repellent/coconut oil).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Activities & Experiences (By Traveler Type)</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Backpackers</h4>
                                <p className="text-base leading-relaxed">Take the govt bus, embrace the bumpy ride. Bring a hammock for potential overnight stays (with permission). Trek around, explore mud volcano area, try Parrot Island trip. Stock snacks.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Families</h4>
                                <p className="text-base leading-relaxed">Enjoy the mangrove boat ride (like a jungle cruise!). Use caves and mud volcano for fun science lessons. Hire an AC car for comfort. Pack snacks/water. Use facilities at checkpoints/cave entrance.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Adventure Seekers</h4>
                                <p className="text-base leading-relaxed">Ask locals about kayaking in creeks. Seek guided treks to further cave systems. Hike forest trails. Combine with a road trip to Rangat/Mayabunder. Carry first aid.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Luxury Travelers</h4>
                                <p className="text-base leading-relaxed">Hire premium SUV & guide. Request private speedboat for cave trip. Arrange a curated picnic at Baludera Beach (via hotel/operator). Book entire guesthouse for exclusivity (basic amenities only). Focus on bespoke experiences.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Nature & Wildlife Buffs</h4>
                                <p className="text-base leading-relaxed">Bring binoculars for birdwatching (kingfishers, hornbills, parrots). Observe mangrove ecosystem during boat ride. Explore tidal pools at Baludera. Enjoy stargazing. Carry waterproof camera gear.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Cultural Insights & Local Etiquette</h3>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Indigenous Presence (Jarawa Reserve):</strong> Crucial to respect autonomy. NO photos, NO feeding, NO interaction. Follow convoy rules strictly.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Local Life:</strong> Settlements are mainly Bengali/Tamil. Life is simple. People are friendly but shy. Greet with "Namaste." Dress modestly in villages.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Language:</strong> Hindi is common, some Bengali. Basic polite phrases appreciated. English is limited.
                        </p>
                        <p className="text-base leading-relaxed mb-4">
                            <strong>Etiquette:</strong> Be patient ("island time"). Be humble. Ask before taking photos of people. Remove shoes at temples. Respect local environment – no littering.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Safety Tips & Health Advice</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>Convoy Safety:</strong> Stay in vehicle, follow rules, be punctual for return.</li>
                            <li><strong>Motion Sickness:</strong> Take meds for bumpy road/boat.</li>
                            <li><strong>Heat & Hydration:</strong> Drink plenty of water, use hat/sunscreen.</li>
                            <li><strong>Insects:</strong> Use repellent (mosquitoes/sandflies). Check for ticks after treks.</li>
                            <li><strong>Footwear:</strong> Sturdy shoes with grip for caves/treks.</li>
                            <li><strong>First Aid:</strong> Carry basic kit. Health center is very basic.</li>
                            <li><strong>Swimming:</strong> No lifeguards at Baludera. Swim in daylight, clear areas, not alone. Be aware of remote possibility of crocodiles in mangrove areas (not typical on tourist beaches).</li>
                            <li><strong>Jarawa Encounters:</strong> If approached, stay calm, remain in vehicle, let authorities handle.</li>
                            <li><strong>Night Travel:</strong> Very limited light. Stick to accommodation area after dark. Bring flashlight.</li>
                            <li><strong>Emergency Contacts:</strong> Save important numbers (hotel, operator, local police). Cell signal is spotty.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sustainability Tips</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                            <li><strong>No Littering, Pack It Out:</strong> Carry all trash back to Port Blair.</li>
                            <li><strong>Plastic Ban:</strong> Avoid single-use plastics. Use reusable bags/bottles.</li>
                            <li><strong>Mangrove Respect:</strong> Don't break branches or disturb wildlife from boat.</li>
                            <li><strong>Coral and Marine Life:</strong> Don't touch/stand on coral. Don't collect shells.</li>
                            <li><strong>Stay on Marked Trails:</strong> Avoid damaging vegetation or getting lost.</li>
                            <li><strong>Wildlife Disturbance:</strong> Use zoom lenses. Never feed wildlife (including Jarawa or monkeys - it's illegal and harmful).</li>
                            <li><strong>Energy & Water:</strong> Conserve resources if staying overnight.</li>
                            <li><strong>Support Local Economy:</strong> Buy from local stalls, hire local guides.</li>
                            <li><strong>Educate Fellow Travelers:</strong> Gently encourage responsible behaviour.</li>
                        </ul>
                        <p className="text-base leading-relaxed mt-4 font-medium">
                            Tread lightly – Baratang's ecosystem and culture are precious.
                        </p>
                    </section>
                </div>
            )}

            {/* Removed the <script> block - logic is handled by React state */}
        </main>
    );
}