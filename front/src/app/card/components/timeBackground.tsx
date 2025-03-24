"use client";
import { useEffect, useState } from "react";

const TimeBackground = () => {
  const [timeBg, setTimeBg] = useState("");
  const updateBackgroundRotation = () => {
    const date = new Date();
    const currentTime = date.getHours();
    if (currentTime < 18 && currentTime >= 9) {
      setTimeBg(bgColors[0]);
    } else {
      setTimeBg(bgColors[1]);
    }
  };
  const bgColors = ["#C1E6FA", "#172554"]; // 낮&밤

  useEffect(() => {
    updateBackgroundRotation();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
      <div
        id="time-bg"
        style={{ backgroundColor: timeBg }}
        className={`fixed top-[-100vmax] left-[-100vmax] w-[200vmax] h-[200vmax]`}
      ></div>
    </div>
  );
};

export default TimeBackground;
