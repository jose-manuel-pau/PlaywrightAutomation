const { test, expect } = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const { orderTestData } = require('../../utils/placeorderTestData'); 
const {customtest} = require('../../utils/test-base');

for (const testData of orderTestData) {

test(`@Gen Client App login for ${testData.productName}`, async ({ page }) => {  

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testData.username,testData.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testData.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.goToCheckout();
    await checkoutPage.selectCountry("spa", "Spain");
    await checkoutPage.fillPaymentDetails("550", "Jose Manuel");
    await checkoutPage.applyCoupon("rahulshettyacademy");
    await checkoutPage.placeOrder();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.verifyOrderConfirmation();
    const orderId = await orderConfirmationPage.getOrderId();

    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.waitForOrdersPage();
    await ordersPage.openOrder(orderId);
    await ordersPage.verifyOrderDetails(orderId);
});
}

customtest('Client App login', async({page,testDataForOrder}) => 
{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.goToCheckout();
    await checkoutPage.selectCountry("spa", "Spain");
    await checkoutPage.fillPaymentDetails("550", "Jose Manuel");
    await checkoutPage.applyCoupon("rahulshettyacademy");
    await checkoutPage.placeOrder();

    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.verifyOrderConfirmation();
    const orderId = await orderConfirmationPage.getOrderId();

    console.log(orderId);

    await dashboardPage.navigateToOrders();

    const ordersPage = poManager.getOrdersPage();
    await ordersPage.waitForOrdersPage();
    await ordersPage.openOrder(orderId);
    await ordersPage.verifyOrderDetails(orderId);

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

    await expect(page.getByText("Product Added To Cart")).toBeVisible();
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();

    await expect(page.locator("h3", { hasText: productName })).toBeVisible();

    await page.getByRole("button", { name: "Checkout" }).click();

    await page.getByPlaceholder("Select Country").pressSequentially("ind");

    await page.getByRole("button", { name: "India" }).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});
