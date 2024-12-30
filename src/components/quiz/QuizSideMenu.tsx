import React from "react";
import { useQuizTypeStore } from "../../store/useQuizTypeStore";
import { useQuizStore } from "../../store/useQuizStore";
import Button from "../Button";
import formatTime from "../../utils/formatTime";
import getAnsweredQuestions from "../../utils/getAnsweredQuestion";
import calculateResult from "../../utils/calculateResult";
import { useNavigate } from "react-router-dom";

const QuizSideMenu: React.FC = () => {
  const { selectedCategoryName, resetType } = useQuizTypeStore();
  const {
    setResults,
    answers,
    questions,
    currentQuestionIndex,
    timer,
    setCurrentQuestionIndex,
    reset,
  } = useQuizStore();
  const navigate = useNavigate();

  const handleFinishQuiz = () => {
    const answeredQuestions = getAnsweredQuestions(questions, answers);

    const result = calculateResult(questions, answers);
    const { correct, incorrect, answered } = result;

    setResults({
      correct,
      incorrect,
      answered,
      totalQuestion: questions.length,
      answeredQuestions,
    });

    navigate("/result");
    reset();
    resetType();
  };
  return (
    <aside className="w-full md:max-w-xs h-fit bg-primary text-tertiary shadow-lg rounded-lg p-6 space-y-4">
      <h1 className="text-secondary font-semibold text-2xl">Trivia Tales</h1>
      <h1>Category : {selectedCategoryName}</h1>
      <div className="px-4 p-2 bg-tertiary text-primary rounded-md w-fit">
        Remaining Time : {formatTime(timer)}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {questions.length > 0 &&
          Array.from({ length: questions.length }).map((_, index) => (
            <div
              onClick={() => setCurrentQuestionIndex(index)}
              key={index}
              className={`${
                currentQuestionIndex === index
                  ? "bg-slate-400 "
                  : answers[index]
                  ? "bg-secondary"
                  : "bg-tertiary text-primary"
              } aspect-square rounded-lg border border-tertiary hover:bg-opacity-80 flex items-center justify-center cursor-pointer transition`}
            >
              {index + 1}
            </div>
          ))}
      </div>
      <Button
        onClick={handleFinishQuiz}
        variant="secondary"
        width="w-full"
        className="mt-4"
      >
        Selesai
      </Button>
    </aside>
  );
};

export default QuizSideMenu;
