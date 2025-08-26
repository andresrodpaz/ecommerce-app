import type { Page, Locator } from "@playwright/test"

abstract class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url)
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle")
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` })
  }

  protected async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" })
    await locator.click()
  }

  protected async fillInput(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: "visible" })
    await locator.fill(value)
  }

  protected async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: "visible" })
    return (await locator.textContent()) || ""
  }
}

export { BasePage }
