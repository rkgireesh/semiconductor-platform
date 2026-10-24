"use client";

import { createClient } from "@/lib/supabase/client";

// ============================================================
// Progress System — localStorage + Supabase
// ============================================================

export interface LessonProgress {
  lessonId: string;
  courseId: string;
  completedAt: string;
  quizScore?: number;
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
    // Continue even if local storage is unavailable.
  }
}

// Save completion to Supabase for the logged-in user.
async function syncLessonToSupabase(
  lessonId: string,
  courseId: string,
  completedAt: string
): Promise<void> {
  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const { error } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: user.id,
          lesson_id: lessonId,
          course_id: courseId,
          completed_at: completedAt,
        },
        { onConflict: "user_id,lesson_id" }
      );

    if (error) {
      console.error("Could not sync lesson progress:", error.message);
    }
  } catch (error) {
    console.error("Lesson progress sync failed:", error);
  }
}

// Download saved completions from Supabase and merge them locally.
export async function syncProgressFromSupabase(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const { data, error } = await supabase
      .from("lesson_progress")
      .select("lesson_id, course_id, completed_at")
      .eq("user_id", user.id);

    if (error) {
      console.error("Could not load lesson progress:", error.message);
      return;
    }

    const store = getStore();

    for (const row of data ?? []) {
      store.completedLessons[row.lesson_id] = {
        lessonId: row.lesson_id,
        courseId: row.course_id || "",
        completedAt: row.completed_at,
      };
    }

    saveStore(store);
  } catch (error) {
    console.error("Loading lesson progress failed:", error);
  }
}

// ---- Public API ----

export function markLessonComplete(
  lessonId: string,
  courseId: string,
  quizScore?: number
): void {
  const store = getStore();
  const completedAt = new Date().toISOString();

  store.completedLessons[lessonId] = {
    lessonId,
    courseId,
    completedAt,
    quizScore,
    quizPassed: quizScore !== undefined ? quizScore >= 70 : undefined,
  };

  if (quizScore !== undefined) {
    store.quizScores[lessonId] = quizScore;
  }

  saveStore(store);

  // Sync in the background without blocking the UI.
  void syncLessonToSupabase(lessonId, courseId, completedAt);
}

export function isLessonComplete(lessonId: string): boolean {
  return !!getStore().completedLessons[lessonId];
}

export function getCompletedLessonIds(): string[] {
  return Object.keys(getStore().completedLessons);
}

export function getCompletedCountForCourse(courseId: string): number {
  return Object.values(getStore().completedLessons).filter(
    (lesson) => lesson.courseId === courseId
  ).length;
}

export function getCourseProgress(
  courseId: string,
  totalLessons: number
): number {
  if (totalLessons === 0) return 0;

  const completed = getCompletedCountForCourse(courseId);

  return Math.round((completed / totalLessons) * 100);
}

export function getOverallProgress(totalLessonsAcrossPlatform: number): number {
  if (totalLessonsAcrossPlatform === 0) return 0;

  return Math.round(
    (Object.keys(getStore().completedLessons).length /
      totalLessonsAcrossPlatform) *
    100
  );
}

export function getLessonQuizScore(lessonId: string): number | undefined {
  return getStore().completedLessons[lessonId]?.quizScore;
}

export function getFullProgressStore(): ProgressStore {
  return getStore();
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}