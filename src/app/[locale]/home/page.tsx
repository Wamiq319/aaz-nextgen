"use client";

import { HeroSection } from "@/components/home/Hero";
import { KeyServices } from "@/components/home/KeyServices";
import { FAQSection } from "@/components/home/FAQ";
import { TestimonialsSection } from "@/components/home/Testimonial";
import { QuickIntroSection } from "@/components/home/Intro";
import { ContestPosterSection } from "@/components/home/PosterSection";
import { LevelSection } from "@/components/home/LevelSection";
import { NoorQuestPopup } from "@/components/ui/NoorQuestPopup";
import { SyllabusSection } from "@/components/home/SyllabusSection";
import { useState } from "react";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <main>
      {/* Conditionally render the popup */}
      {showPopup && <NoorQuestPopup onClose={() => setShowPopup(false)} />}

      <HeroSection />
      <QuickIntroSection />
      <ContestPosterSection />
      <LevelSection />
      <SyllabusSection />
      <KeyServices />
      <TestimonialsSection />
      <FAQSection />
    </main>
  );
}
