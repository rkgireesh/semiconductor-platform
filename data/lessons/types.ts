export interface LessonFormula {
  label: string;
  formula: string;
  desc: string;
}

// Old-format equation shape (used in courses 9, 10, 11)
export interface LessonEquation {
  latex: string;
  name: string;
  explanation: string;
}

// Old-format section shape (used in courses 9, 10, 11)
export interface LessonSectionOld {
  heading: string;
  body: string;
}

// New-format section shape (used in courses 1-8)
export interface LessonSectionNew {
  title: string;
  content: string[];
  callout?: {
    type: "info" | "physics" | "design" | "warning";
    title: string;
    text: string;
  };
  diagram?: {
    type: "energy-band" | "cross-section" | "iv-curve" | "schematic";
    caption: string;
  };
}

// LessonSection supports both formats for backward compatibility
export type LessonSection = LessonSectionNew | LessonSectionOld;

export interface LessonTryItYourself {
  title: string;
  description: string;
  params: {
    id: string;
    name: string;
    min: number;
    max: number;
    step: number;
    defaultVal: number;
    unit: string;
  }[];
  computeOutput: (values: Record<string, number>) => { label: string; value: string; note?: string }[];
}

// Old-format quiz shape
export interface LessonQuiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// New-format checkpoint shape
export interface LessonCheckpoint {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// FullLessonData supports both the new format (courses 1-8) and old format (courses 9-11)
export interface FullLessonData {
  // New-format required fields
  id?: string;
  courseId: string;
  title: string;
  duration: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  tag?: string;
  summary?: string;
  learningObjectives?: string[];
  keyFormulas?: LessonFormula[];
  sections: LessonSection[];
  tryItYourself?: LessonTryItYourself;
  checkpoint?: LessonCheckpoint;
  keyTakeaways?: string[];
  practicalApplications?: string[];
  relatedResearchTopicId?: string;
  relatedLabId?: string;
  prevLessonId?: string;
  nextLessonId?: string;

  // Old-format extra fields (courses 9-11)
  lessonId?: string;
  description?: string;
  equations?: LessonEquation[];
  quiz?: LessonQuiz;
  courseTitle?: string;
  moduleNumber?: number;
  lessonNumber?: number;
}
