import { expect, type Locator, type Page } from "@playwright/test";

let message1 : string = "Hello";
message1 = "bye";
console.log(message1);

let age1 :number = 20;
console.log(age1);
let isActive :boolean = false;

let numberArray : number[] = [1,2,3];

let data : any = "this could be anything";
data = 42;
function add(a:number,b:number)
{
    return a+b;
}

add(3,4);

let user: {name:string,age:number,location:string} = {name: "Bob",age:34,location:"Madrid"};
user.location="Barcelona";

class CheckoutPage {

    page:  Page;
    checkoutButton: Locator;
    countryInput: Locator;
    cvvInput: Locator;
    nameOnCardField: Locator;
    applyCouponField: Locator;
    applyCouponButton: Locator;
    placeOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
        this.countryInput = page.getByPlaceholder("Select Country");
        this.cvvInput = page.getByRole("textbox").nth(1);
        this.nameOnCardField = page.getByText("Name on Card").locator("xpath=ancestor::div[contains(@class,'field')]");
        this.applyCouponField = page.getByText("Apply Coupon").locator("xpath=ancestor::div[contains(@class,'field')]");
        this.applyCouponButton = page.getByRole("button", { name: "Apply Coupon" });
        this.placeOrderButton = page.getByText("PLACE ORDER");
    }
}