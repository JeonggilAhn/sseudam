"use client";

import React from "react";
import { Eye, Heart } from "lucide-react";
import Icon from "@/components/Icon"; // 은행 로고
import { getBankIconName } from "@/components/bankList";

const SavingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-2 border-[#0074D9] p-4 w-full max-w-md mx-auto shadow-md relative">
      <h2 className="text-center font-semibold text-lg mb-3">SSAFY취업적금</h2>

      <div className="text-sm text-black leading-6 mb-4">
        <p>가입기간 : 6개월 ~ 2년</p>
        <p>가입금액 : 월 100만원 이내</p>
        <p>금리 : 4 % ~ 6 %</p>
      </div>

      <div className="flex justify-between items-end mt-6">
        <div className="flex items-center gap-2">
          <Icon name={getBankIconName("싸피은행")} width={80} height={40} />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <Eye size={16} />
            <span>4,167</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-red-500">
            <Heart size={16} fill="red" color="black" />
            <span>3,424</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
