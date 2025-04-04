import axiosInstance from "@/utils/axiosInstance";

export const patchSavingSettings = async (data: object) => {
  try {
    const response = await axiosInstance.patch(`/users/me`, data);
    return response;
  } catch (error) {
    console.error("❌ 계좌설정 변경 실패:", error);
  }
};
