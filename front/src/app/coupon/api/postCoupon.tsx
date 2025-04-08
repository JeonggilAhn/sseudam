import axiosInstance from "@/utils/axiosInstance";

export const CheckCouponIssued = async (couponId: number) => {
  try {
    const response = await axiosInstance.post(`/coupons/validate`, {
      couponId: couponId,
    });
    return response;
  } catch (error) {
    console.error("❌ 쿠폰 조회 실패:", error);
  }
};

export const IssueCoupon = async (couponId: number) => {
  try {
    const response = await axiosInstance.post(`/coupons/enter`, {
      couponId: couponId,
    });
    console.log(response);
  } catch (error) {
    console.error("❌ 쿠폰 발급 실패:", error);
  }
};
