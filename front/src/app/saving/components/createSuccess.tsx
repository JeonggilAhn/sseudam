"use client";

import React from "react";
import { useRouter } from "next/navigation";

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
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-[90%] shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4">가입이 완료되었습니다! 🎉</h2>
        <p className="text-sm mb-6">
          {startDate}부터 <strong>{productName}</strong>에<br />
          매달 <strong>{amount.toLocaleString()}원</strong>을 송금합니다.
        </p>
        <button
          className="bg-[#60B94D] text-white py-2 px-6 rounded font-semibold"
          onClick={handleConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default CreateSuccess;
