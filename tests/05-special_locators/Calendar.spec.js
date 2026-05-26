const {test,expect} = require("@playwright/test");


test("Calendar validations",async({page})=>
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup input");

    for (let i=0; i< expectedList.length; i++)
    {
        const value = await inputs.nth(i+1).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

});

test.only("Calendar validations optimized", async ({ page }) => {
    const monthNumber = "6";
    const date = "15";
    const year = "2027";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();

    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();

    await page.getByText(year).click();

    await page
        .locator(".react-calendar__year-view__months__month")
        .nth(Number(monthNumber) - 1)
        .click();

    await page.locator(`//abbr[text()='${date}']`).click();

    const dateInputs = page.locator(".react-date-picker__inputGroup input");

    await expect(dateInputs.nth(1)).toHaveValue(monthNumber);
    await expect(dateInputs.nth(2)).toHaveValue(date);
    await expect(dateInputs.nth(3)).toHaveValue(year);
});