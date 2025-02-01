import React from 'react';
import { Timer, CheckCircle2, XCircle } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (index: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-500">Points: {question.points}</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">{question.question}</h2>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 
                     hover:bg-blue-50 transition-all duration-200 flex justify-between items-center"
          >
            <span className="text-gray-700">{option}</span>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
          </button>
        ))}
      </div>
    </div>
  );
};