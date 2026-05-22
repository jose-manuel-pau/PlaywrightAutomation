const {test,expect} = require('@playwright/test');

test.only('@Gen Client App login', async ({page})=> 
{
    const email = "test_practise@gmail.com";
    const productName = "ZARA COAT 3";
    //ZARA COAT 3
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("12345ABab$");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle')
    const productTitles = page.locator(".card-body b");
    await expect(productTitles.first()).toBeVisible();
    const titles = await productTitles.allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i=0; i< count; ++i)
    {
      if(await products.nth(i).locator("b").textContent() === productName)
      {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    await page.locator("text=Checkout").click();
    
    await page.locator("[placeholder*='Country']").pressSequentially("spa",{delay:150});

    const dropdown = page.locator(".ta-results");
    await expect(dropdown).toBeVisible();
    await dropdown.getByRole("button", { name: "Spain" }).click();

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
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
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
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