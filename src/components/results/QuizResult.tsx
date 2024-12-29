// QuizResults.tsx
import React from 'react';
import QuestionCard from './QuestionCard';

interface QuizResultsProps {
  answeredQuestions?: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
  }[];
}

const QuizResults: React.FC<QuizResultsProps> = ({ answeredQuestions }) => {
  return (
    <div className="bg-white shadow-lg text-primary rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Questions and Answers:</h2>
      <div className="space-y-6">
        {answeredQuestions?.map((question, index) => (
          <QuestionCard
            key={index}
            index={index}
            question={question.question}
            userAnswer={question.userAnswer}
            correctAnswer={question.correctAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizResults;
