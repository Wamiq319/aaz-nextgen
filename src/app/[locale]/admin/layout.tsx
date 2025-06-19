"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Award, Download } from "lucide-react";

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
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 md:w-56 border-r bg-white p-2 md:p-4 flex flex-col items-center md:items-stretch">
        <h2 className="hidden md:block text-lg font-semibold mb-6 px-2">
          Admin Panel
        </h2>
        <nav className="space-y-1 w-full">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#6B21A8] to-[#D63384] text-white"
                      : "hover:bg-gray-100 text-[#6B21A8]"
                  }
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
