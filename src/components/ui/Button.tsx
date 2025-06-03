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
  onClick = () => alert(`Button clicked: ${children?.toString()}`),
  type = "button",
  disabled = false,
  rounded = false,
  size = "md",
  icon,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

  const variants = {
    primary: "bg-[#1A365D] hover:bg-[#122A47] text-white",
    secondary: "bg-[#E0F2FE] hover:bg-[#BFDBFE] text-[#1A365D]",
    outline: "border border-gray-300 text-[#1A365D] hover:bg-[#F8FAFC]",
    red: "bg-[#FF3B30] hover:bg-[#E5352B] text-white",
    dark: "bg-[#1F2937] hover:bg-[#111827] text-white",
    "outline-red": "border border-[#EF4444] text-[#EF4444] hover:bg-red-50",
    "outline-blue": "border border-[#1A365D] text-[#1A365D] hover:bg-blue-50",
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
