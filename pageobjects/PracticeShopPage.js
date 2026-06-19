const { expect } = require('@playwright/test');

class PracticeShopPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('app-card');
    }

    async waitForShopPage() {
        await expect(this.page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    }

    async verifyProductIsVisible(productName) {
        await expect(this.products.filter({ hasText: productName })).toBeVisible();
    }
}

module.exports = { PracticeShopPage };
