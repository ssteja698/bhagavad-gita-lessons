import { useState, useEffect } from 'react';
import { getAllLessons } from '../utils/dateHelpers';
import type { Lesson } from '../utils/dateHelpers';

const STORAGE_KEY = 'gita-lessons-progress';

export const useLessonProgress = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  const markLessonComplete = (day: number) => {
    const updated = [...completedLessons, day];
    setCompletedLessons(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isLessonCompleted = (day: number) => {
    return completedLessons.includes(day);
  };

  const getNextLesson = (): Lesson => {
    const allLessons = getAllLessons();
    const nextLesson = allLessons.find(lesson => !isLessonCompleted(lesson.day));
    return nextLesson || allLessons[0];
  };

  const getProgressPercentage = () => {
    return (completedLessons.length / 18) * 100;
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    completedLessons,
    markLessonComplete,
    isLessonCompleted,
    getNextLesson,
    getProgressPercentage,
    resetProgress,
  };
}; 