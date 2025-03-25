"use client";

import React, { useState } from "react";
import { Heart, X } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";

type Props = {
  onClose: () => void;
};

const SavingDetail: React.FC<Props> = ({ onClose }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태 관리, API 연결 후 각 상태로 연결

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg p-10 w-[90%] max-w-md shadow-lg">
        {/* 닫기 버튼 */}
        <button className="absolute top-2 right-3 cursor-pointer" onClick={onClose}>
          <X />
        </button>

        {/* 은행 아이콘 */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <Icon name={getBankIconName("0010001")} width={120} height={40} />
        </div>

        {/* 내용 */}
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">적금 이름</h2>
          <p className="text-sm leading-relaxed mb-6">
            내용 적금 관련 내용 기타 여러가지 내용 등등 내용
          </p>

          <div className="flex items-center justify-center gap-3">
            {/* 좋아요 버튼 */}
            <button
              onClick={toggleLike}
              className={`w-10 h-10 rounded-md border-2 transition-colors flex items-center justify-center cursor-pointer ${
                liked
                  ? "border-red-500 text-red-500 bg-red-100"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="좋아요 버튼"
            >
              <Heart size={20} fill={liked ? "red" : "none"} className="transition-colors" />
            </button>

            {/* 가입하기 버튼 */}
            <button className="bg-[#60B94D] hover:bg-green-600 text-white px-4 py-2 rounded font-bold cursor-pointer">
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingDetail;
