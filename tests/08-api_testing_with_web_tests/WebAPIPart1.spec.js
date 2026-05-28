const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginPayload = {
  userEmail: 'test_practise@gmail.com',
  userPassword: '12345ABab$',
};

const orderPayload = {
  orders: [
    {
      country: 'Spain',
      productOrderedId: '6960eac0c941646b7a8b3e68',
    },
  ],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);

  response = await apiUtils.createOrder(orderPayload);
  console.log(response);
});

test.only('Place the order', async ({ page }) => {
  const productName = 'ZARA COAT 3';

  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client');

  await expect(page.getByText(productName).first()).toBeVisible();

  await page.getByRole('button', { name: 'Orders' }).click();
  await expect(page.getByRole('heading', { name: 'Your Orders' })).toBeVisible();

  const orderRow = page.getByRole('row').filter({ hasText: response.orderId });

  await expect(orderRow).toBeVisible();
  await orderRow.getByRole('button', { name: 'View' }).click();

  await expect(page.locator('.col-text')).toHaveText(response.orderId);
  console.log('\x1b[32m%s\x1b[0m', 'Test passed successfully, the orderId ' +response.orderId+ ' generated in the order is on the order page!! Congratulations!!!');

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

// Verify if the order creator is in the history order list page
// Precondition -- create order --