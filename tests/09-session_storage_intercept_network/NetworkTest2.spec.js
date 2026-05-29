const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {
    // login and reach orders page
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").type("Iamking@000");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText(productName).first()).toBeVisible();
    await page.getByRole('button', { name: 'Orders' }).click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a195a8e17ee3e78baa7005f' }));
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")


});