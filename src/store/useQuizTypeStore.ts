import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuizTypeState {
  categories: { id: number; name: string }[];
  selectedCategoryId: number | null;
  selectedCategoryName: string | null;
  totalQuestion: number;
  setCategories: (categories: { id: number; name: string }[]) => void;
  setSelectedCategory: (categoryId: number, categoryName: string) => void;
  setTotalQuestion: (totalQuestion: number) => void;
  resetType:()=>void
}

export const useQuizTypeStore = create(
  persist<QuizTypeState>(
    (set) => ({
      categories: [],
      selectedCategoryId: null,
      selectedCategoryName: null,
      totalQuestion: 10, // Default jumlah soal
      setCategories(categories) {
        set({ categories });
      },
      resetType() {
        set({
          categories: [],
          selectedCategoryId: null,
          selectedCategoryName: null,
          totalQuestion: 10,
        })
      },
      setSelectedCategory(categoryId, categoryName) {
        set({
          selectedCategoryId: categoryId,
          selectedCategoryName: categoryName,
        });
      },
      setTotalQuestion(totalQuestion) {
        set({
          totalQuestion,
        });
      },
    }),
    {
      name: "quiz-type-storage",
    }
  )
);
