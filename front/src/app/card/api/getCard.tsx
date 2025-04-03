import axiosInstance from "@/utils/axiosInstance";

export const GetCardInfo = async () => {
  try {
    const response = await axiosInstance.get(`/card/`);
    return response;
  } catch (error) {
    console.error("❌ 카드 정보 조회 실패:", error);
    throw error;
  }
};
