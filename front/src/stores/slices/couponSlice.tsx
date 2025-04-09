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
    // setCouponOrder: (state, action: PayloadAction<number>) => {
    //   const targetCouponId = action.payload;

    //   // 쿠폰 리스트가 비어있는 경우 처리
    //   if (!state.couponList || state.couponList.length === 0) {
    //     console.warn("쿠폰 리스트가 비어있어 순서를 변경할 수 없습니다.");
    //     return;
    //   }

    //   // 1. 먼저 해당 ID를 가진 쿠폰이 있는지 확인
    //   const targetCoupon = state.couponList.find(
    //     (coupon) => coupon.couponId === targetCouponId
    //   );

    //   if (!targetCoupon) {
    //     console.warn(
    //       `쿠폰 ID ${targetCouponId}를 찾을 수 없어 순서를 변경할 수 없습니다.`
    //     );
    //     return;
    //   }

    //   // 2. 기존 배열에서 해당 쿠폰을 완전히 제거
    //   state.couponList = state.couponList.filter(
    //     (coupon) => coupon.couponId !== targetCouponId
    //   );

    //   // 3. 제거한 쿠폰을 배열 맨 앞에 추가
    //   state.couponList.unshift(targetCoupon);

    //   console.log(
    //     `쿠폰 ID ${targetCouponId}의 순서가 맨 앞으로 변경되었습니다.`
    //   );
    // },
  },
});

export const { setCouponList, setCurrentCoupon, clearCurrentCoupon } =
  couponSlice.actions;
export default couponSlice.reducer;
