"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const [selected, setSelected] = useState<"interest" | "views" | "likes" | null>(null);
  const [selectedSavingId, setSelectedSavingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingRef = useRef(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    dispatch(setSavings([]));
  }, [sort, keyword, dispatch]);

  useEffect(() => {
    const fetchSavings = async () => {
      if (isLoadingRef.current || !hasMore) return;

      isLoadingRef.current = true;
      try {
        const params: { page: number; sort?: string; keyword?: string } = { page };
        if (sort) params.sort = sort;
        if (keyword) params.keyword = keyword;

        const response = await axiosInstance.get("/savings-products", { params });
        const newSavings = response.data.content.content;

        const merged =
          page === 0
            ? newSavings
            : [...savings, ...newSavings].filter(
                (item, index, self) =>
                  self.findIndex((s) => s.saving_id === item.saving_id) === index
              );

        dispatch(setSavings(merged));
        setHasMore(!response.data.content.last);
      } catch (error) {
        console.error("적금 리스트 불러오기 실패:", error);
      } finally {
        isLoadingRef.current = false;
      }
    };

    fetchSavings();
  }, [page, sort, keyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasMore]);

  const handleSelect = (value: "interest" | "views" | "likes") => {
    if (selected === value) {
      setSelected(null);
      dispatch(setSort(""));
    } else {
      setSelected(value);
      const sortValue = value === "interest" ? "maxIntRate" : value;
      dispatch(setSort(sortValue));
    }
    dispatch(setKeyword(""));
  };

  useEffect(() => {
    if (!sort) setSelected(null);
  }, [sort]);

  const handleOpenModal = (savingId: number) => {
    setSelectedSavingId(savingId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSavingId(null);
  };

  return (
    <main className="flex flex-col h-screen bg-[#C1E6FA]">
      {/* 상단 고정 필터 영역 */}
      <div className="flex-shrink-0 px-4 pt-4">
        <SavingSearch />
        <SavingButton selected={selected} onSelect={handleSelect} />
      </div>

      {/* 스크롤 가능한 카드 리스트 영역 */}
      <div className="flex-1 overflow-y-auto mt-4 pb-24 scrollbar-hide">
        {savings.map((item) => (
          <SavingCard key={item.saving_id} saving={item} onClickJoin={handleOpenModal} />
        ))}
        <div ref={observerRef} className="h-4" />
      </div>

      {/* 모달 */}
      {showModal && selectedSavingId && (
        <SavingDetail savingId={selectedSavingId} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default SavingPage;
