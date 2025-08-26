import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base-page"

export class CartPage extends BasePage {
  private cartItems: Locator
  private quantityInputs: Locator
  private removeButtons: Locator
  private totalAmount: Locator
  private checkoutButton: Locator
  private emptyCartMessage: Locator

  constructor(page: Page) {
    super(page)
    this.cartItems = page.locator('[data-testid="cart-item"]')
    this.quantityInputs = page.locator('[data-testid="quantity-input"]')
    this.removeButtons = page.locator('[data-testid="remove-item"]')
    this.totalAmount = page.locator('[data-testid="total-amount"]')
    this.checkoutButton = page.locator('[data-testid="checkout-button"]')
    this.emptyCartMessage = page.locator('[data-testid="empty-cart"]')
  }

  async goto(): Promise<void> {
    await super.goto("/cart")
    await this.waitForPageLoad()
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count()
  }

  async updateQuantity(itemIndex: number, quantity: string): Promise<void> {
    const quantityInput = this.quantityInputs.nth(itemIndex)
    await this.fillInput(quantityInput, quantity)
    await this.page.keyboard.press("Enter")
    await this.waitForPageLoad()
  }

  async removeItem(itemIndex: number): Promise<void> {
    await this.clickElement(this.removeButtons.nth(itemIndex))
    await this.waitForPageLoad()
  }

  async getTotalAmount(): Promise<string> {
    return await this.getText(this.totalAmount)
  }

  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton)
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible()
  }
}
