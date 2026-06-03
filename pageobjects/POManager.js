const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderConfirmationPage } = require("./OrderConfirmationPage");
const { OrdersPage } = require("./OrdersPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.orderConfirmationPage = new OrderConfirmationPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }



}
module.exports = { POManager };
