// src/components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch'; // Assuming useFetch is in this path
import { Menu, X, User, Search, ShoppingCart, LogOut, ChevronDown } from 'lucide-react'; // Keep ShoppingCart if used elsewhere

// --- Interfaces ---
interface Destination {
  id: number;
  name: string;
  // Add other fields if needed
}

interface Activity {
  id: number;
  name: string;
  // Add other fields if needed
}

interface PackageData { // Renamed from Package to avoid conflict if Package interface exists globally
  id: number;
  name: string;
  // Add other relevant package fields if needed
}

// Define the expected API response structure for packages
interface GetPackagesApiResponse {
  packages: PackageData[]; // Expecting an object with a 'packages' array
  pagination?: any;      // Optional pagination info
  success?: boolean;     // Optional success flag
  message?: string;      // Optional message
}
// --- End Interfaces ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const [mobileDropdowns, setMobileDropdowns] = useState({
    destinations: false,
    activities: false,
    packages: false
  });

  // --- Fetch Data for Dropdowns ---
  const {
    data: destinationsResponse,
  } = useFetch<Destination[]>('/api/destinations'); // Assuming this returns array directly
  const destinationsData = destinationsResponse || [];

  const {
    data: activitiesResponse,
  } = useFetch<Activity[]>('/api/activities'); // Assuming this returns array directly
  const activitiesData = activitiesResponse || [];

  // Fetch Packages using the correct logic
  const {
    data: packagesApiResponse, // Renamed variable for clarity
  } = useFetch<GetPackagesApiResponse>('/api/packages'); // Expect GetPackagesApiResponse structure
  // Extract the 'packages' array from the response object
  const packagesData = packagesApiResponse?.packages || [];
  // --- End Fetch Data ---


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    // Close all mobile dropdowns when main mobile menu closes
    setMobileDropdowns({ destinations: false, activities: false, packages: false });
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // Base nav links (excluding dropdown ones handled separately)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block" onClick={closeMenu}>
              <Image
                src="/images/logo.jpg"
                alt="Reach Andaman Logo"
                width={1171}
                height={455}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {/* Home Link */}
            <Link
              href="/"
              className={`text-sm lg:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors ${pathname === "/" ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}
            >
              Home
            </Link>

            {/* Destinations Dropdown */}
            <div className="relative group">
              {/* Make the main Destinations text a link */}
              <Link href="/destinations" className={`text-sm lg:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center ${pathname.startsWith("/destinations") ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}>
                Destinations
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              {/* Ensure visibility/opacity classes are correct */}
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="py-2 px-1">
                  {/* Dynamic Destination Links */}
                  {destinationsData.length > 0 ? (
                    destinationsData.slice(0, 5).map((dest) => ( // Limit dropdown items if needed
                      <Link
                        key={dest.id}
                        href={`/destinations/${dest.id}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                      >
                        {dest.name}
                      </Link>
                    ))
                  ) : (
                    <span className="block px-4 py-2.5 text-sm text-gray-400">Loading...</span>
                  )}
                  <Link href="/destinations" className="block px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl mt-1 border-t border-gray-100">
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* Packages Dropdown */}
            <div className="relative group">
              {/* Make the main Packages text a link */}
              <Link href="/packages" className={`text-sm lg:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center ${pathname.startsWith("/packages") ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}>
                Packages
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              {/* Ensure visibility/opacity classes are correct */}
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="py-2 px-1">
                  {/* Dynamic Package Links */}
                  {/* Now correctly checks the length of the extracted array */}
                  {packagesData.length > 0 ? (
                    packagesData.slice(0, 5).map((pkg) => ( // Limit dropdown items if needed
                      <Link
                        key={pkg.id}
                        href={`/packages/${pkg.id}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                      >
                        {pkg.name}
                      </Link>
                    ))
                  ) : (
                    <span className="block px-4 py-2.5 text-sm text-gray-400">Loading...</span>
                  )}
                  <Link href="/packages" className="block px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl mt-1 border-t border-gray-100">
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* Activities Dropdown */}
            <div className="relative group">
              {/* Make the main Activities text a link */}
              <Link href="/activities" className={`text-sm lg:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center ${pathname.startsWith("/activities") ? 'text-blue-600 border-b-2 border-blue-600' : ''
                }`}>
                Activities
                <ChevronDown size={16} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              {/* Ensure visibility/opacity classes are correct */}
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left">
                <div className="py-2 px-1">
                  {/* Dynamic Activity Links */}
                  {activitiesData.length > 0 ? (
                    activitiesData.slice(0, 5).map((act) => ( // Limit dropdown items if needed
                      <Link
                        key={act.id}
                        href={`/activities/${act.id}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl"
                      >
                        {act.name}
                      </Link>
                    ))
                  ) : (
                    <span className="block px-4 py-2.5 text-sm text-gray-400">Loading...</span>
                  )}
                  <Link href="/activities" className="block px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-xl mt-1 border-t border-gray-100">
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Navigation Links */}
            {navLinks.filter(link => link.name !== 'Home').map((link) => ( // Filter out Home as it's handled above
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm lg:text-base font-medium text-gray-600 hover:text-blue-600 transition-colors ${pathname === link.href ? 'text-blue-600 border-b-2 border-blue-600' : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Actions & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search Icon */}
            <button className="text-gray-500 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors">
              <span className="sr-only">Search</span>
              <Search size={20} />
            </button>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
              ) : isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {user?.role_id === 3 && (
                    <Link href="/vendor/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Vendor Area
                    </Link>
                  )}
                  <Link href="/user/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors" title="My Account">
                    <User size={20} />
                    <span className="sr-only">Profile</span>
                  </Link>
                  <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center p-1.5 hover:bg-red-50 rounded-full" title="Logout">
                    <LogOut size={18} />
                    <span className="hidden lg:inline ml-1">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/signup"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-full transition-colors">
                <span className="sr-only">Toggle Menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu with Dropdowns */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 max-h-[calc(100vh-60px)] overflow-y-auto"> {/* Added max-height and overflow */}
            <nav className="flex flex-col px-4 py-4 space-y-1"> {/* Reduced space-y */}
              {/* Home Link */}
              <Link
                href="/"
                className={`block px-3 py-2.5 rounded-xl text-base font-medium ${pathname === "/"
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                onClick={closeMenu}
              >
                Home
              </Link>

              {/* Mobile Destinations Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileDropdowns(prev => ({ ...prev, destinations: !prev.destinations, activities: false, packages: false }))} // Close others on open
                  className={`flex justify-between items-center w-full px-3 py-2.5 rounded-xl text-base font-medium ${pathname.startsWith("/destinations") || mobileDropdowns.destinations
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <span>Destinations</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${mobileDropdowns.destinations ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileDropdowns.destinations && (
                  <div className="pl-4 space-y-0.5 mt-1 border-l-2 border-blue-100 ml-1"> {/* Indent style */}
                    {/* Add link to main destinations page */}
                    <Link
                      href="/destinations"
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={closeMenu}
                    >
                      All Destinations
                    </Link>
                    {/* Dynamic Links */}
                    {destinationsData.length > 0 ? (
                      destinationsData.slice(0, 5).map((dest) => ( // Limit items
                        <Link
                          key={dest.id}
                          href={`/destinations/${dest.id}`}
                          className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          onClick={closeMenu}
                        >
                          {dest.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-3 py-2 text-sm text-gray-400">Loading...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Packages Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileDropdowns(prev => ({ ...prev, packages: !prev.packages, destinations: false, activities: false }))} // Close others
                  className={`flex justify-between items-center w-full px-3 py-2.5 rounded-xl text-base font-medium ${pathname.startsWith("/packages") || mobileDropdowns.packages
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <span>Packages</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${mobileDropdowns.packages ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileDropdowns.packages && (
                  <div className="pl-4 space-y-0.5 mt-1 border-l-2 border-blue-100 ml-1">
                    <Link
                      href="/packages"
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={closeMenu}
                    >
                      All Packages
                    </Link>
                    {packagesData.length > 0 ? (
                      packagesData.slice(0, 5).map((pkg) => ( // Limit items
                        <Link
                          key={pkg.id}
                          href={`/packages/${pkg.id}`}
                          className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          onClick={closeMenu}
                        >
                          {pkg.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-3 py-2 text-sm text-gray-400">Loading...</span>
                    )}
                  </div>
                )}
              </div>


              {/* Mobile Activities Dropdown */}
              <div className="space-y-1">
                <button
                  onClick={() => setMobileDropdowns(prev => ({ ...prev, activities: !prev.activities, destinations: false, packages: false }))} // Close others
                  className={`flex justify-between items-center w-full px-3 py-2.5 rounded-xl text-base font-medium ${pathname.startsWith("/activities") || mobileDropdowns.activities
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                >
                  <span>Activities</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${mobileDropdowns.activities ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileDropdowns.activities && (
                  <div className="pl-4 space-y-0.5 mt-1 border-l-2 border-blue-100 ml-1">
                    <Link
                      href="/activities"
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={closeMenu}
                    >
                      All Activities
                    </Link>
                    {activitiesData.length > 0 ? (
                      activitiesData.slice(0, 5).map((act) => ( // Limit items
                        <Link
                          key={act.id}
                          href={`/activities/${act.id}`}
                          className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                          onClick={closeMenu}
                        >
                          {act.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-3 py-2 text-sm text-gray-400">Loading...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Other Mobile Navigation Links */}
              {navLinks.filter(link => link.name !== 'Home').map((link) => ( // Filter out Home
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-xl text-base font-medium ${pathname === link.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}

              {/* --- Mobile User Actions --- */}
              <div className="pt-4 pb-2 border-t border-gray-200">
                {isLoading ? (
                  <div className="flex justify-center py-2">
                    <div className="h-5 w-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  </div>
                ) : isAuthenticated ? (
                  <div className="space-y-1">
                    <p className="px-3 py-2 text-sm font-medium text-gray-500">Welcome, {user?.first_name || user?.email}</p>
                    {user?.role_id === 3 && (
                      <Link
                        href="/vendor/dashboard"
                        className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={closeMenu}
                      >
                        Vendor Dashboard
                      </Link>
                    )}
                    <Link
                      href="/user/dashboard"
                      className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={closeMenu}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/user/bookings"
                      className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={closeMenu}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2.5 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-3 pt-2">
                    <Link
                      href="/auth/signin"
                      className="block w-full py-2.5 rounded-full text-center text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      onClick={closeMenu}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full py-2.5 rounded-full text-center text-base font-medium border border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      onClick={closeMenu}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
              {/* --- End Mobile User Actions --- */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;