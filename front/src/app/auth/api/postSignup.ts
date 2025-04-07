import axiosInstance from "@/utils/axiosInstance";

// interface SignupData {
//   user_name: string;
//   birthday: string;
//   withdraw_account_no: string;
//   saving_rate: number;
// }

export const postSignup = async (data: object) => {
  try {
    const response = await axiosInstance.post(`/users/me`, data);
    if (response) {
      return response;
    } else {
      throw new Error("응답에 데이터가 없습니다.");
    }
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
  }
};
