"use client";

import React, { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import WithdrawModal from "../components/withdrawModal";
import { SelectBank } from "@/components/ui/customSelect";

const WithdrawPage: React.FC = () => {
  const [depositAccountNo, setDepositAccountNo] = useState("");
  const [transactionBalance, setTransactionBalance] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [showModal, setShowModal] = useState(false);

  const isDisabled = !depositAccountNo || !transactionBalance || !selectedBank;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setShowModal(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#C1E6FA] pt-6 pb-28 px-4 flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">계좌 이체</h1>
      </div>

      <section className="flex-1 flex flex-col justify-center items-center w-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
          <div className="w-full bg-white rounded-xl border border-blue-200 shadow-md p-6 space-y-8">
            {/* 연결 은행 선택 */}
            <div className="space-y-1 w-full">
              <label className="flex items-center font-medium text-gray-700 mb-1">연결 은행</label>
              <SelectBank
                name="bankList"
                id="bankList"
                value={selectedBank}
                onChange={(value) => setSelectedBank(value)}
                onBlur={() => {}} // 빈 함수라도 넘기면 오류 사라짐
              />
            </div>

            {/* 출금 계좌 */}
            <div className="space-y-1">
              <label className="flex items-center font-medium text-gray-700">
                <CreditCard size={18} className="mr-2 text-blue-500" />
                출금 계좌 번호
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={depositAccountNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setDepositAccountNo(value);
                  }
                }}
                placeholder="이체할 계좌 번호 입력"
                className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-right placeholder:text-left"
              />
            </div>

            {/* 금액 */}
            <div className="space-y-1">
              <label className="flex items-center font-medium text-gray-700">
                <Wallet size={18} className="mr-2 text-blue-500" />
                금액(원)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={transactionBalance}
                  onChange={(e) => setTransactionBalance(e.target.value)}
                  placeholder="예: 50000"
                  className="w-full text-base border border-gray-300 rounded-lg px-4 py-3 pr-14 outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-right placeholder:text-left"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                  원
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-md">
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full font-bold py-4 px-8 rounded-xl shadow flex items-center justify-center transition-all ${
                isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white"
              }`}
            >
              다음
            </button>
          </div>
        </form>
      </section>

      {/* 모달 */}
      {showModal && (
        <WithdrawModal
          depositAccountNo={depositAccountNo}
          transactionBalance={transactionBalance}
          selectedBank={selectedBank}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
};

export default WithdrawPage;
