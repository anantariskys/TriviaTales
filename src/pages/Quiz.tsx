import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getQuestion } from "../api/services/quiz";
import { useQuizStore } from "../store/useQuizStore";
import { useQuizTypeStore } from "../store/useQuizTypeStore";
import formatTime from "../utils/formatTime";
import calculateResult from "../utils/calculateResult";

const Quiz = () => {
  const {
    reset,
    timer,
    decrementTimer,
    questions,
    setQuestions,
    currentQuestionIndex,
    answers,
    setAnswer,
    next,
    prev,
    setCurrentQuestionIndex,
    setResults
  } = useQuizStore();
  const { selectedCategoryId, totalQuestion, selectedCategoryName } =
    useQuizTypeStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestion(
          selectedCategoryId ? selectedCategoryId : 1,
          totalQuestion
        );
        setQuestions(response);
      } catch (error: any) {
        if (error.response.data.response_code === 5) {
          window.alert("Terlalu banyak request, coba 5 detik lagi");
        }
      }
    };

    if (questions.length === 0) {
      fetchQuestion();
    }

    const intervalTimer = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(intervalTimer);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log(questions, answers);

      const result = calculateResult(questions, answers);
      const { correct, incorrect, answered } = result;
  
      setResults({
        correct,
        incorrect,
        answered
      });
  
      navigate("/result");
      reset();
    }
  }, [timer, navigate, questions, answers, setResults, reset]);

  const handleFinishQuiz = () => {
    const result = calculateResult(questions, answers);
    console.log(questions, answers);

    const { correct, incorrect, answered } = result;

    setResults({
      correct,
      incorrect,
      answered
    });

  
    navigate("/result");
    reset();
  };
  

  return (
    <div className="container flex flex-col md:flex-row h-screen py-8 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:max-w-xs bg-neutral-50 shadow-lg text-black rounded-lg p-6 space-y-4">
        <h1>{selectedCategoryName}</h1>
        <h2 className="text-lg font-semibold">Navigasi Soal</h2>
        <div className="px-4 p-2 bg-black text-white rounded-md w-fit">
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
                    ? "bg-gray-500"
                    : answers[index]
                    ? "bg-blue-500"
                    : "bg-gray-300"
                } aspect-square rounded-lg border border-gray-400 hover:bg-gray-500 flex items-center justify-center cursor-pointer transition`}
              >
                {index + 1}
              </div>
            ))}
        </div>
        <Button onClick={handleFinishQuiz} variant="dark" width="w-full" className="mt-4">
          Selesai
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          {questions[currentQuestionIndex]?.question}
        </h1>

        <div className="space-y-4">
          {questions[currentQuestionIndex]?.allAnswers.map((item, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 rounded-lg relative p-4 border hover:shadow-lg hover:bg-gray-200 cursor-pointer transition flex items-center gap-2"
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                id={`option-${index}`}
                value={item}
                checked={answers[currentQuestionIndex] === item}
                onChange={() => setAnswer(currentQuestionIndex, item)}
                className="cursor-pointer opacity-50 absolute w-full h-full"
              />
              <label htmlFor={`option-${index}`} className="cursor-pointer">
                {item}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={() => prev()} variant="dark-outline" width="w-fit">
            Kembali
          </Button>
          <Button onClick={() => next()} variant="dark" width="w-fit">
            Selanjutnya
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
