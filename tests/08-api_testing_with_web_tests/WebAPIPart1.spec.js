const { test, expect, request } = require('@playwright/test');

const loginPayload = {
  userEmail: 'anshika@gmail.com',
  userPassword: 'Iamking@000',
};

let apiContext;
let loginResponse;
let token;

test.beforeAll(async () => {
    apiContext = await request.newContext();

    loginResponse = await apiContext.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
        data: loginPayload,
        }
    );

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
});

test.beforeEach(  ()=>
{


});

// test 1, test2, test 3


test.only('Place the order', async ({ page }) => {

    await page.addInitScript(value=>{

        window.localStorage.setItem('token',value);
    },token);
    const email = "test_practise@gmail.com";
    const productName = "ZARA COAT 3";
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page.getByText(productName).first()).toBeVisible();

    await page
        .getByText(productName)
        .locator("xpath=ancestor::*[contains(@class,'card-body')]")
        .getByRole("button", { name: "Add to Cart" })
        .click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.getByRole("listitem").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("spa", { delay: 150 });

    await page.getByRole("button", { name: "Spain" }).first().click();

    await page.getByRole("textbox").nth(1).fill("550");

    const nameOnCardField = page.getByText("Name on Card").locator("xpath=ancestor::div[contains(@class,'field')]");

    await nameOnCardField.getByRole("textbox").fill("Jose Manuel");

    const applyCouponField = page.getByText("Apply Coupon").locator("xpath=ancestor::div[contains(@class,'field')]");

    await applyCouponField.getByRole("textbox").fill("rahulshettyacademy");
    await page.getByRole("button", { name: "Apply Coupon" }).click();

    await expect(page.getByText(/Coupon Applied/i)).toBeVisible();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    const orderId = (await page.getByText(/\|.*\|/).textContent())
        .replaceAll("|", "")
        .trim();

    console.log(orderId);

    await page.getByRole("button", { name: "Orders" }).click();

    await expect(page.getByRole("heading", { name: "Your Orders" })).toBeVisible();

    const orderRow = page.getByRole("row").filter({ hasText: orderId });

    await expect(orderRow).toBeVisible();
    await orderRow.getByRole("button", { name: "View" }).click();

    await expect(page.locator(".col-text")).toHaveText(orderId);
});

test('@Web Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole("button", { name: "Login" }).click();

    await page.waitForLoadState("networkidle");

    await expect(page.getByText(productName).first()).toBeVisible();

    await page
        .getByText(productName)
        .locator("xpath=ancestor::*[contains(@class,'card-body')]")
        .getByRole("button", { name: "Add to Cart" })
        .click();

    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await page.getByRole("listitem").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});