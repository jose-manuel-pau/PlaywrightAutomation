import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = {
    email: 'jose.yahoo.test@example.com',
    password: 'Test12345!',
};

const GMAIL_USER = {
    email: 'josemanuelpau@capitole-consulting.com',
    password: 'ET!ViXedFk9uJUX',
};

test('Gmail user cannot view Yahoo user booking', async ({ page, request }) => {
    const yahooToken = await loginViaApi(request, YAHOO_USER);

    const yahooBookingId = await createBookingForAvailableEvent(request, yahooToken, {
        customerName: 'Yahoo User',
        customerEmail: YAHOO_USER.email,
        customerPhone: '9876543210',
        quantity: 1,
    });

    await loginAs(page, GMAIL_USER);

    const yahooBookingUrl = `${BASE_URL}/bookings/${yahooBookingId}`;

    await page.goto(yahooBookingUrl, { waitUntil: 'networkidle' });

    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(
        page.getByText('You are not authorized to view this booking')
    ).toBeVisible();

    console.log('\x1b[32m%s\x1b[0m', 'Test passed successfully! Access denied message is visible!');
});

async function loginViaApi(request, user) {
    const response = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: user.email,
            password: user.password,
        },
    });

    await expectApiResponseOk(response, 'Login failed');

    const responseBody = await response.json();
    const token = responseBody.token || responseBody.data?.token;

    expect(token).toBeTruthy();

    return token;
}

async function getAvailableEvents(request, token, quantity) {
    const response = await request.get(`${API_URL}/events`, {
        headers: authHeaders(token),
    });

    await expectApiResponseOk(response, 'Events request failed');

    const responseBody = await response.json();

    const events = responseBody.data
        .filter(event => Number(event.availableSeats) >= quantity)
        .sort((firstEvent, secondEvent) =>
            Number(secondEvent.availableSeats) - Number(firstEvent.availableSeats)
        );

    expect(events.length, 'No event with available seats was found').toBeGreaterThan(0);

    return events;
}

async function createBookingForAvailableEvent(request, token, bookingPayload) {
    const events = await getAvailableEvents(request, token, bookingPayload.quantity);
    let lastError;

    for (const event of events) {
        const response = await request.post(`${API_URL}/bookings`, {
            headers: authHeaders(token),
            data: {
                ...bookingPayload,
                eventId: event.id,
            },
        });

        if (response.ok()) {
            const responseBody = await response.json();
            const bookingId = responseBody.data.id;

            expect(bookingId).toBeTruthy();

            return bookingId;
        }

        lastError = await response.text();

        if (!lastError.includes('seat(s) available')) {
            throw new Error(
                `Booking request failed. Status: ${response.status()}. Body: ${lastError}`
            );
        }
    }

    throw new Error(`Booking request failed for every available event. Last error: ${lastError}`);
}

async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByPlaceholder('••••••').fill(user.password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(
        page.getByRole('link', { name: 'Browse Events', exact: true })
    ).toBeVisible();
}

function authHeaders(token) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

async function expectApiResponseOk(response, errorMessage) {
    if (!response.ok()) {
        throw new Error(
            `${errorMessage}. Status: ${response.status()}. Body: ${await response.text()}`
        );
    }
}
