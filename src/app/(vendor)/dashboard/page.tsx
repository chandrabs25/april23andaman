// Path: .\src\app\vendor\dashboard\page.tsx
'use client';
export const dynamic = 'force-dynamic'
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, Calendar, Clock, User as UserIconLucide, MapPin, Phone, Mail, Shield, Package, Activity, Settings, LogOut, Home, Users as UsersIcon, FileText, Star, Loader2, AlertTriangle, Hotel, Bike, Anchor } from 'lucide-react'; // Added Hotel, Bike, Anchor
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';

// --- Interfaces ---
interface AuthUser {
  id: string | number;
  email: string;
  first_name?: string;
  last_name?: string;
  role_id?: number;
}
interface VendorProfile {
  id: number;
  user_id: number;
  business_name: string;
  type: string; // e.g., 'hotel', 'rental', 'activity'
  address: string | null;
  verified: number; // 0 or 1
  email?: string;
  phone?: string;
  created_at?: string;
  profile_image?: string | null;
  description?: string | null;
}
interface GetVendorProfileResponse { success: boolean; data: VendorProfile | null; message?: string; }

interface VendorStats {
    totalServices: number;
    activeBookings: number;
    totalEarnings: number;
    reviewScore: number | null;
}

interface VendorService {
  id: number;
  name: string;
  price: string | number;
  duration?: string;
  bookings_count?: number;
  rating?: number | null;
  is_active: number;
}

type VendorBookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
interface VendorBooking {
  id: number | string;
  serviceOrPackageName: string;
  customerName: string;
  start_date: string;
  end_date?: string;
  total_people: number;
  total_amount: number;
  net_amount: number;
  status: VendorBookingStatus;
}

interface VendorReview {
  id: number;
  serviceName: string;
  customerName: string;
  rating: number;
  comment: string | null;
  created_at: string;
}
// --- End Interfaces ---


// --- LoadingSpinner Component ---
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
    <div className="flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
        <span>{text}</span>
    </div>
);
// --- End Loading Spinner ---

// --- Helper Functions ---
const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
        return 'Invalid Date';
    }
};
const getBookingStatusColor = (status: VendorBookingStatus): string => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default:
          console.warn(`Unknown booking status in getBookingStatusColor: ${status}`);
          return 'bg-gray-100 text-gray-800';
    }
};
const getServiceStatusColor = (isActive: number): string => {
    return isActive === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
};
// --- End Helper Functions ---

// --- Verification Pending Component ---
const VerificationPending = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md mb-8" role="alert">
        <p className="font-bold flex items-center"><AlertTriangle size={18} className="mr-2"/>Verification Pending</p>
        <p>Your account is currently under review. You will be notified once your verification is complete. Full access to service management features will be enabled upon verification.</p>
    </div>
);
// --- End Verification Pending Component ---

// --- Main Dashboard Content Component ---
function VendorDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const { user: authUser, isLoading: authLoading, isAuthenticated, logout: originalLogout } = useAuth() as {
      user: AuthUser | null;
      isLoading: boolean;
      isAuthenticated: boolean;
      logout: () => Promise<void>;
  };
  
  // Custom logout function for vendor dashboard that redirects to /login
  const logout = async () => {
    await originalLogout();
    router.push('/login');
  };

  const userId = authUser?.id;

  // --- Fetch Vendor Specific Data ---
  const profileApiUrl = userId ? `/api/vendors/profile?userId=${userId}` : null;
  // --- Capture the raw result ---
  // --- IMPORTANT: Assuming useFetch now directly returns the profile in its 'data' property ---
  const profileFetchResult = useFetch<VendorProfile | null>(profileApiUrl); // Adjust type param if useFetch returns the nested data directly

  // --- Derive directly from profileFetchResult.data ---
  const currentVendorProfile = profileFetchResult.data; // Access the profile object directly
  // --- End direct derivation ---

  // --- useEffect to monitor profileFetchResult ---
  useEffect(() => {
    console.log("useEffect[profileFetchResult] triggered:", {
        status: profileFetchResult.status,
        hasData: !!profileFetchResult.data, // Check if data exists directly
        // hasNestedData is no longer relevant if data is direct
        rawData: profileFetchResult.data
    });
  }, [profileFetchResult]);
  // --- END useEffect ---

  // --- SIMPLIFY shouldFetchOtherData TEMPORARILY ---
  // Use profileFetchResult.status directly
  const shouldFetchOtherData = profileFetchResult.status === 'success' && !!userId; // Temporarily removed isVerified dependency
  // --- END SIMPLIFY ---

  const statsApiUrl = shouldFetchOtherData ? `/api/vendors/stats?userId=${userId}` : null;
  const servicesApiUrl = shouldFetchOtherData ? `/api/vendors/services?providerUserId=${userId}&limit=5` : null;
  const bookingsApiUrl = shouldFetchOtherData ? `/api/vendors/bookings?vendorUserId=${userId}&limit=5` : null;
  const reviewsApiUrl = shouldFetchOtherData ? `/api/vendors/reviews?vendorUserId=${userId}&limit=3` : null;

  // Corrected: Fetch direct data types
  const { data: vendorStats, error: statsError, status: statsStatus } = useFetch<VendorStats | null>(statsApiUrl);
  const { data: vendorServices, error: servicesError, status: servicesStatus } = useFetch<VendorService[] | null>(servicesApiUrl);
  const { data: vendorBookings, error: bookingsError, status: bookingsStatus } = useFetch<VendorBooking[] | null>(bookingsApiUrl);
  const { data: vendorReviews, error: reviewsError, status: reviewsStatus } = useFetch<VendorReview[] | null>(reviewsApiUrl);

  // Corrected: Use fetched data directly, provide defaults
  const statsData = vendorStats ?? { totalServices: 0, activeBookings: 0, totalEarnings: 0, reviewScore: null };
  const servicesData = vendorServices || [];
  const bookingsData = vendorBookings || [];
  const reviewsData = vendorReviews || [];

  // --- Authorization Check & Loading State ---
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
        console.log(`Vendor Dashboard Auth Check Failed: authLoading=${authLoading}, isAuthenticated=${isAuthenticated}, role_id=${authUser?.role_id}. Redirecting.`);
        router.replace('/login?reason=unauthorized_vendor');
    }
  }, [authLoading, isAuthenticated, authUser, router]);

  // Determine overall loading state (Auth check OR initial profile fetch)
  // Use profileFetchResult.status directly
  const isAuthOrProfileLoading = authLoading || profileFetchResult.status === 'loading';

  // Determine if there's a critical error preventing dashboard display
  let criticalError: Error | null = null;
  if (!authLoading) {
      if (!isAuthenticated || authUser?.role_id !== 3) {
          criticalError = new Error("Access Denied: You do not have permission to view this page.");
      } else if (profileFetchResult.status === 'error') { // Use profileFetchResult.status
          // Use profileFetchResult.error directly
          criticalError = profileFetchResult.error || new Error('Failed to load vendor profile data.');
      }
  }

  // --- Render Loading or Error State ---
  if (isAuthOrProfileLoading) {
      return <LoadingSpinner text="Loading Vendor Dashboard..." />;
  }

  if (criticalError) {
      console.error("Critical error rendering vendor dashboard:", criticalError);
      return (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">
             <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
             <h2 className="text-2xl font-semibold text-red-600 mb-4">Access Denied or Error</h2>
             <p className="text-gray-700 mb-6">{criticalError.message}</p>
             <button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout and Sign In Again</button>
         </div>
      );
  }

  // --- ADD LOGGING HERE ---
  console.log("Dashboard Check:", {
      profileStatus: profileFetchResult.status, // Use direct status
      vendorProfileExists: !!currentVendorProfile, // Use derived profile
      vendorProfileData: currentVendorProfile, // Use derived profile
      rawProfileFetchResult: profileFetchResult // Log the whole object
  });
  // --- END ADD LOGGING ---

  // --- ADJUSTED CHECK ---
  // If profile fetch succeeded BUT the API explicitly returned null data
  // Use profileFetchResult.status and currentVendorProfile directly
  if (profileFetchResult.status === 'success' && currentVendorProfile === null) {
       console.error("Condition met (profileStatus === 'success' && currentVendorProfile === null), showing 'Profile Not Found':", { profileStatus: profileFetchResult.status, vendorProfileData: currentVendorProfile });
       return (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10">
             <AlertTriangle className="h-12 w-12 text-orange-500 mb-4" />
             <h2 className="text-2xl font-semibold text-orange-600 mb-4">Profile Not Found</h2>
             <p className="text-gray-700 mb-6">Could not retrieve your vendor profile information. Please contact support.</p>
             <button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
         </div>
      );
  }
  // --- END ADJUSTED CHECK ---

  // --- RE-INTRODUCE intermediate state check ---
  // If the profile fetch succeeded but the data isn't available *yet* in this render cycle,
  // continue showing a loading state to prevent rendering with incomplete data.
  if (profileFetchResult.status === 'success' && typeof currentVendorProfile === 'undefined') {
      console.log("Dashboard Check: profileStatus is 'success' but currentVendorProfile is still undefined. Showing loading spinner.");
      return <LoadingSpinner text="Finalizing dashboard..." />;
  }
  // --- End RE-INTRODUCE intermediate state check ---

  // Check if vendor profile exists and is verified
  // --- DERIVE isVerified DIRECTLY from currentVendorProfile ---
  const isVerified = currentVendorProfile?.verified === 1;
  // --- End DERIVATION ---

  if (profileFetchResult.status === 'success' && !currentVendorProfile) {
    // If profile loaded but is null (shouldn't happen if auth succeeded, but maybe an API issue)
    console.warn("Vendor profile data is null after successful fetch.");
    // Depending on desired behavior, show error or limited view
    // return <div className="text-red-500">Error: Vendor profile could not be loaded.</div>;
  }

  // --- Sidebar Tabs Definition ---
  // isVerified and isHotelVendor are already derived correctly above
  const isHotelVendor = currentVendorProfile?.type === 'hotel';
  const sidebarTabs = [
      { id: 'overview', label: 'Overview', icon: Home, show: true },
      { id: 'services', label: isHotelVendor ? 'Manage Hotels' : 'Manage Services', icon: isHotelVendor ? Hotel : Package, show: isVerified },
      { id: 'bookings', label: 'Bookings', icon: Calendar, show: isVerified },
      { id: 'reviews', label: 'Reviews', icon: Star, show: isVerified },
      { id: 'profile', label: 'Profile', icon: UserIconLucide, show: true },
  ];

  // --- Render Tab Content Logic ---
  const renderTabContent = () => {
    // If not verified, only allow profile tab, show verification message otherwise
    // if (!isVerified && activeTab !== 'profile') {
    //     return <VerificationPending />;
    // }

    switch(activeTab) {
      case 'overview':
        return (
          <div>
            {/* --- Verification Check Removed ---
            //{ !isVerified && <VerificationPending /> }
            --- End Removal --- */}

            {/* Show stats and management section */}
            {/* {isVerified && ( */}
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-full mr-4 ${isHotelVendor ? 'bg-indigo-100' : 'bg-blue-100'}`}> 
                            {isHotelVendor ? <Hotel className="h-6 w-6 text-indigo-600" /> : <Package className="h-6 w-6 text-blue-600" />} 
                        </div>
                        <div> <p className="text-sm text-gray-500">Total {isHotelVendor ? 'Hotels' : 'Services'}</p> <h3 className="text-2xl font-bold">{statsStatus === 'loading' ? <Loader2 className="h-5 w-5 animate-spin"/> : statsData.totalServices}</h3> </div>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full"><div className={`h-1 ${isHotelVendor ? 'bg-indigo-500' : 'bg-blue-500'} rounded-full`} style={{width: '100%'}}></div></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4"> <Calendar className="h-6 w-6 text-green-600" /> </div>
                        <div> <p className="text-sm text-gray-500">Active Bookings</p> <h3 className="text-2xl font-bold">{statsStatus === 'loading' ? <Loader2 className="h-5 w-5 animate-spin"/> : statsData.activeBookings}</h3> </div>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full"><div className="h-1 bg-green-500 rounded-full" style={{width: '75%'}}></div></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full mr-4"> <Star className="h-6 w-6 text-purple-600" /> </div>
                        <div> <p className="text-sm text-gray-500">Avg. Rating</p> <h3 className="text-2xl font-bold">{statsStatus === 'loading' ? <Loader2 className="h-5 w-5 animate-spin"/> : (statsData.reviewScore ? `${statsData.reviewScore.toFixed(1)}/5` : 'N/A')}</h3> </div>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full"><div className="h-1 bg-purple-500 rounded-full" style={{width: `${(statsData.reviewScore || 0)/5 * 100}%`}}></div></div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 p-3 rounded-full mr-4"> <FileText className="h-6 w-6 text-yellow-600" /> </div>
                        <div> <p className="text-sm text-gray-500">Total Earnings</p> <h3 className="text-2xl font-bold">{statsStatus === 'loading' ? <Loader2 className="h-5 w-5 animate-spin"/> : `₹${statsData.totalEarnings.toLocaleString('en-IN')}`}</h3> </div>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full"><div className="h-1 bg-yellow-500 rounded-full" style={{width: '85%'}}></div></div>
                </div>
              </div>

              {/* --- Manage Your Business Section --- (Added as per design) */} 
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-lg font-semibold mb-4">Manage Your Business</h3>
                  {isHotelVendor ? (
                      // Hotel Management Links
                      <div className="space-y-3">
                          <Link href="/my-hotels" className="inline-flex items-center text-blue-600 hover:underline">
                              <Hotel size={16} className="mr-2"/> Manage Hotels
                          </Link>
                          <br/>
                          <Link href="/my-hotels/add" className="inline-flex items-center text-blue-600 hover:underline">
                              <Hotel size={16} className="mr-2"/> Add New Hotel
                          </Link>
                      </div>
                  ) : (
                      // Generic Service (Rental/Activity) Management Links
                      <div className="space-y-3">
                          <Link href="/my-services" className="inline-flex items-center text-blue-600 hover:underline">
                              <Package size={16} className="mr-2"/> Manage Services
                          </Link>
                          <br/>
                          <Link href="/my-services/add" className="inline-flex items-center text-blue-600 hover:underline">
                              <Package size={16} className="mr-2"/> Add New Service
                          </Link>
                      </div>
                  )}
              </div>
              {/* --- End Manage Your Business Section --- */} 

              {/* Recent Bookings & Reviews Grid */} 
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Bookings Card */} 
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                      {bookingsStatus === 'loading' && <LoadingSpinner text="Loading bookings..."/>}
                      {bookingsStatus === 'error' && <p className="text-sm text-red-600">Error: {bookingsError?.message || 'Could not load bookings.'}</p>}
                      {bookingsStatus === 'success' && bookingsData.length > 0 ? (
                          <>
                              <div className="overflow-x-auto -mx-6">
                                  <table className="min-w-full">
                                      <thead> <tr className="border-b"> <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase">Service/Pkg</th> <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase">Date</th> <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase">Amount</th> <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase">Status</th> </tr> </thead>
                                      <tbody>
                                          {bookingsData.map(booking => (
                                              <tr key={booking.id} className="border-b text-sm hover:bg-gray-50">
                                              <td className="py-2 px-6 font-medium truncate max-w-[150px]">{booking.serviceOrPackageName}</td>
                                              <td className="py-2 px-6">{formatDate(booking.start_date)}</td>
                                              <td className="py-2 px-6">₹{(booking.net_amount ?? booking.total_amount ?? 0).toLocaleString('en-IN')}</td>
                                              <td className="py-2 px-6"><span className={`px-2 py-0.5 rounded-full text-xs ${getBookingStatusColor(booking.status)}`}>{booking.status}</span></td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                              </div>
                              <div className="mt-4 text-right">
                                  <Link href="/manage-bookings" className="text-blue-600 hover:text-blue-800 text-sm font-medium"> View all bookings → </Link>
                              </div>
                          </>
                      ) : bookingsStatus === 'success' ? ( <p className="text-sm text-gray-500 text-center py-4">No recent bookings.</p> ) : null}
                  </div>

                  {/* Recent Reviews Card */} 
                  <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
                      {reviewsStatus === 'loading' && <LoadingSpinner text="Loading reviews..."/>}
                      {reviewsStatus === 'error' && <p className="text-sm text-red-600">Error: {reviewsError?.message || 'Could not load reviews.'}</p>}
                      {reviewsStatus === 'success' && reviewsData.length > 0 ? (
                          <>
                              <div className="space-y-4">
                                  {reviewsData.map(review => (
                                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                                          <div className="flex justify-between items-start mb-2"> <div><p className="font-medium text-sm">{review.serviceName}</p><p className="text-xs text-gray-500">by {review.customerName}</p></div> <div className="flex items-center text-sm text-yellow-500"> {Array.from({ length: 5 }).map((_, i) => ( <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} /> ))} </div> </div>
                                          {review.comment && <p className="text-sm text-gray-600 italic">"{review.comment}"</p>}
                                          <p className="text-xs text-gray-400 mt-1 text-right">{formatDate(review.created_at)}</p>
                                      </div>
                                  ))}
                              </div>
                              <div className="mt-4 text-right">
                                  <Link href="/reviews" className="text-blue-600 hover:text-blue-800 text-sm font-medium"> View all reviews → </Link>
                              </div>
                          </>
                      ) : reviewsStatus === 'success' ? ( <p className="text-sm text-gray-500 text-center py-4">No recent reviews.</p> ) : null}
                  </div>
              </div>
            </>
          </div>
        );
      case 'services':
        // Redirect or show placeholder if accessed directly (actual content is in /services or /hotels)
        // This tab button itself is hidden if not verified
        router.replace(isHotelVendor ? '/my-hotels' : '/my-services');
        return <LoadingSpinner text={`Redirecting to ${isHotelVendor ? 'Hotels' : 'Services'}...`} />;
      case 'bookings':
        // Redirect or show placeholder if accessed directly
        // This tab button itself is hidden if not verified
        router.replace('/manage-bookings');
        return <LoadingSpinner text="Redirecting to Bookings..." />;
      case 'reviews':
        // Redirect or show placeholder if accessed directly
        // This tab button itself is hidden if not verified
        router.replace('/reviews'); // Assuming /reviews is the correct path
        return <LoadingSpinner text="Redirecting to Reviews..." />;
      case 'profile':
        // Profile is always accessible
        return (
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-xl font-bold mb-6">Business Profile</h2>
                 {/* Use currentVendorProfile directly */}
                 {currentVendorProfile && (
                     <div className="space-y-4 text-sm">
                         <div><label className="font-medium text-gray-500 block mb-1">Business Name</label><p className="text-gray-800">{currentVendorProfile.business_name || 'N/A'}</p></div>
                         <div><label className="font-medium text-gray-500 block mb-1">Type</label><p className="text-gray-800 capitalize">{currentVendorProfile.type || 'N/A'}</p></div>
                         <div><label className="font-medium text-gray-500 block mb-1">Email</label><p className="text-gray-800">{currentVendorProfile.email || authUser?.email || 'N/A'}</p></div>
                         <div><label className="font-medium text-gray-500 block mb-1">Phone</label><p className="text-gray-800">{currentVendorProfile.phone || 'N/A'}</p></div>
                         <div><label className="font-medium text-gray-500 block mb-1">Address</label><p className="text-gray-800">{currentVendorProfile.address || 'Not Provided'}</p></div>
                         <div>
                            <label className="font-medium text-gray-500 block mb-1">Status</label>
                            {/* isVerified is derived correctly above */}
                            <p>{isVerified ?
                                <span className="text-green-600 font-medium inline-flex items-center"><Shield size={14} className="mr-1"/>Verified</span> :
                                <span className="text-yellow-600 font-medium inline-flex items-center"><Clock size={14} className="mr-1"/>Pending Verification</span>}
                            </p>
                         </div>
                         <div className="pt-4 text-right border-t mt-4">
                            {/* TODO: Implement Edit Profile functionality (modal or separate page) */} 
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Edit Profile</button>
                         </div>
                     </div>
                 )}
            </div>
        );
      default:
        return null;
    }
  };
  // --- End Render Tab Content Logic ---


  // --- Main Return Structure ---
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col fixed inset-y-0 left-0 z-10">
        {/* Use currentVendorProfile directly */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold truncate">{currentVendorProfile?.business_name || 'Vendor Area'}</h1>
          <p className="text-gray-400 text-sm mt-1 truncate capitalize">{currentVendorProfile?.type || 'Service Provider'}</p>
        </div>
        <nav className="flex-grow p-4 overflow-y-auto">
          <ul className="space-y-1">
             {sidebarTabs.map(tab => (
                 tab.show && (
                     <li key={tab.id}>
                         <button 
                            onClick={() => setActiveTab(tab.id)} 
                            className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${ activeTab === tab.id ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }`}
                            // Disable management tabs if not verified
                            disabled={!isVerified && (tab.id === 'services' || tab.id === 'bookings' || tab.id === 'reviews')}
                         >
                             <tab.icon size={16} className="mr-2"/>
                             {tab.label}
                         </button>
                     </li>
                 )
             ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={logout} className="flex items-center text-gray-300 hover:text-white transition-colors w-full text-sm">
            <LogOut size={16} className="mr-2" /> Logout
          </button>
        </div>
      </div> {/* End Sidebar */}

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 bg-gray-100 overflow-y-auto">
        <div className="mb-6 flex justify-between items-center">
             <h1 className="text-2xl font-bold text-gray-800">
                {/* Find the label for the active tab */} 
                {sidebarTabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
             </h1>
         </div>
        {/* Render Active Tab Content */}
        {renderTabContent()}
      </main> {/* End Main Content */}
    </div>
  );
}


// --- Wrap with Suspense ---
export default function VendorDashboardPage() {
    return (
        <Suspense fallback={<LoadingSpinner text="Loading Vendor Dashboard..." />}>
            <VendorDashboardContent />
        </Suspense>
    );
}
