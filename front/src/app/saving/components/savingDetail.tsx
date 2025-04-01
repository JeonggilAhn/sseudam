"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, X } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch } from "@/stores/hooks";
import {
  updateSavingDetail,
  setSelectedSavingDetail,
  setSelectedSaving,
} from "@/stores/slices/savingSlice";
import { SavingDetailType } from "@/types/saving";
import { useRouter } from "next/navigation";

type Props = {
  savingId: number;
  onClose: () => void;
  showJoinButton?: boolean;
};

const SavingDetail: React.FC<Props> = ({ savingId, onClose, showJoinButton = true }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [saving, setSaving] = useState<SavingDetailType | null>(null);
  const [liked, setLiked] = useState(false);
  const detailLoadedRef = useRef(false);

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.get(`/api/savings-products/${savingId}`);
      const data = res.data.content;
      setSaving(data);
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
        data: { userId: 1 },
      });
      setLiked(res.data.content.liked);
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
      dispatch(updateSavingDetail({ savingId, likeCount: res.data.content.like_count }));
    } catch (err) {
      console.error("좋아요 토글 실패", err);
    }
  };

  const handleJoin = () => {
    if (!saving) return;

    if (saving.homp_url) {
      window.open(saving.homp_url, "_blank");
    } else {
      dispatch(
        setSelectedSaving({
          saving_id: saving.saving_id,
          fin_co_nm: saving.fin_prdt_cd,
          fin_prdt_nm: saving.fin_prdt_nm,
          min_int_rate: saving.min_int_rate,
          max_int_rate: saving.max_int_rate,
          views: saving.views,
          like_count: saving.like_count,
          likes: saving.likes,
        })
      );

      dispatch(setSelectedSavingDetail(saving));
      router.push("/saving/create");
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

        <div className="flex items-center justify-center">
          <Icon name={getBankIconName(saving.fin_prdt_cd)} width={180} height={80} />
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
                onClick={handleJoin}
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
