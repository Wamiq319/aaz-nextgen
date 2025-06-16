"use client";

import { useTranslations } from "next-intl";
import { LevelCard } from "../ui/LevelCard";
import { useParams } from "next/navigation";
import { Button } from "../ui/Button";
import {
  Star,
  Sun,
  Zap,
  Rocket,
  Trophy,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { LightbulbIcon } from "lucide-react";
import { getDirection } from "@/lib/direction";

type LevelKey =
  | "NovaNest"
  | "Ignitia"
  | "LuminaCore"
  | "VortexEdge"
  | "AstraPrime"
  | "Zenithra";

const levelIcons = {
  NovaNest: <Star size={24} className="animate-bounce" />,
  Ignitia: <LightbulbIcon size={24} className="animate-bounce" />,
  LuminaCore: <Sun size={24} className="animate-bounce" />,
  VortexEdge: <Zap size={24} className="animate-bounce" />,
  AstraPrime: <Rocket size={24} className="animate-bounce" />,
  Zenithra: <Trophy size={24} className="animate-bounce" />,
} as const;

const levelColors = {
  NovaNest: "#F59E0B",
  Ignitia: "#FCD34D",
  LuminaCore: "#10B981",
  VortexEdge: "#8B5CF6",
  AstraPrime: "#EC4899",
  Zenithra: "#F97316",
} as const;

interface LevelSectionProps {
  showHeader?: boolean;
  showExploreButton?: boolean;
  translationNamespace?: string;
}

export const LevelSection = ({
  showHeader = true,
  showExploreButton = true,
  translationNamespace = "HomePage.levels",
}: LevelSectionProps) => {
  const t = useTranslations(translationNamespace);
  const tLevel = useTranslations("LevelPage");
  const { locale } = useParams();
  const { direction, isRTL } = getDirection(locale as string);

  const levels = (Object.keys(levelIcons) as LevelKey[]).map((levelKey) => ({
    name: tLevel(`levels.${levelKey}.name`),
    classRange: tLevel(`levels.${levelKey}.classRange`),
    description: tLevel(`levels.${levelKey}.description`),
    subDescription: tLevel(`levels.${levelKey}.subDescription`),
    icon: levelIcons[levelKey],
    color: levelColors[levelKey],
  }));

  return (
    <section
      className="w-full py-16 bg-gradient-to-b from-white to-[#6B21A8]/5"
      id="levels"
      dir={direction}
    >
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#6B21A8] mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => (
            <LevelCard
              key={index}
              name={level.name}
              classRange={level.classRange}
              description={level.description}
              subDescription={level.subDescription}
              icon={level.icon}
              color={level.color}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        {showExploreButton && (
          <div className="text-center mt-12">
            <Button
              variant="primary"
              size="lg"
              className="bg-[#6B21A8] hover:bg-[#6B21A8]/90 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => {
                window.location.href = `/${locale}/level`;
              }}
            >
              {t("explore")}
              {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
