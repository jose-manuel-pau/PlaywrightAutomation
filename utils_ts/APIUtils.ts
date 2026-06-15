import type { APIRequestContext } from '@playwright/test';

type LoginPayload = {
    userEmail: string;
    userPassword: string;
};

type OrderPayload = {
    orders: {
        country: string;
        productOrderedId: string;
    }[];
};

type LoginResponse = {
    token?: string;
    message?: string;
};

type CreateOrderResponse = {
    orders?: string[];
    message?: string;
};

export class APIUtils {
    apiContext: APIRequestContext;
    loginPayload: LoginPayload;

    constructor(apiContext: APIRequestContext, loginPayload: LoginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.loginPayload,
            }
        );

        const loginResponseJson = await loginResponse.json() as LoginResponse;

        if (!loginResponse.ok() || !loginResponseJson.token) {
            throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
        }

        return loginResponseJson.token;
    }

    async createOrder(orderPayload: OrderPayload): Promise<{
        token: string;
        orderId: string;
    }> {
        const token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayload,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            }
        );

        const orderResponseJson = await orderResponse.json() as CreateOrderResponse;

        if (!orderResponse.ok() || !orderResponseJson.orders?.length) {
            throw new Error(`Create order failed: ${JSON.stringify(orderResponseJson)}`);
        }

        return {
            token,
            orderId: orderResponseJson.orders[0],
        };
    }
}