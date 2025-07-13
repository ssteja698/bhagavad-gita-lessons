import React from 'react';
import { Link } from 'react-router-dom';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { getTodayLesson } from '../utils/dateHelpers';
import { FaPlay, FaBookOpen, FaCheckCircle } from 'react-icons/fa';

const Home: React.FC = () => {
  const { completedLessons, getNextLesson } = useLessonProgress();
  const todayLesson = getTodayLesson();
  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            తెలుగు భగవద్గీత పాఠాలు
          </h1>
          <p className="text-gray-600">
            An 18-day journey through spiritual wisdom in Telugu
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Progress
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Completed</span>
            <span className="text-2xl font-bold text-orange-600">
              {completedLessons.length}/18
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons.length / 18) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Today's Lesson */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Today's Lesson
          </h2>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Day {todayLesson.day}: {todayLesson.title}
            </h3>
            <p className="text-gray-600 mb-4">{todayLesson.objective}</p>
            <Link
              to={`/lesson/${todayLesson.day}`}
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              <FaPlay className="mr-2" />
              Start Today's Lesson
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link
            to={`/lesson/${nextLesson.day}`}
            className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <FaBookOpen className="text-2xl text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Next Lesson
            </span>
          </Link>
          <Link
            to="/completed"
            className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <FaCheckCircle className="text-2xl text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Completed
            </span>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Welcome to Your Spiritual Journey
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Embark on a transformative 18-day journey through the timeless wisdom 
            of the Bhagavad Gita in Telugu. Each day brings a new lesson, combining 
            Telugu video teachings with guided reflections to deepen your understanding 
            and spiritual practice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; 