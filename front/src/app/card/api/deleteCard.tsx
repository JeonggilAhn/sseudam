import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const DeleteUserCard = async (userId: number) => {
  try {
    const response = await axiosInstance.delete(`/card/${userId}`);
    if (response && response.status === 200) {
      toast.success("카드 삭제 성공");
      return response;
    } else {
      toast.error("카드를 삭제할 수 없습니다.");
    }
  } catch (error) {
    console.error("카드 삭제 중 오류:", error);
    throw error;
  }
};
