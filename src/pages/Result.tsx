import React from "react";
import { useQuizStore } from "../store/useQuizStore";
import { useNavigate } from "react-router-dom";

const Result: React.FC = () => {
  const { answers, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const wrongAnswers = answers.length - correctAnswers;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Hasil Kuis</h1>
      <p>Total Soal: {answers.length}</p>
      <p>Benar: {correctAnswers}</p>
      <p>Salah: {wrongAnswers}</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          resetQuiz();
          navigate("/");
        }}
      >
        Mulai Lagi
      </button>
    </div>
  );
};

export default Result;
