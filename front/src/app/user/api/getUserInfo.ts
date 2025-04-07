import axiosInstance from "@/utils/axiosInstance";

export const getUserInfo = async () => {
  console.log("dd");
  try {
    const response = await axiosInstance.get("/users/me");
    if (response) {
      return response;
    } else {
      throw new Error("응답 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("❌ 응답 데이터 확보 실패:", error);
  }
};
