"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  RESEARCH_TOPICS,
  RESEARCH_AREAS,
  RESEARCH_CATEGORIES,
  ResearchTopic,
  TopicDifficulty,
} from "@/data/researchData";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  ArrowUpDown,
  ExternalLink,
  Layers,
  Sparkles,
  HelpCircle,
  X,
  Share2,
  Check,
  Compass,
  ArrowRight,
  GraduationCap,
  Building2,
  ListFilter,
  Eye,
} from "lucide-react";

type SortOption = "area-asc" | "area-desc" | "title-asc" | "title-desc" | "difficulty-asc" | "difficulty-desc";

const BOOKMARKS_STORAGE_KEY = "semiconductor_platform_saved_topics_v1";

export default function ResearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("area-asc");
  const [savedTopicIds, setSavedTopicIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return [];
  });
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [modalTopic, setModalTopic] = useState<ResearchTopic | null>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      return RESEARCH_TOPICS.find((t) => t.id === hashId) || null;
    }
    return null;
  });
  const [pageSize, setPageSize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Save bookmarks
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedTopicIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const copyTopicLink = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/research#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Listen for URL hash changes for direct topic linking
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hashId = window.location.hash.replace("#", "");
        const matched = RESEARCH_TOPICS.find((t) => t.id === hashId);
        if (matched) {
          setModalTopic(matched);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Filter & Sort Topics
  const filteredTopics = useMemo(() => {
    return RESEARCH_TOPICS.filter((topic) => {
      // Keyword search
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        topic.explanation.toLowerCase().includes(query) ||
        topic.whyItMatters.toLowerCase().includes(query) ||
        topic.area.toLowerCase().includes(query) ||
        topic.category.toLowerCase().includes(query) ||
        topic.source.toLowerCase().includes(query) ||
        topic.applications.some((app) => app.toLowerCase().includes(query)) ||
        topic.researchQuestions.some((rq) => rq.toLowerCase().includes(query)) ||
        topic.prerequisites.some((pre) => pre.toLowerCase().includes(query));

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || topic.category === selectedCategory;

      // Area filter
      const matchesArea =
        selectedArea === "All" || topic.area === selectedArea;

      // Difficulty filter
      const matchesDifficulty =
        selectedDifficulty === "All" || topic.difficulty === selectedDifficulty;

      // Saved only filter
      const matchesSaved = !showSavedOnly || savedTopicIds.includes(topic.id);

      return matchesSearch && matchesCategory && matchesArea && matchesDifficulty && matchesSaved;
    }).sort((a, b) => {
      switch (sortBy) {
        case "area-asc":
          return a.areaNumber - b.areaNumber;
        case "area-desc":
          return b.areaNumber - a.areaNumber;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "difficulty-asc": {
          const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return rank[a.difficulty] - rank[b.difficulty];
        }
        case "difficulty-desc": {
          const rank = { Beginner: 1, Intermediate: 2, Advanced: 3 };
          return rank[b.difficulty] - rank[a.difficulty];
        }
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, selectedArea, selectedDifficulty, showSavedOnly, savedTopicIds, sortBy]);

  // Adjust page to 1 during render when filters change
  const filterKey = `${searchTerm}|${selectedCategory}|${selectedArea}|${selectedDifficulty}|${showSavedOnly}|${sortBy}|${pageSize}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setCurrentPage(1);
  }

  // Pagination calculations
  const totalTopics = filteredTopics.length;
  const isShowAll = pageSize === 100;
  const totalPages = isShowAll ? 1 : Math.ceil(totalTopics / pageSize);
  const paginatedTopics = isShowAll
    ? filteredTopics
    : filteredTopics.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedArea("All");
    setSelectedDifficulty("All");
    setShowSavedOnly(false);
    setSortBy("area-asc");
  };

  const getDifficultyBadge = (diff: TopicDifficulty) => {
    switch (diff) {
      case "Beginner":
        return <Badge variant="teal" size="sm">Beginner</Badge>;
      case "Intermediate":
        return <Badge variant="sky" size="sm">Intermediate</Badge>;
      case "Advanced":
        return <Badge variant="purple" size="sm">Advanced</Badge>;
    }
  };

  return (
    <div className="w-full py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Breadcrumb & Metadata Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            ← Back to Platform Overview
          </Link>

          <div className="flex items-center gap-2.5">
            <Badge variant="blue" size="md">
              100 COMPREHENSIVE RESEARCH TOPICS
            </Badge>
            <Badge variant="cyan" size="md" dot>
              30 CURRICULUM AREAS
            </Badge>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
            Semiconductor Research Library
          </h1>
          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            A comprehensive curriculum spanning 100 verified semiconductor research frontiers—from fundamental quantum band theory and solid-state crystal lattices to sub-2nm GAAFETs, High-NA EUV, cryogenic quantum interfaces, and 2D atomic monolayers.
          </p>

          {/* Quick Stat Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 text-xs sm:text-sm font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              100 Peer-Reviewed Topics
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              30 Specialized Domain Areas
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              300 Investigation Points
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {savedTopicIds.length} Bookmarked Topics
            </span>
          </div>
        </div>

        {/* Search, Filter, and Control Console */}
        <div className="glass-panel p-5 rounded-2xl mb-8 space-y-4 border border-slate-800">
          
          {/* Row 1: Search Input + Saved Toggle + Page Size */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search all 100 topics, physics, equations, equations, materials (e.g. GAAFET, EUV, SiC, WKB, 2DEG)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Actions (Saved Only + Sort Dropdown + Page Size) */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Saved Only Filter Button */}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium border transition-colors cursor-pointer ${
                  showSavedOnly
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                {showSavedOnly ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
                <span>Saved ({savedTopicIds.length})</span>
              </button>

              {/* Sorting Control */}
              <div className="relative inline-flex items-center">
                <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="pl-8 pr-7 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 appearance-none cursor-pointer"
                >
                  <option value="area-asc">Sort: Curriculum Area (1-30)</option>
                  <option value="area-desc">Sort: Area (30-1)</option>
                  <option value="title-asc">Sort: Title (A-Z)</option>
                  <option value="title-desc">Sort: Title (Z-A)</option>
                  <option value="difficulty-asc">Sort: Difficulty (Beginner First)</option>
                  <option value="difficulty-desc">Sort: Difficulty (Advanced First)</option>
                </select>
                <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Page Size Selector */}
              <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
                {[12, 24, 100].map((size) => (
                  <button
                    key={size}
                    onClick={() => setPageSize(size)}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      pageSize === size
                        ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {size === 100 ? "All 100" : size}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Row 2: Area Dropdown + Difficulty Pills */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80 items-center">
            
            {/* Area Dropdown (1-30) */}
            <div className="md:col-span-7 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 whitespace-nowrap shrink-0 flex items-center gap-1.5">
                <ListFilter className="w-3.5 h-3.5 text-cyan-400" />
                Area (1-30):
              </span>
              <div className="relative w-full">
                <select
                  value={selectedArea}
                  onChange={(e) => {
                    setSelectedArea(e.target.value);
                    if (e.target.value !== "All") {
                      setSelectedCategory("All");
                    }
                  }}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 truncate appearance-none cursor-pointer"
                >
                  <option value="All">All 30 Curriculum Areas</option>
                  {RESEARCH_AREAS.map((area) => (
                    <option key={area} value={area.replace(/^\d+\.\s*/, "")}>
                      {area}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Difficulty Filter Pills */}
            <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-1.5 flex-wrap">
              <span className="text-xs font-mono text-slate-400 mr-1">Level:</span>
              {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/20"
                      : "bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

          </div>

          {/* Row 3: Category Pills (Horizontal scrollable) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-slate-800/60">
            {RESEARCH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  if (cat !== "All") {
                    setSelectedArea("All");
                  }
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-200 text-slate-950 font-bold"
                    : "bg-slate-950 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                Showing <strong className="text-cyan-300">{filteredTopics.length}</strong> of <strong className="text-slate-200">{RESEARCH_TOPICS.length}</strong> topics
                {(selectedCategory !== "All" || selectedArea !== "All" || selectedDifficulty !== "All" || showSavedOnly || searchTerm) && " (filtered)"}
              </span>
            </div>

            {(selectedCategory !== "All" || selectedArea !== "All" || selectedDifficulty !== "All" || showSavedOnly || searchTerm) && (
              <button
                onClick={resetFilters}
                className="text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Empty State */}
        {filteredTopics.length === 0 && (
          <div className="glass-panel rounded-2xl p-12 text-center space-y-4 my-12 border border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-200">No matching research topics found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              We couldn&apos;t find any topics matching your current filter criteria. Try clearing your search keyword or switching filters.
            </p>
            <Button onClick={resetFilters} variant="secondary" size="md">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Topics Grid (Displaying all 100 via clean responsive pagination/view-all) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paginatedTopics.map((topic) => {
            const isBookmarked = savedTopicIds.includes(topic.id);
            const isExpanded = expandedTopicId === topic.id;

            return (
              <Card
                key={topic.id}
                className="flex flex-col justify-between group hover:border-cyan-500/50 transition-all p-6 relative"
              >
                <div className="space-y-4">
                  
                  {/* Card Header: Area Number + Category + Difficulty + Bookmark */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded">
                        Area {topic.areaNumber}
                      </span>
                      {getDifficultyBadge(topic.difficulty)}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        title="Copy direct topic link"
                        onClick={(e) => copyTopicLink(topic.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors cursor-pointer"
                      >
                        {copiedId === topic.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        title={isBookmarked ? "Remove bookmark" : "Save topic to bookmarks"}
                        onClick={(e) => toggleBookmark(topic.id, e)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                            : "text-slate-400 hover:text-amber-300 hover:bg-slate-900"
                        }`}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-400" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h2
                      onClick={() => setModalTopic(topic)}
                      className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-2"
                    >
                      {topic.title}
                    </h2>
                    <span className="text-[11px] font-mono text-cyan-400/90 block mt-1">
                      {topic.category} • {topic.source}
                    </span>
                  </div>

                  {/* Explanation Abstract */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {topic.explanation}
                  </p>

                  {/* Metrics preview chips */}
                  {topic.metrics && topic.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {topic.metrics.slice(0, 2).map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-0.5"
                        >
                          <span className="text-[9px] font-mono uppercase text-slate-400 block truncate">
                            {m.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-cyan-300 block truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* In-Card Accordion Quick View */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-800 space-y-3 text-xs animate-in fade-in duration-200">
                      
                      {/* Why it Matters */}
                      <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 space-y-1">
                        <span className="font-mono text-cyan-400 uppercase tracking-wider text-[10px] flex items-center gap-1 font-bold">
                          <TrendingUp className="w-3 h-3" />
                          Engineering Significance
                        </span>
                        <p className="text-slate-300 leading-relaxed text-[11px]">
                          {topic.whyItMatters}
                        </p>
                      </div>

                      {/* 3 Research Questions */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px] font-bold block">
                          3 Core Investigation Questions:
                        </span>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          {topic.researchQuestions.map((q, qIdx) => (
                            <li key={qIdx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 font-mono font-bold shrink-0">{qIdx + 1}.</span>
                              <span className="leading-snug">{q}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  )}

                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? "Collapse" : "Quick Summary"}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>

                  <button
                    onClick={() => setModalTopic(topic)}
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-colors"
                  >
                    <span>Full Specification</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {!isShowAll && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl mb-16 border border-slate-800">
            <span className="text-xs font-mono text-slate-400">
              Page <strong className="text-cyan-300">{currentPage}</strong> of <strong className="text-slate-200">{totalPages}</strong> ({totalTopics} total topics)
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Detailed Topic Modal / Full Specification Drawer */}
        {modalTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto space-y-6">
              
              {/* Modal Close Button */}
              <button
                onClick={() => setModalTopic(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 pr-10">
                <Badge variant="cyan" size="sm">
                  Area {modalTopic.areaNumber}: {modalTopic.area}
                </Badge>
                {getDifficultyBadge(modalTopic.difficulty)}
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {modalTopic.year}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-medium">
                  Source: {modalTopic.source}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 leading-tight">
                  {modalTopic.title}
                </h2>
                <span className="text-xs font-mono text-slate-400 block mt-1.5">
                  Category: {modalTopic.category} • ID: {modalTopic.id}
                </span>
              </div>

              {/* Technical Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Technical Explanation & Physical Mechanism
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {modalTopic.explanation}
                </p>
              </div>

              {/* Why the Topic Matters in Semiconductor Engineering */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Why This Matters in Semiconductor Engineering
                </h3>
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-sm text-cyan-100/90 leading-relaxed">
                  {modalTopic.whyItMatters}
                </div>
              </div>

              {/* Key Metrics / Quantitative Benchmarks */}
              {modalTopic.metrics && modalTopic.metrics.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold block">
                    Quantitative Engineering Parameters
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {modalTopic.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-slate-400 block truncate">
                          {m.label}
                        </span>
                        <span className="text-sm font-mono font-bold text-cyan-300">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Three Key Research Questions / Investigation Points */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Three Key Research Questions & Investigation Points
                </h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {modalTopic.researchQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/20">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-Column Grid: Prerequisites & Next Learning Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Prerequisites */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                    Prerequisite Knowledge
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {modalTopic.prerequisites.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-sky-400 mt-1">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggested Next Steps */}
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    Suggested Next Learning Steps
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {modalTopic.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">→</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Relevant Applications & Industry Connections */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-purple-400" />
                  Relevant Applications & Industry Connections
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {modalTopic.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reliable Learning Resources / Citations */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  Reliable Learning Resources & Reference Literature
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {modalTopic.resources.map((res, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-mono font-semibold uppercase text-cyan-400 block mb-1">
                          {res.type} • {res.sourceOrPublisher}
                        </span>
                        <span className="text-xs font-medium text-slate-200 leading-snug">
                          {res.title}
                        </span>
                      </div>
                      {res.url && (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          <span>Open Resource</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => toggleBookmark(modalTopic.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border cursor-pointer ${
                    savedTopicIds.includes(modalTopic.id)
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                      : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                  }`}
                >
                  {savedTopicIds.includes(modalTopic.id) ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      <span>Bookmarked in Library</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>Bookmark This Topic</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-3">
                  <Button href="/explorer" variant="outline" size="sm">
                    Inspect in 3D Device Explorer
                  </Button>
                  <Button href="/calculators" variant="secondary" size="sm">
                    Open Physics Calculators
                  </Button>
                  <button
                    onClick={() => setModalTopic(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-cyan-500/20 text-center space-y-4">
          <Badge variant="cyan" size="md">
            CONNECT RESEARCH TO PRACTICE
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-100">
            Apply Modern Device Physics in Virtual Labs & Calculators
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Test the equations governing subthreshold swing, DIBL, carrier velocity saturation, PN junction capacitance, and FinFET electrostatics in our interactive tools.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button href="/labs" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Launch Virtual Labs
            </Button>
            <Button href="/calculators" variant="secondary" size="md">
              Physics Calculators
            </Button>
            <Button href="/roadmap" variant="outline" size="md">
              Complete Curriculum Roadmap
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
