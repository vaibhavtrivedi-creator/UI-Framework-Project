const { chromium } = require("@playwright/test");

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  //await page.goto(`${process.env.BASE_URL}login`);
  //console.log(`${process.env.BASE_URL}login`);
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.fill("#email", process.env.LOGIN_EMAIL);
  await page.fill("#password", process.env.LOGIN_PASSWORD);
  await page.click("#login-btn");
  await page.waitForURL("https://eventhub.rahulshettyacademy.com/");
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}
module.exports = globalSetup;
