"use client";

import React from "react";

interface QuizSolutionProps {
  onRetry: () => void;
}

const QuizSolution: React.FC<QuizSolutionProps> = ({ onRetry }) => {
  return (
    <main className="w-full max-w-md h-[420px] rounded-lg bg-white border-2 border-black overflow-hidden p-6 flex flex-col justify-between items-center">
      {/* 해설 */}
      <div className="flex-1 flex items-center justify-center text-lg font-semibold text-black leading-relaxed text-center">
        <div>
          <p className="mb-4">
            상품들의 가격 수준이 전반적으로 상승하는 현상을 인플레이션이라고 합니다. 문제는
            디플레이션에 대한 설명입니다.
          </p>
        </div>
      </div>

      {/* 버튼 */}
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
