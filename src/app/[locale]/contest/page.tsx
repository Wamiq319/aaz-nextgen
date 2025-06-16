// ContestPage.tsx
"use client";

import { useTranslations } from "next-intl";
import { ContestCard } from "@/components/ui/ContestCard";
import {
  Moon,
  Code,
  Divide,
  PenTool,
  FlaskConical,
  Paintbrush,
} from "lucide-react";

const contestDetails = [
  {
    name: "NoorQuest",
    icon: <Moon size={24} />,
    color: "#F59E0B",
  },
  {
    name: "CodeNova",
    icon: <Code size={24} />,
    color: "#3B82F6",
  },
  {
    name: "NuminaX",
    icon: <Divide size={24} />,
    color: "#10B981",
  },
  {
    name: "InkspireChronicles",
    icon: <PenTool size={24} />,
    color: "#EC4899",
  },
  {
    name: "NovaMind",
    icon: <FlaskConical size={24} />,
    color: "#8B5CF6",
  },
  {
    name: "VisionVerse",
    icon: <Paintbrush size={24} />,
    color: "#F97316",
  },
];

export default function ContestPage() {
  const t = useTranslations("ContestPage");

  return (
    <section className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center text-[#6B21A8] mb-6">
        {t("title")}
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contestDetails.map((contest, index) => (
          <ContestCard
            key={index}
            title={contest.name}
            description={t(`contests.${contest.name}.shortDesc`)}
            icon={contest.icon}
            color={contest.color}
            levels={t(`contests.${contest.name}.levels`)}
            format={t(`contests.${contest.name}.format`)}
            awards={t(`contests.${contest.name}.awards`)}
            status={t(`contests.${contest.name}.status`)}
            buttonText={t("registerNow")}
            variant="full"
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </section>
  );
}
