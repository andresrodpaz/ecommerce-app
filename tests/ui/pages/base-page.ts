import type { Page } from "@playwright/test"

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(url: string) {
    await this.page.goto(url)
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector)
  }

  async click(selector: string) {
    await this.page.click(selector)
  }

  async fill(selector: string, value: string) {
    await this.page.fill(selector, value)
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || ""
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector)
  }

  async waitForLoadState() {
    await this.page.waitForLoadState("networkidle")
  }
}
