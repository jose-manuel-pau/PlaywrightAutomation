const {test,expect} = require('@playwright/test');

test.only('@Gen Client App login', async ({page})=> 
{
    const email = "test_practise@gmail.com";
    const productName = "ZARA COAT 3";
    //ZARA COAT 3
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").type("12345ABab$");
    await page.getByRole("button", {name:"Login"}).click();
    // await page.waitForLoadState('networkidle')
    const productTitles = page.locator(".card-body b");
    await expect(productTitles.first()).toBeVisible();

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

   
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name :"Checkout"}).click();
    
    await page.getByPlaceholder("Select Country").pressSequentially("spa",{delay:150});

    await page.getByRole("button", { name: "Spain" }).nth(0).click();

    await page.locator("div.field.small [type='text']").first().fill("550");
    const Boxes = await page.locator("div.field");
    const numTextBoxes = await Boxes.count();
    for(let i =0;i< numTextBoxes; ++i)
    {
        const text = await Boxes.nth(i).locator(".title").textContent();
        if (text === "Name on Card ")
        {
            await Boxes.nth(i).locator(".input.txt").fill("Jose Manuel");
            break;
        }
    }
      
    await page.locator("div.field.small [type='text']").last().fill("rahulshettyacademy");
    const applyButton = page.locator("div button[type='submit']");
    await applyButton.click();
    const couponMessage = page.locator("div p[style='color: green;']");
    await expect(couponMessage).toBeVisible();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    const orderId = (await page.locator("td label.ng-star-inserted").textContent())
        .replaceAll("|", "")
        .trim();

    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await expect(page.getByRole("heading", { name: "Your Orders" })).toBeVisible();

    const orderedProducts = page.locator("tr.ng-star-inserted");
    await expect(orderedProducts.first()).toBeVisible();

    const ordersCount = await orderedProducts.count();

    for (let i = 0; i < ordersCount; ++i) {
        const row = orderedProducts.nth(i);
        const rowOrderId = (await row.locator("th[scope='row']").textContent()).trim();

        if (rowOrderId === orderId) {
            await row.getByRole("button", { name: "View" }).click();
            break;
        }
    }

    await expect(page.locator("div.email-title")).toBeVisible();

    const orderId2 = (await page.locator(".col-text").textContent()).trim();
    expect(orderId2).toBe(orderId);

});