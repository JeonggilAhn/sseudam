"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CreateSuccess: React.FC = () => {
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/saving/detail");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 max-w-sm w-[90%] shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4">가입이 완료되었습니다! 🎉</h2>
        <p className="text-sm mb-6">~~날짜 부터 적금이름 에 매달 적금금액 원을 송금합니다. </p>
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
