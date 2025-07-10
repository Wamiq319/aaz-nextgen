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
import { useState } from "react";
import { ComingSoonPopup } from "@/components/ui/ComingSoonPopup";
import { contestImages } from "@/public/assets/index.mjs";

export default function ContestPage() {
  const t = useTranslations("ContestPage");
  const [showPopup, setShowPopup] = useState(false);
  const showComingSoon = () => {
    setShowPopup(true);
  };

  const contestDetails = [
    {
      name: "NoorQuest",
      icon: <Moon size={24} />,
      color: "#F59E0B",
      imageUrl: contestImages.noorquest,
    },
    {
      name: "CodeNova",
      icon: <Code size={24} />,
      color: "#3B82F6",
      imageUrl: contestImages.codenova,
    },
    {
      name: "NuminaX",
      icon: <Divide size={24} />,
      color: "#10B981",
      imageUrl: contestImages.numinax,
    },
    {
      name: "InkspireChronicles",
      icon: <PenTool size={24} />,
      color: "#EC4899",
      imageUrl: contestImages.inkspirechronicles,
    },
    {
      name: "NovaMind",
      icon: <FlaskConical size={24} />,
      color: "#8B5CF6",
      imageUrl: contestImages.novamind,
    },
    {
      name: "VisionVerse",
      icon: <Paintbrush size={24} />,
      color: "#F97316",
      imageUrl: contestImages.visionverse,
    },
  ];

  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-[#6B21A8] mb-4">
        {t("title")}
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {contestDetails.map((contest, index) => (
          <ContestCard
            onButtonClick={showComingSoon}
            key={index}
            title={t(`contests.${contest.name}.name`)}
            description={t(`contests.${contest.name}.shortDesc`)}
            icon={contest.icon}
            color={contest.color}
            levels={t(`contests.${contest.name}.levels`)}
            format={t(`contests.${contest.name}.format`)}
            status={t(`contests.${contest.name}.status`)}
            buttonText={t("registerNow")}
            variant="full"
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
            imageUrl={contest.imageUrl}
          />
        ))}
      </div>
      {showPopup && <ComingSoonPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
}
