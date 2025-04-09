"use client";

import React, { useEffect, useState, useRef } from "react";
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
import { v4 as uuidv4 } from "uuid"; // 하트 고유 키용

type Props = {
  savingId: number;
  onClose: () => void;
  showJoinButton?: boolean;
};

const SavingDetail: React.FC<Props> = ({ savingId, onClose, showJoinButton = true }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const savings = useAppSelector((state) => state.saving.savings);
  const sort = useAppSelector((state) => state.saving.sort);
  const isSavingDetailOpen = useAppSelector((state) => state.aniModal.isSavingDetailOpen);

  const [saving, setSaving] = useState<SavingDetailType | null>(null);
  const [liked, setLiked] = useState(false);
  // const detailLoadedRef = useRef(false);

  // state 추가
  const [showHearts, setShowHearts] = useState(false);
  const heartContainerRef = useRef<HTMLDivElement>(null);

  const fetchDetail = async () => {
    try {
      const res = await axiosInstance.get(`/savings-products/${savingId}`);
      const data = res.data.content;
      setSaving(data);
      const updatedList = savings.map((item) =>
        item.savingId === savingId ? { ...item, views: data.views } : item
      );
      const sortedList = sortSavings(updatedList, sort as "views" | "likes" | "maxIntRate" | "");
      dispatch(setSavings(sortedList));
      dispatch(updateSavingDetail({ savingId, views: data.views }));
    } catch (err) {
      console.error("적금 상세 조회 실패", err);
    }
  };

  // 좋아요 정보 fetch 시 liked, likeCount 둘 다 saving에 저장
  const fetchLikeInfo = async () => {
    try {
      const res = await axiosInstance.get(`/savings-products/${savingId}/likes`);
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
      const res = await axiosInstance.post(`/savings-products/${savingId}/likes`);
      const updatedLikes = res.data.content.likeCount;

      const updatedLiked = res.data.content.liked;

      setLiked(updatedLiked);
      setSaving((prev) =>
        prev ? { ...prev, likeCount: updatedLikes, liked: updatedLiked } : null
      );

      const updatedList = savings.map((item) =>
        item.savingId === savingId
          ? { ...item, likeCount: updatedLikes, liked: updatedLiked }
          : item
      );

      if (updatedLiked) {
        setShowHearts(true);
        setTimeout(() => setShowHearts(false), 1000); // 1초 후 하트 제거
      }

      const sortedList = sortSavings(updatedList, sort as "views" | "likes" | "maxIntRate" | "");
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

    if (saving.hompUrl) {
      window.open(saving.hompUrl, "_blank");
    } else {
      dispatch(
        setSelectedSaving({
          savingId: saving.savingId,
          finCoNm: saving.finPrdtCd,
          finPrdtNm: saving.finPrdtNm,
          minIntRate: saving.minIntRate,
          maxIntRate: saving.maxIntRate,
          views: saving.views,
          likeCount: saving.likeCount,
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

  const minRate = (saving.minIntRate / 100).toFixed(2);
  const maxRate = (saving.maxIntRate / 100).toFixed(2);

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
                <Icon name={getBankIconName(saving.finPrdtCd)} width={120} height={50} />
              </div>
            </div>

            <div className="text-center space-y-5">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-2">{saving.finPrdtNm}</h2>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-sm sm:text-base leading-relaxed mb-3 max-h-28 overflow-y-auto">
                  {saving.spclCnd || saving.etcNote || "상세 설명이 없습니다."}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg px-3 py-2 sm:p-4 flex items-center justify-center space-x-2">
                <Info size={16} className="text-blue-500" />
                <p className="text-blue-700 font-semibold text-sm sm:text-base">
                  금리: <span className="text-base sm:text-lg">{minRate}%</span> ~{" "}
                  <span className="text-base sm:text-lg">{maxRate}%</span>
                </p>
              </div>

              <div className="relative flex items-center justify-center gap-4 mt-6">
                {/* 좋아요 버튼 + 하트 이펙트만 따로 감싸기 */}
                <div className="relative">
                  {/* ❤️ 하트 애니메이션 */}
                  {showHearts && (
                    <div
                      ref={heartContainerRef}
                      className="absolute z-50 pointer-events-none"
                      style={{ top: "-20px", left: "50%", transform: "translateX(-50%)" }}
                    >
                      {[...Array(14)].map(() => {
                        const randomX = (Math.random() - 0.5) * 160;
                        const randomY = -80 - Math.random() * 70;
                        const randomScale = 0.7 + Math.random() * 0.6;
                        const heartOptions = ["❤️", "💖", "💕"];
                        const randomHeart =
                          heartOptions[Math.floor(Math.random() * heartOptions.length)];

                        return (
                          <motion.div
                            key={uuidv4()}
                            initial={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                            animate={{ opacity: 0, y: randomY, x: randomX, scale: randomScale }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="absolute text-red-500 text-lg sm:text-xl select-none"
                          >
                            {randomHeart}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* 좋아요 버튼 */}
                  <button
                    onClick={handleLike}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md ${
                      liked
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="좋아요 버튼"
                  >
                    <Heart size={18} className="transition-colors" fill={liked ? "red" : "none"} />
                  </button>
                </div>

                {/* 가입하기 버튼 */}
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
