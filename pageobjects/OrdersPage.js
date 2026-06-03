const { expect } = require('@playwright/test');

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersHeading = page.getByRole("heading", { name: "Your Orders" });
        this.orderIdDetails = page.locator(".col-text");
    }

    async waitForOrdersPage() {
        await expect(this.ordersHeading).toBeVisible();
    }

    async openOrder(orderId) {
        const orderRow = this.page.getByRole("row").filter({ hasText: orderId });

        await expect(orderRow).toBeVisible();
        await orderRow.getByRole("button", { name: "View" }).click();
    }

    async verifyOrderDetails(orderId) {
        await expect(this.orderIdDetails).toHaveText(orderId);
    }
}

module.exports = { OrdersPage };
