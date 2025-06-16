"use client";

import { useTranslations } from "next-intl";
import { LevelSection } from "@/components/home/LevelSection";

export default function LevelPage() {
  const t = useTranslations("LevelPage");

  return (
    <section className="container mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#6B21A8] mb-4">{t("title")}</h1>
        <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <LevelSection
        showHeader={false}
        showExploreButton={false}
        translationNamespace="LevelPage"
      />
    </section>
  );
}
