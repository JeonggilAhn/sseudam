"use client";

import React, { useState } from "react";
import WithdrawModal from "../components/withdrawModal";

const WithdrawPage: React.FC = () => {
  const [depositAccountNo, setDepositAccountNo] = useState("");
  const [transactionBalance, setTransactionBalance] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isDisabled = !depositAccountNo || !transactionBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setShowModal(true); // 모달 띄우기
    }
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-6 flex flex-col">
      {/* 상단 헤더 */}
      <div className="relative flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">계좌 이체</h1>
      </div>

      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full bg-white rounded-md border border-black p-4 space-y-6 max-w-md">
          {/* 계좌 번호 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">계좌 번호</label>
            <input
              type="text"
              value={depositAccountNo}
              onChange={(e) => setDepositAccountNo(e.target.value)}
              placeholder="이체할 계좌 번호 입력"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
            />
          </div>

          {/* 금액 */}
          <div className="flex items-center">
            <label className="w-28 font-semibold">금액(원)</label>
            <input
              type="number"
              value={transactionBalance}
              onChange={(e) => setTransactionBalance(e.target.value)}
              placeholder="예: 50000"
              className="flex-1 text-sm border border-gray-300 rounded px-3 py-2 outline-none text-right"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={isDisabled}
            className={`font-semibold py-2 px-8 rounded-md shadow-md ${
              isDisabled
                ? "bg-[#C7C7C7] text-black cursor-not-allowed"
                : "bg-[#FF9800] hover:bg-orange-500 text-black cursor-pointer"
            }`}
          >
            다음
          </button>
        </div>
      </form>

      {/* 모달 */}
      {showModal && (
        <WithdrawModal
          depositAccountNo={depositAccountNo}
          transactionBalance={transactionBalance}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default WithdrawPage;
