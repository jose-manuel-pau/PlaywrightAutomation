const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

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

let response;
const fakePayLoadOrders = {data:[],message:"No Orders"};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
  console.log(response);
});

test.only('Place the order', async ({ page }) => {
  const productName = 'ZARA COAT 3';

  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, response.token);

  await page.goto('https://rahulshettyacademy.com/client');

  page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route =>
    {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayLoadOrders);;
        route.fulfill(
            {
              response,
              body
            }

        );
        //interception response - Api response->{fakeResponse}->browser->render data on front end
    }
  )

  await expect(page.getByText(productName).first()).toBeVisible();
  await page.pause();

  await page.getByRole('button', { name: 'Orders' }).click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());  


});

// Verify if the order creator is in the history order list page
// Precondition -- create order --