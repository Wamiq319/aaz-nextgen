"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/Button";
import { ContestCard } from "../ui/ContestCard";
import { useParams } from "next/navigation";
import {
  Moon,
  Code,
  Divide,
  PenTool,
  FlaskConical,
  Paintbrush,
} from "lucide-react";

const contests = [
  {
    classLevel: "I–II",
    title: "Novanest",
    contests: [
      {
        name: "NoorQuest",
        icon: <Moon size={20} />,
        color: "#F59E0B",
        description: "Qur'anic Knowledge & Islamic Studies",
      },
      {
        name: "CodeNova",
        icon: <Code size={20} />,
        color: "#3B82F6",
        description: "Computer Science & Programming",
      },
    ],
  },
  {
    classLevel: "III–IV",
    title: "Ignitia",
    contests: [
      {
        name: "NuminaX",
        icon: <Divide size={20} />,
        color: "#10B981",
        description: "Mathematics & Logical Reasoning",
      },
      {
        name: "Inkspire Chronicles",
        icon: <PenTool size={20} />,
        color: "#EC4899",
        description: "Creative Writing & Storytelling",
      },
    ],
  },
  {
    classLevel: "V–VI",
    title: "Luminex",
    contests: [
      {
        name: "NovaMind",
        icon: <FlaskConical size={20} />,
        color: "#8B5CF6",
        description: "Science & Innovation",
      },
      {
        name: "CodeNova",
        icon: <Code size={20} />,
        color: "#3B82F6",
        description: "Computer Science & Programming",
      },
    ],
  },
  {
    classLevel: "VII–VIII",
    title: "Vortanox",
    contests: [
      {
        name: "NuminaX",
        icon: <Divide size={20} />,
        color: "#10B981",
        description: "Mathematics & Logical Reasoning",
      },
      {
        name: "VisionVerse",
        icon: <Paintbrush size={20} />,
        color: "#F97316",
        description: "Visual Arts & Design",
      },
    ],
  },
  {
    classLevel: "IX–X",
    title: "Astrapex",
    contests: [
      {
        name: "NovaMind",
        icon: <FlaskConical size={20} />,
        color: "#8B5CF6",
        description: "Science & Innovation",
      },
      {
        name: "Inkspire Chronicles",
        icon: <PenTool size={20} />,
        color: "#EC4899",
        description: "Creative Writing & Storytelling",
      },
    ],
  },
  {
    classLevel: "XI–XII",
    title: "Zenithra",
    contests: [
      {
        name: "NoorQuest",
        icon: <Moon size={20} />,
        color: "#F59E0B",
        description: "Qur'anic Knowledge & Islamic Studies",
      },
      {
        name: "VisionVerse",
        icon: <Paintbrush size={20} />,
        color: "#F97316",
        description: "Visual Arts & Design",
      },
    ],
  },
];

export const ContestPosterSection = () => {
  const t = useTranslations("HomePage.contests");
  const contestT = useTranslations("ContestPage.contests");
  const { locale } = useParams();

  return (
    <section
      className="relative w-full py-16 bg-gradient-to-b from-[#6B21A8]/10 to-[#6B21A8]/30"
      id="contests"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6B21A8] mb-4">
            {t("title")}
            <span className="text-[#D63384]">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B21A8]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative p-6 z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#6B21A8]/10 text-[#6B21A8] rounded-full text-sm font-medium hover:bg-[#6B21A8]/20 transition-all duration-300 hover:scale-105">
                    Class {contest.classLevel}
                  </span>
                  <h3 className="text-2xl font-bold text-[#6B21A8] transition-transform duration-300 group-hover:scale-105">
                    {contest.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {contest.contests.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#6B21A8]/5 transition-all duration-300"
                    >
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:rotate-6 flex-shrink-0"
                        style={{
                          backgroundColor: `${item.color}20`,
                          border: `2px solid ${item.color}`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#6B21A8] mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.description}
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
              variant="primary"
              size="lg"
              className="bg-[#6B21A8] hover:bg-[#7E3BA8] px-8 py-4 text-lg transition-all duration-300"
            >
              {t("viewAllContests")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
