const {test,expect} = require("@playwright/test");

test.use({storageState:"state.with-google.json"})

test("Popup validations",async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('http://google.com');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    // await page.pause();
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const coursesFrame = page.frameLocator('#courses-iframe');

    const lifetimeAccessLink = coursesFrame.locator(
    "a[href*='lifetime-access']:visible"
    );

    await expect(lifetimeAccessLink).toBeVisible();
    await lifetimeAccessLink.click();

    const heading = coursesFrame.locator('.text h2');

    await expect(heading).toBeVisible();

    const headingText = await heading.textContent();

    console.log(headingText.split(' ')[1]);

});

test("Screenshoot & Visual comparison", async({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshoot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshoot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();

});
// Screenshoot --> store --> Screenshoot
test.only("Visual", async ({ page }) => {
  await page.goto("https://www.google.com/");

  await expect(
    page.getByRole("button", { name: /aceptar todo|accept all/i })
  ).toBeHidden();

  await expect(page).toHaveScreenshot("landing.png", {
    maxDiffPixels: 200,
  });
});