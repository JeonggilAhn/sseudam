import axios from "axios";

export const fetchQueue = async () => {
  try {
    const response = await axios.get(
      "https://j12a106.p.ssafy.io/api/sse/subscribe",
      {
        headers: {
          Authorization: `${sessionStorage.getItem("access_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("❌ 큐 정보 조회 실패:", error);
  }
};
