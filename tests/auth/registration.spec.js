const { test, expect } = require("@playwright/test");
const { RegistrationPage } = require("../../pages/registration");

test.describe("Registration Page", () => {
  let registrationPage;
  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigate();
  });
  test("should display correct placeholders", async () => {
    await registrationPage.placeHolderVerification();
  });

  test("should display error message for empty email", async () => {
    await registrationPage.validateEmptyEmail();
  });
  test("should display error message for empty password", async () => {
    await registrationPage.validateEmptyPassword();
  });
  test("should display error message for invalid email", async () => {
    await registrationPage.validateInvalidEmail();
  });
  test("should display error message for invalid password", async () => {
    await registrationPage.validateInvalidPassword();
  });
  test("should display error message for invalid confirm password", async () => {
    await registrationPage.validateInvalidConfirmPassword();
  });
  test("@regression Registration form should be submitted successfully with valid data", async () => {
    await test.step("Fill the registration form with valid data and submit", async () => {
      await registrationPage.successfulRegistration();
    });
  });
  test("should display error message for duplicate email", async () => {
    await registrationPage.duplicateEmailRegistration();
  });
  test("should navigate to sign-in page when clicking on sign-in link", async () => {
    await registrationPage.validateSignInNavigation();
  });
});
