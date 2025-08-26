import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base.page"

class LoginPage extends BasePage {
  private emailInput: Locator
  private passwordInput: Locator
  private loginButton: Locator
  private errorMessage: Locator
  private registerLink: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = page.locator('[data-testid="email-input"]')
    this.passwordInput = page.locator('[data-testid="password-input"]')
    this.loginButton = page.locator('[data-testid="login-button"]')
    this.errorMessage = page.locator('[data-testid="error-message"]')
    this.registerLink = page.locator('[data-testid="register-link"]')
  }

  async goto(): Promise<void> {
    await super.goto("/login")
    await this.waitForPageLoad()
  }

  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.emailInput, email)
    await this.fillInput(this.passwordInput, password)
    await this.clickElement(this.loginButton)
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage)
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.loginButton.isEnabled()
  }

  async goToRegister(): Promise<void> {
    await this.clickElement(this.registerLink)
  }
}

export { LoginPage }
