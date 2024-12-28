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
    resetType
  } = useQuizTypeStore();
  const { questions,reset } = useQuizStore();
  const { userData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error: any) {
        if (error.response?.data?.response_code === 5) {
          window.alert("Terlalu banyak request, coba 5 detik lagi");
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
      return window.alert("Pilih kategori terlebih dahulu");
    }
    return window.alert("Jumlah soal harus di antara 1-50");
  };
  const handleResumeQuiz=()=>{
    return navigate('/quiz')
  }

  return (
    <div className="container h-screen flex items-center justify-center">
      <main className="bg-gray-300 w-full">
      <h1>Selamat Datang {userData?.name}</h1>
      {selectedCategoryId}
      {selectedCategoryName}
      {totalQuestion}
      <h1 className="text-2xl font-bold mb-4">
        Pilih Kategori dan Jumlah Soal
      </h1>

      <div className="">
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          Kategori
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
          className="w-full border  text-sm border-gray-300 rounded-lg p-2"
          required
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="questionCount"
          className="block text-lg font-medium mb-2"
        >
          Jumlah Soal
        </label>
        <input
          id="questionCount"
          name="questionCount"
          type="number"
          value={totalQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTotalQuestion(Number(e.target.value))
          }
          max={50}
          min={0}
          className="w-full border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="flex gap-2">
      <button
        onClick={handleStartQuiz}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        {questions.length > 0 ? "Mulai Quiz Baru" : "Mulai Quiz"}
      </button>

      {questions.length > 0 && (
        <Button variant="dark-outline" width="w-fit" onClick={handleResumeQuiz}>
          Lanjutkan Quiz
        </Button>
      )}

      <Button type="submit" variant="dark" width="w-fit" onClick={handleLogout}>
        Logout
      </Button>

      </div>

     

      </main>
    
    </div>
  );
};

export default Main;
