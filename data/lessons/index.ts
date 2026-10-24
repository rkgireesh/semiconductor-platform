import { FullLessonData, LessonEquation, LessonSection } from "./types";
import { COURSE_1_LESSONS } from "./course1_fundamentals";
import { COURSE_2_LESSONS } from "./course2_pn_junctions";
import { COURSE_3_LESSONS } from "./course3_bjt_physics";
import { COURSE_4_LESSONS } from "./course4_mosfet_devices";
import { COURSE_5_LESSONS } from "./course5_cmos_digital";
import { COURSE_6_LESSONS } from "./course6_vlsi_design";
import { COURSE_7_LESSONS } from "./course7_fabrication";
import { COURSE_8_LESSONS } from "./course8_advanced_devices";
import { course9Lessons } from "./course9_power_semiconductors";
import { course10Lessons } from "./course10_memory_packaging";
import { course11Lessons } from "./course11_modelling_testing";

export type { FullLessonData, LessonEquation, LessonSection };

export const LESSONS_DATABASE: Record<string, FullLessonData> = {
  ...COURSE_1_LESSONS,
  ...COURSE_2_LESSONS,
  ...COURSE_3_LESSONS,
  ...COURSE_4_LESSONS,
  ...COURSE_5_LESSONS,
  ...COURSE_6_LESSONS,
  ...COURSE_7_LESSONS,
  ...COURSE_8_LESSONS,
  ...course9Lessons,
  ...course10Lessons,
  ...course11Lessons,
};

export function getLessonById(lessonId: string): FullLessonData | undefined {
  return LESSONS_DATABASE[lessonId];
}

export function getAllLessons(): FullLessonData[] {
  return Object.values(LESSONS_DATABASE);
}

export function getLessonsByCourse(courseId: string): FullLessonData[] {
  return Object.values(LESSONS_DATABASE).filter((l) => l.courseId === courseId);
}
