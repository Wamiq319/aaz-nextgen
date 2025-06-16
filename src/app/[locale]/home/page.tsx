"use client";

/**
 * -----------------------------------------------------------------------------
 * © 2025 Wamiq. All rights reserved.
 *
 * This file is part of a proprietary web application developed by Wamiq.
 * Redistribution, modification, or reuse of any portion of the code or design
 * is strictly prohibited without explicit written permission.
 *
 * Usage rights are exclusively licensed to AAZ Nextgen Testing Service for
 * internal and official purposes only. No part of this application may be
 * resold, sublicensed, or distributed to third parties.
 * -----------------------------------------------------------------------------
 */

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
