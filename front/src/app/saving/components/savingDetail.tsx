"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heart, X, Info, ExternalLink } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const detailLoadedRef = useRef(false);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/savings-products/${savingId}`);
      const data = res.data.content;
      setSaving(data);
      dispatch(updateSavingDetail({ savingId, views: data.views }));
    } catch (err) {
      console.error("적금 상세 조회 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikeInfo = async () => {
    try {
      const res = await axiosInstance.request({
        url: `/savings-products/${savingId}/likes`,
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
      const res = await axiosInstance.post(`/savings-products/${savingId}/likes`, {
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

  if (loading) {
    return <span>로딩 중..</span>;
  }

  if (!saving) return null;

  // 금리 정보를 소수점으로 변환
  const minRate = (saving.min_int_rate / 100).toFixed(2);
  const maxRate = (saving.max_int_rate / 100).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-xl p-8 w-[90%] max-w-md shadow-2xl overflow-hidden">
        {/* 헤더 색상 배경 */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-blue-500 to-green-500 opacity-10"></div>

        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 cursor-pointer bg-white/90 rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* 은행 로고 */}
        <div className="flex items-center justify-center relative z-10 mb-6">
          <div className="bg-white rounded-lg shadow-md p-3 mb-2">
            <Icon name={getBankIconName(saving.fin_prdt_cd)} width={160} height={70} />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="text-center space-y-5">
          <div>
            <h2 className="text-xl font-bold mb-2">{saving.fin_prdt_nm}</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm leading-relaxed mb-3 max-h-28 overflow-y-auto">
              {saving.spcl_cnd || saving.etc_note || "상세 설명이 없습니다."}
            </div>
          </div>

          {/* 금리 정보 */}
          <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-center space-x-2">
            <Info size={16} className="text-blue-500" />
            <p className="text-blue-700 font-semibold">
              금리: <span className="text-lg">{minRate}%</span> ~{" "}
              <span className="text-lg">{maxRate}%</span>
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={handleLike}
              className={`w-10 h-10 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md ${
                liked
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-gray-300 text-gray-500 hover:bg-gray-50"
              }`}
              aria-label="좋아요 버튼"
            >
              <Heart size={20} fill={liked ? "red" : "none"} className="transition-colors" />
            </button>

            {showJoinButton && (
              <button
                onClick={handleJoin}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white px-6 py-3 rounded-lg font-bold cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                가입하기
                <ExternalLink size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingDetail;
