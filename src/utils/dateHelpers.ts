import lessonsData from '../data/gita-lessons.json';

export interface Lesson {
  day: number;
  title: string;
  type: 'video' | 'reflection';
  objective: string;
  youtubeId?: string;
  prompt: string;
  reviewable: boolean;
}

// Type assertion to ensure lessons match our interface
const lessons = lessonsData as Lesson[];

export const getTodayLesson = (): Lesson => {
  // For demo purposes, always start from day 1
  // In a real app, you'd calculate based on user's start date
  return lessons.find(lesson => lesson.day === 1) || lessons[0];
};

export const getLessonByDay = (day: number): Lesson | undefined => {
  return lessons.find(lesson => lesson.day === day);
};

export const getAllLessons = (): Lesson[] => {
  return lessons;
}; 