"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "./components/quizCard";
import { QuizData } from "@/types/quiz";
import QuizSolution from "./components/quizSolution";

const QuizPage: React.FC = () => {
  const [flipped, setFlipped] = useState(false);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [refetchQuiz, setRefetchQuiz] = useState<() => void>(() => () => {});
  const router = useRouter();

  const handleWrong = () => setFlipped(true);
  const handleCorrect = () => {
    document.body.classList.add("flash-bg");
    setTimeout(() => {
      document.body.classList.remove("flash-bg");
      router.push("/quiz/transfer");
    }, 400);
  };
  const handleRetry = () => {
    refetchQuiz();
    setFlipped(false);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-sky-200 to-blue-100 flex flex-col items-center justify-start pt-10 pb-28 px-4 sm:px-6">
      <div className="mb-8 text-center animate-fade-slide-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600">
          출금 퀴즈!!
        </h1>
        <p className="mt-3 text-center font-medium text-gray-800 text-sm sm:text-base">
          정답을 맞춰야 출금이 가능합니다!
        </p>
      </div>

      <div className="w-full max-w-md mt-4 perspective">
        <div
          className={`flipper relative transition-all duration-700 ${flipped ? "rotate-y-180" : ""}`}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          }}
        >
          <div
            className={`front absolute w-full ${flipped ? "opacity-0" : "opacity-100"}`}
            style={{
              backfaceVisibility: "hidden",
              transition: "opacity 0.4s ease",
            }}
          >
            <QuizCard
              onWrongAnswer={handleWrong}
              onCorrectAnswer={handleCorrect}
              setQuizData={setQuizData}
              setRefetch={setRefetchQuiz}
            />
          </div>
          <div
            className={`back absolute w-full ${flipped ? "opacity-100" : "opacity-0"}`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              transition: "opacity 0.4s ease",
            }}
          >
            <QuizSolution onRetry={handleRetry} solution={quizData?.solution || ""} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
