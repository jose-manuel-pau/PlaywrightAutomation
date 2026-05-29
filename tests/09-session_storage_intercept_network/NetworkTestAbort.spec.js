const {test,expect} = require('@playwright/test');

test.only('Browser Context Playwright test', async ({browser})=> 
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.route('**/*.{jpg,png,jpeg}',route => route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()))
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title());
    //css   type, fill
    await userName.type("raulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await signIn.click();

    await expect(cardTitles.first()).toBeVisible();

    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']")
    const dropdown = page.locator("select.form-control"); 
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    //assertion

});

test('Child windows handling', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    await expect(newPage).toHaveURL(/documents-request/);
    await expect(newPage.locator(".red")).toBeVisible();

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];

    await page.bringToFront(); // switch visually back to the parent page
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});