"use client";
import { useEffect, useState } from "react";

const TimeBackground = () => {
  const [timeBg, setTimeBg] = useState("#C1E6FA");
  const updateBackgroundRotation = () => {
    const date = new Date();
    const currentTime = date.getHours();
    if (currentTime < 18 && currentTime >= 9) {
      setTimeBg("#C1E6FA");
    } else {
      setTimeBg("#172554");
    }
  };

  useEffect(() => {
    updateBackgroundRotation();
  }, []);

  return (
    <div className="max-w-[1280px] w-full mx-auto px-4">
      <div className="absolute top-0 left-0 overflow-hidden">
        <div
          id="time-bg"
          style={{ backgroundColor: timeBg }}
          className={`fixed top-[-100vmax] left-[-100vmax] w-[200vmax] h-[200vmax] transition-all`}
        ></div>
      </div>
    </div>
  );
};

export default TimeBackground;
