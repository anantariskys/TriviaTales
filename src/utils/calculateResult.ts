import { Question } from "../store/useQuizStore";
const calculateResult = (questions : Question[], answers: Record<number, string>) => {
  const correctAnswers = questions.filter(
    (q, index) => answers[index] === q.correctAnswer
  ).length;
  const answeredQuestions = Object.keys(answers).length;
  const incorrectAnswers = answeredQuestions - correctAnswers;

  return { correct: correctAnswers, incorrect: incorrectAnswers, answered: answeredQuestions };
};

export default calculateResult
