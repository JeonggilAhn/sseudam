"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "@/stores/hooks";
import { updateSavingDetail } from "@/stores/slices/savingSlice";

type Props = {
  savingId: number;
  onClose: () => void;
  showJoinButton?: boolean;
};

const SavingDetail: React.FC<Props> = ({ savingId, onClose, showJoinButton = true }) => {
  const dispatch = useAppDispatch();

  const [saving, setSaving] = useState<any | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const detailLoadedRef = useRef(false);

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.get(`/api/savings-products/${savingId}`);
      const data = res.data.content;
      setSaving(data);
      setLikeCount(data.like_count);

      // 조회수 리스트에 반영
      dispatch(updateSavingDetail({ savingId, views: data.views }));
    } catch (err) {
      console.error("적금 상세 조회 실패", err);
    }
  };

  const fetchLikeInfo = async () => {
    try {
      const res = await axiosInstance.request({
        url: `/api/savings-products/${savingId}/likes`,
        method: "get",
        data: { userId: 1 }, // ✅ 테스트용 userId
      });
      setLiked(res.data.content.liked);
      setLikeCount(res.data.content.like_count);
    } catch (err) {
      console.error("좋아요 정보 조회 실패", err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axiosInstance.post(`/api/savings-products/${savingId}/likes`, {
        userId: 1,
      });
      setLiked(res.data.content.liked);
      setLikeCount(res.data.content.like_count);

      // 리스트에도 반영
      dispatch(updateSavingDetail({ savingId, likeCount: res.data.content.like_count }));
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    }
  };

  useEffect(() => {
    if (!detailLoadedRef.current) {
      fetchDetail();
      fetchLikeInfo();
      detailLoadedRef.current = true;
    }
  }, []);

  if (!saving) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg p-10 w-[90%] max-w-md shadow-lg">
        <button className="absolute top-2 right-3 cursor-pointer" onClick={onClose}>
          <X />
        </button>

        <div className="flex items-center justify-center mb-4">
          <Icon name={getBankIconName(saving.fin_co_nm)} width={120} height={40} />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">{saving.fin_prdt_nm}</h2>
          <p className="text-sm leading-relaxed mb-4">{saving.spcl_cnd || saving.etc_note}</p>
          <p className="text-xs text-gray-500 mb-4">
            금리: {saving.min_int_rate / 100}% ~ {saving.max_int_rate / 100}%
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleLike}
              className={`w-10 h-10 rounded-md border-2 transition-colors flex items-center justify-center cursor-pointer ${
                liked
                  ? "border-red-500 text-red-500 bg-red-100"
                  : "border-gray-300 text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="좋아요 버튼"
            >
              <Heart size={20} fill={liked ? "red" : "none"} className="transition-colors" />
            </button>

            {showJoinButton && (
              <button
                onClick={() => alert("가입 페이지 이동 예정")}
                className="bg-[#60B94D] hover:bg-green-600 text-white px-4 py-2 rounded font-bold cursor-pointer"
              >
                가입하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingDetail;
