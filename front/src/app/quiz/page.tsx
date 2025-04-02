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

  const handleWrong = () => {
    setFlipped(true);
  };

  const handleCorrect = () => {
    router.push("/quiz/withdraw");
  };

  const handleRetry = () => {
    refetchQuiz();
    setFlipped(false);
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold">출금 퀴즈!!</h1>
      <br />
      <span className="font-bold">정답을 맞춰야 출금이 가능합니다!</span>
      <br />

      <div className="flip-container w-full max-w-md h-[420px]">
        <div className={`flipper ${flipped ? "flipped" : ""}`}>
          <div className="front">
            <QuizCard
              onWrongAnswer={handleWrong}
              onCorrectAnswer={handleCorrect}
              setQuizData={setQuizData}
              setRefetch={setRefetchQuiz}
            />
          </div>
          <div className="back">
            <QuizSolution onRetry={handleRetry} solution={quizData?.solution || ""} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default QuizPage;
