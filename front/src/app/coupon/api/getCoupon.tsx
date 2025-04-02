import axiosInstance from "@/utils/axiosInstance";

export const GetCouponList = async () => {
  try {
    const response = await axiosInstance.get(`/coupons/list`);
    return response;
  } catch (error) {
    console.error("❌ 쿠폰 목록 조회 실패:", error);
  }
};
