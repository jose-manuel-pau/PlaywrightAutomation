class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload,
      }
    );

    const loginResponseJson = await loginResponse.json();

    if (!loginResponse.ok() || !loginResponseJson.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
    }

    return loginResponseJson.token;
  }

  async createOrder(orderPayload) {
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

    const orderResponseJson = await orderResponse.json();

    if (!orderResponse.ok() || !orderResponseJson.orders?.length) {
      throw new Error(`Create order failed: ${JSON.stringify(orderResponseJson)}`);
    }

    return {
      token,
      orderId: orderResponseJson.orders[0],
    };
  }
}

module.exports = { APIUtils };