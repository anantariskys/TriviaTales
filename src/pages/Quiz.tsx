import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { getQuestion } from "../api/services/quiz";
import { useQuizStore } from "../store/useQuizStore";
import { useQuizTypeStore } from "../store/useQuizTypeStore";
import formatTime from "../utils/formatTime";
import calculateResult from "../utils/calculateResult";
import getOptionsLabel from "../utils/getOptionsLabel";
import getAnsweredQuestions from "../utils/getAnsweredQuestion";

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
    setResults,
  } = useQuizStore();
  const { selectedCategoryId, totalQuestion, selectedCategoryName, resetType } =
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

    if (selectedCategoryId == null || totalQuestion<1) {
      navigate("/");
    }else{
      if (questions.length === 0) {
        fetchQuestion();
      }
  
      const intervalTimer = setInterval(() => {
        decrementTimer();
      }, 1000);
      
      return () => clearInterval(intervalTimer);
    }


  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log(questions, answers);
      const answeredQuestions = getAnsweredQuestions(questions, answers);

      const result = calculateResult(questions, answers);
      const { correct, incorrect, answered } = result;

      setResults({
        correct,
        incorrect,
        answered,
        totalQuestion: questions.length ,
        answeredQuestions
      });

      navigate("/result");
      reset();
      resetType();
    }
  }, [timer, navigate, questions, answers, setResults, reset]);

  const handleFinishQuiz = () => {
    const answeredQuestions = getAnsweredQuestions(questions, answers);
  
    const result = calculateResult(questions, answers);
    const { correct, incorrect, answered } = result;
  
    setResults({
      correct,
      incorrect,
      answered,
      totalQuestion: questions.length,
      answeredQuestions,  // Simpan soal dan jawaban yang dijawab
    });
  
    navigate("/result");
    reset();
    resetType();
  };
  

  return (
    <div
      style={{
        backgroundColor: "#f4f6ff",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}
    >
      <div className="container flex py-8  gap-4 flex-col md:flex-row min-h-screen">
        <aside className="w-full md:max-w-xs h-fit bg-primary text-tertiary  shadow-lg rounded-lg p-6 space-y-4">
          <h1 className="text-secondary font-semibold text-2xl">
            Trivia Tales
          </h1>
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
                  } aspect-square rounded-lg border  border-tertiary hover:bg-opacity-80 flex items-center justify-center cursor-pointer transition`}
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
        <main className="flex-1 sticky top-8 text-primary bg-white rounded-lg shadow-md h-fit p-6 space-y-6">
        <h1 className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex]?.question}` }} />
          <div className="space-y-4">
            {questions[currentQuestionIndex]?.allAnswers.map((item, index) => (
              <div
                key={index}
                className={`${answers[currentQuestionIndex] === item ? "bg-primary text-tertiary" : "hover:bg-gray-200 bg-gray-100 "} active:scale-[99%] w-full rounded-lg relative p-4 border hover:shadow-lg  cursor-pointer transition-all flex items-center gap-2`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  id={`option-${index}`}
                  value={item}
                  checked={answers[currentQuestionIndex] === item}
                  onChange={() => setAnswer(currentQuestionIndex, item)}
                  className={`cursor-pointer opacity-0 absolute w-full h-full`}
                />
                <label htmlFor={`option-${index}`}>{getOptionsLabel(index)}.</label>
                <label htmlFor={`option-${index}`} className="cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={() => prev()} variant="primary" width="w-fit">
              Kembali
            </Button>
            <Button onClick={() => next()} variant="primary" width="w-fit">
              Selanjutnya
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Quiz;
