// @ts-check

import { defineConfig } from "@playwright/test";

import dotenv from "dotenv";

import path from "path";

const env = process.env.NODE_ENV || "qa";

dotenv.config({
  path: path.resolve(__dirname, `.env.${env}`),
});

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  globalSetup: "./global-Setup.js",

  reporter: [["html"], ["line"], ["allure-playwright"]],

  use: {
    browserName: "chromium",

    baseURL: process.env.BASE_URL,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "on-first-retry",

    slowMo: 100,
  },

  globalTimeout: 30 * 60 * 1000,

  expect: {
    timeout: 15000,
  },

  projects: [
    // ======================
    // AUTH TESTS
    // ======================

    {
      name: "auth-tests",

      testMatch: ["**/auth/*.spec.js"],

      use: {
        storageState: {
          cookies: [],

          origins: [],
        },
      },
    },

    // ======================
    // LOGGED-IN TESTS
    // ======================

    {
      name: "logged-in-tests",

      testIgnore: ["**/auth/*.spec.js"],

      use: {
        storageState: "storageState.json",
      },
    },
  ],
});
