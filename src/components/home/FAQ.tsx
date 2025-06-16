// components/FAQSection.tsx
"use client";

import { ArrowRight, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "../ui/Button";

export const FAQSection = () => {
  const t = useTranslations("HomePage.FAQ");
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: t("questions.1"), answer: t("answers.1") },
    { question: t("questions.2"), answer: t("answers.2") },
    { question: t("questions.3"), answer: t("answers.3") },
    { question: t("questions.4"), answer: t("answers.4") },
    { question: t("questions.5"), answer: t("answers.5") },
    { question: t("questions.6"), answer: t("answers.6") },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937]">{t("title")}</h2>
          <p className="text-lg text-[#6B7280] mt-2 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 ${
                openIndex === index
                  ? "bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm"
                  : "hover:bg-[#F9FAFB]"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start gap-4 text-left"
              >
                <h3 className="text-lg font-medium text-[#1F2937] flex-1">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "mt-4 h-auto" : "h-0"
                }`}
              >
                <p className="text-[#6B7280] pr-6">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="red"
            size="lg"
            onClick={() => (window.location.href = "/contact")}
            className="mx-auto"
          >
            {t("ctaText")}
            {locale === "ur" ? <ArrowLeft /> : <ArrowRight />}
          </Button>
        </div>
      </div>
    </section>
  );
};
