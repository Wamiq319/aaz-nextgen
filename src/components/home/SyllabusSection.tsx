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
import {
  noorQuestFiles,
  codeNovaFiles,
  numinaXFiles,
  inkspireChroniclesFiles,
  novaMindFiles,
  visionVerseFiles,
} from "@/public/assets/index.mjs";

// 1. Contests Info (fixed)
const contests = [
  {
    name: "NoorQuest",
    icon: <Moon size={20} />,
    color: "#F59E0B",
    folder: "noorquest",
  },
  {
    name: "CodeNova",
    icon: <Code size={20} />,
    color: "#3B82F6",
    folder: "codenova",
  },
  {
    name: "NuminaX",
    icon: <Divide size={20} />,
    color: "#10B981",
    folder: "numinax",
  },
  {
    name: "InkspireChronicles",
    icon: <PenTool size={20} />,
    color: "#EC4899",
    folder: "inkspirechronicles",
  },
  {
    name: "NovaMind",
    icon: <FlaskConical size={20} />,
    color: "#8B5CF6",
    folder: "novamind",
  },
  {
    name: "VisionVerse",
    icon: <Paintbrush size={20} />,
    color: "#F97316",
    folder: "visionverse",
  },
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

// Helper function to get file paths dynamically
const getFilePaths = (contestName: string, levelName: string) => {
  const levelKey = levelName.toLowerCase();

  switch (contestName) {
    case "NoorQuest":
      return (
        noorQuestFiles[levelKey as keyof typeof noorQuestFiles] || {
          sample: "#",
          answer: "#",
        }
      );
    case "CodeNova":
      return (
        codeNovaFiles[levelKey as keyof typeof codeNovaFiles] || {
          sample: "#",
          answer: "#",
        }
      );
    case "NuminaX":
      return (
        numinaXFiles[levelKey as keyof typeof numinaXFiles] || {
          sample: "#",
          answer: "#",
        }
      );
    case "InkspireChronicles":
      return (
        inkspireChroniclesFiles[
          levelKey as keyof typeof inkspireChroniclesFiles
        ] || {
          sample: "#",
          answer: "#",
        }
      );
    case "NovaMind":
      return (
        novaMindFiles[levelKey as keyof typeof novaMindFiles] || {
          sample: "#",
          answer: "#",
        }
      );
    case "VisionVerse":
      return (
        visionVerseFiles[levelKey as keyof typeof visionVerseFiles] || {
          sample: "#",
          answer: "#",
        }
      );
    default:
      return { sample: "#", answer: "#" };
  }
};

// 3. Syllabus Data [levelIndex][contestIndex] — only syllabus content
const syllabusData = [
  // Sprout (Grades I–II)
  [
    "Learn short surahs and core Islamic values.",
    "Intro to coding through puzzles & logic blocks.",
    "Simple math with games and visual learning.",
    "Story basics: characters, settings, sequences.",
    "Everyday science: senses, animals, nature.",
    "Creative drawing, coloring and art concepts.",
  ],
  // Flare (Grades III–IV)
  [
    "Basic tajweed, manners, and surah summaries.",
    "Code flow, debugging and pattern matching.",
    "Addition, subtraction, puzzles & logic math.",
    "Creative writing, story arcs & vocabulary.",
    "Earth, environment, and life cycle basics.",
    "Poster making, color blending and shapes.",
  ],
  // Glow (Grades V–VI)
  [
    "Quran reflection, tafseer and character building.",
    "Loops, logic and beginner Python syntax.",
    "Fractions, word problems, and graphs.",
    "Dialogue, theme, conflict, and climax writing.",
    "States of matter, experiments & classification.",
    "Digital drawing and creative thinking skills.",
  ],
  // Pulse (Grades VII–VIII)
  [
    "Surah analysis, hadith studies, and moral stories.",
    "Functions, flowcharts, and beginner JavaScript.",
    "Decimals, ratios, algebraic basics, and logic.",
    "Essay writing, arguments, and creative formats.",
    "Scientific method, hypotheses, and lab skills.",
    "Design thinking and poster/brand layout.",
  ],
  // Climb (Grades IX–X)
  [
    "Advanced tafsir, ethics, and Quranic themes.",
    "Data structures, algorithm basics, Python & JS.",
    "Linear equations, geometry, trigonometry intro.",
    "Formal writing, persuasive pieces, poetry.",
    "Chemistry, physics, and controlled experiments.",
    "Branding, vector design, and graphic principles.",
  ],
  // Summit (Grades XI–XII)
  [
    "Quranic logic, dawah topics, and applied studies.",
    "App dev logic, OOP, APIs using JavaScript.",
    "Calculus intro, probability, statistics, matrices.",
    "Research papers, articles, blogs, and critiques.",
    "Lab design, documentation, and scientific theory.",
    "Professional digital portfolios & UI principles.",
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
            const syllabus = syllabusData[levelIndex]?.[idx];
            if (!syllabus) return null;

            // Get dynamic file paths based on contest and level
            const filePaths = getFilePaths(
              contest.name,
              levels[levelIndex].level
            );

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
                <p className="text-sm text-gray-700 mb-4">{syllabus}</p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href={filePaths.sample}
                    download
                    className="inline-flex items-center gap-2 bg-[#6B21A8] text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-[#5a189a] transition"
                  >
                    <Download className="w-4 h-4" />
                    {t("samplePaper")}
                  </a>
                  <a
                    href={filePaths.answer}
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
