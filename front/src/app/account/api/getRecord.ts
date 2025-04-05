import axiosInstance from "@/utils/axiosInstance";

export const getAccountRecord = async (data: object) => {
  try {
    const response = await axiosInstance.get(`/accounts/my/transactions`);
    return response;
  } catch (error) {
    console.error("❌ 계좌 거래내역 조회 실패:", error);
  }
};

export const getCardRecord = async () => {
  try {
    //apidog에 보면, 해당 부분은 api 주소에 /api/가 빠져있음. 추후 확인하기
    const response = await axiosInstance.get(`/card-transactions`);
    return response;
  } catch (error) {
    console.error("❌ 기간 내 결제내역 확인 실패:", error);
  }
};
