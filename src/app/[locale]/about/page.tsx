"use client";

import {
  Rocket,
  Globe,
  Sparkles,
  Target,
  UserCog,
  Award,
  BookOpen,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { QuickIntroSection } from "@/components/home/Intro";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#FCE7F3] to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B21A8] mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-xl text-[#4B5563] max-w-3xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#6B21A8] mb-6">
                {t("whoWeAreTitle")}
              </h2>
              <div className="space-y-4 text-[#4B5563]">
                {t.rich("whoWeAreContent", {
                  p: (chunks) => <p className="text-lg">{chunks}</p>,
                  strong: (chunks) => (
                    <strong className="text-[#6B21A8]">{chunks}</strong>
                  ),
                })}
              </div>
            </div>
            <div className="bg-[#FCE7F3] p-8 rounded-xl border border-[#F472B6]/30">
              <BookOpen className="h-12 w-12 text-[#D63384] mb-6" />
              <h3 className="text-2xl font-semibold text-[#6B21A8] mb-4">
                {t("taglineTitle")}
              </h3>
              <p className="text-lg text-[#4B5563] italic">"{t("tagline")}"</p>
            </div>
          </div>
        </div>
      </section>
      <QuickIntroSection />

      {/* What Makes Us Unique */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B21A8] mb-12 text-center">
            {t("uniqueTitle")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Innovation */}
            <div className="bg-[#FCE7F3] p-6 rounded-xl text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-[#D63384]" />
              </div>
              <h3 className="text-xl font-semibold text-[#6B21A8] mb-2">
                {t("unique.innovation.title")}
              </h3>
              <p className="text-[#4B5563]">
                {t("unique.innovation.description")}
              </p>
            </div>

            {/* Personalized */}
            <div className="bg-[#FCE7F3] p-6 rounded-xl text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserCog className="h-8 w-8 text-[#D63384]" />
              </div>
              <h3 className="text-xl font-semibold text-[#6B21A8] mb-2">
                {t("unique.personalized.title")}
              </h3>
              <p className="text-[#4B5563]">
                {t("unique.personalized.description")}
              </p>
            </div>

            {/* Challenge */}
            <div className="bg-[#FCE7F3] p-6 rounded-xl text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#D63384]" />
              </div>
              <h3 className="text-xl font-semibold text-[#6B21A8] mb-2">
                {t("unique.challenge.title")}
              </h3>
              <p className="text-[#4B5563]">
                {t("unique.challenge.description")}
              </p>
            </div>

            {/* Confidence */}
            <div className="bg-[#FCE7F3] p-6 rounded-xl text-center">
              <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#D63384]" />
              </div>
              <h3 className="text-xl font-semibold text-[#6B21A8] mb-2">
                {t("unique.confidence.title")}
              </h3>
              <p className="text-[#4B5563]">
                {t("unique.confidence.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#6B21A8] mb-12 text-center">
            {t("goals.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FCE7F3] p-6 rounded-xl">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Rocket className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.revolutionize")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Award className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.empower")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.foster")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Globe className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.bridge")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.create")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#FCE7F3] p-6 rounded-xl">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <BookOpen className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.promote")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.deliver")}
                  </span>
                </li>
                <li className="flex items-start">
                  <UserCog className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.cultivate")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Target className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.personalize")}
                  </span>
                </li>
                <li className="flex items-start">
                  <Rocket className="h-6 w-6 text-[#D63384] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-[#4B5563]">
                    {t("goals.list.transform")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
