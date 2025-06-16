"use client";

import { Trophy, Users, Target, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getDirection } from "@/lib/direction";

export const KeyServices = () => {
  const t = useTranslations("HomePage.KeyServices");
  const router = useRouter();
  const { locale } = useParams();
  const { direction, isRTL } = getDirection(locale as string);

  const services = [
    {
      id: 1,
      icon: (
        <Trophy className="h-12 w-12 text-[#6B21A8] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: t("results.title"),
      description: t("results.description"),
      button: {
        text: t("results.buttonText"),
        variant: "outline" as const,
        link: `/${locale}/result`,
      },
      gradient: "from-[#6B21A8]/20 to-[#D63384]/20",
    },
    {
      id: 2,
      icon: (
        <Users className="h-12 w-12 text-[#6B21A8] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: t("downloads.title"),
      description: t("downloads.description"),
      button: {
        text: t("downloads.buttonText"),
        variant: "outline" as const,
        link: `/${locale}/download`,
      },
      gradient: "from-[#D63384]/20 to-[#6B21A8]/20",
    },
    {
      id: 3,
      icon: (
        <Target className="h-12 w-12 text-[#6B21A8] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
      ),
      title: t("studyMaterials.title"),
      description: t("studyMaterials.description"),
      button: {
        text: t("studyMaterials.buttonText"),
        variant: "outline" as const,
        link: `/${locale}/level`,
      },
      gradient: "from-[#6B21A8]/20 to-[#D63384]/20",
    },
  ];

  return (
    <section
      className="py-16 bg-gradient-to-b from-white to-[#F9FAFB]"
      dir={direction}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6B21A8] mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white p-8 rounded-xl shadow-lg border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fadeIn"
              style={{ animationDelay: `${service.id * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}
              ></div>

              <div className="relative z-10">
                {service.icon}
                <h3 className="text-2xl font-bold text-[#6B21A8] mb-4 group-hover:scale-105 transition-transform duration-300">
                  {service.title}
                </h3>
                <p className="text-[#4B5563] mb-6 group-hover:text-[#6B21A8] transition-colors duration-300">
                  {service.description}
                </p>
                <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
                  <Button
                    variant={service.button.variant}
                    size="lg"
                    className="border-[#6B21A8] text-[#6B21A8] hover:bg-[#6B21A8]/10 transition-all duration-300 w-full"
                    onClick={() => router.push(service.button.link)}
                  >
                    {service.button.text}
                    {isRTL ? (
                      <ArrowLeft
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    ) : (
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
