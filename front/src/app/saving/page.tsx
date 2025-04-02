"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { setSavings, setSort, setKeyword } from "@/stores/slices/savingSlice";

import SavingCard from "./components/savingCard";
import SavingButton from "./components/savingButton";
import SavingSearch from "./components/savingSearch";
import SavingDetail from "./components/savingDetail";

const SavingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sort, keyword, savings } = useAppSelector((state) => state.saving);

  // UI 상태 관리
  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null); // 선택된 정렬 필터
  const [selectedSavingId, setSelectedSavingId] = useState<number | null>(null); // 모달용 savingId
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 페이징 관련 상태
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 다음 페이지 존재 여부
  const isLoadingRef = useRef(false); // 중복 요청 방지용 ref
  const observerRef = useRef<HTMLDivElement | null>(null); // 무한스크롤 감지용 ref

  // API 호출 함수 (검색/정렬/페이지네이션 통합)
  const fetchSavings = useCallback(
    async (pageToLoad: number, isReset = false) => {
      if (isLoadingRef.current || (!hasMore && !isReset)) return;

      isLoadingRef.current = true;
      try {
        const params: { page: number; sort?: string; keyword?: string } = { page: pageToLoad };
        if (sort) params.sort = sort;
        if (keyword) params.keyword = keyword;

        const res = await axiosInstance.get("/savings-products", { params });
        const data = res.data?.content?.content || [];

        // isReset이 true면 새로 덮어쓰기, 아니면 기존 리스트에 추가
        const merged =
          isReset || pageToLoad === 0
            ? data
            : [...savings, ...data].filter(
                (item, index, self) =>
                  self.findIndex((s) => s.saving_id === item.saving_id) === index
              );

        dispatch(setSavings(merged));
        setHasMore(!res.data?.content?.last);
      } catch (err) {
        console.error("적금 리스트 요청 실패", err);
      } finally {
        isLoadingRef.current = false;
      }
    },
    [dispatch, keyword, sort, savings, hasMore]
  );

  // 검색어 or 정렬 변경 시 초기화 + 첫 페이지 요청
  useEffect(() => {
    setPage(0); // 페이지 초기화
    setHasMore(true); // 더 불러올 수 있도록 초기화
    dispatch(setSavings([])); // 기존 리스트 제거
    fetchSavings(0, true); // 첫 페이지 요청
  }, [keyword, sort]);

  // 페이지 번호 변경되면 새로운 페이지 요청
  useEffect(() => {
    if (page === 0) return; // 0은 위 useEffect에서 이미 처리
    fetchSavings(page);
  }, [page]);

  // 페이지 이동시 정렬, 검색어 초기화
  useEffect(() => {
    return () => {
      dispatch(setSort(""));
      dispatch(setKeyword(""));
    };
  }, []);

  // 무한스크롤 감지 (하단 도달 시 page 증가)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1, rootMargin: "100px" } // rootMargin으로 스크롤 여유 감지
    );

    const target = observerRef.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore]);

  // 정렬 버튼 클릭 시 상태 변경 및 정렬 기준 설정
  const handleSelect = (value: "interest" | "views" | "likes") => {
    if (selected === value) {
      setSelected(null);
      dispatch(setSort(""));
    } else {
      setSelected(value);
      dispatch(setSort(value === "interest" ? "maxIntRate" : value));
    }
    dispatch(setKeyword("")); // 정렬 시 기존 검색어 초기화
  };

  // 정렬 선택 해제 시 선택된 상태 초기화
  useEffect(() => {
    if (!sort) setSelected(null);
  }, [sort]);

  // 모달 열기
  const handleOpenModal = (savingId: number) => {
    setSelectedSavingId(savingId);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSavingId(null);
  };

  return (
    <main className="flex flex-col h-screen bg-[#C1E6FA]">
      {/* 상단 검색 및 정렬 버튼 */}
      <div className="flex-shrink-0 px-4 pt-4">
        <SavingSearch />
        <SavingButton selected={selected} onSelect={handleSelect} />
      </div>

      {/* 적금 카드 리스트 */}
      <div className="flex-1 overflow-y-auto mt-4 pb-24 scrollbar-hide flex flex-col items-center gap-4 px-4">
        {savings.map((item) => (
          <SavingCard key={item.saving_id} saving={item} onClickJoin={handleOpenModal} />
        ))}
        {/* 무한스크롤 트리거 위치 */}
        <div ref={observerRef} className="h-4" />
      </div>

      {/* 상세 모달 */}
      {showModal && selectedSavingId && (
        <SavingDetail savingId={selectedSavingId} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default SavingPage;
