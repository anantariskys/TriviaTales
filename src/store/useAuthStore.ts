import { create } from "zustand";
import { AuthState } from "../types/user";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userData: null,
  isLoading: false,
  setIsLoading: (newIsLoading) => set({isLoading:newIsLoading}),
  setAuth: (authData) =>
    set({
      userData: authData,
    }),
  clearAuth: () =>
    set({
      isAuthenticated: false,
      userData: null,
    }),
  setIsAuthenticated(nowIsAuthenticated) {
    set({isAuthenticated: nowIsAuthenticated});
  },
}));
