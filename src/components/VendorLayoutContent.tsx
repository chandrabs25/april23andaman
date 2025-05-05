"use client";

import React, { useEffect } from "react";
import VendorNav from "@/components/VendorNav";
import { usePathname, useRouter } from "next/navigation";
import { useVendorAuth } from "@/hooks/useVendorAuth";
import { Loader2 } from "lucide-react";

// This component contains the logic that depends on the VendorAuth context
export default function VendorLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useVendorAuth(); // Hook is called here, *inside* the provider

  // Check if the current path is the vendor login or register page
  // Use endsWith to handle potential base paths if the app is not hosted at the root
  const isAuthPage = pathname?.endsWith('/login') || pathname?.endsWith('/register');

  // Show loading state while auth status is being determined
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full"> {/* Ensure full width */}
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
        <span>Loading Vendor Area...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated and not already on an auth page
  useEffect(() => {
    // Check isLoading again inside useEffect as initial render might be loading=true
    if (!isLoading && !isAuthenticated && !isAuthPage) {
      console.log("VendorLayoutContent: Not authenticated, redirecting to /login");
      router.replace('/login'); // Redirect to vendor login page relative to the group
    }
  }, [isLoading, isAuthenticated, isAuthPage, router]);

  // If not authenticated (and not loading), show a redirect message while useEffect handles the redirect
  if (!isAuthenticated && !isAuthPage) {
     return (
        <div className="flex justify-center items-center h-screen w-full"> {/* Ensure full width */}
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" />
            <span>Redirecting to login...</span>
        </div>
     );
  }

  // Render the vendor navigation and the main content area if authenticated or on an auth page
  return (
    <>
      {!isAuthPage && <VendorNav />}
      <main className={`flex-grow p-6 ${!isAuthPage ? 'ml-64' : ''}`}>
        {children}
      </main>
    </>
  );
}
