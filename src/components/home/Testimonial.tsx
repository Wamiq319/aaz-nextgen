"use client";

import { Star, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

export const TestimonialsSection = () => {
  const t = useTranslations("HomePage.Testimonials");

  const testimonials = [
    {
      id: 1,
      quote: t("testimonials.1.quote"),
      name: t("testimonials.1.name"),
      role: t("testimonials.1.role"),
      rating: 5,
    },
    {
      id: 2,
      quote: t("testimonials.2.quote"),
      name: t("testimonials.2.name"),
      role: t("testimonials.2.role"),
      rating: 5,
    },
    {
      id: 3,
      quote: t("testimonials.3.quote"),
      name: t("testimonials.3.name"),
      role: t("testimonials.3.role"),
      rating: 4,
    },
  ];

  return (
    <section className="py-20 bg-[#FCE7F3]">
      {" "}
      {/* Light pink background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6B21A8] mb-4">
            {" "}
            {/* Deep purple */}
            {t("title")}
          </h2>
          <p className="text-lg text-[#6B21A8]/80 max-w-2xl mx-auto">
            {" "}
            {/* Semi-transparent purple */}
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 border border-[#F472B6]/30 shadow-sm hover:shadow-md transition-all"
            >
              <div className="mb-6 text-[#D63384]">
                {" "}
                {/* Dark pink */}
                <Quote className="h-8 w-8" />
              </div>

              <p className="text-lg text-[#4B5563] mb-6 italic">
                {" "}
                {/* Gray text */}"{testimonial.quote}"
              </p>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-[#D63384] fill-[#D63384]/30" /* Dark pink with light fill */
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div>
                <p className="font-semibold text-[#6B21A8]">
                  {testimonial.name}
                </p>{" "}
                {/* Deep purple */}
                <p className="text-sm text-[#6B7280]">
                  {testimonial.role}
                </p>{" "}
                {/* Light gray */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
