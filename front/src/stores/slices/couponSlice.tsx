import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "@/app/card/page";

interface CouponState {
  couponList: Coupon[];
  currentCouponId: number;
  currentCouponName: string;
  currentCouponDeadline: string;
  currentCouponSavingId: number;
}

const initialState: CouponState = {
  couponList: [],
  currentCouponId: 0,
  currentCouponName: "",
  currentCouponDeadline: "",
  currentCouponSavingId: 0,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCouponList: (state, action: PayloadAction<Coupon[]>) => {
      state.couponList = action.payload;
    },
    setCurrentCoupon: (state, action: PayloadAction<Coupon>) => {
      state.currentCouponId = action.payload.couponId;
      state.currentCouponName = action.payload.couponName;
      state.currentCouponDeadline = action.payload.couponDeadline;
      state.currentCouponSavingId = action.payload.savingId;
    },
    clearCurrentCoupon: (state) => {
      state.currentCouponId = 0;
      state.currentCouponName = "";
      state.currentCouponDeadline = "";
      state.currentCouponSavingId = 0;
    },
  },
});

export const { setCouponList, setCurrentCoupon, clearCurrentCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
