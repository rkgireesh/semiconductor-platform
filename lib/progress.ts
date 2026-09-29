"use client";

// ============================================================
// Progress System — localStorage-based (no backend needed)
// ============================================================

export interface LessonProgress {
  lessonId: string;
  courseId: string;
  completedAt: string; // ISO string
  quizScore?: number;  // 0–100
  quizPassed?: boolean;
}

export interface ProgressStore {
  completedLessons: Record<string, LessonProgress>;
  quizScores: Record<string, number>;
}

const STORAGE_KEY = "semiconductor_platform_progress_v1";

function getStore(): ProgressStore {
  if (typeof window === "undefined") {
    return { completedLessons: {}, quizScores: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: {}, quizScores: {} };
    return JSON.parse(raw) as ProgressStore;
  } catch {
    return { completedLessons: {}, quizScores: {} };
  }
}

function saveStore(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Silently fail if storage is full
  }
}

// ---- Public API ----

/** Mark a lesson as completed (persists across page refreshes). */
export function markLessonComplete(lessonId: string, courseId: string, quizScore?: number): void {
  const store = getStore();
  store.completedLessons[lessonId] = {
    lessonId,
    courseId,
    completedAt: new Date().toISOString(),
    quizScore,
    quizPassed: quizScore !== undefined ? quizScore >= 70 : undefined,
  };
  if (quizScore !== undefined) {
    store.quizScores[lessonId] = quizScore;
  }
  saveStore(store);
}

/** Check if a specific lesson is completed. */
export function isLessonComplete(lessonId: string): boolean {
  const store = getStore();
  return !!store.completedLessons[lessonId];
}

/** Get all completed lesson IDs. */
export function getCompletedLessonIds(): string[] {
  const store = getStore();
  return Object.keys(store.completedLessons);
}

/** Get progress for a specific course (returns 0–100 percentage). */
export function getCourseProgress(courseId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const store = getStore();
  const completed = Object.values(store.completedLessons).filter(
    (l) => l.courseId === courseId
  ).length;
  return Math.round((completed / totalLessons) * 100);
}

/** Get overall platform progress across all lessons. */
export function getOverallProgress(totalLessonsAcrossPlatform: number): number {
  if (totalLessonsAcrossPlatform === 0) return 0;
  const store = getStore();
  const completed = Object.keys(store.completedLessons).length;
  return Math.round((completed / totalLessonsAcrossPlatform) * 100);
}

/** Get the quiz score for a lesson (undefined if not taken). */
export function getLessonQuizScore(lessonId: string): number | undefined {
  const store = getStore();
  return store.completedLessons[lessonId]?.quizScore;
}

/** Get full progress store for display purposes. */
export function getFullProgressStore(): ProgressStore {
  return getStore();
}

/** Reset all progress (for testing). */
export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
