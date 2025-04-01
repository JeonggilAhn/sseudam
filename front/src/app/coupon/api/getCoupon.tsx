import axiosInstance from "@/utils/axiosInstance";

export const CheckUserCoupon = async (userId: number, couponId: number) => {
  try {
    const response = await axiosInstance.get(``);
    for (const coupon of response.data) {
      if (coupon.coupon_id === couponId) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("❌ 쿠폰 조회 실패:", error);
    throw error;
  }
};
