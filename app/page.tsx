"use client";

import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import HeroVisual from "@/components/ui/HeroVisual";
import SemiconductorLearningEngine from "@/components/SemiconductorLearningEngine";
import { ROADMAP_STAGES } from "@/data/roadmapData";
import { VIRTUAL_LABS } from "@/data/labsData";
import { CAREER_PATHS } from "@/data/careersData";
import { SEMICONDUCTOR_PROJECTS } from "@/data/projectsData";
import { RESEARCH_PAPERS } from "@/data/researchData";
import {
  ArrowRight,
  Compass,
  Sparkles,
  BookOpen,
  FlaskConical,
  Briefcase,
  Layers,
  FolderGit2,
  Atom,
  ChevronRight,
  TrendingUp,
  Award,
  Cpu,
  Zap,
  Code2
} from "lucide-react";

export default function HomePage() {
  const roadmapPreview = ROADMAP_STAGES.slice(0, 4);
  const labsPreview = VIRTUAL_LABS.slice(0, 3);
  const careersPreview = CAREER_PATHS.slice(0, 3);
  const projectsPreview = SEMICONDUCTOR_PROJECTS.slice(0, 3);
  const researchPreview = RESEARCH_PAPERS.slice(0, 3);

  const journeySteps = [
    { id: "01", name: "ATOMIC PHYSICS", title: "Quantum & Lattice", desc: "Energy quantization, diamond cubic silicon, and energy bands.", icon: <BookOpen className="w-5 h-5 text-cyan-400" /> },
    { id: "02", name: "CARRIER TRANSPORT", title: "Drift & Diffusion", desc: "Doping impurity physics, Fermi-Dirac statistics, and mobility.", icon: <Zap className="w-5 h-5 text-sky-400" /> },
    { id: "03", name: "DEVICES", title: "Diodes to GAAFET", desc: "PN junctions, MOSFETs, FinFETs, and 4-sided nanosheets.", icon: <Layers className="w-5 h-5 text-blue-400" /> },
    { id: "04", name: "CIRCUITS & VLSI", title: "RTL to Tape-out", desc: "CMOS logic, static timing analysis (STA), and physical design.", icon: <Cpu className="w-5 h-5 text-purple-400" /> },
    { id: "05", name: "FABRICATION", title: "Cleanroom Fabs", desc: "High-NA EUV lithography, plasma etch, and ALD deposition.", icon: <FlaskConical className="w-5 h-5 text-amber-400" /> },
    { id: "06", name: "CAREER PLACEMENT", title: "Silicon Industry", desc: "Technical interview prep, tape-out portfolios, and fabless roles.", icon: <Award className="w-5 h-5 text-teal-400" /> },
  ];

  return (
    <div className="w-full flex flex-col space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start">
                <Badge variant="cyan" dot={true} size="md">
                  NEXT-GEN SEMICONDUCTOR PLATFORM
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
                From Atoms to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-300">
                  Advanced Chips.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                An interactive platform to learn semiconductor technology, visualize devices, practice concepts, build projects, and prepare for semiconductor careers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href="/roadmap"
                  variant="primary"
                  size="lg"
                  icon={<Sparkles className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Start Learning
                </Button>
                <Button
                  href="/roadmap"
                  variant="secondary"
                  size="lg"
                  icon={<Compass className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Explore Roadmap
                </Button>
              </div>

              {/* Platform Highlights */}
              <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-cyan-400 text-xs font-mono font-semibold">12 STAGES</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">Foundations to 2nm</div>
                </div>
                <div className="border-x border-slate-800/80 px-4">
                  <div className="text-sky-400 text-xs font-mono font-semibold">INTERACTIVE</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">Virtual Labs & Solvers</div>
                </div>
                <div>
                  <div className="text-purple-400 text-xs font-mono font-semibold">CAREER READY</div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">VLSI & Tape-outs</div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Semiconductor Learning Engine Section */}
      <SemiconductorLearningEngine />

      {/* 3. Learning Journey Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="sky" size="md">
              CURRICULUM ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
              End-to-End Engineering Pathway
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Step methodically from solid-state quantum foundations to physical ASIC design and fab cleanroom processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {journeySteps.map((step) => (
              <div
                key={step.id}
                className="glass-panel glass-panel-hover rounded-2xl p-5 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {step.icon}
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                      STEP {step.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                      {step.name}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Roadmap Preview Section */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="cyan" size="md">
                ROADMAP PREVIEW
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                12-Stage Mastery Roadmap
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Structured progressive curriculum covering device physics, analog design, CMOS logic, and VLSI tape-outs.
              </p>
            </div>
            <Button
              href="/roadmap"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Full 12-Stage Roadmap
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {roadmapPreview.map((stage) => (
              <Card key={stage.id} className="p-5 flex flex-col justify-between group hover:border-cyan-500/40">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 group-hover:bg-cyan-950/40 transition-colors">
                      {stage.num}
                    </span>
                    <Badge variant={stage.diffVariant} size="sm">
                      {stage.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {stage.skills.slice(0, 2).map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{stage.duration}</span>
                  <Link
                    href={`/courses/${stage.courseId}`}
                    className="text-xs font-mono font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Stage Syllabus</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Labs Preview */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="teal" size="md">
                VIRTUAL LABS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                Interactive Engineering Labs
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Simulate depletion regions, trace MOSFET IV characteristics, and tune CMOS inverter sizing in real-time.
              </p>
            </div>
            <Button
              href="/labs"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Open All Virtual Labs
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {labsPreview.map((lab) => (
              <Card key={lab.id} className="p-6 flex flex-col justify-between group hover:border-teal-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-950/30 transition-colors">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <Badge variant={lab.badgeVariant} size="sm">
                      {lab.category}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {lab.description}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300">
                    {lab.equations[0]?.formula}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Live Computational Model</span>
                  <Button href="/labs" variant="primary" size="sm">
                    Launch Simulator
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Career Pathways Preview */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="purple" size="md">
                CAREER LAUNCHPAD
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                Semiconductor Industry Careers
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Discover 15+ high-demand semiconductor disciplines, required EDA tools, and technical interview questions.
              </p>
            </div>
            <Button
              href="/careers"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore 15+ Career Paths
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careersPreview.map((career) => (
              <Card key={career.id} className="p-6 flex flex-col justify-between group hover:border-purple-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {career.salaryRange}
                    </span>
                    <Badge variant={career.badgeVariant} size="sm">
                      {career.demandIndex} Demand
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-300 transition-colors">
                      {career.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {career.overview}
                    </p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Core Industry Tools:</span>
                    <div className="flex flex-wrap gap-1">
                      {career.industryTools.slice(0, 3).map((tool) => (
                        <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <Link
                    href="/careers"
                    className="text-xs font-mono text-purple-400 hover:text-purple-300 font-semibold flex items-center justify-between"
                  >
                    <span>View Skills & Interview Prep</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Projects Preview */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="cyan" size="md">
                SILICON PORTFOLIO
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                Hands-On Tape-out Projects
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Build verified silicon designs using open-source EDA tools (OpenLane, Yosys, NGSPICE, SkyWater 130nm).
              </p>
            </div>
            <Button
              href="/projects"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View All Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsPreview.map((proj) => (
              <Card key={proj.id} className="p-6 flex flex-col justify-between group hover:border-cyan-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {proj.duration}
                    </span>
                    <Badge variant={proj.badgeVariant} size="sm">
                      {proj.category}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.toolsUsed.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <Button href="/projects" variant="secondary" size="sm" className="w-full">
                    View Project Specification
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Research Hub Preview */}
      <section className="py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="blue" size="md">
                FRONTIER TECH
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
                Semiconductor Research Hub
              </h2>
              <p className="text-slate-400 text-sm md:text-base">
                Explore cutting-edge papers on sub-2nm Forksheets, High-NA EUV, Backside Power, and 2D materials.
              </p>
            </div>
            <Button
              href="/research"
              variant="outline"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Research Hub
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchPreview.map((paper) => (
              <Card key={paper.id} className="p-6 flex flex-col justify-between group hover:border-blue-500/40">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">{paper.year}</span>
                    <Badge variant={paper.badgeVariant} size="sm">
                      {paper.category}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
                      {paper.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400 block mt-1">
                      {paper.source}
                    </span>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <Link
                    href="/research"
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-between"
                  >
                    <span>Read Technical Report</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-cyan-500/30">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <Badge variant="cyan" size="md">
                START YOUR JOURNEY TODAY
              </Badge>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
                Ready to Master Silicon Engineering?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Step methodically from atomic band structures to tape-out-verified VLSI circuits and global semiconductor career excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  href="/roadmap"
                  variant="primary"
                  size="lg"
                  icon={<Sparkles className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Start Learning (Roadmap)
                </Button>
                <Button
                  href="/courses"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Browse All Courses
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
