import React from "react";
import { useModalStore } from "../store/useModalStore";
import { Icon } from "@iconify/react";
import Button from "./Button";

const Modal: React.FC<{closeButton?:boolean}> = ({closeButton}) => {
  const { isModalOpen, modalMessage, onConfirm, onCancel, closeModal, } =
    useModalStore();

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-40 flex justify-center items-center transition-opacity duration-300 ${
        isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => closeModal()}
    >
      <div
        className={`bg-white p-8 rounded-lg shadow-lg w-4/5 sm:w-1/2 md:w-1/3 max-w-lg transition-transform duration-300 transform ${
          isModalOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          <Icon icon="mdi:alert-circle" className="text-red-500 text-4xl" />
        </div>
        <div className="text-center mb-4">
          <h3 className="text-2xl font-semibold text-primary">
            {modalMessage}
          </h3>
        </div>
        <div className="flex justify-center gap-4">
          {onConfirm && (
            <Button
         variant="primary"
              onClick={() => {onConfirm(),closeModal()}}
            >
              Yes
            </Button>
          )}

          {onCancel && (
            <Button
              variant="primary-outline"
              onClick={() => {onCancel(),closeModal()}}
            >
              Close
            </Button>
          )}

          {!onConfirm && !onCancel && (
            <Button
            variant="secondary"
              onClick={() => closeModal()}
            >
              Close
            </Button>
          )}

          {onConfirm && closeButton && <Button variant="secondary" onClick={() => closeModal()}>Close</Button>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
