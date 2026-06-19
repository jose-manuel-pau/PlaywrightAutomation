class PracticeLoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByRole('textbox', { name: 'Username:' });
        this.password = page.getByRole('textbox', { name: 'Password:' });
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.termsCheckbox.check();
        await this.signInButton.click();
    }
}

module.exports = { PracticeLoginPage };
