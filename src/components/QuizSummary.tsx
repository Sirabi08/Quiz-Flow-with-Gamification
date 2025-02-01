import React from 'react';
import { Trophy, Clock, Zap, Target, RotateCcw } from 'lucide-react';
import { QuizSummary as QuizSummaryType } from '../types/quiz';

interface QuizSummaryProps {
  summary: QuizSummaryType;
  onRestart: () => void;
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({ summary, onRestart }) => {
  const stats = [
    {
      icon: <Target className="w-6 h-6 text-blue-500" />,
      label: 'Correct Answers',
      value: `${summary.correctAnswers}/${summary.totalQuestions}`,
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      label: 'Total Points',
      value: summary.totalPoints,
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      label: 'Average Time',
      value: `${summary.averageTime.toFixed(1)}s`,
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      label: 'Longest Streak',
      value: summary.longestStreak,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Quiz Complete! 🎉</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center"
          >
            {stat.icon}
            <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
};