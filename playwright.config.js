/// <reference types="node" />
// @ts-check
const { defineConfig } = require('@playwright/test');

const isCI = !!process.env.CI;

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,

  expect: {
    timeout: 5000
  },

  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    browserName: 'chromium',
    headless: isCI,
    screenshot: 'on',
    trace: 'on',
    video: isCI ? 'retain-on-failure' : 'off'
  }
});
