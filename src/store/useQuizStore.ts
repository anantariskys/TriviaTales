import { create } from 'zustand';

interface Question {
  question: string;
  incorrect_answers: string[];
  correct_answer: string;
  allAnswers: string[];
}

interface QuizState {
  questions: Question[]; // Array of questions
  currentQuestionIndex: number; // Active question index
  timer: number; // Timer in seconds
  setQuestions: (questions: Question[]) => void;
  next: () => void;
  prev: () => void;
  setCurrentQuestionIndex: (index: number) => void;

}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [], 
  currentQuestionIndex: 0,
  timer: 300, 
  setQuestions: (questions: Question[]) =>
    set(() => ({
      questions,
      currentQuestionIndex: questions.length > 0 ? 0 : -1,
    })),
    next() {
      set((state) => ({
        currentQuestionIndex:state.currentQuestionIndex<state.questions.length - 1 ? state.currentQuestionIndex + 1:state.currentQuestionIndex,
      }));
    },
    prev() {
      set((state) => ({
        currentQuestionIndex:state.currentQuestionIndex > 0 ? state.currentQuestionIndex - 1:state.currentQuestionIndex,
      }));
    },
    setCurrentQuestionIndex(index) {
      set({ currentQuestionIndex: index });
    },

}));
