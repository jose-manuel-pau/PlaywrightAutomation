const { test } = require("@playwright/test");

test("save google cookies", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "state.json",
  });

  const page = await context.newPage();
  await page.goto("https://google.com/");

  const acceptButton = page.getByRole("button", {
    name: /aceptar todo|accept all/i,
  });

  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  await context.storageState({ path: "state.with-google.json" });
});