"use client";

import React, { useEffect, useState } from "react";
import { Heart, Info, ExternalLink } from "lucide-react";
import Icon from "@/components/Icon";
import { getBankIconName } from "@/components/bankList";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  updateSavingDetail,
  setSelectedSavingDetail,
  setSelectedSaving,
  setSavings,
} from "@/stores/slices/savingSlice";
import { SavingDetailType } from "@/types/saving";
import { useRouter } from "next/navigation";
import { sortSavings } from "@/utils/sortSavings";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type Props = {
  savingId: number;
  onClose: () => void;
  showJoinButton?: boolean;
};

const SavingDetail: React.FC<Props> = ({
  savingId,
  onClose,
  showJoinButton = true,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const savings = useAppSelector((state) => state.saving.savings);
  const sort = useAppSelector((state) => state.saving.sort);
  const isSavingDetailOpen = useAppSelector(
    (state) => state.aniModal.isSavingDetailOpen
  );

  const [saving, setSaving] = useState<SavingDetailType | null>(null);
  const [liked, setLiked] = useState(false);
  // const detailLoadedRef = useRef(false);

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.get(`/savings-products/${savingId}`);
      const data = res.data.content;
      setSaving(data);
      const updatedList = savings.map((item) =>
        item.saving_id === savingId ? { ...item, views: data.views } : item
      );
      const sortedList = sortSavings(
        updatedList,
        sort as "views" | "likes" | "maxIntRate" | ""
      );
      dispatch(setSavings(sortedList));
      dispatch(updateSavingDetail({ savingId, views: data.views }));
    } catch (err) {
      console.error("적금 상세 조회 실패", err);
    }
  };

  // 좋아요 정보 fetch 시 liked, like_count 둘 다 saving에 저장
  const fetchLikeInfo = async () => {
    try {
      const res = await axiosInstance.get(
        `/savings-products/${savingId}/likes`
      );
      const likeData = res.data.content;
      setLiked(likeData.liked);

      // liked, likeCount 상태를 saving에도 반영
      setSaving((prev) => (prev ? { ...prev, ...likeData } : null));
    } catch (err) {
      console.error("좋아요 정보 조회 실패", err);
    }
  };

  // 좋아요 토글 핸들러
  const handleLike = async () => {
    try {
      const res = await axiosInstance.post(
        `/savings-products/${savingId}/likes`
      );
      const updatedLikes = res.data.content.like_count;
      const updatedLiked = res.data.content.liked;

      setLiked(updatedLiked);
      setSaving((prev) =>
        prev ? { ...prev, like_count: updatedLikes, liked: updatedLiked } : null
      );

      const updatedList = savings.map((item) =>
        item.saving_id === savingId
          ? { ...item, like_count: updatedLikes, liked: updatedLiked }
          : item
      );

      const sortedList = sortSavings(
        updatedList,
        sort as "views" | "likes" | "maxIntRate" | ""
      );
      dispatch(setSavings(sortedList));
      dispatch(
        updateSavingDetail({
          savingId,
          likeCount: updatedLikes,
          liked: updatedLiked,
        })
      );
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
          liked: saving.liked,
        })
      );
      dispatch(setSelectedSavingDetail(saving));
      router.push("/saving/create");
    }
  };

  useEffect(() => {
    if (isSavingDetailOpen) {
      fetchDetail();
      fetchLikeInfo();
      // detailLoadedRef.current = true;
    }
  }, [isSavingDetailOpen, savingId]);

  // if (loading) return <span>로딩 중..</span>;
  if (!saving) return null;

  const minRate = (saving.min_int_rate / 100).toFixed(2);
  const maxRate = (saving.max_int_rate / 100).toFixed(2);

  return (
    <AnimatePresence>
      {isSavingDetailOpen && savingId !== 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ backdropFilter: "blur(10px)" }}
          className="fixed inset-0 flex justify-center items-center px-2 sm:px-0 z-[1000]"
        >
          <div className="relative bg-white rounded-xl p-6 sm:p-8 w-[95%] max-w-md shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-blue-500 to-green-500 opacity-10"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center 
             rounded-full bg-white/90 shadow-md hover:bg-gray-100 transition-colors z-[300] 
             cursor-pointer overflow-hidden"
            >
              <X size={20} />
            </button>

            <div className="flex items-center justify-center relative z-10 mb-6">
              <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 mb-2">
                <Icon
                  name={getBankIconName(saving.fin_prdt_cd)}
                  width={120}
                  height={50}
                />
              </div>
            </div>

            <div className="text-center space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-2">
                  {saving.fin_prdt_nm}
                </h2>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-sm sm:text-base leading-relaxed mb-3 max-h-28 overflow-y-auto">
                  {saving.spcl_cnd ||
                    saving.etc_note ||
                    "상세 설명이 없습니다."}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg px-3 py-2 sm:p-4 flex items-center justify-center space-x-2">
                <Info size={16} className="text-blue-500" />
                <p className="text-blue-700 font-semibold text-sm sm:text-base">
                  금리: <span className="text-base sm:text-lg">{minRate}%</span>{" "}
                  ~ <span className="text-base sm:text-lg">{maxRate}%</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={handleLike}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md ${
                    liked
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                  aria-label="좋아요 버튼"
                >
                  <Heart
                    size={18}
                    className="transition-colors"
                    fill={liked ? "red" : "none"}
                  />
                </button>

                {showJoinButton && (
                  <button
                    onClick={handleJoin}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold cursor-pointer shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    가입하기
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SavingDetail;
