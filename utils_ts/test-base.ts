import { test as base } from '@playwright/test';

type TestDataForOrder = {
    username: string;
    password: string;
    productName: string;
};

export const customtest = base.extend<{
    testDataForOrder: TestDataForOrder;
}>({
    testDataForOrder: async ({}, use) => {
        await use({
            username: "test_practise@gmail.com",
            password: "12345ABab$",
            productName: "ZARA COAT 3"
        });
    }
});
