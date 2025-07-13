import React from 'react';
import { Link } from 'react-router-dom';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { getAllLessons } from '../utils/dateHelpers';
import { FaHome, FaTrophy, FaCheckCircle } from 'react-icons/fa';

const Completed: React.FC = () => {
  const { completedLessons, resetProgress } = useLessonProgress();
  const allLessons = getAllLessons();
  const completedLessonDetails = allLessons.filter(lesson => 
    completedLessons.includes(lesson.day)
  );

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaTrophy className="text-4xl text-yellow-500 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">
              Completed Lessons
            </h1>
          </div>
          <p className="text-gray-600">
            {completedLessons.length} of 18 lessons completed
          </p>
        </div>

        {/* Progress Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Progress</span>
            <span className="text-2xl font-bold text-orange-600">
              {Math.round((completedLessons.length / 18) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons.length / 18) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Lessons List */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Journey
          </h2>
          {completedLessonDetails.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                No lessons completed yet. Start your journey today!
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg"
              >
                <FaHome className="mr-2" />
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {completedLessonDetails.map((lesson) => (
                <div
                  key={lesson.day}
                  className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <FaCheckCircle className="text-green-600 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      Day {lesson.day}: {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600">{lesson.objective}</p>
                  </div>
                  <Link
                    to={`/lesson/${lesson.day}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
          {completedLessons.length > 0 && (
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Reset Progress
            </button>
          )}
        </div>

        {/* Completion Message */}
        {completedLessons.length === 18 && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <div className="text-center">
              <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Congratulations! 🎉
              </h3>
              <p className="text-gray-600">
                You have completed all 18 chapters of the Bhagavad Gita journey. 
                Your spiritual practice continues beyond this app.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completed; 