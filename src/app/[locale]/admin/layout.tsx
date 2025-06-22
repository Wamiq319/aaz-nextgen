"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Award, Download } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/results", icon: Award, label: "Results" },
  { href: "/admin/downloads", icon: Download, label: "Downloads" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto logout when user leaves admin panel
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear session when user leaves the page
      sessionStorage.removeItem("admin-session");
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // User switched tabs or minimized browser
        sessionStorage.removeItem("admin-session");
      }
    };

    // Set admin session flag
    sessionStorage.setItem("admin-session", "true");

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      // Clear session when component unmounts
      sessionStorage.removeItem("admin-session");
    };
  }, []);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6B21A8] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Topbar for mobile */}
      <div className="flex md:hidden w-full bg-white border-b p-2 items-center justify-between">
        <nav className="flex flex-1 justify-between gap-2">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={href}
                variant={isActive ? "primary" : "outline"}
                className={`flex flex-col items-center justify-center min-w-0 px-0.5 py-0.5 text-xs ${
                  isActive ? "text-white" : "text-[#6B21A8]"
                }`}
                onClick={() => router.replace(href)}
              >
                <Icon className="h-4 w-4 mx-auto" />
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden md:flex w-16 md:w-56 border-r bg-white p-2 md:p-4 flex-col items-center md:items-stretch">
        <h2 className="hidden md:block text-lg font-semibold mb-6 px-2">
          Admin Panel
        </h2>

        {/* User Info */}
        <div className="hidden md:block mb-6 px-2">
          <p className="text-sm text-gray-600">Logged in as:</p>
          <p className="text-sm font-medium text-[#6B21A8] truncate">
            {session?.user?.email}
          </p>
        </div>

        <nav className="space-y-1 w-full">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={href}
                variant={isActive ? "primary" : "outline"}
                className={`flex items-center gap-3 w-full justify-start ${
                  isActive ? "text-white" : "text-[#6B21A8]"
                }`}
                onClick={() => router.replace(href)}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden md:inline">{label}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
