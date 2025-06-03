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
    <section className="py-20 bg-[#1F2937]">
      {" "}
      {/* Dark blue background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-[#D1D5DB] max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#EF4444]/10 backdrop-blur-lg rounded-xl p-8 border border-[#EF4444]/20 shadow-lg hover:shadow-xl transition-all"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(31, 41, 55, 0.4) 100%)",
              }}
            >
              <div className="mb-6 text-[#EF4444]">
                <Quote className="h-8 w-8 opacity-80" />
              </div>

              <p className="text-lg text-white mb-6 italic">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating
                        ? "text-[#EF4444] fill-[#EF4444]/40" // Red stars with low opacity fill
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>

              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-[#9CA3AF]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
