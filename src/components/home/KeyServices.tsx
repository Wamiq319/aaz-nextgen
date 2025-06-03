"use client";

import { Award, FileText, BookOpen } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";

export const KeyServices = () => {
  const t = useTranslations("HomePage.KeyServices");

  const services = [
    {
      id: 1,
      icon: <Award className="h-10 w-10 text-[#EF4444] mx-auto mb-4" />,
      title: t("results.title"),
      description: t("results.description"),
      button: {
        text: t("results.buttonText"),
        variant: "outline-red" as const,
        link: "/results",
      },
    },
    {
      id: 2,
      icon: <FileText className="h-10 w-10 text-[#EF4444] mx-auto mb-4" />,
      title: t("downloads.title"),
      description: t("downloads.description"),
      button: {
        text: t("downloads.buttonText"),
        variant: "outline-red" as const,
        link: "/downloads",
      },
    },
    {
      id: 3,
      icon: <BookOpen className="h-10 w-10 text-[#EF4444] mx-auto mb-4" />,
      title: t("studyMaterials.title"),
      description: t("studyMaterials.description"),
      button: {
        text: t("studyMaterials.buttonText"),
        variant: "outline-red" as const,
        link: "/study-materials",
      },
    },
  ];

  return (
    <section className="py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#1F2937] text-center mb-12">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-8 rounded-xl shadow-sm border border-[#E5E7EB] text-center"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-[#1F2937] mb-2">
                {service.title}
              </h3>
              <p className="text-[#6B7280] mb-6">{service.description}</p>
              <Button
                variant={service.button.variant}
                size="sm"
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
