const { HomePage } = require("../pages/home.js");
//const { test, expect } = require("@playwright/test");
const { test, expect } = require("../fixtures/login-fixture.js");

test.describe("Home Page", () => {
  let homePage;
  test.beforeEach(async ({ loggedInPage }) => {
    homePage = new HomePage(loggedInPage);
    await homePage.navigate();
  });
  test("should validate browse events button", async () => {
    await test.step("Verify the browse events button is visible and redirects to the correct URL", async () => {
      await homePage.validateBrowseButton();
    });
  });
  test("should validate my booking button", async () => {
    await test.step("Verify the my booking button is visible and redirects to the correct URL", async () => {
      await homePage.validateMyBookingButton();
    });
  });
  test("should validate event redirection", async () => {
    await test.step("Verify that clicking on each event redirects to the correct event details page", async () => {
      await homePage.validateEventredirection();
    });
  });
  test("should validate home URL", async () => {
    await test.step("Verify that the home link in the header redirects to the correct URL", async () => {
      await homePage.validateHomeUrl();
    });
  });
  test("should validate event all redirection", async () => {
    await test.step("Verify that clicking on the 'View all' button redirects to the correct URL", async () => {
      await homePage.eventAllRedirection();
    });
  });
  test("should validate explore all events redirection", async () => {
    await test.step("Verify that clicking on the 'Explore All Events' button redirects to the correct URL", async () => {
      await homePage.exploreAllEventsRedirection();
    });
  });
});
