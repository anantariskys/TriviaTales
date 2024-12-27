import React, { useEffect, useState } from 'react';

interface TimerProps {
  onExpire: () => void;
}

const Timer: React.FC<TimerProps> = ({ onExpire }) => {
  const [time, setTime] = useState<number>(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  return <div className="timer">Time Left: {time}s</div>;
};

export default Timer;
