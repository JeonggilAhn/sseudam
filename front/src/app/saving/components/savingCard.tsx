"use client";

import React, { useEffect } from "react";
import { SavingCardType } from "@/types/saving";
import { Eye, Heart } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";
import { useAppDispatch } from "@/stores/hooks";
import { resetIsSavingDetailOpen } from "@/stores/slices/aniModalSlice";

type Props = {
  saving: SavingCardType;
  onClickJoin: (savingId: number) => void;
  joinButtonText?: string;
};

const SavingCard: React.FC<Props> = ({ saving, onClickJoin, joinButtonText = "가입하기" }) => {
  const trimmedTitle = saving.finPrdtNm.replace(/\(.*?\)/g, "").trim();
  const displayTitle = trimmedTitle.length > 10 ? trimmedTitle.slice(0, 9) + "..." : trimmedTitle;
  const companyName = saving.finCoNm.replace("주식회사", "").trim();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetIsSavingDetailOpen());
  }, []);

  // 카드 전체 클릭 시 상세 모달 열기
  const handleCardClick = () => {
    onClickJoin(saving.savingId);
  };

  // 가입하기 버튼 클릭 시 중복 이벤트 막기
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    onClickJoin(saving.savingId);
  };

  return (
    <div
      onClick={handleCardClick} // 카드 전체 클릭 시 모달 열림
      className="cursor-pointer bg-white rounded-2xl border border-gray-200 px-5 py-4 shadow-md hover:shadow-lg 
      transition-all duration-200 flex items-center justify-between mb-4 w-full mx-auto 
      hover:scale-[1.02] transform-gpu"
    >
      {/* 은행 아이콘 및 이름 */}
      <div className="flex flex-col items-center justify-center min-w-[70px]">
        <Icon name={getBankIconName(saving.finCoNm)} width={70} height={36} />
        <span className="text-[min(11px,_3vw)] text-gray-600 mt-1 text-center break-keep leading-tight max-w-[80px]">
          {companyName}
        </span>
      </div>

      {/* 적금 정보 */}
      <div className="flex flex-col items-center flex-1 px-2 text-center">
        <div className="font-bold text-[13px] text-gray-800 mb-2 break-words leading-tight max-w-[140px]">
          {displayTitle}
        </div>
        <div className="flex items-center space-x-1 text-[13px]">
          <span className="font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md border border-red-100">
            {(saving.minIntRate / 100).toFixed(2)}%
          </span>
          <span className="text-gray-400">~</span>
          <span className="font-semibold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-100">
            {(saving.maxIntRate / 100).toFixed(2)}%
          </span>
        </div>
      </div>

      {/* 가입 버튼 + 조회/좋아요 */}
      <div className="flex flex-col items-end gap-1 min-w-[90px] text-[13px]">
        <button
          onClick={handleButtonClick} // 버튼 클릭 시 카드 클릭 이벤트 방지
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1.5 rounded-md shadow-sm transition-all text-sm"
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
            <span>{saving.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(SavingCard);
