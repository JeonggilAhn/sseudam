export const UserAuth = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/auth/issue", {
      method: "GET",
      credentials: "include",
    });
    console.log(response);
    console.log("로그인 및 인증성공");
    return response.headers.get("authorization");
  } catch (error) {
    console.error("인증 확인 중 오류 발생:", error);
  }
};
