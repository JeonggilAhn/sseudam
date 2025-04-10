import { test, expect } from "@playwright/test";

test("로그인 이후 적금 테스트", async ({ page }) => {
  // 0. 미리 accessToken을 세션에 넣어줌
  await page.goto("http://localhost:3000"); // 꼭 origin 맞춰줘야 함!
  await page.evaluate(() => {
    localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Imdvb2dsZSAxMTM4OTg4NDI5NDU2NDcxMDU2ODAiLCJpYXQiOjE3NDQxNzAzMjMsImV4cCI6MTc0NDI1NjcyM30.dsy17E3bFhHidyVFU-zwGtigRojA8SMb-VGG6wECGKc"
    );
  });
  console.log("✔️ 세션에 accessToken 설정 완료");

  console.log("✔️ 로그인 완료, 토큰 저장됨");

  // 1. /saving 페이지 진입
  await page.goto("/saving");
  console.log("✔️ /saving 페이지 이동 완료");

  // 2. 카드 렌더링 대기
  await page.waitForSelector("text=가입하기", { timeout: 10000 });
  console.log("✔️ 카드 렌더링 완료");

  // 3. 정렬 버튼 클릭 테스트
  await page.getByRole("button", { name: "금리순" }).click();
  await expect(page.getByRole("button", { name: "금리순" })).toHaveClass(
    /bg-blue-100/
  );

  await page.getByRole("button", { name: "좋아요순" }).click();
  await expect(page.getByRole("button", { name: "좋아요순" })).toHaveClass(
    /bg-blue-100/
  );

  // 4. 검색 → rnrals
  const input = page.getByPlaceholder("검색어를 입력하세요");
  await input.fill("rnrals");
  await input.press("Enter");
  console.log("✔️ 검색 실행");

  await page.waitForSelector("text=가입하기", { timeout: 10000 });

  // 5. 조회수순 다시 클릭
  await page.getByRole("button", { name: "조회수순" }).click();
  await expect(page.getByRole("button", { name: "조회수순" })).toHaveClass(
    /bg-blue-100/
  );

  // 6. 무한 스크롤 아래로
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  console.log("✔️ 무한 스크롤 완료");

  // 7. 다시 최상단으로 이동
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  console.log("✔️ 최상단 스크롤 이동 완료");

  // 8. 첫 번째 카드의 가입하기 버튼 클릭 → 모달(SavingDetail) 열림
  const joinBtn = page.locator("text=가입하기").first();
  await joinBtn.click();
  console.log("✔️ 카드 가입하기 클릭 → 상세 모달 열림");

  // 9. 상세 모달 내부 좋아요 버튼 클릭
  const likeButton = page.locator('button[aria-label="좋아요 버튼"]');
  await expect(likeButton).toBeVisible({ timeout: 5000 });
  await likeButton.click();
  console.log("✔️ 상세 모달 좋아요 버튼 클릭");

  // 10. 상세 모달의 가입하기 버튼 클릭
  const modalJoinButton = page
    .getByRole("button", { name: /가입하기/i }) // "가입하기" + 아이콘 포함된 버튼
    .last(); // 여러 개 있을 수 있으니 모달 내부의 마지막 버튼 대상으로

  await modalJoinButton.click();
  console.log("✔️ 상세 모달 가입하기 버튼 클릭");

  // 11. /saving/create 페이지 이동 확인
  await expect(page).toHaveURL(/\/saving\/create/);
  console.log("✔️ /saving/create 페이지 이동 확인");

  // 12. 납입 금액 입력 → 12000
  const amountInput = page.locator('input[placeholder="예: 100000"]');
  await amountInput.fill("12000");

  // 13. 가입 버튼 클릭
  const joinButton = page.getByRole("button", { name: "가입" });
  await expect(joinButton).toBeEnabled({ timeout: 10000 });
  await joinButton.click();

  // 14. 모달 등장 확인
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible({ timeout: 10000 });
  await expect(modal).toContainText("가입이 완료되었습니다!");
  console.log("✔️ 가입 완료 모달 확인");

  // 15. 확인 버튼 클릭 → /saving/detail 이동
  await modal.getByRole("button", { name: "확인" }).click();
  await expect(page).toHaveURL(/\/saving\/detail/);
  console.log("✔️ /saving/detail 이동 확인");

  // 16. 누적 납입금, 예상 원금/이자 등 텍스트 확인
  await expect(page.locator("text=누적 납입금")).toBeVisible();
  await expect(page.locator("text=만기 예상 원금")).toBeVisible();
  console.log("✔️ 상세 정보 텍스트 확인 완료");

  // 17. 하단 내비게이션의 'Home' 버튼 클릭 → /card 이동
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/card/);
  console.log("✔️ /card 페이지 이동 확인");
});
