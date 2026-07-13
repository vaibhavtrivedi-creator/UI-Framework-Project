const testData = require("../utils/test-Data");
const { expect } = require("@playwright/test");
class EventBookingPage {
  constructor(page) {
    this.page = page;
    this.errorMessage = page.locator("p.text-red-600");
    this.nameField = page.locator("#customerName");
    this.emailField = page.locator("#customer-email");
    this.phoneField = page.locator("#phone");
    this.confirmBookingButton = page.locator("#confirm-booking");
    this.ticketPrice = page.locator(".text-2xl");
    this.ticketCount = page.locator("#ticket-count");
    this.totalBookingValue = page.locator(".bg-indigo-50 .text-indigo-700");
    this.plusButton = page.getByRole("button", { name: "+", exact: true });
    this.bookingDetail = page.locator(".bg-white.p-6");
    this.myBookingTab = page.locator("#nav-bookings");
    this.viewDetailButton = page.getByRole("button", { name: "View Details" });
    this.bookingCard = page.locator("#booking-card");
    this.textTitle = this.bookingDetail.locator("h2");
    this.eventDetail = this.bookingDetail.locator(".space-y-3");
    this.eventRow = this.eventDetail.locator("> div");
  }

  async validateRequireField() {
    await this.confirmBookingButton.click();
    await expect(this.errorMessage.first()).toBeVisible();
    const expectedErrors = testData.eventValiodationErrorMessage.errorMessages;
    const errorCount = await this.errorMessage.count();
    for (let i = 0; i < errorCount; i++) {
      const actualError = (await this.errorMessage.nth(i).textContent()).trim();
      expect(expectedErrors).toContain(actualError);
      console.log(actualError);
    }
  }
  async validateBookingPrice(clickCount) {
    for (let i = 0; i < clickCount; i++) {
      await this.plusButton.click();
    }

    await this.nameField.fill(testData.eventBookingInfo.name);
    await this.emailField.fill(testData.eventBookingInfo.email);
    await this.phoneField.fill(testData.eventBookingInfo.phone);
    const actualPrice = await this.ticketPrice.getByText("$").textContent();
    const priceValue = parseFloat(actualPrice.replace(/[$,]/g, ""));
    console.log("Price Value:", priceValue);
    const ticketQuantity = await this.ticketCount.textContent();
    const expectedPrice = {
      value: priceValue * parseInt(ticketQuantity),
    };
    console.log("Expected Price:", expectedPrice.value);
    const totalBookingPrice = await this.totalBookingValue.textContent();
    const totalPriceValue = parseFloat(totalBookingPrice.replace(/[$,]/g, ""));
    console.log("Total Price Value:", totalPriceValue);
    expect(expectedPrice.value).toBe(totalPriceValue);
    await this.confirmBookingButton.click();
  }
  async verifyBookingDetails() {
    await this.myBookingTab.click();
    await this.bookingCard.first().waitFor({ state: "visible" });
    await this.viewDetailButton.click();
    await this.bookingDetail.first().waitFor({ state: "visible" });
    const bookingDetailCount = await this.bookingDetail.count();
    for (let i = 0; i < bookingDetailCount; i++) {
      const titleText = await this.textTitle.nth(i).innerText();
      console.log(titleText);
      const rows = this.bookingDetail.nth(i).locator(".space-y-3 > div");

      const rowCount = await rows.count();
      for (let j = 0; j < rowCount; j++) {
        const label = await rows.nth(j).locator("span").first().innerText();
        const value = await rows.nth(j).locator("span").last().innerText();
        console.log(`\x1b[34m${label}\x1b[0m : ${value}`);
      }
    }
  }
}

module.exports = { EventBookingPage };
