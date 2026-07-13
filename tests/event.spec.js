const { EventPage } = require("../pages/event");
const { EventBookingPage } = require("../pages/eventBooking");
const { test, expect } = require("@playwright/test");

test.describe("Event Page", () => {
  let eventPage;
  let eventBookingPage;

  test.beforeEach(async ({ page }) => {
    eventPage = new EventPage(page);
    eventBookingPage = new EventBookingPage(page);
    await eventPage.navigate();
  });

  test("should search events with keyword", async () => {
    await test.step("Search for events using a keyword and verify that the results are relevant", async () => {
      await eventPage.searchWithKeyword("world");
      await eventBookingPage.validateRequireField();
      await eventBookingPage.validateBookingPrice(3);
      await eventBookingPage.verifyBookingDetails();
    });
  });
});
