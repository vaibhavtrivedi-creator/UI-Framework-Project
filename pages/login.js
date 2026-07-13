const { expect } = require("@playwright/test");
const testData = require("../utils/test-Data");
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator("#email");
    this.passwordField = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: "Sign In" });
  }
  // =========================
  // NAVIGATION
  // =========================
  async navigate() {
    await this.page.goto("/login");
  }

  // =========================
  // filling login form
  // =========================

  async fillLoginForm(email, password) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  // =========================
  // Clioking login button
  // =========================

  async clickLogin() {
    await this.loginButton.click();
  }

  // =========================
  // Placeholder validation
  // =========================

  async validatePlaceholder() {
    await expect(this.emailField).toHaveAttribute(
      "placeholder",
      testData.loginData.emailPlaceholder,
    );
    await expect(this.passwordField).toHaveAttribute(
      "placeholder",
      testData.loginData.passwordPlaceholder,
    );
  }

  // =========================
  // Blank Email field validation
  // =========================
  async validateEmptyEmail() {
    await this.fillLoginForm(
      testData.loginData.blankEmail,
      testData.loginData.validPassword,
    );
    await this.clickLogin();
    await expect(() => {
      throw new Error("Enter a valid email");
    }).toThrow();
  }

  // =========================
  // Blank Password field validation
  // =========================
  async validateEmptyPassword() {
    await this.fillLoginForm(
      testData.loginData.validEmail,
      testData.loginData.blankPassword,
    );
    await this.clickLogin();
    await expect(() => {
      throw new Error("Password must be at least 6 characters");
    }).toThrow();
  }

  // =========================
  // Invalid Email format validation
  // =========================
  async validateInvalidEmail() {
    await this.fillLoginForm(
      testData.loginData.invalidEmail,
      testData.loginData.validPassword,
    );
    await this.clickLogin();
    await expect(this.page.getByText("Enter a valid email")).toBeVisible();
  }

  // =========================
  // Invalid Password format validation
  // =========================
  async validateInvalidPassword() {
    await this.fillLoginForm(
      testData.loginData.validEmail,
      testData.loginData.invalidPassword,
    );
    await this.clickLogin();
    await expect(
      this.page.getByText("Password must be at least 6 characters"),
    ).toBeVisible();
  }

  // =========================
  // Invalid credentials validation
  // =========================

  async validateInvalidCredentials() {
    await this.fillLoginForm(
      testData.loginData.validEmail,
      testData.loginData.invalidPassword,
    );
    await this.clickLogin();
    await expect(
      this.page.getByText("Invalid email or password"),
    ).toBeVisible();
  }
  // =========================
  // Successful login validation
  // =========================

  async validateSuccessfulLogin() {
    await this.fillLoginForm(
      testData.loginData.validEmail,
      testData.loginData.validPassword,
    );
    await this.clickLogin();
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.locator("#nav-home")).toBeVisible();
  }
}
module.exports = { LoginPage };
