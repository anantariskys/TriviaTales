const getAnsweredQuestions = (questions: any[], answers: Record<number, string>) => {
    return questions.map((question, index) => ({
      question: question.question,
      userAnswer: answers[index] || "Belum Dijawab",
      correctAnswer: question.correctAnswer,
    }));
  };

  export  default getAnsweredQuestions;
  