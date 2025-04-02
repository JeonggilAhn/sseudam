import { test, expect } from "@playwright/test";

test("카드 등록 테스트", async ({ page }) => {
  // 카드 페이지로 이동 (포트가 변경될 수 있으므로 baseURL 설정 필요)
  await page.goto("/card");
  console.log("카드 페이지로 이동 완료");

  // 페이지가 로드될 때까지 대기
  await page.waitForLoadState("networkidle");
  console.log("페이지 로드 완료");

  // 카드가 없는 상태에서 카드 등록 버튼이 보이는지 확인
  const addCardButton = page.locator("#add-card");
  await expect(addCardButton).toBeVisible({ timeout: 10000 });
  console.log("카드 등록 버튼 확인 완료");

  // 카드 등록 버튼 클릭
  await addCardButton.click();
  console.log("카드 등록 버튼 클릭 완료");

  // 모달이 열렸는지 확인
  const cardModal = page.locator("#card-regist");
  await expect(cardModal).toBeVisible({ timeout: 5000 });
  console.log("모달 확인 완료");

  // 카드 정보 입력
  // 카드 번호 입력
  await page.locator("#cardNumber").fill("1001 3241 9779 2145");
  console.log("카드 번호 입력 완료");

  // 만료일 입력
  await page.locator("#expiry").fill("03/30");
  console.log("만료일 입력 완료");

  // CVC 입력
  await page.locator("#cvc").fill("418");
  console.log("CVC 입력 완료");

  // 카드 소유자 이름 입력
  await page.locator("#name").fill("sseudaam");
  console.log("카드 소유자 이름 입력 완료");

  // 카드 정보가 올바르게 입력되었는지 확인
  await expect(page.locator("#cardNumber")).toHaveValue("1001 3241 9779 2145");
  await expect(page.locator("#expiry")).toHaveValue("03/30");
  await expect(page.locator("#cvc")).toHaveValue("418");
  await expect(page.locator("#name")).toHaveValue("sseudaam");
  console.log("입력 정보 확인 완료");

  // 카드 등록 버튼 클릭
  await page.locator("#registCard").click();
  console.log("카드 등록 버튼 클릭 완료");

  // 모달이 닫히고 카드가 등록되었는지 확인 (시간이 걸릴 수 있으므로 대기)
  await expect(cardModal).not.toBeVisible({ timeout: 10000 });
  console.log("모달 닫힘 확인 완료");

  // 등록된 카드가 표시되는지 확인
  const registeredCard = page.locator("#cardRegistSuccess");
  await expect(registeredCard).toBeVisible({ timeout: 5000 });
  console.log("등록된 카드 확인 완료");

  // 카드 삭제 버튼 확인
  const deleteButton = page.locator("#cardDelete");
  await expect(deleteButton).toBeVisible();
  console.log("삭제 버튼 확인 완료");

  // 카드 삭제 테스트
  await deleteButton.click();
  console.log("삭제 버튼 클릭 완료");

  // 카드가 삭제되고 다시 카드 등록 버튼이 보이는지 확인
  await expect(addCardButton).toBeVisible({ timeout: 10000 });
  console.log("카드 삭제 확인 완료");
});
