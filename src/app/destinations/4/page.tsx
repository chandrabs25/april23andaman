
// Path: ./src/app/destinations/baratang-island/page.tsx
// Theme: Neutral with Contextual Background Colors

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    MapPin,
    Check,
    Info,
    Calendar,
    Clock,
    Bed,
    Utensils,
    Compass,
    Users,
    Shield,
    Leaf,
    ChevronRight,
    Star,
    Navigation,
    ArrowRight,
    MessageCircle,
    Camera
} from 'lucide-react';

// --- Define Common Styles (Neutral Theme with Contextual Colors) ---
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

export default function Destination1Page() {
    const [showComprehensive, setShowComprehensive] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    const handleToggle = () => {
        setShowComprehensive(!showComprehensive);
    };

    const galleryImages = [
        {
            src: "/images/baratang/limestone-caves.jpg",
            alt: "Limestone Caves of Baratang",
            caption: "The stunning limestone formations inside Baratang's caves"
        },
        {
            src: "/images/baratang/mud-volcano.jpg",
            alt: "Mud Volcano",
            caption: "Unique bubbling mud volcanoes - a rare geological phenomenon"
        },
        {
            src: "/images/baratang/mangrove-creek.jpg",
            alt: "Mangrove Creek",
            caption: "Serene boat ride through dense mangrove forests"
        },
        {
            src: "/images/baratang/parrot-island.jpg",
            alt: "Parrot Island",
            caption: "Thousands of parrots return to roost at sunset"
        },
        {
            src: "/images/baratang/baludera-beach.jpg",
            alt: "Baludera Beach",
            caption: "Pristine and secluded Baludera Beach"
        }
    ];

    return (
        <main className={`bg-white ${neutralText}`}>
            {/* Hero Section - Remains Neutral */}
            <div className="relative h-[70vh] w-full">
                <Image
                    src="/images/baratang/hero.jpg"
                    alt="Baratang Island's stunning landscape"
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
                                    <span className="text-white font-medium">Baratang Island</span>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Baratang Island</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mb-6 text-white/90">Discover limestone caves, mud volcanoes, and pristine mangroves in this hidden gem of the Andamans</p>
                        <div className="flex flex-wrap gap-4 items-center">
                            <button className={buttonPrimaryStyle}>
                                Plan Your Visit <ArrowRight size={18} className="ml-2" />
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
                        Quick Facts About Baratang
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <MapPin className={infoIconColor} size={18} />
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Location</h3>
                                <p className={`text-sm ${neutralTextLight}`}>100 km north of Port Blair, between South and Middle Andaman</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <Star className={infoIconColor} size={18} />
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Known For</h3>
                                <p className={`text-sm ${neutralTextLight}`}>Limestone caves, mud volcanoes, mangrove creeks</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className={`bg-white p-2 rounded-full shadow-sm mr-3 border ${neutralBorderLight}`}>
                                <Clock className={infoIconColor} size={18} />
                            </div>
                            <div>
                                <h3 className={`font-medium ${neutralText}`}>Ideal Duration</h3>
                                <p className={`text-sm ${neutralTextLight}`}>Day trip (6-8 hours from Port Blair)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Toggle Switch - Remains Neutral */}
                <div className="flex flex-col items-center mb-10">
                    <h2 className={`text-2xl font-bold ${neutralText} mb-4`}>Choose Your Guide Style</h2>
                    <p className={`${neutralTextLight} mb-6 text-center max-w-2xl`}>Select between a quick overview or an in-depth exploration of Baratang Island</p>
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

                {/* Image Gallery - Remains Neutral */}
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
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Offbeat, jungle-lined Baratang is famed for its mangrove creeks, limestone caves and unique mud volcanoes. It's visited almost exclusively as a day-trip from Port Blair via a government convoy through the Jarawa tribal reserve.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Navigation className={`mr-3 ${neutralIconColor}`} size={24} /> Getting There & Around
                                </h2>
                                <div className={cardBaseStyle}>
                                    <ul className="space-y-4">
                                        <li className="flex items-start">
                                            <div className={`${neutralBg} p-2 rounded-full mr-3 mt-1 border ${neutralBorder}`}><Check className={neutralIconColor} size={16} /></div>
                                            <div><span className={`font-medium ${neutralText}`}>Road Convoy (6 AM start, 3–4 hr):</span><span className={neutralTextLight}> Port Blair → Jirkatang (check-in) → vehicle ferry → Baratang jetty.</span></div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className={`${neutralBg} p-2 rounded-full mr-3 mt-1 border ${neutralBorder}`}><Check className={neutralIconColor} size={16} /></div>
                                            <div><span className={`font-medium ${neutralText}`}>Ferry (2½ hr govt):</span><span className={neutralTextLight}> Port Blair → Nilambur Jetty (infrequent; no same-day return).</span></div>
                                        </li>
                                        <li className="flex items-start">
                                            <div className={`${neutralBg} p-2 rounded-full mr-3 mt-1 border ${neutralBorder}`}><Check className={neutralIconColor} size={16} /></div>
                                            <div><span className={`font-medium ${neutralText}`}>On-island transport:</span><span className={neutralTextLight}> No scooters. Hire private jeep (₹400) or use sparse govt bus between jetty, mud volcano & Baludera Beach.</span></div>
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
                                            <h3 className={`font-semibold ${infoText} mb-2`}>Nov–Feb</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Dry, cool, easy cave trek.</p>
                                        </div>
                                        <div className={`${warningBg} rounded-xl p-4 border ${warningBorder}`}>
                                            <h3 className={`font-semibold ${warningText} mb-2`}>Mar–May</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Hotter but doable.</p>
                                        </div>
                                        <div className={`${successBg} rounded-xl p-4 border ${successBorder}`}>
                                            <h3 className={`font-semibold ${successText} mb-2`}>Jun–Sep</h3>
                                            <p className={`text-sm ${neutralTextLight}`}>Monsoon—muddy trails, occasional closures.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Compass className={`mr-3 ${neutralIconColor}`} size={24} /> Key Attractions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Attraction Cards - Remain Neutral */}
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Limestone Caves</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Short boat ride through mangroves, then 1.5km trek to stunning stalactites/stalagmites.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Mud Volcano</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Small, bubbling mud puddles; unique geological feature.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Mangrove Creek</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Scenic boat journey through dense, unique mangrove ecosystem.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Parrot Island</h3>
                                        <p className={`text-sm ${neutralTextLight}`}>Witness thousands of parrots returning at sunset (requires overnight stay).</p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar - Contextual Colors */}
                        <aside className="lg:col-span-1 space-y-8">
                            {/* Safety & Permits - Warning Orange */}
                            <div className={`${warningBg} rounded-2xl p-6 shadow-sm border ${warningBorder}`}>
                                <h3 className={`text-lg font-semibold ${warningText} mb-4 flex items-center`}>
                                    <Shield className={`mr-2 ${warningIconColor}`} size={20} /> Safety & Permits
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Permits required (obtained at Jirkatang).</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>No stopping/photos in Jarawa reserve.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Carry water & snacks; limited facilities.</span></li>
                                </ul>
                            </div>

                            {/* Eco-Tourism - Success Green */}
                            <div className={`${successBg} rounded-2xl p-6 shadow-sm border ${successBorder}`}>
                                <h3 className={`text-lg font-semibold ${successText} mb-4 flex items-center`}>
                                    <Leaf className={`mr-2 ${successIconColor}`} size={20} /> Eco-Tourism
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Respect local culture & environment.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Do not litter; carry waste back.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Avoid disturbing wildlife.</span></li>
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
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Baratang Island, a hidden gem nestled between South and Middle Andaman, offers a unique blend of natural wonders unlike anywhere else in the archipelago. Primarily known for its ancient Limestone Caves, the fascinating Mud Volcanoes, and the enchanting journey through dense Mangrove Creeks, Baratang provides an off-the-beaten-path adventure. The island is part of the traditional territory of the Jarawa tribe, and access is carefully managed through a protected reserve, adding an element of cultural sensitivity to the journey.</p>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Most visitors experience Baratang as an adventurous day trip from Port Blair, involving an early start and travel via a government-regulated convoy. This journey itself is part of the experience, offering glimpses into the lush, untouched forests of the Andamans. While facilities on the island are basic, the raw natural beauty and unique geological formations make it a must-visit for those seeking adventure beyond the popular beaches.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Navigation className={`mr-3 ${neutralIconColor}`} size={24} /> Comprehensive Travel Guide
                                </h2>
                                <div className={`${cardBaseStyle} space-y-6`}>
                                    <div>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Reaching Baratang:</h3>
                                        <ul className="space-y-3 pl-4 list-disc list-outside marker:text-gray-400">
                                            <li className={neutralTextLight}><strong className={neutralText}>By Road (Most Common):</strong> Depart Port Blair around 4-6 AM. Drive to Jirkatang (approx. 1.5 hrs). Complete permit formalities. Join the convoy (fixed timings: ~6:30 AM, 9:30 AM). Travel through the Jarawa Tribal Reserve (approx. 1.5 hrs, strictly no stopping/photos). Reach Middle Strait jetty. Take a vehicle ferry (15 mins) to Nilambur Jetty (Baratang). Total journey: 3.5-4 hours one way.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>By Government Ferry:</strong> Operates between Port Blair (Phoenix Bay Jetty) and Baratang (Nilambur Jetty). Takes approx. 2.5 hours. Timings are infrequent and subject to change; typically does not allow for a same-day return trip. Check latest schedules locally.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Getting Around Baratang:</h3>
                                        <ul className="space-y-3 pl-4 list-disc list-outside marker:text-gray-400">
                                            <li className={neutralTextLight}><strong className={neutralText}>Private Jeep/Car:</strong> Hire from the jetty for local sightseeing (Mud Volcano, Baludera Beach). Approx. ₹400-₹600.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Government Bus:</strong> Limited service connecting the jetty, mud volcano, and Baludera Beach. Timings can be erratic.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Boat for Caves:</strong> Speedboats operate from Nilambur Jetty to the Limestone Caves start point (approx. 30 mins through mangroves). Included in cave tour packages.</li>
                                            <li className={neutralTextLight}><strong className={neutralText}>Walking:</strong> Required for the trek to Limestone Caves (1.5 km) and Mud Volcano (short walk from parking).</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Compass className={`mr-3 ${neutralIconColor}`} size={24} /> Exploring the Attractions
                                </h2>
                                <div className="space-y-6">
                                    {/* Attraction Cards - Remain Neutral */}
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Limestone Caves</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>The highlight for many. A thrilling speedboat ride through a canopy of mangroves leads to a narrow creek. From the drop-off point, a scenic 1.5 km walk through lush forest and village paths takes you to the caves. Inside, marvel at the impressive stalactite and stalagmite formations created over thousands of years. Guides are usually available at the entrance. Carry a torchlight for better viewing.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Mud Volcano</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>One of the few places in India to witness this natural phenomenon. Small, bubbling craters spew mineral-rich mud. While not visually spectacular like a lava volcano, it's a unique geological sight. A short walk from the main road leads to the site. Basic viewing platforms are available.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Mangrove Creek Safari</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>The boat journey to the Limestone Caves is an attraction in itself. Glide through serene, narrow creeks surrounded by dense, ancient mangrove forests, offering a glimpse into this vital coastal ecosystem. Look out for birds and other wildlife.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Parrot Island</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>Accessible only by boat from Baratang jetty, this small island is famous for the thousands of parrots and parakeets that return to roost every evening at sunset, creating a spectacular natural show. Requires an overnight stay in Baratang as the phenomenon occurs late in the day.</p>
                                    </div>
                                    <div className={cardBaseStyle}>
                                        <h3 className={`font-semibold ${neutralText} mb-2`}>Baludera Beach</h3>
                                        <p className={`text-base leading-relaxed ${neutralTextLight}`}>A quiet, secluded beach located a few kilometers from the jetty. Offers calm waters suitable for swimming and relaxation away from the main tourist spots. Basic amenities might be available seasonally.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className={sectionHeadingStyle}>
                                    <Bed className={`mr-3 ${neutralIconColor}`} size={24} /> Accommodation & Food
                                </h2>
                                <div className={`${cardBaseStyle} space-y-4`}>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Accommodation options in Baratang are very limited and basic, primarily consisting of a few government guesthouses (like APWD Guesthouse) and one or two private lodges. Most tourists visit as a day trip from Port Blair due to the lack of developed tourist infrastructure.</p>
                                    <p className={`text-base leading-relaxed ${neutralTextLight}`}>Food options are also basic. Small eateries and dhabas near the Nilambur jetty offer simple Indian meals (rice, dal, roti, sabzi), snacks, and refreshments. It's advisable to carry your own water bottles and some snacks, especially if you have dietary restrictions.</p>
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
                                        <h4 className={`font-medium ${infoText} text-sm`}>Nov–Feb (Peak Season)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Pleasant weather, calm seas, ideal for all activities.</p>
                                    </div>
                                    <div className={`${warningBg} rounded-lg p-3 border ${warningBorder}`}>
                                        <h4 className={`font-medium ${warningText} text-sm`}>Mar–May (Shoulder)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Hot and humid, but generally dry.</p>
                                    </div>
                                    <div className={`${successBg} rounded-lg p-3 border ${successBorder}`}>
                                        <h4 className={`font-medium ${successText} text-sm`}>Jun–Sep (Monsoon)</h4>
                                        <p className={`text-xs ${neutralTextLight}`}>Heavy rains, muddy trails, potential boat cancellations.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Safety & Permits - Warning Orange */}
                            <div className={`${warningBg} rounded-2xl p-6 shadow-sm border ${warningBorder}`}>
                                <h3 className={`text-lg font-semibold ${warningText} mb-4 flex items-center`}>
                                    <Shield className={`mr-2 ${warningIconColor}`} size={20} /> Safety & Permits
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Permits required for all visitors (Indian & Foreigner), usually checked at Jirkatang.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Strictly NO stopping, photography, or interaction with Jarawa tribe members in the reserve. Heavy penalties apply.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Travel in authorized vehicles only during convoy timings.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Carry sufficient water, snacks, sunscreen, and insect repellent.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${warningIconColor} flex-shrink-0`} size={16} /><span>Wear comfortable walking shoes for treks.</span></li>
                                </ul>
                            </div>

                            {/* Eco-Tourism - Success Green */}
                            <div className={`${successBg} rounded-2xl p-6 shadow-sm border ${successBorder}`}>
                                <h3 className={`text-lg font-semibold ${successText} mb-4 flex items-center`}>
                                    <Leaf className={`mr-2 ${successIconColor}`} size={20} /> Responsible Tourism
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Respect the fragile ecosystem; do not touch or remove cave formations or corals.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Avoid using plastic; carry reusable water bottles.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Dispose of waste responsibly; carry it back if bins are unavailable.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${successIconColor} flex-shrink-0`} size={16} /><span>Support local communities by using local guides and eateries.</span></li>
                                </ul>
                            </div>

                            {/* Traveler Tips - Tip Yellow */}
                            <div className={`${tipBg} rounded-2xl p-6 shadow-sm border ${tipBorder}`}>
                                <h3 className={`text-lg font-semibold ${tipText} mb-4 flex items-center`}>
                                    <MessageCircle className={`mr-2 ${tipIconColor}`} size={20} /> Traveler Tips
                                </h3>
                                <ul className="space-y-3">
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Start early from Port Blair (by 4-5 AM) to catch the first convoy.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Book tours in advance, especially during peak season.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Mobile connectivity is poor; inform others of your plans.</span></li>
                                    <li className={`flex items-start text-sm ${neutralTextLight}`}><Check className={`mr-2 mt-1 ${tipIconColor} flex-shrink-0`} size={16} /><span>Carry cash; ATMs are unavailable.</span></li>
                                </ul>
                            </div>
                        </aside>
                    </div>
                )}

                {/* CTA Section - Contextual Color (Informational Blue) */}
                <section className={`mt-16 ${infoBg} rounded-2xl p-8 border ${infoBorder} text-center`}>
                    <h2 className={`text-2xl font-bold ${infoText} mb-4`}>Plan Your Baratang Adventure</h2>
                    <p className={`${neutralTextLight} max-w-xl mx-auto mb-6`}>Ready to explore the unique wonders of Baratang Island? Check available day tours or contact us to customize your trip.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/packages?destination=baratang" className={buttonPrimaryStyle}>
                            View Baratang Tours <ArrowRight className="ml-2" size={18} />
                        </Link>
                        <Link href="/contact" className={`inline-flex items-center justify-center bg-white text-gray-700 border ${neutralBorder} hover:bg-gray-50 font-semibold px-6 py-3 rounded-full transition-all duration-300`}>
                            Contact Us
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}

