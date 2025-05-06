// src/app/(vendor)/layout.tsx
import React from "react";
import { VendorAuthProvider } from "@/hooks/useVendorAuth"; // Import only the provider
import VendorLayoutContent from "@/components/VendorLayoutContent"; // Import the new content component

// This layout applies only to routes within the (vendor) group.
// It sets up the provider. The actual layout content is in VendorLayoutContent.
export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Wrap the content component with the provider
    <VendorAuthProvider>
      {/* The VendorLayoutContent component now handles the auth checks and renders the UI */}
      <div className="flex min-h-screen bg-gray-100">
         <VendorLayoutContent>{children}</VendorLayoutContent>
      </div>
    </VendorAuthProvider>
  );
}
