import axios from "axios";

export const fetchQueue = async (controller?: AbortController) => {
  try {
    const response = await axios.get(
      "https://j12a106.p.ssafy.io/api/sse/subscribe",
      {
        headers: {
          Authorization: `${sessionStorage.getItem("access_token")}`,
        },
        signal: controller?.signal,
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_CANCELED") {
        console.warn("요청이 사용자에 의해 취소되었습니다.");
      } else {
        console.error("❌ 큐 정보 조회 실패:", error);
      }
    } else {
      console.error("❌ 알 수 없는 에러 발생:", error);
    }
  }
};
