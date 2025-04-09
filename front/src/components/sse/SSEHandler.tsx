import axios from "axios";

// 큐 정보 조회 함수
export const fetchQueue = async (controller?: AbortController) => {
  try {
    const response = await axios.get(
      "https://j12a106.p.ssafy.io/api/sse/subscribe",
      {
        headers: {
          Authorization: `${sessionStorage.getItem("access_token")}`,
        },
        signal: controller?.signal, // 요청이 취소되도록 signal 전달
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
    return null;
  }
};

// AbortController를 이용한 큐 조회 및 취소 기능 구현
const abortController = new AbortController(); // 새로운 AbortController 생성

const getQueueInfo = async () => {
  try {
    // AbortController의 signal을 전달하여 요청을 취소 가능하게 설정
    const response = await fetchQueue(abortController);
    if (response?.status === 200) {
      console.log("큐 정보 조회 성공:", response.data);
      return response.data;
    } else {
      console.error("큐 정보 조회 실패: 상태 코드", response?.status);
      throw new Error("큐 정보 조회 실패");
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (error instanceof Error && error.name === "AbortError") {
      console.log("큐 조회 요청이 취소되었습니다.");
    } else {
      console.error("큐 정보 조회 중 오류 발생:", error);
    }
    return null;
  }
};

// 큐 정보 조회를 취소하는 함수
const cancelQueueInfoFetch = () => {
  abortController.abort(); // AbortController를 사용하여 요청을 취소
  console.log("큐 조회가 취소되었습니다.");
};

// 큐 정보 조회 후 후속 작업을 처리하는 함수
const fetchQueueInfo = async () => {
  const queueInfo = await getQueueInfo();

  if (!queueInfo) {
    console.error("큐 정보 조회 실패로 작업을 중단합니다.");
    return;
  }

  // 큐 정보 조회가 성공했을 때만 후속 작업을 진행
  console.log("큐 정보:", queueInfo);
};

// 예시로 큐 정보 조회 취소
const exampleUsage = async () => {
  // 큐 조회 작업 시작
  fetchQueueInfo();

  // 예시로 요청을 일정 시간 후 취소하기
  setTimeout(() => {
    cancelQueueInfoFetch(); // 3초 후 큐 조회 요청 취소
  }, 3000);
};

// 호출 예시
exampleUsage();

// import axios from "axios";

// export const fetchQueue = async (controller?: AbortController) => {
//   try {
//     const response = await axios.get(
//       "https://j12a106.p.ssafy.io/api/sse/subscribe",
//       {
//         headers: {
//           Authorization: `${sessionStorage.getItem("access_token")}`,
//         },
//         signal: controller?.signal,
//       }
//     );
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       if (error.code === "ERR_CANCELED") {
//         console.warn("요청이 사용자에 의해 취소되었습니다.");
//       } else {
//         console.error("❌ 큐 정보 조회 실패:", error);
//       }
//     } else {
//       console.error("❌ 알 수 없는 에러 발생:", error);
//     }
//   }
// };
