"use client";

import { Award, FileText, BookOpen } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

export const KeyServices = () => {
  const t = useTranslations("HomePage.KeyServices");

  const services = [
    {
      id: 1,
      icon: <Award className="h-10 w-10 text-[#6B21A8] mx-auto mb-4" />, // Updated to deep purple
      title: t("results.title"),
      description: t("results.description"),
      button: {
        text: t("results.buttonText"),
        variant: "outline" as const,
        link: "/results",
      },
    },
    {
      id: 2,
      icon: <FileText className="h-10 w-10 text-[#6B21A8] mx-auto mb-4" />, // Updated to deep purple
      title: t("downloads.title"),
      description: t("downloads.description"),
      button: {
        text: t("downloads.buttonText"),
        variant: "outline" as const,
        link: "/downloads",
      },
    },
    {
      id: 3,
      icon: <BookOpen className="h-10 w-10 text-[#6B21A8] mx-auto mb-4" />, // Updated to deep purple
      title: t("studyMaterials.title"),
      description: t("studyMaterials.description"),
      button: {
        text: t("studyMaterials.buttonText"),
        variant: "outline" as const,
        link: "/study-materials",
      },
    },
  ];

  return (
    <section className="py-16 bg-[#F9FAFB]">
      {" "}
      {/* Updated to light pink background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#6B21A8] text-center mb-12">
          {" "}
          {/* Updated to deep purple */}
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-[#F472B6] text-center hover:shadow-md transition-shadow" // Updated border to medium pink
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-[#6B21A8] mb-2">
                {" "}
                {/* Updated to deep purple */}
                {service.title}
              </h3>
              <p className="text-[#6B7280] mb-6">{service.description}</p>
              <Button
                variant={service.button.variant}
                size="sm"
                className="border-[#6B21A8] text-[#6B21A8] hover:bg-[#FCE7F3]" // Updated to match color scheme
                onClick={() => (window.location.href = service.button.link)}
              >
                {service.button.text}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
