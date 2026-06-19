const { test, expect } = require('@playwright/test');

const API_BASE_URL = 'https://rahulshettyacademy.com/api/ecom';

const loginPayload = {
    userEmail: 'test_practise@gmail.com',
    userPassword: '12345ABab$',
};

const orderPayload = {
    orders: [
        {
            country: 'Spain',
            productOrderedId: '6960eac0c941646b7a8b3e68',
        },
    ],
};

test('@API make HTTP calls with Playwright request', async ({ request }) => {
    const token = await login(request, loginPayload);
    const orderId = await createOrder(request, token, orderPayload);

    expect(orderId).toBeTruthy();

    console.log({ orderId });
});

async function login(request, payload) {
    const response = await request.post(`${API_BASE_URL}/auth/login`, {
        data: payload,
    });

    const responseBody = await parseJsonResponse(response, 'Login failed');

    expect(responseBody.token).toBeTruthy();

    return responseBody.token;
}

async function createOrder(request, token, payload) {
    const response = await request.post(`${API_BASE_URL}/order/create-order`, {
        data: payload,
        headers: authHeaders(token),
    });

    const responseBody = await parseJsonResponse(response, 'Create order failed');

    expect(responseBody.orders).toHaveLength(1);

    return responseBody.orders[0];
}

async function parseJsonResponse(response, errorMessage) {
    const responseBody = await response.json();

    if (!response.ok()) {
        throw new Error(
            `${errorMessage}. Status: ${response.status()}. Body: ${JSON.stringify(responseBody)}`
        );
    }

    return responseBody;
}

function authHeaders(token) {
    return {
        Authorization: token,
        'Content-Type': 'application/json',
    };
}
