import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "@/app/card/page";

interface CouponState {
  userCouponList: Coupon[];
  currentCouponId: number;
  currentCouponName: string;
  currentCouponDeadline: string;
  currentCouponSavingId: number;
}

const initialState: CouponState = {
  userCouponList: [],
  currentCouponId: 0,
  currentCouponName: "",
  currentCouponDeadline: "",
  currentCouponSavingId: 0,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setUserCouponList: (state, action: PayloadAction<Coupon[]>) => {
      state.userCouponList = action.payload;
    },
    setCurrentCoupon: (state, action: PayloadAction<CouponState>) => {
      state.currentCouponId = action.payload.currentCouponId;
      state.currentCouponName = action.payload.currentCouponName;
      state.currentCouponDeadline = action.payload.currentCouponDeadline;
      state.currentCouponSavingId = action.payload.currentCouponSavingId;
    },
    clearCurrentCoupon: (state) => {
      state.currentCouponId = 0;
      state.currentCouponName = "";
      state.currentCouponDeadline = "";
      state.currentCouponSavingId = 0;
    },
  },
});

export const { setUserCouponList, setCurrentCoupon, clearCurrentCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
