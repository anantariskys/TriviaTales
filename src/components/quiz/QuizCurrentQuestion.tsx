import Button from '../Button'
import { useQuizStore } from '../../store/useQuizStore'
import getOptionsLabel from '../../utils/getOptionsLabel'

const QuizCurrentQuestion = () => {
    const {currentQuestionIndex,questions,answers,setAnswer,prev,next} = useQuizStore();
  return (
    <main className="flex-1 sticky top-8 text-primary bg-white rounded-lg shadow-md h-fit p-6 space-y-6">
    <h1
      className="text-2xl font-bold"
      dangerouslySetInnerHTML={{
        __html: `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex]?.question}`,
      }}
    />
    <div className="space-y-4">
      {questions[currentQuestionIndex]?.allAnswers.map((item, index) => (
        <div
          key={index}
          className={`${
            answers[currentQuestionIndex] === item
              ? "bg-primary text-tertiary"
              : "hover:bg-gray-200 bg-gray-100 "
          } active:scale-[99%] w-full rounded-lg relative p-4 border hover:shadow-lg  cursor-pointer transition-all flex items-center gap-2`}
        >
          <input
            type="radio"
            name={`question-${currentQuestionIndex}`}
            id={`option-${index}`}
            value={item}
            checked={answers[currentQuestionIndex] === item}
            onChange={() => setAnswer(currentQuestionIndex, item)}
            className={`cursor-pointer opacity-0 absolute w-full h-full`}
          />
          <label htmlFor={`option-${index}`}>{getOptionsLabel(index)}.</label>
          <div className="cursor-pointer">{item}</div>
        </div>
      ))}
    </div>

    <div className={`flex ${currentQuestionIndex === questions.length - 1 ? "justify-start" : currentQuestionIndex === 0 ? "justify-end" : "justify-between"} items-center`}>
      {currentQuestionIndex > 0 && (
        <Button onClick={() => prev()} variant="primary" width="w-fit">
          Prev
        </Button>
      )}
      {currentQuestionIndex < questions.length - 1 && (
        <Button onClick={() => next()} variant="primary" width="w-fit">
          Next
        </Button>
      )}
    </div>
  </main>
  )
}

export default QuizCurrentQuestion
