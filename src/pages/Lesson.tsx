import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { getLessonByDay } from '../utils/dateHelpers';
import YouTubeEmbed from '../components/YouTubeEmbed';
import ChatGPTEmbed from '../components/ChatGPTEmbed';
import { FaArrowLeft, FaCheck, FaHome } from 'react-icons/fa';

const Lesson: React.FC = () => {
  const { day } = useParams<{ day: string }>();
  const lessonDay = parseInt(day || '1');
  const lesson = getLessonByDay(lessonDay);
  const { markLessonComplete, isLessonCompleted } = useLessonProgress();

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Lesson Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    markLessonComplete(lessonDay);
    toast.success('Lesson completed! 🎉');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <div className="text-right">
            <span className="text-sm text-gray-500">Day {lesson.day}</span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Lesson Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {lesson.title}
            </h1>
            <p className="text-gray-600">{lesson.objective}</p>
          </div>

          {/* Lesson Content */}
          <div className="p-6">
            {lesson.type === 'video' && lesson.youtubeId ? (
              <YouTubeEmbed youtubeId={lesson.youtubeId} />
            ) : (
              <ChatGPTEmbed prompt={lesson.prompt} />
            )}

            {/* Lesson Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Today's Reflection
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {lesson.prompt}
              </p>
            </div>

            {/* Complete Button */}
            {!isLessonCompleted(lessonDay) && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleComplete}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FaCheck className="mr-2" />
                  Mark as Completed
                </button>
              </div>
            )}

            {/* Already Completed */}
            {isLessonCompleted(lessonDay) && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 font-medium rounded-lg">
                  <FaCheck className="mr-2" />
                  Completed ✓
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          {lessonDay > 1 && (
            <Link
              to={`/lesson/${lessonDay - 1}`}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Previous Lesson
            </Link>
          )}
          {lessonDay < 18 && (
            <Link
              to={`/lesson/${lessonDay + 1}`}
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 ml-auto"
            >
              Next Lesson
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson; 