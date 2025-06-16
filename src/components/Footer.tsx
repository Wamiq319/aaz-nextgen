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
  Shield,
  Star,
  LightbulbIcon,
  Sun,
  Zap,
  Rocket,
  Trophy,
  Moon,
  Code,
  Divide,
  PenTool,
  FlaskConical,
  Paintbrush,
  Code2,
  Palette,
} from "lucide-react";

export const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  // Pages
  const pages = [
    { name: "home", icon: <Home size={16} />, href: "/" },
    { name: "about", icon: <Info size={16} />, href: "/about" },
    { name: "results", icon: <Award size={16} />, href: "/result" },
    { name: "downloads", icon: <FileText size={16} />, href: "/download" },
    { name: "contact", icon: <Phone size={16} />, href: "/contact" },
  ];

  // Levels
  const levels = [
    { name: "NovaNest", icon: <Star size={16} /> },
    { name: "Ignitia", icon: <LightbulbIcon size={16} /> },
    { name: "LuminaCore", icon: <Sun size={16} /> },
    { name: "VortexEdge", icon: <Zap size={16} /> },
    { name: "AstraPrime", icon: <Rocket size={16} /> },
    { name: "Zenithra", icon: <Trophy size={16} /> },
  ];

  // Contests
  const contests = [
    { name: "NoorQuest", icon: <Moon size={16} /> },
    { name: "CodeNova", icon: <Code size={16} /> },
    { name: "NuminaX", icon: <Divide size={16} /> },
    { name: "NovaMind", icon: <FlaskConical size={16} /> },
    { name: "InkspireChronicles", icon: <PenTool size={16} /> },
    { name: "VisionVerse", icon: <Paintbrush size={16} /> },
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
        {/* Brand Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-[#EF4444]">
            <Award size={32} className="animate-pulse" />
            AAZ Nextgen Testing Service
          </h2>
          <p className="text-gray-400 mt-2 text-lg">{t("tagline")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("pages.title")}
            </h3>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={page.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="text-[#EF4444] group-hover:scale-110 transition-transform">
                      {page.icon}
                    </span>
                    {t(`pages.${page.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels Column */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-px h-full bg-[#EF4444]/30 hidden md:block"></div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("services.levels.title")}
            </h3>
            <ul className="space-y-3">
              {levels.map((level) => (
                <li key={level.name}>
                  <Link
                    href={`/level#${level.name}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="text-[#EF4444] group-hover:scale-110 transition-transform">
                      {level.icon}
                    </span>
                    {t(`services.levels.${level.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contests Column */}
          <div className="relative">
            <div className="absolute -right-6 top-0 w-px h-full bg-[#EF4444]/30 hidden md:block"></div>
            <h3 className="text-lg font-semibold mb-4 text-[#EF4444]">
              {t("services.contests.title")}
            </h3>
            <ul className="space-y-3">
              {contests.map((contest) => (
                <li key={contest.name}>
                  <Link
                    href={`/contest#${contest.name}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="text-[#EF4444] group-hover:scale-110 transition-transform">
                      {contest.icon}
                    </span>
                    {t(`services.contests.${contest.name}`)}
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
                  className="flex items-start gap-2 text-gray-400 group"
                >
                  <span className="mt-0.5 text-[#EF4444] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </address>
          </div>
        </div>

        {/* Copyright and Designer Credit */}
        <div className="border-t border-[#EF4444]/20 mt-12 pt-6 text-center">
          <div dir="ltr" className="text-xs text-gray-400">
            © 2025 Wamiq. All rights reserved. Licensed to AAZ Nextgen. Design &
            Develop by{" "}
            <span className="text-[#EF4444] font-medium">WλM!QΞ://dev</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
