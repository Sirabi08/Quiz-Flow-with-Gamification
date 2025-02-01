import { useState, useEffect } from 'react';
import { QuizQuestion, QuizState, QuizSummary } from '../types/quiz';

// Mock quiz data
const mockQuizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    points: 10
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    points: 10
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    points: 10
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    points: 15
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Fe", "Au", "Cu"],
    correctAnswer: 2,
    points: 15
  }
];

export const useQuiz = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    streak: 0,
    timePerQuestion: [],
  });
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      // Using mock data instead of API call
      setQuestions(mockQuizData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setQuizState({
      currentQuestionIndex: 1, // Changed from 0 to 1 to show first question
      score: 0,
      answers: [],
      isComplete: false,
      streak: 0,
      timePerQuestion: [],
    });
    setStartTime(Date.now());
  };

  const submitAnswer = (answerIndex: number) => {
    const currentQuestion = questions[quizState.currentQuestionIndex - 1]; // Adjusted index
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const timeSpent = (Date.now() - startTime) / 1000;

    setQuizState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + currentQuestion.points : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0,
      answers: [...prev.answers, answerIndex],
      timePerQuestion: [...prev.timePerQuestion, timeSpent],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      isComplete: prev.currentQuestionIndex === questions.length,
    }));

    setStartTime(Date.now());
  };

  const getQuizSummary = (): QuizSummary => {
    const correctAnswers = quizState.answers.reduce(
      (count, answer, index) => (answer === questions[index].correctAnswer ? count + 1 : count),
      0
    );

    return {
      totalQuestions: questions.length,
      correctAnswers,
      totalPoints: quizState.score,
      averageTime: quizState.timePerQuestion.reduce((a, b) => a + b, 0) / questions.length,
      longestStreak: quizState.streak,
    };
  };

  return {
    questions,
    loading,
    error,
    quizState,
    startQuiz,
    submitAnswer,
    getQuizSummary,
  };
};