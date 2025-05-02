// Path: src/app/destinations/neil-island/page.tsx // Renamed for clarity (or shaheed-dweep)
// Theme: Neutral with Contextual Background Colors (Applied based on Baratang sample)

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MapPin,
    Check,
    Info,
    Calendar,
    Bed,        // Consistent icon for Accommodation
    Utensils,
    Compass,
    Users,
    Shield,
    Leaf,
    ChevronRight,
    Star,
    Navigation, // Consistent icon for Travel
    ArrowRight,
    MessageCircle,
    Camera,
    Ship,       // Relevant for Neil access
    Bike,       // Relevant for Neil transport
    Waves,      // Relevant for beaches
    Sun,        // Relevant for sunrise/sunset
    Sunset,     // Specific for Laxmanpur Beach
    LifeBuoy    // Consistent icon for Safety
    // Recycle removed as Leaf is used for Sustainability/Responsible Tourism
} from 'lucide-react';

// --- Define Common Styles (Copied from Baratang Sample - Neutral Theme with Contextual Colors) ---
const primaryButtonBg = 'bg-gray-800';
const primaryButtonHoverBg = 'hover:bg-gray-900';
const primaryButtonText = 'text-white';

const secondaryButtonBg = 'bg-white/20 backdrop-blur-sm';
const secondaryButtonHoverBg = 'hover:bg-white/30';
const secondaryButtonText = 'text-white';
const secondaryButtonBorder = 'border border-white/40';

const infoBg = 'bg-blue-50';
const infoBorder = 'border-blue-100';
const infoText = 'text-blue-800';
const infoIconColor = 'text-blue-600';

const successBg = 'bg-green-50';
const successBorder = 'border-green-100';
const successText = 'text-green-800';
const successIconColor = 'text-green-600';

const warningBg = 'bg-orange-50';
const warningBorder = 'border-orange-100';
const warningText = 'text-orange-800';
const warningIconColor = 'text-orange-600';

const tipBg = 'bg-yellow-50';
const tipBorder = 'border-yellow-100';
const tipText = 'text-yellow-800';
const tipIconColor = 'text-yellow-700';

const errorBg = 'bg-red-50';
const errorBorder = 'border-red-200';
const errorText = 'text-red-700';
const errorIconColor = 'text-red-500';

const neutralBgLight = 'bg-gray-50';
const neutralBorderLight = 'border-gray-100';
const neutralBg = 'bg-gray-100';
const neutralBorder = 'border-gray-200';
const neutralText = 'text-gray-800';
const neutralTextLight = 'text-gray-600';
const neutralIconColor = 'text-gray-600';

const sectionPadding = "py-10 md:py-12"; // Consistent padding
const sectionHeadingStyle = `text-2xl font-bold ${neutralText} mb-6 flex items-center`;
const cardBaseStyle = `bg-white rounded-2xl shadow-sm border ${neutralBorderLight} p-6 transition-shadow hover:shadow-md`;
const buttonPrimaryStyle = `inline-flex items-center justify-center ${primaryButtonBg} ${primaryButtonHoverBg} ${primaryButtonText} px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md`;
const buttonSecondaryStyleHero = `inline-flex items-center justify-center ${secondaryButtonBg} ${secondaryButtonHoverBg} ${secondaryButtonText} ${secondaryButtonBorder} px-6 py-3 rounded-full font-medium transition-all duration-300`;
// --- End Common Styles ---

export default function NeilIslandPage() {
    const [showComprehensive, setShowComprehensive] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    // Gallery images specific to Neil Island
    const galleryImages = [
        {
            src: "/images/neil/bharatpur-beach-neil.jpg", // Use specific paths
            alt: "Bharatpur Beach lagoon, Neil Island",
            caption: "The calm, shallow waters of Bharatpur Beach, ideal for swimming"
        },
        {
            src: "/images/neil/natural-bridge-neil.jpg", // Use specific paths
            alt: "Natural Bridge rock formation at low tide, Neil Island",
            caption: "The iconic Natural Bridge, best viewed during low tide"
        },
        {
            src: "/images/neil/laxmanpur-beach-sunset.jpg", // Use specific paths
            alt: "Sunset over Laxmanpur Beach, Neil Island",
            caption: "Spectacular sunset views from Laxmanpur Beach"
        },
        {
            src: "/images/neil/sitapur-beach-sunrise.jpg", // Use specific paths
            alt: "Sunrise at Sitapur Beach, Neil Island",
            caption: "Catching the serene sunrise at Sitapur Beach"
        },
        {
            src: "/images/neil/neil-cycling.jpg", // Use specific paths
            alt: "Cycling through the green fields of Neil Island",
            caption: "Exploring the island's tranquil beauty by bicycle"
        }
    ];

    return (
        <main className={`bg-white ${neutralText}`}>
            {/* Hero Section - Matches Baratang Structure */}
            <div className="relative h-[70vh] w-full">
                <Image
                    src="/images/neil/hero.jpg" // Use specific Neil hero image
                    alt="Panoramic view of Neil Island's coastline and greenery"
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <nav className="text-sm text-white/80 mb-2" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <Link href="/" className="hover:text-white">Home</Link>
                                    <ChevronRight size={14} className="mx-1" />
                                </li>
                                <li className="flex items-center">
                                    <Link href="/destinations" className="hover:text-white">Destinations</Link>
                                    <ChevronRight size={14} className="mx-1" />
                                </li>
                                <li className="flex items-center">
                                    <span className="text-white font-medium">Neil Island (Shaheed Dweep)</span>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Neil Island (Shaheed Dweep)</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mb-6 text-white/90">Experience the tranquil charm of Andaman's 'vegetable bowl' with pristine beaches and an unhurried pace.</p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button className={buttonPrimaryStyle}>
                                Explore Neil Island <ArrowRight size={18} className="ml-2" />
                            </button>
                            <button className={buttonSecondaryStyleHero}>
                                <Camera size={18} className="mr-2" /> View Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className={`container mx-auto px-4 ${sectionPadding}`}>

                {/* Quick Facts Card - Contextual Color (Informational Blue) */}
                <div className={`${infoBg} rounded-2xl p-6 mb-12 shadow-sm border ${infoBorder}`}>
                    <h2 className={`text-xl font-semibold ${infoText} mb-4 flex items-center`}>
                        <Info className={`mr-2 ${infoIconColor}`} size={20} />
                        Quick Facts About Neil Island
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <MapPin className={infoIconColor} size={18} />
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Location</h3>
                                <p className={`text-sm ${neutralTextLight}`}>South Andaman, part of Ritchie's Archipelago, near Havelock</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <Star className={infoIconColor} size={18} />
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Known For</h3>
                                <p className={`text-sm ${neutralTextLight}`}>Natural Bridge, Bharatpur/Laxmanpur/Sitapur Beaches, Cycling, Serenity</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <Bike className={infoIconColor} size={18} /> {/* Highlighting cycling */}
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Vibe</h3>
                                <p className={`text-sm ${neutralTextLight}`}>Quiet, relaxed, rural charm, ideal for unwinding</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toggle Switch - Neutral Theme */}
                <div className="flex flex-col items-center mb-10">
                    <h2 className={`text-2xl font-bold ${neutralText} mb-4`}>Choose Your Guide Style</h2>
                    <p className={`${neutralTextLight} mb-6 text-center max-w-2xl`}>Select between a quick overview or an in-depth exploration of Neil Island.</p>
                    <div className={`${neutralBg} p-1 rounded-full inline-flex border ${neutralBorder}`}>
                        <button
                            onClick={() => setShowComprehensive(false)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${!showComprehensive ? `${primaryButtonBg} ${primaryButtonText} shadow-sm` : `bg-transparent text-gray-700 hover:${neutralBg}`}`}
                        >
                            Brief Guide
                        </button>
                        <button
                            onClick={() => setShowComprehensive(true)}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${showComprehensive ? `${primaryButtonBg} ${primaryButtonText} shadow-sm` : `bg-transparent text-gray-700 hover:${neutralBg}`}`}
                        >
                            Comprehensive Guide
                        </button>
                    </div>
                </div>

                {/* Image Gallery - Neutral Theme */}
                <div className="mb-16">
                    <div className={`relative h-[50vh] w-full rounded-2xl overflow-hidden shadow-lg mb-4 border ${neutralBorderLight}`}>
                        <Image src={galleryImages[activeImage].src} alt={galleryImages[activeImage].alt} fill style={{ objectFit: 'cover' }} />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                            <p className="text-white text-lg drop-shadow">{galleryImages[activeImage].caption}</p>
                        </div>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                className={`relative h-20 w-32 rounded-lg overflow-hidden cursor-pointer transition-all ${activeImage === index ? `ring-4 ${primaryButtonBg}` : 'opacity-70 hover:opacity-100'}`}
                                onClick={() => setActiveImage(index)}
                            >
                                <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Based on Toggle */}
                {!showComprehensive ? (
                    // Brief Guide Content - Neutral Theme with Contextual Colors
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-10">
                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Info className={`mr-3 ${neutralIconColor}`} size={24} /> Overview
                                </h2>
                                <div className={cardBaseStyle}>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Neil Island (Shaheed Dweep) offers a serene escape known as Andaman's "vegetable bowl." It's smaller and quieter than Havelock, perfect for relaxation, cycling through villages, exploring beautiful beaches, and seeing the unique Natural Bridge rock formation.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Navigation className={`mr-3 ${neutralIconColor}`} size={24} /> Getting There & Around
                                </h2>
                                <div className={cardBaseStyle}>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className={`${neutralBg} p-2 rounded-full mr-3 mt-1 border ${neutralBorder}`}><Ship className={neutralIconColor} size={16} /></div>
                                            <div><span className={`font-medium ${neutralText}`}>Ferries:</span><span className={neutralTextLight}> Daily private/govt ferries connect from Port Blair (~2 hrs) and Havelock (~1 hr). Pre-booking advised.</span></div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className={`${neutralBg} p-2 rounded-full mr-3 mt-1 border ${neutralBorder}`}><Bike className={neutralIconColor} size={16} /></div>
                                            <div><span className={`font-medium ${neutralText}`}>On Island:</span><span className={neutralTextLight}> Cycling (highly recommended, ~₹150/day), scooter rental (~₹400/day), autos, and walking. Very compact island.</span></div>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Calendar className={`mr-3 ${neutralIconColor}`} size={24} /> Best Time to Visit
                                </h2>
                                <div className={cardBaseStyle}>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {/* Contextual seasonal cards */}
                                        <div className={`${infoBg} rounded-xl p-4 border ${infoBorder}`}>
                                            <h3 className={`font-semibold ${infoText} mb-2`}>Nov–May</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Ideal weather, calm seas for activities.</p>
                                        </div>
                                        <div className={`${warningBg} rounded-xl p-4 border ${warningBorder}`}>
                                            <h3 className={`font-semibold ${warningText} mb-2`}>Mar–May</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Warmer, good visibility, lush farms.</p>
                                        </div>
                                        <div className={`${successBg} rounded-xl p-4 border ${successBorder}`}>
                                            <h3 className={`font-semibold ${successText} mb-2`}>Jun–Sep</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Monsoon, quiet, green, some closures.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Waves className={`mr-3 ${neutralIconColor}`} size={24} /> Key Attractions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Attraction Cards - Remain Neutral */}
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Bharatpur Beach</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Near jetty. Calm lagoon for swimming, snorkeling, glass-bottom boats.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Natural Bridge</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Iconic coral rock arch near Laxmanpur Beach 2. Best seen at low tide.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Laxmanpur Beach</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Famous for its stunning sunset views and wide sandy stretch.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Sitapur Beach</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Quiet beach on the eastern tip, known for beautiful sunrises.</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar - Contextual Colors */}
                        <aside className="lg:col-span-1 space-y-8">
                            {/* Accommodation Brief */}
                            <div className={cardBaseStyle}>
                                <h3 className={`text-lg font-semibold ${neutralText} mb-4 flex items-center`}>
                                    <Bed className={`mr-2 ${neutralIconColor}`} size={20} /> Accommodation
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${neutralIconColor} flex-shrink-0`} size={16} /><span>Fewer options than Havelock. Budget huts/homestays, mid-range resorts (Pearl Park, TSG Aura), some luxury (SeaShell Neil).</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${neutralIconColor} flex-shrink-0`} size={16} /><span>Booking ahead recommended.</span></li>
                                </ul>
                            </div>
                            {/* Food Brief */}
                            <div className={cardBaseStyle}>
                                <h3 className={`text-lg font-semibold ${neutralText} mb-4 flex items-center`}>
                                    <Utensils className={`mr-2 ${neutralIconColor}`} size={20} /> Food Highlights
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${neutralIconColor} flex-shrink-0`} size={16} /><span>Fresh local produce, seafood thalis at market dhabas, resort dining, coconuts and farm-fresh fruit.</span></li>
                                </ul>
                            </div>

                            {/* Safety & Health - Warning Orange */}
                            <div className={`${warningBg} rounded-2xl p-6 shadow-sm border ${warningBorder}`}>
                                <h3 className={`text-lg font-semibold ${warningText} mb-4 flex items-center`}>
                                    <Shield className={`mr-2 ${warningIconColor}`} size={20} /> Safety & Health
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Very safe island. Use mosquito repellent.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Drink bottled/filtered water. Basic PHC available.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Be cautious on slippery rocks near Natural Bridge.</span></li>
                                </ul>
                            </div>

                            {/* Eco-Tourism - Success Green */}
                            <div className={`${successBg} rounded-2xl p-6 shadow-sm border ${successBorder}`}>
                                <h3 className={`text-lg font-semibold ${successText} mb-4 flex items-center`}>
                                    <Leaf className={`mr-2 ${successIconColor}`} size={20} /> Sustainability Tips
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Reduce plastic waste; carry reusable items.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Protect coral reefs; don't touch or collect marine life.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Support local farmers and eco-friendly stays.</span></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                ) : (
                    // Comprehensive Guide Content - Neutral Theme with Contextual Colors
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Info className={`mr-3 ${neutralIconColor}`} size={24} /> Detailed Overview
                                </h2>
                                <div className={`${cardBaseStyle} space-y-4`}>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Neil Island, officially renamed Shaheed Dweep, is the charmingly rustic counterpart to its bustling neighbour, Havelock. Located just south of Havelock in Ritchie's Archipelago, this small island (roughly 13.7 sq km) is affectionately known as the "vegetable bowl" of the Andamans due to its fertile land and extensive farming. Neil offers a significantly more tranquil and unhurried experience, making it ideal for travellers seeking relaxation, natural beauty, and a glimpse into authentic island life.</p>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Life here revolves around its stunning, distinctly named beaches (Bharatpur, Laxmanpur, Sitapur), the fascinating Natural Bridge rock formation, and the slow rhythm of its villages and paddy fields. Cycling is the preferred mode of transport, allowing visitors to leisurely explore the flat terrain and soak in the serene atmosphere. While lacking the extensive tourist infrastructure of Havelock, Neil provides sufficient amenities, beautiful coral reefs for snorkeling, and a genuine sense of peace that captivates many visitors.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Navigation className={`mr-3 ${neutralIconColor}`} size={24} /> Comprehensive Travel Guide
                                </h2>
                                <div className={`${cardBaseStyle} space-y-6`}>
                                    <div>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Reaching Neil Island:</h3>
                                        <ul className="space-y-3 pl-4 list-disc list-outside marker:text-gray-400">
                                            <li className={neutralTextLight}><strong className={neutralText}>By Ferry (Only Option):</strong> Neil Island is accessible solely by ferry. Services operate daily from:
                                                <ul className="list-['-_'] list-inside pl-4 mt-1 space-y-1">
                                                    <li><strong className="text-gray-700">Port Blair (Phoenix Bay Jetty):</strong> Journey takes approx. 1.5 - 2 hours by private ferry and 2.5 - 3 hours by government ferry.</li>
                                                    <li><strong className="text-gray-700">Havelock Island (Havelock Jetty):</strong> A short hop of about 45 minutes to 1 hour by both private and government ferries.</li>
                                                </ul>
                                            </li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Private Ferries (Recommended):</strong> Makruzz, Nautika, ITT Majestic, etc., offer faster, air-conditioned services. Essential to book online well in advance, especially during peak season.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Government Ferries:</strong> More economical but slower and less comfortable. Tickets are primarily for islanders and challenging for tourists to book reliably in advance (often requires queuing at DSS counters).</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Neil Jetty:</strong> All ferries arrive/depart from the main jetty located at Bharatpur Beach.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Getting Around Neil Island:</h3>
                                        <ul className="space-y-3 pl-4 list-disc list-outside marker:text-gray-400">
                                            <li className={neutralTextLight}><strong className={neutralText}>Bicycle Rental:</strong> The ideal way to explore Neil's flat terrain and short distances (~₹150-200 per day). Rentals available near the jetty and market. Perfect for soaking in the laid-back vibe.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Scooter/Motorbike Rental:</strong> Available (~₹400-500 per day plus fuel) for quicker travel. Roads are generally good but narrow. Minimal traffic.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Auto-Rickshaws:</strong> Available for point-to-point trips (Jetty to Laxmanpur/Sitapur approx. ₹100-150) or for a half-day island tour (~₹500-800). Negotiate fare beforehand.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Walking:</strong> Feasible for exploring areas near your accommodation or around the market (Neil Kendra). Distances between beaches are manageable for keen walkers.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Taxis (Cars):</strong> Very limited availability, usually pre-booked through resorts for transfers or tours at higher rates.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Bus:</strong> An infrequent local bus service connects the main points, but timings are unreliable for tourists.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Waves className={`mr-3 ${neutralIconColor}`} size={24} /> Exploring Attractions & Activities
                                </h2>
                                <div className="space-y-6">
                                    {/* Attraction Cards - Remain Neutral */}
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Bharatpur Beach (Beach No. 4)</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Located right next to the jetty, this beach is known for its wide, sandy bay and exceptionally calm, shallow turquoise lagoon, perfect for swimming and wading, especially for families. It's the hub for water activities like glass-bottom boat rides, jet skiing, and snorkeling rentals. The coral reefs here are easily accessible. Can get busy near the jetty area.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Natural Bridge (Howrah Bridge)</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Neil Island's most famous landmark, located at Laxmanpur Beach 2. This impressive natural rock arch has been carved by centuries of wave erosion. It's accessible only during low tide via a walk over dead coral and rocky patches (wear sturdy footwear). Explore the surrounding tide pools teeming with small marine life. A must-see photographic spot.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Laxmanpur Beach (Beach No. 1)</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Situated on the western side, this pristine white sand beach is renowned for offering arguably the best sunset views in the Andamans. The broad beach is perfect for long, peaceful walks. While beautiful, swimming is not ideal due to corals and potential currents. Several small shacks offer refreshments. It's distinct from Laxmanpur Beach 2 (where the Natural Bridge is located).</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Sitapur Beach (Beach No. 5)</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Located at the easternmost tip of the island, Sitapur Beach is famous for its breathtaking sunrises. It's a quiet, crescent-shaped beach exposed to the open sea, featuring golden sands and interesting limestone formations at one end. Swimming can be tricky due to currents and rocks, but it's perfect for quiet contemplation and enjoying the dawn colours.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Snorkeling & Diving</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Neil Island boasts vibrant coral reefs easily accessible from the shore, especially at Bharatpur Beach and near the Natural Bridge during low tide. Snorkeling gear is widely available for rent. A few dive centers operate on Neil, offering Discover Scuba Dives and fun dives for certified divers at sites like Junction and Margherita's Mischief. It's generally considered less crowded for diving than Havelock, with chances to spot unique marine life like dugongs (though rare).</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Cycling & Village Exploration</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>One of Neil's primary charms is exploring its lush interior and sleepy villages by bicycle. The flat terrain and quiet roads make for easy riding past green paddy fields, banana plantations, and local homes. Stop at Neil Kendra (the main market) for local snacks and interactions.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Bed className={`mr-3 ${neutralIconColor}`} size={24} /> Accommodation & Food
                                </h2>
                                <div className={`${cardBaseStyle} space-y-4`}>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}><strong>Accommodation:</strong> Options are more limited and generally simpler than Havelock, leaning towards rustic charm and eco-friendly stays. Budget travellers can find basic huts, guesthouses, and homestays near the market or along the beaches. Mid-range resorts like Pearl Park Beach Resort, TSG Aura, and Summer Sands offer comfortable AC rooms/cottages, often with restaurants and pools. Luxury is limited but growing, with SeaShell Neil providing stylish cottages and upscale amenities. Booking in advance is crucial, especially during peak season.</p>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}><strong>Food:</strong> Dining revolves around fresh, local ingredients. Simple, delicious Bengali-style fish thalis are a staple at eateries in Neil Kendra market (e.g., Ganesh Restaurant). Most resorts have multi-cuisine restaurants catering to tourists (e.g., Dugong at SeaShell, Organic Khao at Summer Sands). Seafood is readily available. Enjoy abundant fresh coconuts, bananas, papayas, and other seasonal fruits directly from local vendors or farm stalls. Vegetarian options are widely available due to the island's agricultural focus.</p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar - Contextual Colors */}
                        <aside className="lg:col-span-1 space-y-8">
                            {/* Best Time to Visit - Contextual */}
                            <div className={cardBaseStyle}>
                                <h3 className={`text-lg font-semibold ${neutralText} mb-4 flex items-center`}>
                                    <Calendar className={`mr-2 ${neutralIconColor}`} size={20} /> Best Time to Visit
                                </h3>
                                <div className="space-y-3">
                                    <div className={`${infoBg} rounded-lg p-3 border ${infoBorder}`}>
                                        <h4 className={`font-medium ${infoText} text-sm`}>Oct–May (Dry Season)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Ideal conditions for beaches, snorkeling, cycling. Peak tourism Dec-Feb.</p>
                                    </div>
                                    <div className={`${warningBg} rounded-lg p-3 border ${warningBorder}`}>
                                        <h4 className={`font-medium ${warningText} text-sm`}>Mar–May (Shoulder)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Warmer, good visibility, lush farms, fewer crowds than peak.</p>
                                    </div>
                                    <div className={`${successBg} rounded-lg p-3 border ${successBorder}`}>
                                        <h4 className={`font-medium ${successText} text-sm`}>Jun–Sep (Monsoon)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Rainy, very quiet, green. Activities/ferries may be limited.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Safety & Health - Warning Orange */}
                            <div className={`${warningBg} rounded-2xl p-6 shadow-sm border ${warningBorder}`}>
                                <h3 className={`text-lg font-semibold ${warningText} mb-4 flex items-center`}>
                                    <LifeBuoy className={`mr-2 ${warningIconColor}`} size={20} /> Safety & Health
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Neil is very safe with minimal crime. Exercise standard caution.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Wear sturdy footwear when visiting the Natural Bridge (slippery rocks).</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Use mosquito repellent, especially at dawn/dusk. Beware of sandflies on some beaches.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Drink only bottled or properly filtered water.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>A Primary Health Centre (PHC) offers basic medical aid. Serious cases require evacuation to Port Blair. Carry a personal first-aid kit.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Mobile connectivity (especially data) is weak; BSNL/Airtel usually perform best.</span></li>
                                </ul>
                            </div>

                            {/* Responsible Tourism - Success Green */}
                            <div className={`${successBg} rounded-2xl p-6 shadow-sm border ${successBorder}`}>
                                <h3 className={`text-lg font-semibold ${successText} mb-4 flex items-center`}>
                                    <Leaf className={`mr-2 ${successIconColor}`} size={20} /> Responsible Tourism
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Strictly avoid single-use plastics. Carry reusable water bottles and bags.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Do not touch, stand on, or collect corals or shells (dead or alive).</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Use reef-safe sunscreen to protect marine life.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Dispose of all waste properly in designated bins. Carry back non-biodegradable waste if bins are full/unavailable.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Respect local culture: Dress modestly in villages/market, ask before taking photos of people.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Support the local economy by purchasing local produce and handicrafts.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Conserve water and electricity, resources are limited on the island.</span></li>
                                </ul>
                            </div>

                            {/* Traveler Tips - Tip Yellow */}
                            <div className={`${tipBg} rounded-2xl p-6 shadow-sm border ${tipBorder}`}>
                                <h3 className={`text-lg font-semibold ${tipText} mb-4 flex items-center`}>
                                    <MessageCircle className={`mr-2 ${tipIconColor}`} size={20} /> Traveler Tips
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Book accommodation and ferries (private) well in advance, especially for peak season.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Carry enough cash; ATMs are unreliable. Card payments are limited.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Rent a bicycle for the authentic Neil experience.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Check tide timings for visiting Natural Bridge and for swimming conditions.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Pack light, include swimwear, comfortable walking/cycling shoes, reef shoes, sunscreen, hat, insect repellent.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Embrace the slow pace; don't expect bustling nightlife or extensive shopping.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Download offline maps as internet connectivity is poor.</span></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                )}

                {/* CTA Section - Contextual Color (Informational Blue) */}
                <section className={`mt-16 ${infoBg} rounded-2xl p-8 border ${infoBorder} text-center`}>
                    <h2 className={`text-2xl font-bold ${infoText} mb-4`}>Experience the Tranquility of Neil Island</h2>
                    <p className={`${neutralTextLight} max-w-xl mx-auto mb-6`}>Ready to unwind on serene beaches and explore the charming 'vegetable bowl' of the Andamans? Find packages perfect for your relaxing getaway.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/packages?destination=neil-island" className={buttonPrimaryStyle}>
                            View Neil Island Packages <ArrowRight className="ml-2" size={18} />
                        </Link>
                        <Link href="/contact" className={`inline-flex items-center justify-center bg-white text-gray-700 border ${neutralBorder} hover:bg-gray-50 font-semibold px-6 py-3 rounded-full transition-all duration-300`}>
                            Customize Your Trip
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}