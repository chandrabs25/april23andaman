import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Package, Hotel, CalendarCheck, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth'; // Assuming useAuth provides logout
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast'; // Import toast for feedback

const VendorNav = () => {
    const { logout } = useAuth(); // Changed signOut to logout
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout(); // Changed signOut to logout
            toast({ title: "Logged Out", description: "You have been successfully logged out." });
            router.push('/login'); // Redirect to the sign-in page after logout
        } catch (error) {
            console.error("Logout failed:", error);
            toast({ variant: "destructive", title: "Logout Failed", description: "Could not log you out. Please try again." });
        }
    };

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/my-services', label: 'Services', icon: Package },
        { href: '/my-hotels', label: 'Hotels', icon: Hotel },
        { href: '/manage-bookings', label: 'Bookings', icon: CalendarCheck },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white h-screen fixed top-0 left-0 flex flex-col shadow-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Vendor Panel</h2>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-3 py-2 rounded-md text-gray-300 bg-red-600 hover:bg-red-700 hover:text-white transition-colors duration-150"
                >
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default VendorNav;
