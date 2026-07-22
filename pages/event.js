const { expect } = require("@playwright/test");
class EventPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder("Search events, venues…");
    this.bookNowButton = page.locator("#book-now-btn");
  }

  // =========================
  // navigate
  // =========================

  async navigate() {
    await this.page.goto("https://eventhub.rahulshettyacademy.com/events");
  }

  async searchWithKeyword(searchText) {
    await this.searchInput.pressSequentially(searchText, { delay: 1000 });
    const eventCards = this.page.locator("#event-card");
    await expect(this.page.locator("#event-card").first()).toBeVisible();
    const eventCount = await eventCards.count();
    console.log(eventCount);
    for (let i = 0; i < eventCount; i++) {
      const eventCardText = await eventCards.locator("h3").nth(i).textContent();
      await expect(eventCardText.toLowerCase()).toContain(
        searchText.toLowerCase(),
      );
      if ((await this.bookNowButton.textContent()) === "Book Now") {
        await this.bookNowButton.click();
        break;
      } else {
        console.log("All event's tickets are sold out.");
      }
    }
  }
}
module.exports = { EventPage };
