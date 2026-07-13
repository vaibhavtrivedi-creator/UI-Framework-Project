import { test as base } from "@playwright/test";
const testData = require("../utils/test-Data");

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    await page.goto("/login");
    await page.fill("#email", testData.loginData.validEmail);
    await page.fill("#password", testData.loginData.validPassword);
    await page.getByRole("button", { name: "Sign In" }).click();

    await use(page);
  },
});
