const { expect } = require("@playwright/test");
class HomePage {
  constructor(page) {
    this.page = page;
    this.browseButton = page
      .locator("a")
      .filter({ hasText: "Browse Events →" });
    this.myBookingButton = page.getByRole("button", { name: "My Bookings" });
    this.headerHomeLink = page.locator("a.flex");
    this.eventAllButton = page.getByText("View all →");
    this.exploreAllEventsButton = page.getByRole("button", {
      name: "Explore All Events",
    });
  }
  // =========================
  // navigate
  // =========================
  async navigate() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/");
  }

  // =========================
  // validate & redirect URL of browse events button
  // =========================

  async validateBrowseButton() {
    await expect(this.browseButton).toBeVisible();
    await this.browseButton.click();
    await expect(this.page).toHaveURL("/events");
  }

  // =========================
  // validate & redirect URL of my booking button
  // =========================

  async validateMyBookingButton() {
    await expect(this.myBookingButton).toBeVisible();
    await this.myBookingButton.click();
    await expect(this.page).toHaveURL("/bookings");
  }

  async validateEventredirection() {
    const eventCount = await this.page.locator("#event-cards").count();
    for (let i = 0; i < eventCount; i++) {
      const eventCard = this.page.locator("#event-cards").nth(i);
      const eventButton = eventCard.locator("book-now-btn");
      await eventButton.click();
      await expect(this.page).toHaveURL(/\/events\/\d+/);
      await this.page.goBack();
      await this.page.waitForLoadState("networkidle");
    }
  }

  // =========================
  // validate & redirect URL of home link in header
  // =========================

  async validateHomeUrl() {
    await expect(this.headerHomeLink).toHaveAttribute("href", "/");
  }

  // =========================
  // validate & redirect URL of view all button
  // =========================

  async eventAllRedirection() {
    await this.eventAllButton.click();
    await expect(this.page).toHaveURL("/events");
  }

  // =========================
  // validate & redirect URL of explore all events button
  // =========================

  async exploreAllEventsRedirection() {
    await this.exploreAllEventsButton.click();
    await expect(this.page).toHaveURL("/events");
  }
}
module.exports = { HomePage };
