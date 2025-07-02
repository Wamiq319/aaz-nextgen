"use client";

import { useState } from "react";
import {
  Moon,
  Code,
  Divide,
  PenTool,
  FlaskConical,
  Paintbrush,
  Download,
  LockKeyhole,
} from "lucide-react";
import { useTranslations } from "next-intl";

// 1. Contests Info (fixed)
const contests = [
  { name: "NoorQuest", icon: <Moon size={20} />, color: "#F59E0B" },
  { name: "CodeNova", icon: <Code size={20} />, color: "#3B82F6" },
  { name: "NuminaX", icon: <Divide size={20} />, color: "#10B981" },
  { name: "InkspireChronicles", icon: <PenTool size={20} />, color: "#EC4899" },
  { name: "NovaMind", icon: <FlaskConical size={20} />, color: "#8B5CF6" },
  { name: "VisionVerse", icon: <Paintbrush size={20} />, color: "#F97316" },
];

// 2. Levels (fixed)
const levels = [
  { level: "Sprout", gradeRange: "Grades I–II" },
  { level: "Flare", gradeRange: "Grades III–IV" },
  { level: "Glow", gradeRange: "Grades V–VI" },
  { level: "Pulse", gradeRange: "Grades VII–VIII" },
  { level: "Climb", gradeRange: "Grades IX–X" },
  { level: "Summit", gradeRange: "Grades XI–XII" },
];

// 3. Syllabus Data [levelIndex][contestIndex] — only raw dynamic content
const syllabusData = [
  // Sprout (Grades I–II)
  [
    {
      syllabus: "Learn short surahs and core Islamic values.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Intro to coding through puzzles & logic blocks.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Simple math with games and visual learning.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Story basics: characters, settings, sequences.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Everyday science: senses, animals, nature.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Creative drawing, coloring and art concepts.",
      sample: "#",
      answer: "#",
    },
  ],
  // Flare (Grades III–IV)
  [
    {
      syllabus: "Basic tajweed, manners, and surah summaries.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Code flow, debugging and pattern matching.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Addition, subtraction, puzzles & logic math.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Creative writing, story arcs & vocabulary.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Earth, environment, and life cycle basics.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Poster making, color blending and shapes.",
      sample: "#",
      answer: "#",
    },
  ],
  // Glow (Grades V–VI)
  [
    {
      syllabus: "Quran reflection, tafseer and character building.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Loops, logic and beginner Python syntax.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Fractions, word problems, and graphs.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Dialogue, theme, conflict, and climax writing.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "States of matter, experiments & classification.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Digital drawing and creative thinking skills.",
      sample: "#",
      answer: "#",
    },
  ],
  // Pulse (Grades VII–VIII)
  [
    {
      syllabus: "Surah analysis, hadith studies, and moral stories.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Functions, flowcharts, and beginner JavaScript.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Decimals, ratios, algebraic basics, and logic.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Essay writing, arguments, and creative formats.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Scientific method, hypotheses, and lab skills.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Design thinking and poster/brand layout.",
      sample: "#",
      answer: "#",
    },
  ],
  // Climb (Grades IX–X)
  [
    {
      syllabus: "Advanced tafsir, ethics, and Quranic themes.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Data structures, algorithm basics, Python & JS.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Linear equations, geometry, trigonometry intro.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Formal writing, persuasive pieces, poetry.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Chemistry, physics, and controlled experiments.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Branding, vector design, and graphic principles.",
      sample: "#",
      answer: "#",
    },
  ],
  // Summit (Grades XI–XII)
  [
    {
      syllabus: "Quranic logic, dawah topics, and applied studies.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "App dev logic, OOP, APIs using JavaScript.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Calculus intro, probability, statistics, matrices.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Research papers, articles, blogs, and critiques.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Lab design, documentation, and scientific theory.",
      sample: "#",
      answer: "#",
    },
    {
      syllabus: "Professional digital portfolios & UI principles.",
      sample: "#",
      answer: "#",
    },
  ],
];

// Component
export const SyllabusSection = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const t = useTranslations("SyllabusSection");
  const contestT = useTranslations("ContestPage.contests");

  return (
    <section className="py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#6B21A8] mb-4">
            📘 {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Levels Row */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {levels.map((lvl, idx) => (
            <button
              key={lvl.level}
              onClick={() => setLevelIndex(idx)}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center font-semibold text-sm shadow border-2 transition-all ${
                levelIndex === idx
                  ? "bg-[#6B21A8] text-white border-[#6B21A8]"
                  : "bg-white text-[#6B21A8] border-[#6B21A8]/30 hover:bg-[#6B21A8]/10"
              }`}
            >
              {t(`levels.${lvl.level}.name`)}
              <span className="text-[11px] font-normal text-gray-500 mt-1">
                {t(`levels.${lvl.level}.gradeRange`)}
              </span>
            </button>
          ))}
        </div>

        {/* Contest Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest, idx) => {
            const data = syllabusData[levelIndex]?.[idx];
            if (!data) return null;

            return (
              <div
                key={contest.name}
                className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: contest.color }}
                  >
                    {contest.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-[#6B21A8]">
                    {contestT(`${contest.name}.name`)}
                  </h4>
                </div>
                <p className="text-sm text-gray-700 mb-4">{data.syllabus}</p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={data.sample}
                    download
                    className="inline-flex items-center gap-2 bg-[#6B21A8] text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-[#5a189a] transition"
                  >
                    <Download className="w-4 h-4" />
                    {t("samplePaper")}
                  </a>
                  <a
                    href={data.answer}
                    download
                    className="inline-flex items-center gap-2 bg-[#6B21A8] text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-[#5a189a] transition"
                  >
                    <LockKeyhole className="w-4 h-4" />
                    {t("answerKey")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
