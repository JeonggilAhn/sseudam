import axiosInstance from "@/utils/axiosInstance";

// interface SignupData {
//   user_name: string;
//   birthday: string;
//   withdraw_account_no: string;
//   saving_rate: number;
// }

export const postSignup = async (data: object) => {
  console.log("api", data);
  try {
    const response = await axiosInstance.post(`/users/me`, data);
    return response;
  } catch (error) {
    console.error("❌ 회원가입 실패:", error);
  }
};
