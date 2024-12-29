import React from "react";
import Badge from "../Badge";

type QuizSummaryProps = {
    results: {
        correct: number;
        incorrect: number;
        answered: number;
        totalQuestion: number;
    };
}
const QuizSummary: React.FC<QuizSummaryProps> = ({results}) => (
  <>
    <div>
      <h1 className="text-4xl font-extrabold">Quiz Results</h1>
      <p>Your quiz results are ready! Here's a summary of your performance:</p>
    </div>
    <div className="font-medium flex md:flex-row flex-col gap-4">
      <Badge
        label="Correct Answers"
        value={results.correct}
        color="bg-green-100"
        textColor="text-green-800"
      />
      <Badge
        label="Incorrect Answers"
        value={results.incorrect}
        color="bg-red-100"
        textColor="text-red-800"
      />
      <Badge
        label="Answered"
        value={results.answered}
        color="bg-yellow-100"
        textColor="text-yellow-800"
      />
      <Badge
        label="Unanswered"
        value={results.totalQuestion - results.answered}
        color="bg-gray-100"
        textColor="text-gray-800"
      />
      <Badge
        label="Total Questions"
        value={results.totalQuestion}
        color="bg-blue-100"
        textColor="text-blue-800"
      />
    </div>
  </>
);

export default QuizSummary;
