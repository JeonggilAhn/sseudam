// src/stores/store.ts
import { configureStore } from "@reduxjs/toolkit";
import couponReducer from "./slices/couponSlice";
import cardReducer from "./slices/cardSlice";
import savingReducer from "./slices/savingSlice";
import aniModalReducer from "./slices/aniModalSlice";
import SSESlice from "./slices/SSESLice";

export const store = configureStore({
  reducer: {
    coupon: couponReducer,
    card: cardReducer,
    saving: savingReducer,
    aniModal: aniModalReducer,
    SSE: SSESlice,
  },
});

// RootState 타입 추론 (state 접근 시 타입 안전성 확보)
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 추론 (dispatch 사용 시 타입 추론)
export type AppDispatch = typeof store.dispatch;
