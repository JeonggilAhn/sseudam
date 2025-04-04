import axiosInstance from "@/utils/axiosInstance";

export const postAccount = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/accounts`, data, {
      headers: {
        Authorization: `Bearer ${"token"}`,
        // "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("❌ 계좌개설 실패:", error);
  }
};
