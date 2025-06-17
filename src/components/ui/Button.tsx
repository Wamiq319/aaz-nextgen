"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "red"
    | "dark"
    | "outline-red"
    | "outline-blue";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  rounded = false,
  size = "md",
  icon,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "mx-2 inline-flex items-center justify-center font-medium transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#6B21A8] to-[#D63384] text-white hover:from-[#D63384] hover:to-[#6B21A8]",
    secondary: "bg-pink-100 hover:bg-pink-200 text-[#6B21A8]",
    outline: "border border-pink-400 text-pink-700 hover:bg-pink-50",
    red: "bg-gradient-to-r from-[#D63384] to-[#EF4444] text-white hover:from-[#EF4444] hover:to-[#D63384]",
    dark: "bg-[#1F2937] hover:bg-[#111827] text-white",
    "outline-red": "border border-[#EF4444] text-[#EF4444] hover:bg-red-50",
    "outline-blue": "border border-[#6B21A8] text-[#6B21A8] hover:bg-purple-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-3",
  };

  const shape = rounded ? "rounded-full" : "rounded-lg";

  const cursorClass = disabled
    ? "cursor-not-allowed opacity-70"
    : "cursor-pointer";

  const classes = [
    baseClasses,
    variants[variant],
    sizes[size],
    shape,
    cursorClass,
    className,
  ].join(" ");

  return (
    <button
      className={classes.trim()}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex">{icon}</span>}
      {children}
    </button>
  );
};
