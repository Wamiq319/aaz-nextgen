"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Home,
  Info,
  Award,
  FileText,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  BookOpenCheck,
  FileSearch,
  ClipboardList,
} from "lucide-react";

export const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  // MVP Pages
  const pages = [
    { name: "home", icon: <Home size={16} />, href: "/" },
    { name: "about", icon: <Info size={16} />, href: "/about" },
    { name: "results", icon: <Award size={16} />, href: "/result" },
    { name: "downloads", icon: <FileText size={16} />, href: "/download" },
    { name: "contact", icon: <Phone size={16} />, href: "/contact" },
  ];

  // Services (Matching your MVP)
  const services = [
    { name: "student_portal", icon: <Users size={16} /> },
    { name: "test_prep", icon: <BookOpenCheck size={16} /> },
    { name: "result_verification", icon: <FileSearch size={16} /> },
    { name: "registration", icon: <ClipboardList size={16} /> },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: t("contact.email") },
    { icon: <Phone size={16} />, text: t("contact.phone") },
    { icon: <MapPin size={16} />, text: t("contact.address") },
    { icon: <Clock size={16} />, text: t("contact.hours") },
  ];

  return (
    <footer className="bg-[#1F2937] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 relative">
            <div className="absolute -right-6 top-0 w-px h-full bg-[#EF4444]/30 hidden md:block"></div>
            <h3 className="text-xl font-bold flex items-center gap-2 text-[#EF4444]">
              <Award size={24} />
              AAZ Nextgen Testing Service
            </h3>
            <p className="text-gray-400">{t("tagline")}</p>
          </div>

          {/* Pages Column */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-px h-full bg-[#EF4444]/30 hidden md:block"></div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("pages.title")}
            </h3>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={page.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {page.icon}
                    {t(`pages.${page.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-px h-full bg-[#EF4444]/30 hidden md:block"></div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("services.title")}
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {service.icon}
                    {t(`services.${service.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("contact.title")}
            </h3>
            <address className="not-italic space-y-3">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-gray-400"
                >
                  <span className="mt-0.5 text-[#EF4444]">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* Copyright (Dark Red) */}
        <div className="border-t border-[#EF4444]/20 mt-12 pt-8 text-center bg-[#EF4444]/10 text-[#EF4444] py-4 rounded-md">
          <p>
            &copy; {currentYear} AAZ Nextgen Testing Service. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};
