const { expect } = require('@playwright/test');

class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
        this.orderConfirmation = page.getByText("Thankyou for the order.");
        this.orderId = page.getByText(/\|.*\|/);
    }

    async verifyOrderConfirmation() {
        await expect(this.orderConfirmation).toBeVisible();
    }

    async getOrderId() {
        return (await this.orderId.textContent())
            .replaceAll("|", "")
            .trim();
    }
}

module.exports = { OrderConfirmationPage };
