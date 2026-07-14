const { chromium, expect } = require("@playwright/test");

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  //await page.goto(`${process.env.BASE_URL}login`);
  //console.log(`${process.env.BASE_URL}login`);
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  console.log(process.env.LOGIN_EMAIL);
  await page.fill("#email", process.env.LOGIN_EMAIL);
  console.log(process.env.LOGIN_PASSWORD);
  await page.fill("#password", process.env.LOGIN_PASSWORD);
  await page.click("#login-btn");
  await expect(await page.getByRole("button", { name: "Logout" })).toBeVisible({
    timeout: 60000,
  });
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}
module.exports = globalSetup;
