import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './components/StartScreen';
import { QuizCard } from './components/QuizCard';
import { QuizSummary } from './components/QuizSummary';
import { Loader2 } from 'lucide-react';

function App() {
  const {
    questions,
    loading,
    error,
    quizState,
    startQuiz,
    submitAnswer,
    getQuizSummary,
  } = useQuiz();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-gray-600">Loading quiz...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      {!quizState.currentQuestionIndex && !quizState.isComplete && (
        <StartScreen onStart={startQuiz} />
      )}

      {quizState.currentQuestionIndex > 0 && !quizState.isComplete && (
        <QuizCard
          question={questions[quizState.currentQuestionIndex - 1]}
          onAnswer={submitAnswer}
          questionNumber={quizState.currentQuestionIndex}
          totalQuestions={questions.length}
        />
      )}

      {quizState.isComplete && (
        <QuizSummary
          summary={getQuizSummary()}
          onRestart={startQuiz}
        />
      )}
    </div>
  );
}

export default App;