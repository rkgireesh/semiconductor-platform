import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "sky" | "teal" | "amber" | "slate" | "outline" | "blue" | "purple";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export default function Badge({
  children,
  variant = "cyan",
  size = "md",
  className = "",
  dot = false,
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-mono",
    md: "text-xs px-2.5 py-1 font-mono",
  };

  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    sky: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
    teal: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    slate: "bg-slate-800 text-slate-300 border border-slate-700",
    outline: "bg-transparent text-slate-400 border border-slate-700/60",
    blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  };

  const dotColor = {
    cyan: "bg-cyan-400",
    sky: "bg-sky-400",
    teal: "bg-teal-400",
    amber: "bg-amber-400",
    slate: "bg-slate-400",
    outline: "bg-slate-400",
    blue: "bg-blue-400",
    purple: "bg-purple-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium tracking-wide ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotColor[variant]}`}
        />
      )}
      {children}
    </span>
  );
}
