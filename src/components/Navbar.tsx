"use client";

import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";

const NAV_ITEMS = [
  { path: "home", key: "home" },
  { path: "result", key: "result" },
  { path: "download", key: "download" },
  { path: "about", key: "about" },
  { path: "contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    const basePath = `/${locale}${path === "home" ? "" : `/${path}`}`;
    return pathname === basePath
      ? "text-[#EF4444] font-semibold" // Changed to match hero section red
      : "text-[#1A365D] hover:text-[#EF4444]"; // Added hover color
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-[#E5E7EB]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left aligned */}
          <Link href={`/${locale}`} className="flex-shrink-0" aria-label="Home">
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              className="h-15 w-auto"
              width={48}
              height={48}
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}/${item.path === "home" ? "" : item.path}`}
                    className={`text-sm uppercase tracking-wider ${isActive(
                      item.path
                    )} transition-colors duration-200`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Switcher - Right aligned */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#1A365D] hover:text-[#EF4444] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4">
            <ul className="space-y-2 px-2 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}/${item.path === "home" ? "" : item.path}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(
                      item.path
                    )}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
