"use client";

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CreateSuccess from "../components/createSuccess";

const CreateSavingPage: React.FC = () => {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const isDisabled = !accountNumber || !amount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setShowSuccess(true); // 성공 모달 띄우기
    }
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col">
      {/* 상단 헤더 */}
      <div className="relative flex items-center justify-center mb-4">
        <button className="absolute left-0 cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft size={36} />
        </button>
        <h1 className="text-2xl font-bold">적금 이름</h1>
      </div>

      {/* 입력 영역: 중앙 정렬 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full bg-white rounded-md border border-black p-4 space-y-6 max-w-md">
          {/* 출금 계좌 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">출금 계좌 번호</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="입출금 계좌 번호 자동 입력"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
            />
          </div>

          {/* 납입 금액 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">납입 금액(원)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="예: 100000"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        {/* 가입 버튼 */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className={`font-semibold py-2 px-8 rounded-md shadow-md ${
              isDisabled
                ? "bg-[#C7C7C7] text-black cursor-not-allowed"
                : "bg-[#60B94D] hover:bg-green-600 text-white cursor-pointer"
            }`}
          >
            가입
          </button>
        </div>
      </form>

      {/* 가입 완료 모달 */}
      {showSuccess && <CreateSuccess />}
    </main>
  );
};

export default CreateSavingPage;
