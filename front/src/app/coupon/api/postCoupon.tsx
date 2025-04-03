import axiosInstance from "@/utils/axiosInstance";

export const CheckCouponIssued = async (couponId: number) => {
  try {
    const response = await axiosInstance.post(`/coupons/validate`, {
      coupon_id: couponId,
    });
    return response;
  } catch (error) {
    console.error("❌ 쿠폰 조회 실패:", error);
  }
};

export const IssueCoupon = async (couponId: number) => {
  const response = await axiosInstance.post(`coupons/issue`, {
    couponId,
  });
  return response;
};
