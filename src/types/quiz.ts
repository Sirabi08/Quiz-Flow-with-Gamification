export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  streak: number;
  timePerQuestion: number[];
}

export interface QuizSummary {
  totalQuestions: number;
  correctAnswers: number;
  totalPoints: number;
  averageTime: number;
  longestStreak: number;
}