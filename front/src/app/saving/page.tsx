"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";

// 상태관리
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setSavings, setSort, setKeyword } from "@/stores/slices/savingSlice";
import { SavingCardType } from "@/types/saving";

// 컴포넌트
import SavingCard from "./components/savingCard";
import SavingButton from "./components/savingButton";
import SavingSearch from "./components/savingSearch";
import SavingDetail from "./components/savingDetail";
import SkeletonCard from "@/components/skeletonCard";

// 모달
import AnimatedModal from "@/components/animatedModal";
import { toggleIsModalOpen, resetIsModalOpen } from "@/stores/slices/aniModalSlice";

const SavingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, keyword, savings } = useAppSelector((state) => state.saving);
  const { isModalOpen } = useAppSelector((state) => state.aniModal);

  // UI 상태 관리
  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null);
  const [selectedSavingId, setSelectedSavingId] = useState<number | null>(null);

  // 페이징 관련 상태
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const isLoadingRef = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // API 호출 함수
  const fetchSavings = useCallback(
    async (pageToLoad: number, isReset = false) => {
      if (isLoadingRef.current || (!hasMore && !isReset)) return;

      isLoadingRef.current = true;
      if (isReset) setIsLoading(true);

      try {
        const params: { page: number; sort?: string; keyword?: string } = { page: pageToLoad };
        if (sort) params.sort = sort;
        if (keyword) params.keyword = keyword;

        // 📌 리스트 + 좋아요 상태 + 좋아요 수 요청
        const [res, likedRes] = await Promise.all([
          axiosInstance.get("/savings-products", { params }),
          axiosInstance.get("/savings-products/likes/me"),
        ]);

        const savingsData = res.data?.content?.content || [];
        const likedIds: number[] = likedRes.data?.content || [];

        // 📌 savingId별 좋아요 수 동기화 요청 (추가된 부분)
        const likeCountsMap: Record<number, number> = {};
        await Promise.all(
          savingsData.map(async (item: any) => {
            try {
              const res = await axiosInstance.get(`/savings-products/${item.saving_id}/likes`);
              likeCountsMap[item.saving_id] = res.data.content.likeCount;
            } catch (err) {
              console.error("likeCount 개별 요청 실패", err);
              likeCountsMap[item.saving_id] = 0;
            }
          })
        );

        const mergedWithLike = (savingsData as SavingCardType[]).map((item) => ({
          ...item,
          liked: likedIds.includes(item.saving_id),
          like_count: likeCountsMap[item.saving_id] ?? 0,
        }));

        const merged =
          isReset || pageToLoad === 0
            ? mergedWithLike
            : [...savings, ...mergedWithLike].filter(
                (item, index, self) =>
                  self.findIndex((s) => s.saving_id === item.saving_id) === index
              );

        dispatch(setSavings(merged));
        setHasMore(!res.data?.content?.last);
      } catch (err) {
        console.error("적금 리스트 요청 실패", err);
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    },
    [dispatch, keyword, sort, savings, hasMore]
  );

  // 검색어 or 정렬 변경 시 초기화 + 첫 페이지 요청
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    dispatch(setSavings([]));
    fetchSavings(0, true);
  }, [keyword, sort]);

  // 페이지 번호 변경되면 새로운 페이지 요청
  useEffect(() => {
    if (page === 0) return;
    fetchSavings(page);
  }, [page]);

  // 페이지 이동시 정렬, 검색어 초기화
  useEffect(() => {
    return () => {
      dispatch(setSort(""));
      dispatch(setKeyword(""));
    };
  }, []);

  // 무한스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1, rootMargin: "100px" }
    );

    const target = observerRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore]);

  // 정렬 버튼 선택
  const handleSelect = (value: "interest" | "views" | "likes") => {
    if (selected === value) {
      setSelected(null);
      dispatch(setSort(""));
    } else {
      setSelected(value);
      dispatch(setSort(value === "interest" ? "maxIntRate" : value));
    }
    dispatch(setKeyword(""));
  };

  useEffect(() => {
    if (!sort) setSelected(null);
  }, [sort]);

  // 모달 핸들링
  const handleOpenModal = useCallback(
    (savingId: number) => {
      setSelectedSavingId(savingId);
      dispatch(toggleIsModalOpen()); // 모달 열기
    },
    [dispatch]
  );

  return (
    <main className="flex flex-col h-screen bg-[#C1E6FA]">
      {/* 상단 */}
      <div className="flex-shrink-0 px-4 pt-4">
        <SavingSearch />
        <SavingButton selected={selected} onSelect={handleSelect} />
      </div>

      {/* 적금 리스트 */}
      <div className="flex-1 overflow-y-auto mt-4 pb-24 scrollbar-hide flex flex-col items-center gap-4 px-4">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : savings.map((item) => (
              <SavingCard key={item.saving_id} saving={item} onClickJoin={handleOpenModal} />
            ))}
        <div ref={observerRef} className="h-4" />
      </div>

      {/* 모달 */}
      {isModalOpen && selectedSavingId && (
        <AnimatedModal
          onClose={() => {
            dispatch(resetIsModalOpen()); // 모달 닫기
            setSelectedSavingId(null); // 선택 해제
          }}
        >
          <SavingDetail
            savingId={selectedSavingId}
            onClose={() => {
              dispatch(resetIsModalOpen());
              setSelectedSavingId(null);
            }}
          />
        </AnimatedModal>
      )}
    </main>
  );
};

export default SavingPage;
