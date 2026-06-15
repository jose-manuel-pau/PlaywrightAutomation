import {test,expect,Locator, type Page} from '@playwright/test';

export class DashboardPage
{
	page: Page;
	products: Locator;
	productsText: Locator;
	cart: Locator;
	orders: Locator;
	constructor(page: Page){
	    this.page = page;
	    this.products = page.locator(".card-body");
	    this.productsText = page.locator(".card-body b");
	    this.cart = page.locator("[routerLink*='cart']").first();
	    this.orders = page.getByRole("button", { name: "Orders" });

}

async searchProductAddCart(productName: string)
{
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for(let i = 0; i < count; ++i){
            if(await this.products.nth(i).locator("b").textContent() == productName)
            {
                await this.products.nth(i).getByRole("button", { name: "Add to Cart" }).click();
                break;
            }
        }
}

	async navigateToCart()
	{
	    await this.cart.click();
	}

	async navigateToOrders()
	{
	    await this.orders.click();
	}


}