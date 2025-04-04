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
    <div
      className="bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-md hover:shadow-lg 
      transition-all duration-200 flex items-center justify-between mb-4 w-full mx-auto 
      hover:scale-[1.02] transform-gpu"
    >
      {/* 은행 아이콘 및 이름 */}
      <div className="flex flex-col items-center justify-center min-w-[70px]">
        <Icon name={getBankIconName(saving.fin_co_nm)} width={70} height={36} />
        <span className="text-[11px] text-gray-600 mt-1 text-center break-words leading-tight max-w-[72px]">
          {saving.fin_co_nm}
        </span>
      </div>

      {/* 적금 정보 */}
      <div className="flex flex-col items-center flex-1 px-2 text-center">
        <div className="font-bold text-[13px] text-gray-800 mb-2 break-words leading-tight max-w-[140px]">
          {saving.fin_prdt_nm}
        </div>
        <div className="flex items-center space-x-1 text-[13px]">
          <span className="font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">
            {(saving.min_int_rate / 100).toFixed(2)}%
          </span>
          <span className="text-gray-400">~</span>
          <span className="font-semibold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">
            {(saving.max_int_rate / 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* 가입 버튼 + 조회/좋아요 */}
      <div className="flex flex-col items-end gap-1 min-w-[90px] text-[13px]">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-md shadow-sm transition-all text-sm"
          onClick={() => onClickJoin(saving.saving_id)}
        >
          {joinButtonText}
        </button>

        <div className="flex items-center gap-2 text-gray-600">
          <div className="flex items-center gap-0.5">
            <Eye size={15} />
            <span>{saving.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Heart
              size={15}
              fill={saving.liked ? "red" : "none"}
              stroke={saving.liked ? "red" : "gray"}
            />
            <span>{saving.like_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
