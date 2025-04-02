import { defineConfig, devices } from "@playwright/test";

/**
 * SSDAM 프로젝트의 Playwright 설정 파일
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./src/test",
  /* 테스트 실행 시간 제한 */
  timeout: 30 * 1000,
  /* 각 테스트 실행 전에 기본 상태로 돌아갑니다 */
  fullyParallel: true,
  /* 실패한 테스트에 대한 재시도 횟수 */
  retries: 1,
  /* 테스트 실행 시 리포터 설정 */
  reporter: "html",
  /* 공유 설정 */
  use: {
    /* 기본 URL 설정 - 서버가 3001 포트에서 실행 중 */
    baseURL: "http://localhost:3001",
    /* 모든 테스트에 대해 트레이스 수집 */
    trace: "on-first-retry",
    /* 스크린샷 설정 */
    screenshot: "only-on-failure",
    /* 비디오 녹화 설정 */
    video: "on-first-retry",
  },

  /* 테스트 프로젝트 설정 */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* 모바일 테스트 설정 */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  /* 웹 서버 자동 실행 설정 */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
