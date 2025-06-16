"use client";

import { Button } from "./Button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

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
  imageUrl?: string;
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
  imageUrl,
}: ContestCardProps) => {
  const t = useTranslations("ContestPage.labels");
  const locale = useLocale();

  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#6B21A8]/20 hover:border-[#6B21A8]/40 hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02] animate-fadeIn ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#6B21A8]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

      {imageUrl && (
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      )}

      <div className="relative p-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
            style={{
              backgroundColor: `${color}20`,
              border: `2px solid ${color}`,
            }}
          >
            <div className="transition-transform duration-300 group-hover:rotate-12">
              {icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#6B21A8] transition-transform duration-300 group-hover:scale-105">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {variant === "full" && (
          <ul className="text-xs text-gray-700 space-y-1 mb-3">
            {levels && (
              <li>
                <strong>{t("eligibleLevels")}:</strong> {levels}
              </li>
            )}
            {format && (
              <li>
                <strong>{t("format")}:</strong> {format}
              </li>
            )}
            {awards && (
              <li>
                <strong>{t("awards")}:</strong> {awards}
              </li>
            )}
            {status && (
              <li>
                <strong>{t("status")}:</strong> {status}
              </li>
            )}
          </ul>
        )}

        <div className="transition-transform duration-300 hover:scale-105 active:scale-95">
          <Button
            variant="outline"
            size="sm"
            className="border-[#6B21A8] text-[#6B21A8] hover:bg-[#6B21A8]/10 transition-all duration-300 text-sm"
            onClick={onButtonClick}
          >
            {buttonText}
            {locale === "ur" ? (
              <ArrowLeft
                size={14}
                className="ml-2 transition-transform duration-300 group-hover:-translate-x-1"
              />
            ) : (
              <ArrowRight
                size={14}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
