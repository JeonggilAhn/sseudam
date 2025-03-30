import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export const getCardInfo = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/card/${userId}`);
    const data = response.data;
    return data;
  } catch (error) {
    toast.error("카드 정보 조회를 실패하였습니다.");
  }
};
