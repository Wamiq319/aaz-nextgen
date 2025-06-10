"use client";

import { ReactNode, ChangeEvent } from "react";

interface FileInputProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  onChange: (files: FileList | null) => void;
  className?: string;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const FileInput = ({
  label,
  accept = "image/*,.pdf",
  multiple = false,
  onChange,
  className = "",
  variant = "primary",
  fullWidth = false,
  icon,
}: FileInputProps) => {
  const baseClasses =
    "transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold";

  const variants = {
    primary:
      "file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 border border-gray-300 rounded-lg",
    secondary:
      "file:bg-purple-600 file:text-white hover:file:bg-purple-700 border border-purple-200 rounded-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files);
  };

  return (
    <div className={`flex flex-col gap-1 ${widthClass}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600">
            {icon}
          </span>
        )}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className={`${baseClasses} ${variants[variant]} ${widthClass} ${
            icon ? "pl-10" : ""
          } ${className}`}
        />
      </div>
    </div>
  );
};
