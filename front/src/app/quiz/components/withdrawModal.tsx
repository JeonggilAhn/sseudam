"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

interface WithdrawModalProps {
  depositAccountNo: string; // 출금할 계좌 번호
  transactionBalance: string; // 이체할 금액 (문자열로 전달됨)
  onClose: () => void;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  depositAccountNo,
  transactionBalance,
  onClose,
}) => {
  const router = useRouter();

  const handleMove = async () => {
    try {
      const requestBody = {
        account_no: depositAccountNo,
        amount: parseInt(transactionBalance, 10),
      };

      const res = await axiosInstance.post("/accounts/my/withdraw", requestBody);

      if (res?.data?.status?.code === "default-200") {
        onClose();
        router.push(`/quiz/check?amount=${transactionBalance}`);
      } else {
        toast.error("송금에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("송금 오류:", error);
      toast.error("송금 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white border p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
        <h2 className="text-xl font-bold">이체 확인</h2>
        <p className="text-sm">계좌번호: {depositAccountNo}</p>
        <p className="text-sm">금액: {Number(transactionBalance || "0").toLocaleString()}원</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            취소
          </button>
          <button
            onClick={handleMove}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded hover:from-green-600 hover:to-green-500 transition"
          >
            송금
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
