import { useQuizStore } from "../store/useQuizStore";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import QuizResults from "../components/results/QuizResult";
import QuizSummary from "../components/results/QuizSummary";
import { useEffect, useState } from "react";

const Result = () => {
  const [score, setScore] = useState(0);
  const { results,resetResults } = useQuizStore();

  const navigate = useNavigate();
  
  useEffect(() => {
    if (results.answeredQuestions.length === 0) {
      navigate("/");
    }
    setScore(results.correct
      ? (results.correct / results.totalQuestion) * 100
      : 0)


      return () => {
        resetResults()
      }
  }, []);
  

  const handleBackToHome = () => {
    navigate("/");
   
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f6ff",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}
    >
      <div className="container space-y-4 py-4 md:py-8 text-primary">
        <div className="bg-white shadow-lg w-full  p-6 h-full flex md:flex-row flex-col gap-4 items-center justify-between  rounded-lg   ">
          <div className="flex flex-col gap-4 ">
           <QuizSummary results={results}/>
          </div>
         <div>
         <CircularProgressbar
            value={score}
            className="text-primary w-40"
            text={`${score.toFixed(2)}/100`}
            strokeWidth={10}
            styles={{
              path: {
                stroke: `#10375C`,
                strokeLinecap: "round",
              },
              text: {
                fill: "#10375C",
                fontSize: "12px",
                fontWeight: "bold",
                dominantBaseline: "middle",
                textAnchor: "middle",
              },
              trail: {
                stroke: "#d6d6d6",
              },
            }}
          />
         </div>
        </div>

       <QuizResults answeredQuestions={results.answeredQuestions}/>

        <Button
          onClick={handleBackToHome}
          variant="secondary"
          width="w-fit"
          className="mt-6 mx-auto"
        >
          Back to Home Page
        </Button>
      </div>
    </div>
  );
};

export default Result;
