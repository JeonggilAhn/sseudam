import axiosInstance from "@/utils/axiosInstance";

// export const postAccount = async (data: object) => {
export const postAccount = async () => {
  try {
    // const response = await axiosInstance.post(`/accounts`, data, {}
    const response = await axiosInstance.post(`/accounts`);
    if (response) {
      return response;
    } else {
      throw new Error("응답에 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("❌ 계좌개설 실패:", error);
  }
};
