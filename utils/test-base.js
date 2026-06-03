const { test } = require('@playwright/test');

exports.customtest = test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "test_practise@gmail.com",
            password: "12345ABab$",
            productName: "ZARA COAT 3"
        });
    }
});
