const { test, expect } = require("@playwright/test");

test("Allymar login test", async ({ page }) => {
  await page.goto("https://velocity.test.allymarhealthsolutions.com/sign-in");
  await page.fill("#email", "vaibhav.trivedi+10@mindinventory.com");
  await page.fill("#password", "Mind@1234");
  await page.getByText("Login").click();
  await expect(page).toHaveURL(/organizations|select-org|documents/);
  if (page.url().includes("/select-org")) {
    await page.locator(".rounded-lg").locator('[title="Indexing"]').click();
    await page.getByText("Continue").click();
    await page.waitForURL(
      "https://velocity.test.allymarhealthsolutions.com/documents",
    );
  } else {
    await page.waitForURL(
      "https://velocity.test.allymarhealthsolutions.com/documents",
    );
  }
});
