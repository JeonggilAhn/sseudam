import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export interface RegistCardProps {
  cardNo: string;
  cvc: string;
  userId: number;
  keyInfo: string;
}

export const RegistCard = async ({
  cardNo,
  cvc,
  userId,
  keyInfo,
}: RegistCardProps) => {
  try {
    const response = await axiosInstance.post("/card", {
      card_no: cardNo,
      cvc: cvc,
      user_id: userId,
      key_info: keyInfo,
    });
    const data = response.data;
    return data;
  } catch (error) {
    toast.error("카드 등록 실패");
  }
};
