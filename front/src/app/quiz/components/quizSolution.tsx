"use client";

import React from "react";

interface QuizSolutionProps {
  onRetry: () => void;
  solution: string;
}

const QuizSolution: React.FC<QuizSolutionProps> = ({ onRetry, solution }) => {
  return (
    <main className="w-full max-w-md h-[420px] rounded-lg bg-white border-2 border-black overflow-hidden p-6 flex flex-col justify-between items-center">
      <div className="flex-1 flex items-center justify-center text-lg font-semibold text-black leading-relaxed text-center">
        <div>
          <p className="mb-4">{solution}</p>
        </div>
      </div>

      <button
        onClick={onRetry}
        className="bg-[#FF9800] hover:bg-[#ffb733] text-black font-bold py-2 px-4 rounded border-2 border-black transition"
      >
        새로운 문제 풀기
      </button>
    </main>
  );
};

export default QuizSolution;
