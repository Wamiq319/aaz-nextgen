"use client";

import { ReactNode } from "react";
import { Button } from "./Button";

interface DataItem {
  label?: string;
  value: ReactNode;
  className?: string;
}

interface DataCardProps {
  id?: string; // Unique identifier for the card
  title?: string;
  data: DataItem[];
  buttonText: string;
  onButtonClick: (id?: string) => void;
  buttonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "red"
    | "dark"
    | "outline-red"
    | "outline-blue";
  buttonSize?: "sm" | "md" | "lg";
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  dataClassName?: string;
  buttonClassName?: string;
}

export const DataCard = ({
  id,
  title,
  data,
  buttonText,
  onButtonClick,
  buttonVariant = "primary",
  buttonSize = "md",
  className = "",
  cardClassName = "",
  titleClassName = "",
  dataClassName = "",
  buttonClassName = "",
}: DataCardProps) => {
  const handleClick = () => {
    onButtonClick(id); // Pass the id when clicked
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

      {/* Action Button */}
      <div className={`w-full md:w-auto ${buttonClassName}`}>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          onClick={handleClick} // Use the handler that passes the id
          className="w-full md:w-auto"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
