"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CouponQueueModal from "./component/couponQueueModal";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function QueuePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [userId, setUserId] = useState<string>("");

  // 컴포넌트 마운트 시 사용자 ID 생성 및 WebSocket 연결
  useEffect(() => {
    // 고유 사용자 ID 생성
    const generatedUserId = `user_${Math.random().toString(36).substring(2, 15)}`;
    setUserId(generatedUserId);

    // WebSocket 연결 설정
    setupWebSocketConnection(generatedUserId);

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient && stompClient.connected) {
        // 대기열에서 사용자 제거 요청
        stompClient.publish({
          destination: "/app/queue/leave",
          body: JSON.stringify({ userId: generatedUserId }),
        });
        stompClient.deactivate();
      }
    };
  }, []);

  // WebSocket 연결 설정 함수
  const setupWebSocketConnection = (userId: string) => {
    // SockJS를 사용하여 WebSocket 연결 생성
    // SockJS는 WebSocket을 지원하지 않는 브라우저에서도 폴백 메커니즘 제공
    const socket = new SockJS("http://localhost:8080/ws");

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000, // 연결 끊김 시 5초 후 재연결 시도
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // 연결 성공 시 콜백
    client.onConnect = () => {
      setIsConnected(true);
      console.log("WebSocket 연결 성공");

      // 대기열 진입 요청
      client.publish({
        destination: "/app/queue/join",
        body: JSON.stringify({ userId }),
      });

      // 개인 대기열 상태 구독
      client.subscribe(`/user/queue/position/${userId}`, (message) => {
        const data = JSON.parse(message.body);
        setQueuePosition(data.position);
        setTotalUsers(data.totalUsers);

        // 대기열 순서가 되면 목적 페이지로 리다이렉트
        if (data.position === 0) {
          setTimeout(() => {
            router.push("/coupon");
          }, 1000);
        }
      });

      // 전체 대기열 상태 업데이트 구독
      client.subscribe("/topic/queue/status", (message) => {
        const data = JSON.parse(message.body);
        setTotalUsers(data.totalUsers);
      });
    };

    // 연결 오류 시 콜백
    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame);
      setIsConnected(false);
    };

    // WebSocket 연결 시작
    client.activate();
    setStompClient(client);
  };

  // 모달 닫기 처리 (경고 표시)
  const handleCloseModal = () => {
    if (confirm("대기열을 나가시겠습니까? 다시 대기해야 할 수 있습니다.")) {
      if (stompClient && stompClient.connected) {
        stompClient.publish({
          destination: "/app/queue/leave",
          body: JSON.stringify({ userId }),
        });
      }
      setShowModal(false);
      router.push("/");
    }
  };

  // 페이지 새로고침 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "페이지를 나가면 대기열에서 제외됩니다. 계속하시겠습니까?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4 bg-white shadow">
        <h1 className="text-xl font-bold">특별 쿠폰 이벤트</h1>
      </div>

      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <h2 className="text-lg font-semibold mb-2">이벤트 안내</h2>
            <p className="text-gray-600 mb-4">
              특별 할인 쿠폰을 선착순으로 제공합니다. 서버 부하 방지를 위해
              대기열 시스템을 운영 중입니다.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm text-yellow-800">
              현재 많은 사용자가 접속 중입니다. 잠시만 기다려주세요.
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <CouponQueueModal
          position={queuePosition}
          totalUsers={totalUsers}
          onClose={handleCloseModal}
          isConnected={isConnected}
        />
      )}
    </div>
  );
}
