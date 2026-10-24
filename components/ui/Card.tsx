import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hoverEffect = true,
  glow = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group ${
        hoverEffect ? "glass-panel-hover" : ""
      } ${glow ? "glow-cyan" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Subtle technical corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan-500/20 rounded-tr-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:border-cyan-400/40 transition-all duration-300" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500/20 rounded-bl-2xl pointer-events-none opacity-40 group-hover:opacity-100 group-hover:border-cyan-400/40 transition-all duration-300" />
      
      {children}
    </div>
  );
}
