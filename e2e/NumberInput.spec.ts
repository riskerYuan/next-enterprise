import { expect, test } from "@playwright/test"

test.describe("NumberInput Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000") // 确保你的应用在这个地址运行
  })

  test("should render the input field", async ({ page }) => {
    const input = page.locator('input[type="text"]')
    await expect(input).toBeVisible()
  })

  test("should format number with commas", async ({ page }) => {
    const input = page.locator('input[type="text"]')
    await input.fill("1000")
    await expect(input).toHaveValue("1,000")
  })

  test("should handle decimal input", async ({ page }) => {
    const input = page.locator('input[type="text"]')
    await input.fill("1234.56")
    await expect(input).toHaveValue("1,234.56")
  })
})
