"use client";

import { useTranslations } from "next-intl";
import { Rocket, Globe } from "lucide-react";

export const QuickIntroSection = () => {
  const t = useTranslations("HomePage.QuickIntro");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Block */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#6B21A8] mb-6">
            {t("title")}
          </h2>
          <p className="text-xl text-[#4B5563] leading-relaxed max-w-3xl mx-auto">
            {t("intro")}
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-[#F9FAFB] p-8 rounded-xl border border-[#F472B6]/30 hover:border-[#6B21A8]/50 transition-all">
            <div className="flex gap-5 items-start">
              <div className="p-3 bg-[#6B21A8] rounded-lg text-white flex-shrink-0">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#6B21A8] mb-3">
                  {t("missionTitle")}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">{t("mission")}</p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-[#F9FAFB] p-8 rounded-xl border border-[#F472B6]/30 hover:border-[#6B21A8]/50 transition-all">
            <div className="flex gap-5 items-start">
              <div className="p-3 bg-[#D63384] rounded-lg text-white flex-shrink-0">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-[#6B21A8] mb-3">
                  {t("visionTitle")}
                </h3>
                <p className="text-[#4B5563] leading-relaxed">{t("vision")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
