import { test, expect } from "@playwright/test";

test("카드 등록 테스트", async ({ page }) => {
  await page.goto("/card");
});
