"use client";

import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";
import { useState } from "react";
import { getDirection } from "@/lib/direction";

const NAV_ITEMS = [
  { path: "home", key: "home" },
  { path: "contest", key: "contest" },
  { path: "level", key: "level" },
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
  const { direction, isRTL } = getDirection(locale as string);

  const isActive = (path: string) => {
    const basePath = `/${locale}${path === "home" ? "" : `/${path}`}`;
    return pathname === basePath
      ? "bg-gradient-to-r from-red-50 to-red-100 text-[#EF4444] font-semibold"
      : "text-[#1A365D] hover:text-[#EF4444]";
  };

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-[#E5E7EB]"
      dir={direction}
    >
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 flex items-center gap-1 sm:gap-2"
            aria-label={t("home")}
          >
            <Image
              src="/assets/images/logo.png"
              alt={t("home")}
              className="h-10 sm:h-12 md:h-16 w-auto animate-pulse hover:animate-none"
              width={64}
              height={64}
              priority
            />
            <div className="flex flex-col">
              <span className="text-[#1A365D] font-bold text-sm sm:text-base md:text-xl tracking-wider">
                {t("brand")}
              </span>
              <span className="text-[#EF4444] text-xs sm:text-sm font-medium tracking-wide">
                {t("slogan")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}/${item.path === "home" ? "" : item.path}`}
                    className={`text-sm uppercase tracking-wider px-4 py-2 rounded-full relative group overflow-hidden ${isActive(
                      item.path
                    )} transition-all duration-300 hover:bg-gradient-to-r from-red-50 to-red-100`}
                  >
                    <span className="relative z-10 inline-block group-hover:scale-110 transition-transform duration-300">
                      {t(item.key)}
                    </span>
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#EF4444] to-red-600 transition-opacity duration-300 ${
                        pathname ===
                        `/${locale}${
                          item.path === "home" ? "" : `/${item.path}`
                        }`
                          ? "opacity-10"
                          : "opacity-0 group-hover:opacity-10"
                      }`}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Switcher and Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#1A365D] hover:text-[#EF4444] focus:outline-none"
              aria-label={"menu"}
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
            <ul className="space-y-1 sm:space-y-2 px-1 sm:px-2 pt-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}/${item.path === "home" ? "" : item.path}`}
                    className={`block px-3 sm:px-4 py-2 rounded-full text-base font-medium relative group overflow-hidden ${isActive(
                      item.path
                    )} transition-all duration-300 hover:bg-gradient-to-r from-red-50 to-red-100`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 inline-block group-hover:scale-110 transition-transform duration-300">
                      {t(item.key)}
                    </span>
                    <span
                      className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#EF4444] to-red-600 transition-opacity duration-300 ${
                        pathname ===
                        `/${locale}${
                          item.path === "home" ? "" : `/${item.path}`
                        }`
                          ? "opacity-10"
                          : "opacity-0 group-hover:opacity-10"
                      }`}
                    ></span>
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
