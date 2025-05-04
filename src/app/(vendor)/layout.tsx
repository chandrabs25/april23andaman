import React from 'react';

// This layout applies only to routes within the (vendor) group.
// It does NOT include the standard site header/footer.
// It assumes AuthProvider is already wrapping the application in the root layout.
export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Render the specific page content for the vendor section */}
      {children}
    </>
  );
}
