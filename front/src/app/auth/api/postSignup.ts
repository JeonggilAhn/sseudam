import axiosInstance from "@/utils/axiosInstance";

export const postSignup = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/accounts`, data, {
      headers: {
        Authorization: `Bearer ${"token"}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
  }
};
