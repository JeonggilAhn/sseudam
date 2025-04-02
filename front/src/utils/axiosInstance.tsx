import axios from "axios";
// import { useNavigate } from "next/navigation";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", //백엔드 서버 주소
  timeout: 1000, //요청 제한 시간(1초 내에 응답 없을 시 요청 실패)
  headers: {
    "Content-Type": "application/json",
  },
});

// 인터셉터 (오류 예외 처리)
axiosInstance.interceptors.response.use(
  (response) => response, //200일 경우 통과
  (error) => {
    //400 or 500 오류일 경우 예외 처리
    const status = error.response?.status;
    if (status === 401) {
      alert("401: 접근 자격 없음");
    } else if (status === 403) {
      alert("403: 접근 거부");
    } else if (status === 404) {
      alert("404: 페이지 없음");
    } else if (status === 500) {
      alert("500: 서버 오류");
    }
  }
);

export default axiosInstance;
