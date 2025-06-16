"use client";

import { HeroSection } from "@/components/home/Hero";
import { KeyServices } from "@/components/home/KeyServices";
import { FAQSection } from "@/components/home/FAQ";

import { TestimonialsSection } from "@/components/home/Testimonial";
import { QuickIntroSection } from "@/components/home/Intro";

import { ContestPosterSection } from "@/components/home/PosterSection";
import { LevelSection } from "@/components/home/LevelSection";
export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <QuickIntroSection />
      <ContestPosterSection />
      <LevelSection />
      <KeyServices />

      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
