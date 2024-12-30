import React from "react";
import { useQuizStore } from "../../store/useQuizStore";

const QuestionNavigatorItem:React.FC<{index:number}> = ({index}) => {
    const {setCurrentQuestionIndex,currentQuestionIndex,answers} = useQuizStore()
  return (
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
  );
};

export default QuestionNavigatorItem;
