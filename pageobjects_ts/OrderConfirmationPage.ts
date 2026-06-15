import {test,expect,Locator, type Page} from '@playwright/test';

export class OrderConfirmationPage {
    page: Page
    orderConfirmation: Locator;
    orderId: Locator;
    constructor(page: Page) {
        this.page = page;
        this.orderConfirmation = page.getByText("Thankyou for the order.");
        this.orderId = page.getByText(/\|.*\|/);
    }

    async verifyOrderConfirmation() {
        await expect(this.orderConfirmation).toBeVisible();
    }

    async getOrderId(): Promise<string> {
    const orderId = await this.orderId.innerText();

    return orderId
        .replaceAll("|", "")
        .trim();
    }
}