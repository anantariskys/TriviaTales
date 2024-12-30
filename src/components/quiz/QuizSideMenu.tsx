import React from "react";
import { useQuizTypeStore } from "../../store/useQuizTypeStore";
import { useQuizStore } from "../../store/useQuizStore";
import Button from "../Button";
import getAnsweredQuestions from "../../utils/getAnsweredQuestion";
import calculateResult from "../../utils/calculateResult";
import { useNavigate } from "react-router-dom";
import QuestionNavigatorItem from "./QuestionNavigatorItem";
import SideMenuHeading from "./SideMenuHeading";
import QuestionNavigatorLayout from "./QuestionNavigatorLayout";
import { useModalStore } from "../../store/useModalStore";

const QuizSideMenu: React.FC = () => {
  const { resetType } = useQuizTypeStore();
  const { setResults, answers, questions, reset } = useQuizStore();
  const { openModal } = useModalStore();
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

  const handleFinishQuizWithConfirmation = () => {
    openModal("Are you sure you want to finish the quiz?", handleFinishQuiz);
  };

  return (
    <aside className="w-full md:max-w-xs h-fit bg-primary text-tertiary shadow-lg rounded-lg p-6 space-y-4">
      <SideMenuHeading />
      <QuestionNavigatorLayout>
        {questions.length > 0 &&
          Array.from({ length: questions.length }).map((_, index) => (
            <QuestionNavigatorItem index={index} key={index} />
          ))}
      </QuestionNavigatorLayout>
      <Button
        onClick={handleFinishQuizWithConfirmation} 
        variant="secondary"
        width="w-full"
        className="mt-4"
      >
        Finish
      </Button>
    </aside>
  );
};

export default QuizSideMenu;
