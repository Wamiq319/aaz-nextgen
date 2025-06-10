"use client";

import { ReactNode, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = ({
  label,
  variant = "primary",
  className = "",
  error,
  icon,
  fullWidth = false,
  ...props
}: InputProps) => {
  const baseClasses = "transition-all duration-200 focus:outline-none";

  const variants = {
    primary:
      "border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg",
    secondary:
      "border border-purple-200 bg-purple-50 focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg",
    outline:
      "border border-purple-400 bg-transparent focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-lg",
  };

  const sizeClasses = "px-4 py-2 text-base";

  const widthClass = fullWidth ? "w-full" : "";

  const inputClasses = [
    baseClasses,
    variants[variant],
    sizeClasses,
    widthClass,
    className,
    error ? "border-red-500" : "",
  ].join(" ");

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
          className={`${inputClasses} ${icon ? "pl-10" : ""}`}
          {...props}
        />
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
