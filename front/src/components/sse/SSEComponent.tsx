// src/SSEComponent.tsx
import React, { useState, useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const SSEComponent = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // 실제 사용하는 SSE 엔드포인트 URL로 수정하세요.
    // 예: 환경변수 사용: process.env.REACT_APP_SSE_URL
    const url = process.env.REACT_APP_SSE_URL || "http://localhost:8080/api/sse/subscribe";

    // 예시: localStorage에서 토큰을 읽어옴 (필요에 따라 수정)
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXIgMSIsImlhdCI6MTc0MzY2NzE2NCwiZXhwIjoxNzQ0NTMxMTY0fQ.CEnMc8vH4HHvxYK6ehjNp9usqQKPJksrPoMS0s0mx9k";

    // EventSourcePolyfill을 사용하여 커스텀 헤더를 포함한 SSE 연결 생성
    const es = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    es.onmessage = (event: MessageEvent) => {
      console.log("메시지 수신:", event.data);
      setMessage(event.data);
    };

    es.onerror = (err: Event) => {
      console.error("SSE 에러:", err);
      es.close();
    };

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      es.close();
    };
  }, []);

  return (
    <div>
      <h1>SSE 메시지</h1>
      <p>{message}</p>
    </div>
  );
};

export default SSEComponent;
