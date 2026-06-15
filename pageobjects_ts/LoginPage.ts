import {test,expect,Locator, type Page} from '@playwright/test';

export class LoginPage {

    page: Page;
    signInbutton: Locator;
    userName: Locator;
    password: Locator;

constructor(page: Page)
{
    this.page = page;
    this.signInbutton = page.getByRole("button", { name: "Login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
}

async validLogin(username: string,password: string)
{
    await this.userName.fill(username);
    await this.password.type(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');
}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client")
}
}