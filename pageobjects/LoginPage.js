class LoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton = page.getByRole("button", { name: "Login" });
    this.userName = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
}

async validLogin(username,password)
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
module.exports ={LoginPage};