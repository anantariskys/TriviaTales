import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuestion } from "../api/services/quiz";
import { useQuizStore } from "../store/useQuizStore";
import { useQuizTypeStore } from "../store/useQuizTypeStore";
import calculateResult from "../utils/calculateResult";
import getAnsweredQuestions from "../utils/getAnsweredQuestion";
import QuizSideMenu from "../components/quiz/QuizSideMenu";
import QuizCurrentQuestion from "../components/quiz/QuizCurrentQuestion";
import LoadingScreen from "../components/quiz/LoadingScreen";
import { useModalStore } from "../store/useModalStore";
import Modal from "../components/Modal";

const Quiz = () => {
  const {
    reset,
    timer,
    decrementTimer,
    questions,
    setQuestions,
    answers,
    setResults,
  } = useQuizStore();
  const {} = useModalStore();

  const { selectedCategoryId, totalQuestion, selectedCategoryName, resetType } =
    useQuizTypeStore();

  const { openModal } = useModalStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setIsLoading(true);
        const response = await getQuestion(
          selectedCategoryId ? selectedCategoryId : 1,
          totalQuestion
        );
        if (response.length === 0) {
          setIsLoading(true)
          openModal(
            `Could not find ${totalQuestion} questions in the ${selectedCategoryName} category, please select a different category or reduce the total number of questions.`,
            () => navigate("/")
          );
        }else{
          setIsLoading(false);
        }
        setQuestions(response);
      } catch (error: any) {        
        if (error.response?.data?.response_code === 5) {
          openModal("Too many requests, please try again in 5 seconds.", () => navigate("/"));
        } else {
          console.error("Error: ", error);
          openModal("Error, please try again", () => navigate("/"));
        }
      } 
    };
    if (
      selectedCategoryId === null ||
      selectedCategoryName === null ||
      totalQuestion < 1
    ) {
      navigate("/");
    } else {
      if (questions.length === 0) {
        fetchQuestion();
      }
    }
    const intervalTimer = setInterval(() => {
      decrementTimer();
    }, 1000);
    return () => clearInterval(intervalTimer);
  }, []);

  useEffect(() => {
    if (timer === 0) {
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
      reset();
      resetType();
      setIsLoading(true);
      openModal("Waktu habis", () => navigate("/result"));
    }
  }, [timer, navigate, questions, answers, setResults, reset]);

  if (isLoading) {
    return <LoadingScreen /> ;
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f6ff",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}
    >
      <div className="container flex py-8 gap-4 flex-col md:flex-row min-h-screen">
        <QuizSideMenu />
        <QuizCurrentQuestion />
      </div>
      <Modal />
    </div>
  );
};

export default Quiz;
