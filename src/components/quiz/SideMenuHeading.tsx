import formatTime from "../../utils/formatTime";
import { useQuizTypeStore } from "../../store/useQuizTypeStore";
import { useQuizStore } from "../../store/useQuizStore";

const SideMenuHeading = () => {
  const { selectedCategoryName } = useQuizTypeStore();
  const { timer } = useQuizStore();
  return (
    <>
      <h1 className="text-secondary font-semibold text-2xl">Trivia Tales</h1>
      <h2>Category : {selectedCategoryName}</h2>
      <div className="px-4 p-2 bg-tertiary text-primary rounded-md w-fit">
        Remaining Time : {formatTime(timer)}
      </div>
    </>
  );
};

export default SideMenuHeading;
