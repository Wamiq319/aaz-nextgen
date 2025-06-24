"use client";

import { Button } from "../ui/Button";
import {
  Divide,
  PenTool,
  Paintbrush,
  FlaskConical,
  Code,
  Moon,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getDirection } from "@/lib/direction";
import { useParams } from "next/navigation";

export const ContestPosterSection = () => {
  const t = useTranslations("HomePage.contests");
  const contestT = useTranslations("ContestPage.contests");
  const { locale } = useParams();
  const { direction, isRTL } = getDirection(locale as string);

  const getIconForContest = (contestName: string) => {
    switch (contestName) {
      case "NuminaX":
        return <Divide size={20} />;
      case "NovaMind":
        return <FlaskConical size={20} />;
      case "NoorQuest":
        return <Moon size={20} />;
      case "InkspireChronicles":
        return <PenTool size={20} />;
      case "VisionVerse":
        return <Paintbrush size={20} />;
      case "CodeNova":
        return <Code size={20} />;
      default:
        return <Code size={20} />;
    }
  };

  const featuredContests = [
    {
      key: "sharpness",
      title: t("cards.sharpness.title"),
      description: t("cards.sharpness.description"),
      contests: [
        {
          name: contestT("NuminaX.name"),
          shortDesc: contestT("NuminaX.shortDesc"),
          icon: getIconForContest("NuminaX"),
          color: "#10B981",
        },
        {
          name: contestT("NovaMind.name"),
          shortDesc: contestT("NovaMind.shortDesc"),
          icon: getIconForContest("NovaMind"),
          color: "#8B5CF6",
        },
        {
          name: contestT("NoorQuest.name"),
          shortDesc: contestT("NoorQuest.shortDesc"),
          icon: getIconForContest("NoorQuest"),
          color: "#F59E0B",
        },
      ],
    },
    {
      key: "creativity",
      title: t("cards.creativity.title"),
      description: t("cards.creativity.description"),
      contests: [
        {
          name: contestT("InkspireChronicles.name"),
          shortDesc: contestT("InkspireChronicles.shortDesc"),
          icon: getIconForContest("InkspireChronicles"),
          color: "#EC4899",
        },
        {
          name: contestT("VisionVerse.name"),
          shortDesc: contestT("VisionVerse.shortDesc"),
          icon: getIconForContest("VisionVerse"),
          color: "#F97316",
        },
        {
          name: contestT("CodeNova.name"),
          shortDesc: contestT("CodeNova.shortDesc"),
          icon: getIconForContest("CodeNova"),
          color: "#3B82F6",
        },
      ],
    },
    {
      key: "curiosity",
      title: t("cards.curiosity.title"),
      description: t("cards.curiosity.description"),
      contests: [
        {
          name: contestT("NovaMind.name"),
          shortDesc: contestT("NovaMind.shortDesc"),
          icon: getIconForContest("NovaMind"),
          color: "#8B5CF6",
        },
        {
          name: contestT("CodeNova.name"),
          shortDesc: contestT("CodeNova.shortDesc"),
          icon: getIconForContest("CodeNova"),
          color: "#3B82F6",
        },
        {
          name: contestT("NoorQuest.name"),
          shortDesc: contestT("NoorQuest.shortDesc"),
          icon: getIconForContest("NoorQuest"),
          color: "#F59E0B",
        },
      ],
    },
  ];

  return (
    <section
      className="relative w-full py-16 bg-gradient-to-b from-[#6B21A8]/10 to-[#6B21A8]/30"
      id="contests"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6B21A8] mb-4">
            {t("title")}{" "}
            <span className="text-[#D63384]">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContests.map((group, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B21A8]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6 z-10">
                <h3 className="text-2xl font-bold text-[#6B21A8] mb-2 group-hover:scale-105 transition-transform duration-300">
                  {group.title}
                </h3>
                <p className="text-gray-600 mb-4">{group.description}</p>

                <div className="space-y-4">
                  {group.contests.map((contest, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#6B21A8]/5 transition-all duration-300"
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6 flex-shrink-0"
                        style={{
                          backgroundColor: `${contest.color}20`,
                          border: `2px solid ${contest.color}`,
                        }}
                      >
                        {contest.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#6B21A8] mb-1">
                          {contest.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {contest.shortDesc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="transition-transform duration-300 hover:scale-105 active:scale-95 inline-block">
            <Button
              onClick={() => {
                window.location.href = `/contest`;
              }}
              variant="primary"
              size="lg"
              className="bg-[#6B21A8] hover:bg-[#7E3BA8] px-8 py-4 text-lg transition-all duration-300"
            >
              {t("viewAllContests")}
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
