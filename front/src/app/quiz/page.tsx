"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "./components/quizCard";
import QuizSolution from "./components/quizSolution";

const QuizPage: React.FC = () => {
  const [flipped, setFlipped] = useState(false); // 카드 뒤짚기
  const router = useRouter();

  const handleWrong = () => {
    setFlipped(true);
  }; // 정답시 출금

  const handleCorrect = () => {
    router.push("/quiz/withdraw");
  }; // 오답시 해설

  const handleRetry = () => {
    setFlipped(false);
  }; // 새로운 퀴즈 풀기

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">출금 퀴즈!!</h1>
      <br />
      <span className="font-bold">정답을 맞춰야 출금이 가능합니다!</span>
      <br />

      {/* 카드 flip 영역 */}
      <div className="flip-container w-full max-w-md h-[420px]">
        <div className={`flipper ${flipped ? "flipped" : ""}`}>
          <div className="front">
            <QuizCard onWrongAnswer={handleWrong} onCorrectAnswer={handleCorrect} />
          </div>
          <div className="back">
            <QuizSolution onRetry={handleRetry} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
