import {test, expect} from '@playwright/test';

test('Book event assignment', async ({page}) => {

    await login(page,'josemanuelpau@capitole-consulting.com','ET!ViXedFk9uJUX');

    const eventTitle = `Test Event ${Date.now()}`;

    await createEvent(page,eventTitle);

    const seatsBeforeBooking = await findEventAndCaptureSeats(page,eventTitle);

    await bookEvent(page,eventTitle);

    await fillBookEvent(page,eventTitle);

    const bookingRef = await verifyBookingConfirmation(page);

    await verifyMyBookings(page,eventTitle, bookingRef);

    await verifySeatsReduction(page,eventTitle, seatsBeforeBooking);

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

async function createEvent(page, eventTitle) {
await page.goto('https://eventhub.rahulshettyacademy.com/admin/events');

  await page.locator('#event-title-input').fill(eventTitle);

  const form = page.locator('#admin-event-form');

  await form
    .locator('textarea[placeholder="Describe the event…"]')
    .fill('This is a Playwright test event description.');
  
  await page.getByLabel('City').fill('Barcelona');
  await page.getByLabel('Venue').fill('Carrer de la Llibreteria, 62');

  await page.getByLabel("Event Date & Time").fill(futureDateValue());

  await page.getByLabel('Price ($)').fill('100.00');
  await page.getByLabel('Total Seats').fill('50');

  await page.locator("#add-event-btn").click();

  await expect(page.getByText('Event created!')).toBeVisible();

}

async function findEventAndCaptureSeats(page, eventTitle) {
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const matchedCard = await findEventCard(page, eventTitle);

  const seatsText = await matchedCard
    .locator('span', { hasText: 'seats' })
    .innerText();

  const seatsBeforeBooking = parseInt(seatsText, 10);

  return seatsBeforeBooking;
}

async function findEventCard(page, eventTitle) {
  const eventCards = page.getByTestId('event-card');

  await expect(eventCards.first()).toBeVisible();

  const matchedCard = eventCards.filter({
    hasText: eventTitle,
  });

  await expect(matchedCard).toBeVisible({ timeout: 5000 });

  return matchedCard;
}

async function bookEvent(page, eventTitle) {
  const matchedCard = await findEventCard(page, eventTitle);

  await matchedCard.getByTestId('book-now-btn').click();

  await expect(
    page.getByRole('heading', { name: 'Book Tickets' })
  ).toBeVisible({ timeout: 10000 });
}

async function fillBookEvent(page,eventTitle){

    await expect(
    page.getByRole('heading', { name: eventTitle })
    ).toBeVisible();
    await expect(page.locator('#ticket-count')).toHaveText('1');
    await page.getByLabel('Full Name').fill('Jose Manuel Pau Gamez');
    await page.locator('#customer-email').fill('josemanuelpau@capitole-consulting.com');
    await page.getByPlaceholder('+91 98765 43210').fill('+34 666665423');
    await page.locator(".confirm-booking-btn").click();

}

async function verifyBookingConfirmation(page){

    await expect(page.locator('.booking-ref').first()).toBeVisible();
    const bookingRefText = await page.locator('.booking-ref').first().innerText();
    const bookingRef = bookingRefText.trim();
    console.log('\x1b[32m%s\x1b[0m', `Booking created: ${bookingRef}`);
    return bookingRef;

}

async function verifyMyBookings(page,eventTitle,bookingRef){

    await page.locator('#nav-bookings').click();

    const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

    await expect(page).toHaveURL(`${BASE_URL}/bookings`);

    await expect(page.locator('#booking-card').first()).toBeVisible();

    const matchedBookingCard = page.locator('#booking-card').filter({
    has: page.locator('.booking-ref', { hasText: bookingRef }),
    });

    await expect(matchedBookingCard).toBeVisible();

    await expect(
    matchedBookingCard.getByRole('heading', { name: eventTitle })).toBeVisible();
}

async function verifySeatsReduction(page,eventTitle, seatsBeforeBooking){

    await page.goto('https://eventhub.rahulshettyacademy.com/events');

    const matchedCard = await findEventCard(page, eventTitle);

      const seatsText = await matchedCard
    .locator('span', { hasText: 'seats available' })
    .innerText();

    const seatsAfterBooking = parseInt(seatsText, 10);

    expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
    
}


function futureDateValue(daysFromToday = 7) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  const pad = value => String(value).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
