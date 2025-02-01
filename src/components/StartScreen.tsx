import React from 'react';
import { Play, Brain } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Brain className="w-16 h-16 text-blue-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Quiz Challenge!</h1>
        
        <p className="text-gray-600 mb-8">
          Test your knowledge and earn points! Challenge yourself with our interactive quiz.
        </p>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 
                   bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors duration-200"
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </button>
      </div>
    </div>
  );
};