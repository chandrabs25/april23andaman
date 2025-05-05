// Path: /home/ubuntu/vendor_dev/component/(vendor)/services/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFetch } from '@/hooks/useFetch';
import { PlusCircle, Edit, Trash2, ToggleLeft, ToggleRight, Loader2, AlertTriangle, Shield, Package, Hotel } from 'lucide-react';
import { toast } from '@/hooks/use-toast'; // Assuming use-toast is available

// --- Interfaces ---
interface AuthUser {
  id: string | number;
  role_id?: number;
}

interface VendorProfile {
  id: number;
  verified: number; // 0 or 1
  type: string; // 'hotel', 'rental', 'activity', etc.
}

interface VendorService {
  id: number;
  name: string;
  type: string;
  price: string | number;
  island_id: number; // Assuming island name needs another fetch or join
  is_active: number; // 0 or 1
  amenities?: string | null; // JSON string
  // Add other fields if needed for display
}

interface Island {
    id: number;
    name: string;
}

// Add a generic response type for simple success/message APIs
interface ApiResponse {
    success: boolean;
    message?: string;
}

// --- Helper Components ---
const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
    <div className="flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
        <span>{text}</span>
    </div>
);

const VerificationPending = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md mb-8" role="alert">
        <p className="font-bold flex items-center"><AlertTriangle size={18} className="mr-2"/>Verification Pending</p>
        <p>Your account must be verified before you can manage services. Please check your profile status or contact support.</p>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Return to Dashboard</Link>
    </div>
);

const IncorrectVendorType = () => (
     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-8" role="alert">
        <p className="font-bold flex items-center"><Hotel size={18} className="mr-2"/>Incorrect Vendor Type</p>
        <p>This page is for managing Rentals and Activities. Hotel vendors should use the Hotel Management section.</p>
        <Link href="/hotels" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Go to Hotel Management</Link>
        <br/>
        <Link href="/dashboard" className="text-sm text-gray-600 hover:underline mt-1 inline-block">Return to Dashboard</Link>
    </div>
);

// --- Main Service List Component ---
function ServiceListContent() {
    const router = useRouter();
    const { user: authUser, isLoading: authLoading, isAuthenticated } = useAuth() as {
        user: AuthUser | null;
        isLoading: boolean;
        isAuthenticated: boolean;
    };

    const [services, setServices] = useState<VendorService[]>([]);
    const [isToggling, setIsToggling] = useState<number | null>(null); // Store ID of service being toggled
    const [isDeleting, setIsDeleting] = useState<number | null>(null); // Store ID of service being deleted

    // 1. Fetch Vendor Profile (for verification and type check)
    const profileApiUrl = authUser?.id ? `/api/vendors/profile?userId=${authUser.id}` : null;
    const { data: vendorProfile, error: profileError, status: profileStatus } = useFetch<VendorProfile | null>(profileApiUrl);
    const isVerified = vendorProfile?.verified === 1;
    const isHotelVendor = vendorProfile?.type === 'hotel';

    // 2. Fetch Services (only if profile loaded, verified, and not a hotel vendor)
    const shouldFetchServices = profileStatus === 'success' && vendorProfile && isVerified && !isHotelVendor;
    const servicesApiUrl = shouldFetchServices ? `/api/vendor/services` : null; // Uses GET from route.ts
    const { data: fetchedServices, error: servicesError, status: servicesStatus } = useFetch<VendorService[] | null>(servicesApiUrl);

    // 3. Fetch Islands (for displaying names)
    const { data: fetchedIslands, status: islandsStatus } = useFetch<Island[] | null>('/api/islands');
    const islandsMap = React.useMemo(() => {
        const map = new Map<number, string>();
        fetchedIslands?.forEach(island => map.set(island.id, island.name));
        return map;
    }, [fetchedIslands]);

    // Update local services state when fetch completes
    useEffect(() => {
        if (servicesStatus === 'success' && fetchedServices) {
            setServices(fetchedServices);
        }
    }, [servicesStatus, fetchedServices]);

    // --- Authorization & Loading Checks ---
    useEffect(() => {
        if (!authLoading && (!isAuthenticated || authUser?.role_id !== 3)) {
            router.replace('/auth/signin?reason=unauthorized_vendor');
        }
    }, [authLoading, isAuthenticated, authUser, router]);

    const isLoading = authLoading || profileStatus === 'loading' || (shouldFetchServices && servicesStatus === 'loading') || islandsStatus === 'loading';

    if (isLoading) {
        return <LoadingSpinner text="Loading Services..." />;
    }

    // Handle Profile Fetch Error
    if (profileStatus === 'error') {
        return <div className="text-red-600">Error loading vendor profile: {profileError?.message || 'Unknown error'}</div>;
    }
    // Handle Profile Not Found (edge case)
    if (profileStatus === 'success' && !vendorProfile) {
         return <div className="text-orange-600">Vendor profile not found. Cannot load services.</div>;
    }

    // --- Conditional Rendering based on Verification & Type ---
    // --- Verification Check Removed ---
    // if (!isVerified) {
    //     return <VerificationPending />;
    // }
    // --- End Removal ---
    if (isHotelVendor) {
        return <IncorrectVendorType />;
    }
    // --- End Conditional Rendering ---

    // Handle Services Fetch Error
    if (servicesStatus === 'error') {
        return <div className="text-red-600">Error loading services: {servicesError?.message || 'Unknown error'}</div>;
    }

    // --- Event Handlers ---
    const handleToggleActive = async (serviceId: number, currentStatus: boolean) => {
        setIsToggling(serviceId);
        try {
            const response = await fetch(`/api/vendor/services/${serviceId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus }),
            });
            // Type the result
            const result: ApiResponse = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to update status');
            }
            toast({ title: 'Success', description: `Service ${!currentStatus ? 'activated' : 'deactivated'}.` });
            // Update local state optimistically or refetch
            setServices(prev => prev.map(s => s.id === serviceId ? { ...s, is_active: !currentStatus ? 1 : 0 } : s));
        } catch (error) {
            console.error('Error toggling service status:', error);
            toast({ variant: 'destructive', title: 'Error', description: error instanceof Error ? error.message : 'Could not update service status.' });
        } finally {
            setIsToggling(null);
        }
    };

    const handleDeleteService = async (serviceId: number) => {
        if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            return;
        }
        setIsDeleting(serviceId);
        try {
            const response = await fetch(`/api/vendor/services/${serviceId}`, {
                method: 'DELETE',
            });
            // Type the result
            const result: ApiResponse = await response.json();
            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Failed to delete service');
            }
            toast({ title: 'Success', description: 'Service deleted successfully.' });
            // Update local state
            setServices(prev => prev.filter(s => s.id !== serviceId));
        } catch (error) {
            console.error('Error deleting service:', error);
            toast({ variant: 'destructive', title: 'Error', description: error instanceof Error ? error.message : 'Could not delete service.' });
        } finally {
            setIsDeleting(null);
        }
    };

    // --- Render Service List ---
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Services (Rentals & Activities)</h2>
                <Link href="/services/add" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                    <PlusCircle size={16} className="mr-2" /> Add New Service
                </Link>
            </div>

            {services.length === 0 && servicesStatus === 'success' ? (
                <p className="text-gray-500 text-center py-4">You haven't added any services yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Island</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {services.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{service.type.replace('/', ' - ')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{Number(service.price).toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{islandsMap.get(service.island_id) || `ID: ${service.island_id}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => handleToggleActive(service.id, service.is_active === 1)}
                                            disabled={isToggling === service.id}
                                            className={`flex items-center px-2 py-1 rounded-full text-xs ${service.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} disabled:opacity-50 disabled:cursor-wait`}
                                        >
                                            {isToggling === service.id ? (
                                                <Loader2 size={14} className="animate-spin mr-1" />
                                            ) : service.is_active === 1 ? (
                                                <ToggleRight size={14} className="mr-1" />
                                            ) : (
                                                <ToggleLeft size={14} className="mr-1" />
                                            )}
                                            {service.is_active === 1 ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Link href={`/services/${service.id}/edit`} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center" title="Edit">
                                            <Edit size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteService(service.id)}
                                            disabled={isDeleting === service.id}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50 disabled:cursor-wait"
                                            title="Delete"
                                        >
                                            {isDeleting === service.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* TODO: Add Pagination if necessary */} 
        </div>
    );
}

// --- Wrap with Suspense for Client Components ---
export default function VendorServicesPage() {
    return (
        // Suspense boundary for client components using hooks like useAuth, useFetch
        <Suspense fallback={<LoadingSpinner text="Loading Services Page..." />}>
            <ServiceListContent />
        </Suspense>
    );
}

