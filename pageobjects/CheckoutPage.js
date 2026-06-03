class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.countryInput = page.getByPlaceholder("Select Country");
        this.cvvInput = page.getByRole("textbox").nth(1);
        this.nameOnCardField = page.getByText("Name on Card").locator("xpath=ancestor::div[contains(@class,'field')]");
        this.applyCouponField = page.getByText("Apply Coupon").locator("xpath=ancestor::div[contains(@class,'field')]");
        this.applyCouponButton = page.getByRole("button", { name: "Apply Coupon" });
        this.placeOrderButton = page.getByText("PLACE ORDER");
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async selectCountry(countrySearchText, countryName) {
        await this.countryInput.pressSequentially(countrySearchText, { delay: 150 });
        await this.page.getByRole("button", { name: countryName }).first().click();
    }

    async fillPaymentDetails(cvv, nameOnCard) {
        await this.cvvInput.fill(cvv);
        await this.nameOnCardField.getByRole("textbox").fill(nameOnCard);
    }

    async applyCoupon(coupon) {
        await this.applyCouponField.getByRole("textbox").fill(coupon);
        await this.applyCouponButton.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckoutPage };
