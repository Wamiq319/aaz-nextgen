"use client";

import { ReactNode } from "react";
import { Button } from "./Button";

interface DataItem {
  label?: string;
  value: ReactNode;
  className?: string;
}

interface DataCardProps {
  id?: string;
  title?: string;
  data: DataItem[];
  // Make primary button optional
  primaryButtonText?: string;
  onPrimaryButtonClick?: (id?: string) => void;
  primaryButtonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "red"
    | "dark"
    | "outline-red"
    | "outline-blue";
  primaryButtonSize?: "sm" | "md" | "lg";
  primaryButtonClassName?: string;
  // Add secondary button (optional)
  secondaryButtonText?: string;
  onSecondaryButtonClick?: (id?: string) => void;
  secondaryButtonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "red"
    | "dark"
    | "outline-red"
    | "outline-blue";
  secondaryButtonSize?: "sm" | "md" | "lg";
  secondaryButtonClassName?: string;
  // Other props
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  dataClassName?: string;
}

export const DataCard = ({
  id,
  title,
  data,
  primaryButtonText,
  onPrimaryButtonClick,
  primaryButtonVariant = "primary",
  primaryButtonSize = "md",
  primaryButtonClassName = "",
  secondaryButtonText,
  onSecondaryButtonClick,
  secondaryButtonVariant = "outline",
  secondaryButtonSize = "md",
  secondaryButtonClassName = "",
  className = "",
  cardClassName = "",
  titleClassName = "",
  dataClassName = "",
}: DataCardProps) => {
  const handlePrimaryClick = () => {
    if (onPrimaryButtonClick) onPrimaryButtonClick(id);
  };

  const handleSecondaryClick = () => {
    if (onSecondaryButtonClick) onSecondaryButtonClick(id);
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-md border border-gray-100 ${className} ${cardClassName}`}
    >
      <div className="flex-1 space-y-3">
        {/* Optional Title */}
        {title && (
          <h3
            className={`text-lg font-semibold text-[#6B21A8] ${titleClassName}`}
          >
            {title}
          </h3>
        )}

        {/* Data Items */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-2 ${dataClassName}`}
        >
          {data.map((item, index) => (
            <div key={index} className={`text-sm ${item.className}`}>
              {item.label && (
                <span className="font-medium text-gray-600">
                  {item.label}:{" "}
                </span>
              )}
              <span className="text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {(primaryButtonText || secondaryButtonText) && (
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {secondaryButtonText && (
            <Button
              variant={secondaryButtonVariant}
              size={secondaryButtonSize}
              onClick={handleSecondaryClick}
              className={`w-full md:w-auto ${secondaryButtonClassName}`}
            >
              {secondaryButtonText}
            </Button>
          )}
          {primaryButtonText && (
            <Button
              variant={primaryButtonVariant}
              size={primaryButtonSize}
              onClick={handlePrimaryClick}
              className={`w-full md:w-auto ${primaryButtonClassName}`}
            >
              {primaryButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
