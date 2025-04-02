import axiosInstance from "@/utils/axiosInstance";

export const CheckCouponIssued = async (userId: number, couponId: number) => {
  try {
    const response = await axiosInstance.post(`/coupons/validate`, {
      coupon_id: couponId,
      user_id: userId,
    });
    console.log("✅ 쿠폰 조회:", userId, couponId);
    console.log("✅ 쿠폰 조회:", response.data.content);
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
