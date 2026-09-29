"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  User,
  Calculator,
  CheckSquare,
  FolderGit2,
  BookOpen,
  LineChart,
  Compass,
  Layers,
  FlaskConical,
  Briefcase,
  Atom,
  GraduationCap
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { name: "Home", href: "/", icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { name: "Roadmap", href: "/roadmap", icon: <Compass className="w-4 h-4 text-sky-400" /> },
    { name: "Courses", href: "/courses", icon: <GraduationCap className="w-4 h-4 text-blue-400" /> },
    { name: "Labs", href: "/labs", icon: <FlaskConical className="w-4 h-4 text-teal-400" /> },
    { name: "Explorer", href: "/explorer", icon: <Layers className="w-4 h-4 text-emerald-400" /> },
    { name: "Careers", href: "/careers", icon: <Briefcase className="w-4 h-4 text-purple-400" /> },
    { name: "Research", href: "/research", icon: <Atom className="w-4 h-4 text-cyan-400" /> },
  ];

  const moreLinks = [
    { name: "Calculators", href: "/calculators", icon: <Calculator className="w-4 h-4 text-sky-400" />, desc: "Silicon physics & formula solvers" },
    { name: "Quizzes", href: "/quizzes", icon: <CheckSquare className="w-4 h-4 text-teal-400" />, desc: "Diagnostic concept testbenches" },
    { name: "Projects", href: "/projects", icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />, desc: "RTL & SPICE tape-out projects" },
    { name: "Glossary", href: "/glossary", icon: <BookOpen className="w-4 h-4 text-purple-400" />, desc: "A-Z semiconductor terms" },
    { name: "Progress", href: "/progress", icon: <LineChart className="w-4 h-4 text-blue-400" />, desc: "Mastery analytics & telemetry" },
  ];

  const isMoreActive = moreLinks.some((l) => pathname.startsWith(l.href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B14]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/30"
          : "bg-[#070B14]/70 backdrop-blur-md border-b border-slate-800/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-slate-800 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all">
              <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-100 text-base md:text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
                Semiconductor <span className="text-cyan-400">Platform</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
                From Atoms to Advanced Chips
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {mainLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                      : "text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isMoreActive || moreDropdownOpen
                    ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40"
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 rounded-xl bg-[#0B1120] border border-slate-700/80 shadow-2xl shadow-black/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-1">
                    {moreLinks.map((item) => {
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
                            isActive
                              ? "bg-cyan-950/60 border border-cyan-500/30 text-cyan-300"
                              : "hover:bg-slate-800/60 text-slate-200"
                          }`}
                        >
                          <div className="p-1.5 rounded-md bg-slate-900 border border-slate-800 shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{item.name}</div>
                            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Actions: Profile & Start Learning CTA */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/profile"
              className={`p-2.5 rounded-xl transition-all border ${
                pathname === "/profile"
                  ? "bg-cyan-950/60 border-cyan-500/40 text-cyan-300"
                  : "bg-slate-900/60 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30"
              }`}
              title="User Portfolio & Profile"
            >
              <User className="w-4 h-4" />
            </Link>
            <Button
              href="/roadmap"
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/profile"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0F1D]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-8 space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 block mb-1">
              Core Navigation
            </span>
            {mainLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                      : "text-slate-200 hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-3 block mb-1">
              Interactive Tools & Hubs
            </span>
            {moreLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan-300 bg-cyan-950/60 border border-cyan-500/30"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <Button
              href="/roadmap"
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Start Learning (Roadmap)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
