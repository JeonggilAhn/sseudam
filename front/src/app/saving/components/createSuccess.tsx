"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

type Props = {
  productName: string;
  amount: number;
  startDate: string;
};

const CreateSuccess: React.FC<Props> = ({ productName, amount, startDate }) => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/saving/detail");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 max-w-sm w-[90%] shadow-xl text-center space-y-6">
        <CheckCircle size={48} className="mx-auto text-green-500" />
        <h2 className="text-xl font-bold text-gray-800">가입이 완료되었습니다!</h2>
        <p className="text-sm text-gray-700">
          <span className="font-medium text-blue-600">{startDate}</span>부터
          <br />
          <span className="font-bold">{productName}</span>에
          <br />
          매일 <span className="font-bold"> {amount.toLocaleString()}원</span>을 송금합니다.
        </p>
        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-bold py-3 rounded-lg transition cursor-pointer"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CreateSuccess;
