const { LoginPage } = require("../../pages/login");
const { test, expect } = require("@playwright/test");

test.describe("Login Page", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("should display correct placeholders", async () => {
    await test.step("Verify the placeholders for email and password fields", async () => {
      await loginPage.validatePlaceholder();
    });
  });

  test("should display error message for empty email", async () => {
    await test.step("Attempt to login with empty email and verify error message", async () => {
      await loginPage.validateEmptyEmail();
    });
  });

  test("should display error message for empty password", async () => {
    await test.step("Attempt to login with empty password and verify error message", async () => {
      await loginPage.validateEmptyPassword();
    });
  });

  test("should display error message for invalid email", async () => {
    await test.step("Attempt to login with invalid email and verify error message", async () => {
      await loginPage.validateInvalidEmail();
    });
  });

  test("should display error message for invalid password", async () => {
    await test.step("Attempt to login with invalid password and verify error message", async () => {
      await loginPage.validateInvalidPassword();
    });
  });

  test("@regression should login successfully with valid credentials", async () => {
    await test.step("Login with valid email and password and verify successful login", async () => {
      await loginPage.validateSuccessfulLogin();
    });
  });
});
