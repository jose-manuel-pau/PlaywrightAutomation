import { type Page } from "@playwright/test";
import { CheckoutPage } from './CheckoutPage';
import { DashboardPage } from './DashboardPage';
import {LoginPage} from './LoginPage';
import { OrderConfirmationPage } from './OrderConfirmationPage';
import { OrdersPage } from './OrdersPage';

export class POManager {
    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage: CheckoutPage;
    orderConfirmationPage: OrderConfirmationPage;
    ordersPage: OrdersPage;
    constructor(page: Page) {
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