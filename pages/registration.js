const { page, expect } = require("@playwright/test");
const testData = require("../utils/test-Data");
class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator("#register-email");
    this.passwordField = page.locator("#register-password");
    this.confirmPasswordField = page.getByPlaceholder("Repeat your password");
    this.registerButton = page.getByTestId("register-btn");
    this.errorMessage = page.locator("p.mt-1.text-red-600");
    this.signInLink = page.getByRole("link", { name: "Sign in" });
    //this.duplicateEmailErrorMessage = page.locator("p.text-sm");
  }

  // =========================
  // NAVIGATION
  // =========================

  async navigate() {
    await this.page.goto("/register");
  }

  // =========================
  // FORM FILLING
  // =========================
  async fillRegistrationForm(email, password, confirmPassword) {
    await this.emailField.fill(email);

    await this.passwordField.fill(password);

    await this.confirmPasswordField.fill(confirmPassword);
  }

  // =========================
  // CLICK REGISTER
  // =========================

  async clickRegister() {
    await this.registerButton.click();
  }

  // =========================
  // ERROR MESSAGE VALIDATION
  // =========================

  async validateErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
  }
  // =========================
  // PLACEHOLDER VALIDATION
  // =========================

  async placeHolderVerification() {
    await expect(this.emailField).toHaveAttribute(
      "placeholder",
      "you@email.com",
    );
    await expect(this.passwordField).toHaveAttribute(
      "placeholder",
      "Min 8 chars, uppercase, number & symbol",
    );
    await expect(this.confirmPasswordField).toHaveAttribute(
      "placeholder",
      "Repeat your password",
    );
  }

  // =========================
  // EMPTY EMAIL VALIDATION
  // =========================

  async validateEmptyEmail() {
    await this.fillRegistrationForm(
      testData.registerData.blankEmail,
      testData.registerData.password,
      testData.registerData.confirmPassword,
    );
    await this.clickRegister();
    await this.validateErrorMessage();
  }

  // =========================
  // EMPTY PASSWORD VALIDATION
  // =========================

  async validateEmptyPassword() {
    await this.fillRegistrationForm(
      testData.registerData.randomEmail,
      testData.registerData.blankPassword,
      testData.registerData.blankPassword,
    );
    await this.clickRegister();
    await this.validateErrorMessage();
  }

  // =========================
  // EMAIL FIELD VALIDATION
  // =========================

  async validateInvalidEmail() {
    await this.fillRegistrationForm(
      testData.registerData.invalidEmail,
      testData.registerData.password,
      testData.registerData.confirmPassword,
    );
    await this.clickRegister();
    await this.validateErrorMessage();
  }

  // =========================
  // PASSWORD FIELD VALIDATION
  // =========================

  async validateInvalidPassword() {
    await this.fillRegistrationForm(
      testData.registerData.randomEmail,
      testData.registerData.invalidPassword,
      testData.registerData.invalidPassword,
    );
    await this.clickRegister();
    await this.validateErrorMessage();
  }

  // =========================
  // CONFIRM PASSWORD FIELD VALIDATION
  // =========================

  async validateInvalidConfirmPassword() {
    await this.fillRegistrationForm(
      testData.registerData.randomEmail,
      testData.registerData.confirmPassword,
      testData.registerData.invalidPassword,
    );
    if (await this.registerButton.isEnabled()) {
      await this.clickRegister();
    } else {
      console.log("Register button is disabled");
    }
    await this.validateErrorMessage();
  }

  // =========================
  // SUCCESSFUL REGISTRATION
  // =========================

  async successfulRegistration() {
    console.log("Generated random email:", testData.registerData.randomEmail);

    await this.fillRegistrationForm(
      testData.registerData.randomEmail,
      testData.registerData.password,
      testData.registerData.confirmPassword,
    );

    await this.clickRegister();
  }
  // =========================
  // Duplicate Email Registration Validation
  // =========================
  async duplicateEmailRegistration() {
    await this.fillRegistrationForm(
      testData.registerData.validEmail,
      testData.registerData.password,
      testData.registerData.confirmPassword,
    );
    await this.clickRegister();
    await expect(this.page.getByText("Email already registered")).toBeVisible();
  }

  // =========================
  // NAVIGATION VALIDATION
  // =========================

  async validateSignInNavigation() {
    await this.signInLink.click();
    await expect(this.page).toHaveURL(/login/);
  }
}
module.exports = { RegistrationPage };
