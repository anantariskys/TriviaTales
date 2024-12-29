import React from 'react';

interface AnswerDetailProps {
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

const AnswerDetail: React.FC<AnswerDetailProps> = ({ userAnswer, correctAnswer, isCorrect }) => (
  <div className='space-y-2 text-xs md:text-base'>
    <div
      className={` p-2 rounded-md bg-tertiary ${isCorrect ? 'text-green-700' : 'text-red-700'}`}
    >
      <p>
        <span className="font-bold">Your Answer:</span> {userAnswer}
      </p>
    </div>

    {!isCorrect && (
      <div className=" p-2 bg-green-100 text-green-800 rounded-md">
        <p>
          <span className="font-bold">Correct Answer:</span> {correctAnswer}
        </p>
      </div>
    )}
  </div>
);

export default AnswerDetail;
