import { BasePage } from "./base-page"
import type { Page } from "@playwright/test"

export class LoginPage extends BasePage {
  private emailInput = '[data-testid="email-input"]'
  private passwordInput = '[data-testid="password-input"]'
  private loginButton = '[data-testid="login-button"]'
  private errorMessage = '[data-testid="error-message"]'

  constructor(page: Page) {
    super(page)
  }

  async navigateToLogin() {
    await this.goto("/login")
    await this.waitForSelector(this.emailInput)
  }

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email)
    await this.fill(this.passwordInput, password)
    await this.click(this.loginButton)
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage)
  }

  async isLoginFormVisible(): Promise<boolean> {
    return await this.isVisible(this.emailInput)
  }
}
