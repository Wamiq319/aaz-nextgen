// components/ui/StatCard.tsx
"use client";

import { ReactNode } from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  className?: string;
}

export const StatCard = ({
  value,
  label,
  icon,
  variant = "primary",
  className = "",
}: StatCardProps) => {
  const variants = {
    primary: "bg-blue-50 text-blue-800",
    secondary: "bg-purple-50 text-purple-800",
    accent: "bg-red-50 text-red-800",
    neutral: "bg-gray-50 text-gray-800",
  };

  const iconColors = {
    primary: "text-blue-600",
    secondary: "text-purple-600",
    accent: "text-red-600",
    neutral: "text-gray-600",
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md ${variants[variant]} ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`p-2 rounded-lg ${iconColors[variant]} bg-white shadow-sm`}
          >
            {icon}
          </div>
        )}
        <div>
          <p className="font-bold text-xl md:text-2xl">{value}</p>
          <p className="text-sm md:text-base opacity-80">{label}</p>
        </div>
      </div>
    </div>
  );
};
