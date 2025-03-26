"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface WithdrawModalProps {
  depositAccountNo: string;
  transactionBalance: string;
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  depositAccountNo,
  transactionBalance,
  onClose,
}) => {
  const router = useRouter(); // 이 위치가 맞음

  const handleMove = () => {
    onClose();
    router.push(`/quiz/check?amount=${transactionBalance}`);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
        <h2 className="text-xl font-bold">이체 확인</h2>
        <p className="text-sm">계좌번호: {depositAccountNo}</p>
        <p className="text-sm">금액: {parseInt(transactionBalance).toLocaleString()}원</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            취소
          </button>
          <button
            onClick={handleMove}
            className="px-4 py-2 bg-[#FF9800] text-black rounded hover:bg-orange-500"
          >
            송금
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
