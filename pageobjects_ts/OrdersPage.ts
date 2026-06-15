import {test,expect,Locator, type Page} from '@playwright/test';

export class OrdersPage {
    page: Page;
    ordersHeading: Locator;
    orderIdDetails: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ordersHeading = page.getByRole("heading", { name: "Your Orders" });
        this.orderIdDetails = page.locator(".col-text");
    }

    async waitForOrdersPage() {
        await expect(this.ordersHeading).toBeVisible();
    }

    async openOrder(orderId: string) {
        const orderRow = this.page.getByRole("row").filter({ hasText: orderId });

        await expect(orderRow).toBeVisible();
        await orderRow.getByRole("button", { name: "View" }).click();
    }

    async verifyOrderDetails(orderId: string) {
        await expect(this.orderIdDetails).toHaveText(orderId);
    }
}
