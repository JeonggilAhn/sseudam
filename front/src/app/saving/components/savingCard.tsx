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
    <div className="bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-between mb-4 w-[95%] max-w-[420px] mx-auto hover:scale-[1.02] transform-gpu">
      {/* 은행 아이콘 및 이름 */}
      <div className="flex flex-col items-center justify-center">
        <Icon name={getBankIconName(saving.fin_co_nm)} width={80} height={40} />
        <span className="text-xs font-medium text-gray-600 mt-1">{saving.fin_co_nm}</span>
      </div>

      {/* 적금 정보 */}
      <div className="flex flex-col items-center text-center flex-1 px-2">
        <div className="font-bold text-[16px] mb-3 text-gray-800">{saving.fin_prdt_nm}</div>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg border border-red-100">
            {saving.min_int_rate / 100}%
          </span>
          <span className="text-gray-400">~</span>
          <span className="font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
            {saving.max_int_rate / 100}%
          </span>
        </div>
      </div>

      {/* 가입 버튼 + 조회/좋아요 */}
      <div className="flex flex-col items-end gap-2">
        <button
          className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
          onClick={() => onClickJoin(saving.saving_id)}
        >
          {joinButtonText}
        </button>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-gray-500" />
            <span className="font-medium">{saving.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} fill={saving.like_count > 0 ? "red" : "none"} stroke="red" />
            <span className="font-medium">{saving.like_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
