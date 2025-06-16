"use client";

import { ReactNode } from "react";

interface LevelCardProps {
  name: string;
  classRange: string;
  description: string;
  subDescription: string;
  icon: ReactNode;
  color: string;
  className?: string;
  style?: React.CSSProperties;
}

export const LevelCard = ({
  name,
  classRange,
  description,
  subDescription,
  icon,
  color,
  className = "",
  style,
}: LevelCardProps) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B21A8]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6 z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            style={{
              backgroundColor: `${color}20`,
              border: `2px solid ${color}`,
            }}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#6B21A8] transition-transform duration-300 group-hover:scale-105">
              {name}
            </h3>
            <span
              className="inline-block px-3 py-1 text-sm font-medium rounded-full transition-colors duration-300"
              style={{ backgroundColor: `${color}22`, color }}
            >
              Class {classRange}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-2">{description}</p>
        <p className="text-sm text-gray-500 italic mb-4">{subDescription}</p>
      </div>
    </div>
  );
};
