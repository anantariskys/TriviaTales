import axios from "axios";

const getQuestion = async (categoryId:number,totalQuestion:number) => {
  try {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=${totalQuestion}&category=${categoryId}&type=multiple`
    );
    const data = response.data.results;

    const formattedQuestions = data.map((q: any) => ({
      question: q.question,
      correctAnswer: q.correct_answer,
      allAnswers: [...q.incorrect_answers, q.correct_answer].sort(
        () => Math.random() - 0.5
      ), // Gabungkan dan acak
    }));
    return formattedQuestions;
  } catch (error) {
    throw error;
  }
};

const getCategory = async () => {
  try {
    const response = await axios.get("https://opentdb.com/api_category.php");
    const data = response.data.trivia_categories;

    return data;
  } catch (error) {
    throw error;
  }
};
export { getQuestion,getCategory };
