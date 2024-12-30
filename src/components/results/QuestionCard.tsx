import React from "react";
import AnswerDetail from "./AnswerDetail";
import AnswerIcons from "./AnswerIcon";

interface QuestionCardProps {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  index: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  correctAnswer,
  index,
}) => {
  const isCorrect = userAnswer === correctAnswer;
  return (
    <div
      className={`${
        isCorrect ? "bg-green-400" : "bg-red-400"
      } space-y-2 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="flex md:flex-row flex-col-reverse items-start md:items-center gap-2 justify-between">
        <h1
          className="text-sm md:text-lg font-medium text-dark"
          dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question}` }}
        />

        <AnswerIcons isCorrect={isCorrect} />
      </div>
      <AnswerDetail
        userAnswer={userAnswer}
        correctAnswer={correctAnswer}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default QuestionCard;
