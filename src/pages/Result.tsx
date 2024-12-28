import React from "react";
import { useQuizStore } from "../store/useQuizStore";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { results } = useQuizStore();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto text-center py-8">
      <h1 className="text-3xl font-bold">Hasil Quiz</h1>
      <div className="mt-6 space-y-4">
        <p>Jawaban Benar: {results.correct}</p>
        <p>Jawaban Salah: {results.incorrect}</p>
        <p>Jumlah Dijawab: {results.answered}</p>
      </div>
      <Button
        onClick={() => navigate("/")}
        variant="dark"
        width="w-fit"
        className="mt-6"
      >
        Kembali ke Halaman Utama
      </Button>
    </div>
  );
};

export default Result;
