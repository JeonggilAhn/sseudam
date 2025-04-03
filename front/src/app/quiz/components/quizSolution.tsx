"use client";

import React from "react";

interface QuizSolutionProps {
  onRetry: () => void;
  solution: string;
}

const QuizSolution: React.FC<QuizSolutionProps> = ({ onRetry, solution }) => {
  return (
    <section className="w-full h-[420px] bg-white rounded-xl border-2 border-black p-6 flex flex-col justify-between items-center">
      <span className="text-3xl font-bold text-center">오답!!</span>
      <div className="flex-1 flex items-center justify-center text-center px-2">
        <p className="text-base sm:text-lg font-medium leading-relaxed">{solution}</p>
      </div>

      <button
        onClick={onRetry}
        className="bg-[#FF9800] hover:bg-[#ffb733] text-black font-bold py-2 px-6 rounded border-2 border-black transition text-sm sm:text-base"
      >
        새로운 문제 풀기
      </button>
    </section>
  );
};

export default QuizSolution;
