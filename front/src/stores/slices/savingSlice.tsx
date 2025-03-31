import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SavingCardType } from "@/types/saving";

interface SavingState {
  savings: SavingCardType[];
  sort: string;
  keyword: string;
}

const initialState: SavingState = {
  savings: [],
  sort: "",
  keyword: "",
};

const savingSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    // 기존 리스트 교체
    setSavings: (state, action: PayloadAction<SavingCardType[]>) => {
      state.savings = action.payload;
    },

    // 새 리스트 뒤에 추가
    appendSavings: (state, action: PayloadAction<SavingCardType[]>) => {
      state.savings = [...state.savings, ...action.payload];
    },

    // 정렬 방식 선택
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },

    // 검색 키워드 설정
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },

    // 초기화화
    resetFilters: (state) => {
      state.sort = "views";
      state.keyword = "";
    },

    // 좋아요 상태 변경
    updateSavingLike: (state, action) => {
      const { savingId, likeCount } = action.payload;
      const index = state.savings.findIndex((s) => s.saving_id === savingId);
      if (index !== -1) {
        state.savings[index].like_count = likeCount;
      }
    },

    // 조회수, 좋아요 카운트 변경
    updateSavingDetail: (state, action) => {
      const { savingId, views, likeCount } = action.payload;
      const target = state.savings.find((s) => s.saving_id === savingId);
      if (target) {
        if (views !== undefined) target.views = views;
        if (likeCount !== undefined) target.like_count = likeCount;
      }
    },
  },
});

export const {
  setSavings,
  appendSavings,
  setSort,
  setKeyword,
  resetFilters,
  updateSavingLike,
  updateSavingDetail,
} = savingSlice.actions;

export default savingSlice.reducer;
