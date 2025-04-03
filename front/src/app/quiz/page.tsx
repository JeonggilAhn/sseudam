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
    console.log("정답! 페이지 이동 시도");
    router.push("/quiz/transfer");
  };
  const handleRetry = () => {
    refetchQuiz();
    setFlipped(false);
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] flex flex-col items-center justify-start pt-10 pb-28 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">출금 퀴즈!!</h1>
      <p className="mt-2 text-center font-medium text-sm sm:text-base">
        정답을 맞춰야 출금이 가능합니다!
      </p>

      <div className="w-full max-w-md mt-8 perspective">
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
