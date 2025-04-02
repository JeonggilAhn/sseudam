"use client";

import React from "react";
import { SavingCardType } from "@/types/saving";
import { Eye, Heart } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";

type Props = {
  saving: SavingCardType;
  onClickJoin: (savingId: number) => void;
  joinButtonText?: string;
};

const SavingCard: React.FC<Props> = ({ saving, onClickJoin, joinButtonText = "가입하기" }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between mb-4 w-[95%] max-w-[420px] mx-auto hover:scale-[1.01] transform-gpu">
      {/* 은행 아이콘 */}
      <div className="flex items-center justify-center">
        <Icon name={getBankIconName(saving.fin_co_nm)} width={80} height={40} />
      </div>

      {/* 적금 정보 */}
      <div className="flex flex-col items-center text-center flex-1">
        <div className="font-bold text-[15px] mb-3">{saving.fin_prdt_nm}</div>
        <div className="text-sm space-x-1">
          <span className="font-bold text-red-500 bg-red-100 px-1.5 py-0.5 rounded">
            {saving.min_int_rate / 100}%
          </span>
          <span className="text-gray-500">~</span>
          <span className="font-bold text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">
            {saving.max_int_rate / 100}%
          </span>
        </div>
      </div>

      {/* 가입 버튼 + 조회/좋아요 */}
      <div className="flex flex-col items-end gap-1.5">
        <button
          className="bg-[#60B94D] hover:bg-green-600 text-white font-semibold text-sm px-2.5 py-[5px] rounded-md shadow-sm transition cursor-pointer"
          onClick={() => onClickJoin(saving.saving_id)}
        >
          {joinButtonText}
        </button>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Eye size={14} className="text-gray-500" />
            <span>{saving.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} fill="red" color="black" />
            <span>{saving.like_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
