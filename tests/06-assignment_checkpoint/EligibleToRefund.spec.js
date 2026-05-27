import {test, expect} from '@playwright/test';

test('Eligible for Refund', async ({page}) => {

    await login(page,'josemanuelpau@capitole-consulting.com','ET!ViXedFk9uJUX');

    await bookFirstEvent(page);

    await fillBookEvent(page);

    await navigateBookingDetails(page);

    await validateBookingRef(page);

    await checkRefundEligibility(page);

    await validateResult(
    page,
    'Eligible for refund',
    'Single-ticket bookings qualify for a full refund'
    );

    console.log('\x1b[32m%s\x1b[0m', 'Test passed successfully, Congratulations!!!');
});

test('Not Eligible Refund', async ({page}) => {

    await login(page,'josemanuelpau@capitole-consulting.com','ET!ViXedFk9uJUX');

    await bookFirstEvent(page);

    await fillBookEvent(page, 3);

    await navigateBookingDetails(page);

    await validateBookingRef(page);

    await checkRefundEligibility(page);

    await validateResult(
    page,
    'Not eligible for refund',
    'Group bookings (3 tickets) are non-refundable'
    );

    console.log('\x1b[32m%s\x1b[0m', 'Test passed successfully, Congratulations!!!');
});

async function login(page, username, password) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  await page.getByPlaceholder('you@email.com').fill(username);
  await page.getByPlaceholder('••••••').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(
  page.getByRole('link', { name: 'Browse Events', exact: true })).toBeVisible();
}

async function bookFirstEvent(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const firstEventCard = page.getByTestId('event-card').first();

  await expect(firstEventCard).toBeVisible({ timeout: 5000 });

  await firstEventCard.getByTestId('book-now-btn').click();

}

async function fillBookEvent(page, ticketQuantity = 1) {
    await expect(
        page.getByRole('heading', { name: 'Book Tickets' })
    ).toBeVisible();

    const incrementButton = page.getByRole('button', { name: '+' });

    for (let i = 1; i < ticketQuantity; i++) {
        await incrementButton.click();
    }

    await expect(page.locator('#ticket-count')).toHaveText(String(ticketQuantity));

    await page.getByLabel('Full Name').fill('Jose Manuel Pau Gamez');
    await page.locator('#customer-email').fill('josemanuelpau@capitole-consulting.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+34 666665423');

    await page.getByRole('button', { name: 'Confirm Booking' }).click();
}

async function navigateBookingDetails(page) {
    await page.locator('#nav-bookings').click();

    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    const firstBookingCard = page.locator('#booking-card').first();

    await expect(firstBookingCard).toBeVisible();

    await firstBookingCard
        .getByRole('button', { name: 'View Details' })
        .click();

    await expect(page).toHaveURL(/\/bookings\/.+/);

    await expect(page.getByTestId('check-refund-btn')).toBeVisible({
        timeout: 5000,
    });
}

async function validateBookingRef(page){

    const bookingRef = (
        await page
            .locator('div.flex.items-center.gap-3.mb-2')
            .locator('span.font-mono.font-bold')
            .innerText()
    ).trim();

    const eventTitle = (
        await page.getByRole('heading', { level: 1 }).innerText()
    ).trim();

    const firstBookingRefChar = bookingRef.charAt(0);
    const firstEventTitleChar = eventTitle.charAt(0);

    expect(firstBookingRefChar).toBe(firstEventTitleChar);

}

async function checkRefundEligibility(page){

    await page.getByTestId('check-refund-btn').click();

    const spinner = page.locator('#refund-spinner');

    await expect(spinner).toBeVisible();
    await expect(spinner).toBeHidden({ timeout: 6000 });

}

async function validateResult(page, titleText, descriptionText) {
    const refundResult = page.locator('#refund-result');

    await expect(refundResult).toBeVisible();

    await expect(refundResult).toContainText(titleText);

    await expect(refundResult).toContainText(descriptionText);
}