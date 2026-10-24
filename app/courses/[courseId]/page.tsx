import React from "react";
import { notFound } from "next/navigation";
import { COURSES_DATA, CourseData } from "@/data/coursesData";
import CourseDetailClient from "@/components/courses/CourseDetailClient";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export function generateStaticParams() {
  return COURSES_DATA.map((course) => ({
    courseId: course.id,
  }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  const course: CourseData | undefined = COURSES_DATA.find((c) => c.id === courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
