import axiosInstance from "@/utils/axiosInstance";

export const getAccountRecord = async (queryParams: string) => {
  console.log("req", queryParams);
  try {
    const response = await axiosInstance.get(
      `/accounts/my/transactions?${queryParams.toString()}`
    );
    return response;
  } catch (error) {
    console.error("❌ 계좌 거래내역 조회 실패:", error);
  }
};

export const getCardRecord = async () => {
  try {
    const response = await axiosInstance.get(`/card-transactions`);
    return response;
  } catch (error) {
    console.error("❌ 기간 내 결제내역 확인 실패:", error);
  }
};
