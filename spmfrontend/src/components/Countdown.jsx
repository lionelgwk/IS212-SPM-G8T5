import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);
    }, 1000);

    return () => clearInterval(interval);
  });

  function calculateRemainingTime() {
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      // Target time has passed
      return 0;
    } else {
      return Math.floor(timeDifference / 1000);
    }
  }

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": Math.floor(remainingTime / (60 * 60 * 24)) }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": Math.floor((remainingTime % (60 * 60 * 24)) / 3600) }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": Math.floor((remainingTime % 3600) / 60) }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": remainingTime % 60 }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
