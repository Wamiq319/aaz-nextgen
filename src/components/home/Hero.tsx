"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { StatCard } from "../ui/StatCard";
import Image from "next/image";
import { getDirection } from "@/lib/direction";
import { useParams, useRouter } from "next/navigation";

import {
  Calendar,
  Award,
  FileText,
  Users,
  MapPin,
  User,
  BookOpen,
  Trophy,
  Download,
} from "lucide-react";

const slides = [
  {
    id: 1,
    key: "intro",
    scrollTo: "contests",
    icon: <BookOpen size={24} />,
    image: "/assets/images/hero/hero-intro1.jpeg",
  },
  {
    id: 2,
    key: "results",
    scrollTo: "result",
    icon: <Trophy size={24} />,
    image: "/assets/images/hero/hero-intro2.jpeg",
  },
  {
    id: 3,
    key: "forms",
    scrollTo: "download",
    icon: <Download size={24} />,
    image: "/assets/images/hero/hero-intro3.jpeg",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const t = useTranslations("HomePage.hero");
  const { locale } = useParams();
  const { direction, isRTL } = getDirection(locale as string);
  const router = useRouter();

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, []);

  const navigateToPage = (path: string) => {
    router.push(`/${locale}/${path}`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white h-[85vh]"
      dir={direction}
    >
      {/* Mobile Background Images with Gradient */}
      <div className="md:hidden absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#6B21A8]/90 via-[#6B21A8]/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: isRTL
            ? `translateX(${current * 100}%)`
            : `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex flex-col md:flex-row items-center justify-between h-full"
          >
            {/* Mobile Content */}
            <div className="md:hidden w-full flex flex-col px-6 pb-14 justify-end items-center relative z-10 min-h-full">
              <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-white leading-tight mb-4">
                  <span className="whitespace-nowrap">
                    {t(`${slide.key}.title`)}
                  </span>{" "}
                  <span className="text-[#ff0084]">
                    {t(`${slide.key}.highlight`)}
                  </span>
                </h1>
                <p className="text-base text-white mb-6">
                  {t(`${slide.key}.description`)}
                </p>
                <p className="text-lg font-semibold text-[#ff0084] mb-6 tracking-wider">
                  {t(`${slide.key}.slogan`)}
                </p>
                <div
                  onClick={() => navigateToPage(slide.scrollTo)}
                  className="w-full max-w-xs mx-auto bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center gap-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                      {slide.icon}
                    </div>
                    <span className="font-semibold text-lg">
                      {t(`${slide.key}.buttonText`)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden md:flex w-full h-full">
              {/* Text Content - Always on left */}
              <div className="w-1/2 px-12 py-10 flex flex-col justify-center items-start bg-white">
                <h1 className="text-5xl font-bold text-[#6B21A8] mb-4 leading-tight">
                  <span className="whitespace-nowrap">
                    {t(`${slide.key}.title`)}
                  </span>{" "}
                  <span className="text-[#D63384]">
                    {t(`${slide.key}.highlight`)}
                  </span>
                </h1>
                <p className="text-lg text-[#4B5563] mb-6">
                  {t(`${slide.key}.description`)}
                </p>
                <p className="text-2xl font-semibold text-[#D63384] mb-6 tracking-wider">
                  {t(`${slide.key}.slogan`)}
                </p>
                <div
                  onClick={() => navigateToPage(slide.scrollTo)}
                  className="bg-[#6B21A8] backdrop-blur-sm border border-[#6B21A8]/30 rounded-xl p-4 cursor-pointer hover:bg-[#7E3BA8] hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                      {slide.icon}
                    </div>
                    <span className="font-semibold text-lg">
                      {t(`${slide.key}.buttonText`)}
                    </span>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                  <StatCard
                    value={t("stats.students")}
                    label={t("stats.studentsLabel")}
                    icon={<User size={18} />}
                    variant="accent"
                  />
                  <StatCard
                    value={t("stats.provinces")}
                    label={t("stats.provincesLabel")}
                    icon={<MapPin size={18} />}
                    variant="secondary"
                  />
                </div>
              </div>

              {/* Image - Always on right */}
              <div className="relative w-1/2 h-[80vh] pr-8 flex items-center justify-center">
                <div className="relative w-[75%] h-[95%] rounded-2xl mt-6 overflow-hidden shadow-lg border-4 border-[#6B21A8]/20">
                  <Image
                    src={slide.image}
                    alt={t(`${slide.key}.title`)}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10 md:bottom-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 cursor-pointer ${
              current === index
                ? "w-8 h-2 rounded-full bg-[#F472B6]"
                : "w-3 h-3 rounded-full bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
