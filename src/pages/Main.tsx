import React, { useEffect, useState } from "react";
import { useQuizTypeStore } from "../store/useQuizTypeStore";
import { getCategory } from "../api/services/quiz";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Main = () => {
    const {setCategories,categories,selectedCategoryId,setSelectedCategory,setTotalQuestion,totalQuestion}=useQuizTypeStore();
    const {userData} = useAuthStore();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    questionCount: 10,
  });

  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await getCategory();
            setCategories(response);
        } catch (error:any) {
            if (error.response.data.response_code===5) window.alert('terlalu banyak request, coba 5 detik lagi')
        }
    }
    fetchCategories()
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  const handleStartQuiz = () => {
    if (totalQuestion>0 && totalQuestion<51) {
        if (selectedCategoryId!==null) {
            return navigate("/quiz")
        }
        return window.alert('pilih kategori terlebih dahulu')
    };
    return window.alert('jumlah soal harus diantara 1-50')
  };


  return (
    <div className="container mx-auto p-4">
        <h1>Selamat Datang {userData?.name}</h1>
      <h1 className="text-2xl font-bold mb-4">Pilih Kategori dan Jumlah Soal</h1>
      <form className="space-y-4">
      
        {/* Dropdown untuk Kategori */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium mb-2">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e:any)=>setSelectedCategory(e.target.value)}
            className="w-full border  text-sm border-gray-300 rounded-lg p-2"
            required
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((category:any) => (
              <option key={category.id} value={category.id}>{category.name}</option>
               
            ))}
          </select>
        </div>

        {/* Input untuk Jumlah Soal */}
        <div>
          <label htmlFor="questionCount" className="block text-lg font-medium mb-2">
            Jumlah Soal
          </label>
          <input
            id="questionCount"
            name="questionCount"
            type="number"
            onChange={(e:any)=>setTotalQuestion(e.target.value)}
            max={50}
            min={1}
          
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>

        {/* Tombol Submit */}
        <button
          onClick={()=>handleStartQuiz()}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Mulai Quiz
        </button>
      </form>
        <Button
          type="submit"
          variant="dark"
          width="w-fit"
          onClick={()=>handleLogout()}
        >
         Logout
        </Button>
    </div>
  );
};

export default Main;
