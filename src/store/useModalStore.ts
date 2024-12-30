import { create } from "zustand";

interface ModalState {
    isModalOpen: boolean;
    modalMessage: string;
    onConfirm?: () => void;
    onCancel?: () => void;    
    openModal: (message: string, onConfirm?: () => void, onCancel?: () => void) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalMessage: '',
    openModal: (message, onConfirm, onCancel) => 
        set({
            isModalOpen: true,
            modalMessage: message,
            onConfirm,
            onCancel
        }),
    closeModal: () => set({ isModalOpen: false, modalMessage: '', onConfirm: undefined, onCancel: undefined }),
    onCancel() {
        if (this.onCancel) {
            this.onCancel(); 
        }
        this.closeModal();
    },
    onConfirm() {
        if (this.onConfirm) {
            this.onConfirm(); 
        }
        this.closeModal();
    },
}));
