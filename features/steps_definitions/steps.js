const { Given,When, Then } = require('@cucumber/cucumber')
const { POManager} = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', {timeout: 100 * 1000}, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
});

When('Add {string} to Cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('The {string} is added to Cart', async function (productName) {
    await expect(this.page.getByText(productName)).toBeVisible();
});

When('Enter valid details and Place the order', {timeout: 100 * 1000}, async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    await checkoutPage.goToCheckout();
    await checkoutPage.selectCountry("spa", "Spain");
    await checkoutPage.fillPaymentDetails("550", "Jose Manuel");
    await checkoutPage.applyCoupon("rahulshettyacademy");
    await checkoutPage.placeOrder();

    const orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    await orderConfirmationPage.verifyOrderConfirmation();
});

Then('Verify order is present in the OderHistory', async function () {
    const orderConfirmationPage = this.poManager.getOrderConfirmationPage();
    const orderId = await orderConfirmationPage.getOrderId();
    await this.dashboardPage.navigateToOrders();
    const ordersPage = this.poManager.getOrdersPage();
    await ordersPage.waitForOrdersPage();
    await ordersPage.openOrder(orderId);
    await ordersPage.verifyOrderDetails(orderId);
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());
    //css   type, fill
    await userName.type(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});

