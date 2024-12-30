import React from "react";
import { Icon } from "@iconify/react";

interface AnswerIconsProps {
  isCorrect: boolean;
}

const AnswerIcons: React.FC<AnswerIconsProps> = ({ isCorrect }) => (
  <div className="flex items-center justify-center bg-tertiary gap-2 py-1 rounded-md px-3">
    {isCorrect ? (
      <>
        <Icon
          icon="mdi:check-circle"
          className="text-green-500"
          width="24"
          height="24"
        />
        <p>Correct</p>
      </>
    ) : (
      <>
        <Icon
          icon="mdi:close-circle"
          className="text-red-500"
          width="24"
          height="24"
        />
        <p>Incorrect </p>
      </>
    )}
  </div>
);

export default AnswerIcons;
