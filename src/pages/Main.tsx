import React, { useEffect } from "react";
import { useQuizTypeStore } from "../store/useQuizTypeStore";
import { getCategory } from "../api/services/quiz";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useQuizStore } from "../store/useQuizStore";

const Main = () => {
  const {
    setCategories,
    categories,
    selectedCategoryId,
    setSelectedCategory,
    selectedCategoryName,
    setTotalQuestion,
    totalQuestion,
    resetType,
  } = useQuizTypeStore();
  const { questions, reset } = useQuizStore();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error: any) {
        if (error.response?.data?.response_code === 5) {
          window.alert("Too many requests, please try again in 5 seconds.");
        } else {
          console.error(error);
        }
      }
    };
    fetchCategories();
  }, [setCategories]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    resetType();
    navigate("/login");
  };

  const handleStartQuiz = () => {
    if (totalQuestion > 0 && totalQuestion <= 50) {
      if (selectedCategoryId !== null) {
        reset();
        return navigate("/quiz");
      }
      return window.alert("Please select a category first.");
    }
    return window.alert("Number of questions must be between 1-50.");
  };

  const handleResumeQuiz = () => {
    return navigate("/quiz");
  };

  return (
    <div
      className=" bg-tertiary "
      style={{
        backgroundColor: "#f4f6ff",
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/inspiration-geometry.png)",
      }}
    >
      <div className="container min-h-screen py-4 flex lg:flex-row flex-col gap-4 items-center justify-center">
        <aside className="max-w-sm w-full p-4 rounded-lg shadow-lg bg-primary ">
          <h1 className="text-tertiary text-2xl mb-4">
            Welcome to{" "}
            <span className="text-secondary font-semibold">TriviaTales</span>,{" "}
            {userData?.name}!
          </h1>{" "}
          <h2 className="text-secondary text-xl font-semibold mb-2">
            Instructions
          </h2>
          <ol className="text-tertiary text-sm  list-decimal list-inside space-y-2">
            <li>
              Select a category and the total number of trivia questions you
              want to attempt.
            </li>
            <li>
              The time allocated depends on the total number of questions you
              select (<strong>30 seconds per question</strong>).
            </li>
            <li>Answer all the questions before the time runs out!</li>
            <li className="font-semibold">Good luck and have fun!</li>
          </ol>
        </aside>

        <main className="p-4 w-full max-w-3xl rounded-md bg-opacity-80 bg-white shadow-md">
          <h1 className="text-2xl text-primary font-bold">
            Choose a Category and Number of Questions
          </h1>
          <div className="space-y-4 text-primary">
            <div className="space-y-1">
              <label htmlFor="category" className="block text-lg font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCategory(
                    Number(e.target.value),
                    e.target.options[e.target.selectedIndex].text
                  )
                }
                value={selectedCategoryId || ""}
                className="w-full border text-sm border-gray-300 rounded-lg p-2"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="">
              <label
                htmlFor="questionCount"
                className="block text-lg font-medium"
              >
                Number of Questions
              </label>

              <input
                id="questionCount"
                name="questionCount"
                value={totalQuestion}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTotalQuestion(Number(e.target.value))
                }
                max={50}
                min={0}
                className="w-full border accent-secondary border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div className="flex md:flex-row flex-col gap-2">
              <Button onClick={handleStartQuiz} variant="primary">
                {questions.length > 0 ? "Start New Quiz" : "Start Quiz"}
              </Button>

              {questions.length > 0 && (
                <Button variant="primary-outline" onClick={handleResumeQuiz}>
                  Resume Quiz
                </Button>
              )}

              <Button type="submit" variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
