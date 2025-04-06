"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { Wallet } from "lucide-react";

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
        router.push(`/quiz/approval?amount=${transactionBalance}`);
      } else {
        toast.error("송금에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("송금 오류:", error);
      toast.error("송금 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 max-w-sm w-[90%] shadow-xl text-center space-y-6">
        <Wallet size={48} className="mx-auto text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">이체 확인</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            계좌번호: <span className="font-medium text-blue-600">{depositAccountNo}</span>
          </p>
          <p>
            금액:{" "}
            <span className="font-bold text-green-600">
              {Number(transactionBalance || "0").toLocaleString()}원
            </span>
          </p>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            취소
          </button>
          <button
            onClick={handleMove}
            className="w-full py-2 bg-gradient-to-r from-green-500 to-green-400 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-500 transition"
          >
            송금
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
