"use client";

import React from "react";
import { Eye, Heart } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";

const SavingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-[#0074D9] px-4 py-3 w-full max-w-3xl mx-auto shadow flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 min-w-[100px]">
        <Icon name={getBankIconName("싸피은행")} width={120} height={40} />
      </div>

      <div className="flex flex-col items-center text-center flex-1">
        <div className="font-bold text-lg">WON적금</div>
        <div className="text-sm">4 % ~ 6 %</div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button className="bg-[#60B94D] hover:bg-green-600 font-bold text-sm px-3 py-1 border border-black shadow-sm cursor-pointer">
          가입하기
        </button>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>2,457</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} fill="red" color="black" />
            <span>784</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
