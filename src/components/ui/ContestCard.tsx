"use client";

import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ContestCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  levels?: string;
  format?: string;
  awards?: string;
  status?: string;
  buttonText: string;
  onButtonClick?: () => void;
  variant?: "preview" | "full";
  className?: string;
  style?: React.CSSProperties;
}

export const ContestCard = ({
  title,
  description,
  icon,
  color,
  levels,
  format,
  awards,
  status,
  buttonText,
  onButtonClick,
  variant = "preview",
  className = "",
  style,
}: ContestCardProps) => {
  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] animate-fadeIn ${className}`}
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
            <div className="transition-transform duration-300 group-hover:rotate-12">
              {icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#6B21A8] transition-transform duration-300 group-hover:scale-105">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 mb-4">{description}</p>

        {variant === "full" && (
          <ul className="text-sm text-gray-700 space-y-1 mb-4">
            {levels && (
              <li>
                <strong>Eligible Levels:</strong> {levels}
              </li>
            )}
            {format && (
              <li>
                <strong>Format:</strong> {format}
              </li>
            )}
            {awards && (
              <li>
                <strong>Awards:</strong> {awards}
              </li>
            )}
            {status && (
              <li>
                <strong>Status:</strong> {status}
              </li>
            )}
          </ul>
        )}

        <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
          <Button
            variant="outline"
            size="sm"
            className="border-[#6B21A8] text-[#6B21A8] hover:bg-[#6B21A8]/10 transition-all duration-300"
            onClick={onButtonClick}
          >
            {buttonText}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
