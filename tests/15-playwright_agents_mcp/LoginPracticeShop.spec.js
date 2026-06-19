const { test } = require('@playwright/test');
const { PracticeLoginPage } = require('../../pageobjects/PracticeLoginPage');
const { PracticeShopPage } = require('../../pageobjects/PracticeShopPage');

test('Login practice page and verify iphone X product is present', async ({ page }) => {
    const username = 'rahulshettyacademy';
    const password = 'Learning@830$3mK2';
    const productName = 'iphone X';

    const practiceLoginPage = new PracticeLoginPage(page);
    const practiceShopPage = new PracticeShopPage(page);

    await practiceLoginPage.goTo();
    await practiceLoginPage.validLogin(username, password);
    await practiceShopPage.waitForShopPage();
    await practiceShopPage.verifyProductIsVisible(productName);
});
