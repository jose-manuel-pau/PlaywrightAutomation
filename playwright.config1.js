// @ts-check
const { defineConfig, devices } = require('@playwright/test');

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

  projects: [
    {
      name: 'Firefox execution',
      use: {
        browserName: 'firefox',
        headless: true,
        screenshot: 'off',
        trace: 'on',
      }

    },
    {
      name: 'Chrome execution',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions:['geolocation'],
        trace: 'on',
        ...devices['Galaxy S24']
      }

    }

  ]
});
