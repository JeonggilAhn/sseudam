import axiosInstance from "@/utils/axiosInstance";

export const getCouponDetail = async (couponId: number) => {
  try {
    const response = await axiosInstance.get(`/coupon/${couponId}`);
    return response.data;
  } catch (error) {
    console.error("❌ 쿠폰 상세 정보 조회 실패:", error);
    throw error;
  }
};
