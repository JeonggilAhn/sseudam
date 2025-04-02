import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export interface RegistCardProps {
  cardNo: string;
  cvc: string;
  userId: number;
  keyInfo: string;
  userName: string;
  expiryDate: string;
}

export const RegistCard = async ({
  cardNo,
  cvc,
  keyInfo,
  userName,
  expiryDate,
}: RegistCardProps) => {
  try {
    const response = await axiosInstance.post("/card/", {
      card_no: cardNo,
      cvc: cvc,
      key_info: keyInfo,
      user_name: userName,
      expiry_date: expiryDate,
    });
    if (response && response.status === 200) {
      toast.success("카드 등록 성공");
    } else {
      toast.error("카드 정보가 일치하지 않습니다.");
    }
    return response;
  } catch {
    toast.error("카드 등록 실패");
  }
};
