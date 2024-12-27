import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { getQuestion } from '../api/services/quiz';
import { useQuizStore } from '../store/useQuizStore';
import { useQuizTypeStore } from '../store/useQuizTypeStore';

const Quiz = () => {
  const {questions, setQuestions,currentQuestionIndex,next,prev,setCurrentQuestionIndex} = useQuizStore();
  const {selectedCategoryId,totalQuestion}=useQuizTypeStore()

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async ()=>{
      try {
        const respone = await getQuestion(selectedCategoryId?selectedCategoryId:1,totalQuestion);
        console.log(respone)
        setQuestions(respone);
      } catch (error:any) {
        if (error.response.data.response_code===5) window.alert('terlalu banyak request, coba 5 detik lagi')
        // console.error(error.response);
      }
    }
    fetchQuestion();
  },[])

  return (
    <div className="container flex flex-col md:flex-row h-screen py-8 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:max-w-xs bg-neutral-50 shadow-lg text-black rounded-lg p-6 space-y-4">
        <h1>{selectedCategoryId}</h1>
        <h2 className="text-lg font-semibold">Navigasi Soal</h2>
        <div className="grid grid-cols-5 gap-2">
          {questions.length > 0 && Array.from({ length: questions.length }).map((_, index) => (
            <div
            onClick={()=>setCurrentQuestionIndex(index)}
              key={index}
              className={`${currentQuestionIndex === index ? 'bg-gray-500' : ''} aspect-square rounded-lg border border-gray-400 bg-gray-300 hover:bg-gray-500 flex items-center justify-center cursor-pointer transition`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <Button variant="dark" width="w-full" className="mt-4">
          Selesai
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold">
         {
          questions[currentQuestionIndex]?.question
         }
        </h1>

        <div className="space-y-4">
          {questions[currentQuestionIndex]?.allAnswers.length>0&&questions[currentQuestionIndex]?.allAnswers.map((item, index) => (
            <div
              key={index}
              className="w-full bg-gray-100 rounded-lg p-4 border hover:shadow-lg hover:bg-gray-200 cursor-pointer transition"
            >
              <span className="font-medium">a.</span> {item}
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center'>
          <Button onClick={() => prev()} variant="dark-outline" width="w-fit">Kembali</Button>
          <Button onClick={() => next()} variant="dark" width="w-fit">Selanjutnya</Button>

        </div>
      </main>
    </div>
  );
};

export default Quiz;
