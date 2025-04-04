import axiosInstance from "@/utils/axiosInstance";

// export const postAccount = async (data: object) => {
export const postAccount = async () => {
  try {
    // const response = await axiosInstance.post(`/accounts`, data, {}
    const response = await axiosInstance.post(`/accounts`);
    return response;
  } catch (error) {
    console.error("❌ 계좌개설 실패:", error);
  }
};
