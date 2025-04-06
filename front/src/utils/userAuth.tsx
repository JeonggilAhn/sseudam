export const UserAuth = async () => {
  try {
    const response = await fetch("https://j12a106.p.ssafy.io/api/auth/issue", {
      method: "GET",
      credentials: "include",
    });
    sessionStorage.setItem(
      "access_token",
      response.headers.get("Authorization") || ""
    );

    return true;
  } catch (error) {
    console.error("인증 확인 중 오류 발생:", error);
  }
};
