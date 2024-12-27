import { create } from "zustand";


interface QuizTypeState {
    categories :string[]
    selectedCategoryId: number|null
    totalQuestion : number
    setCategories: (categories: string[]) => void
    setSelectedCategory: (categoryId: number) => void
    setTotalQuestion: (totalQuestion: number) => void
}
export const useQuizTypeStore = create<QuizTypeState>((set) => ({
    categories:[],
    selectedCategoryId:null,
    totalQuestion:0,
    setCategories(categories) {
        set({ categories })
    },
    setSelectedCategory(categoryId:number) {
        set({selectedCategoryId:categoryId})
    },
    setTotalQuestion(totalQuestion) {
        set({
            totalQuestion: totalQuestion > 0 && totalQuestion < 51 ? totalQuestion : 10
        });
    }
    

}))