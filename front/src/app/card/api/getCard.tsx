import axiosInstance from "@/utils/axiosInstance";

export const GetCardInfo = async () => {
  try {
    const response = await axiosInstance.get("/card/");
    return response;
  } catch (error) {
    console.error("❌ 카드 정보 조회 실패:", error);
  }
};

export const CheckAccount = async () => {
  try {
    const response = await axiosInstance.get(`/accounts/my`);
    return response;
  } catch (error) {
    console.error("❌ 계좌 조회 실패:", error);
  }
};

export const GetPiggyBalance = async () => {
  try {
    const response = await axiosInstance.get(`/accounts/my`);
    return response;
  } catch (error) {
    console.error("❌ 계좌 조회 실패:", error);
  }
};
