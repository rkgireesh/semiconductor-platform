"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Compass, BookOpen, FlaskConical, Briefcase, FileCode2, User, Atom, Layers, Calculator, CheckSquare } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Learning Roadmap", href: "/roadmap", icon: <Compass className="w-3.5 h-3.5" /> },
        { name: "All Courses", href: "/courses", icon: <BookOpen className="w-3.5 h-3.5" /> },
        { name: "Virtual Labs", href: "/labs", icon: <FlaskConical className="w-3.5 h-3.5" /> },
        { name: "Device Explorer", href: "/explorer", icon: <Layers className="w-3.5 h-3.5" /> },
      ],
    },
    {
      title: "Learning Hubs",
      links: [
        { name: "Lesson Viewer", href: "/lessons/bohr-atomic-model", icon: <BookOpen className="w-3.5 h-3.5" /> },
        { name: "Physics Calculators", href: "/calculators", icon: <Calculator className="w-3.5 h-3.5" /> },
        { name: "Quiz Testbenches", href: "/quizzes", icon: <CheckSquare className="w-3.5 h-3.5" /> },
        { name: "Semiconductor Glossary", href: "/glossary", icon: <BookOpen className="w-3.5 h-3.5" /> },
      ],
    },
    {
      title: "Career & Projects",
      links: [
        { name: "Career Pathways", href: "/careers", icon: <Briefcase className="w-3.5 h-3.5" /> },
        { name: "Tape-out Projects", href: "/projects", icon: <FileCode2 className="w-3.5 h-3.5" /> },
        { name: "Progress Telemetry", href: "/progress", icon: <User className="w-3.5 h-3.5" /> },
        { name: "User Portfolio", href: "/profile", icon: <User className="w-3.5 h-3.5" /> },
      ],
    },
    {
      title: "Research & Frontier",
      links: [
        { name: "Research Hub", href: "/research", icon: <Atom className="w-3.5 h-3.5" /> },
        { name: "Sub-2nm Node Reports", href: "/research", icon: <Atom className="w-3.5 h-3.5" /> },
        { name: "GAAFET & CoWoS Tech", href: "/research", icon: <Layers className="w-3.5 h-3.5" /> },
        { name: "Wide Bandgap GaN/SiC", href: "/research", icon: <Atom className="w-3.5 h-3.5" /> },
      ],
    },
  ];

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 relative overflow-hidden mt-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-36 bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-36 bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-bold text-slate-100 text-lg tracking-tight">
                Semiconductor <span className="text-cyan-400">Platform</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              "From atoms to advanced chips." Production-grade interactive engineering education bridging quantum physics, nanoelectronics, VLSI design, and global semiconductor career excellence.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM STATUS: ONLINE
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                v2.0.0 Real-Routes
              </span>
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      {link.icon && link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar with Copyright & GitHub */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Semiconductor Platform. Built for engineering excellence and resume showcase.</p>
          <div className="flex items-center gap-6 font-mono">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub Repository</span>
            </Link>
            <span>Silicon • GaN • SiC • GAAFET</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
