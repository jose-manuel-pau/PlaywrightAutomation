class DashboardPage
{
	constructor(page){
	    this.page = page;
	    this.products = page.locator(".card-body");
	    this.productsText = page.locator(".card-body b");
	    this.cart = page.locator("[routerLink*='cart']").first();
	    this.orders = page.getByRole("button", { name: "Orders" });

}

async searchProductAddCart(productName)
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
module.exports = {DashboardPage}
