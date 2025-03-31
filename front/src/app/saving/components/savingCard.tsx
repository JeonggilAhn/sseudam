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
    <div className="bg-white rounded-xl border border-[#0074D9] px-4 py-3 shadow flex items-center justify-between mb-4 w-[95%] max-w-[420px] mx-auto">
      <div className="flex items-center gap-2 min-w-[100px]">
        <Icon name={getBankIconName(saving.fin_co_nm)} width={120} height={40} />
      </div>

      <div className="flex flex-col items-center text-center flex-1">
        <div className="font-bold text-lg">{saving.fin_prdt_nm}</div>
        <div className="text-sm">
          {saving.min_int_rate / 100}% ~ {saving.max_int_rate / 100}%
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          className="bg-[#60B94D] hover:bg-green-600 text-white font-bold text-sm px-3 py-1 rounded border cursor-pointer"
          onClick={() => onClickJoin(saving.saving_id)}
        >
          {joinButtonText}
        </button>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{saving.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} fill="red" color="black" />
            <span>{saving.like_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingCard;
