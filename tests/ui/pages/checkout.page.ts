import { type Page, type Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"

export class CheckoutPage extends BasePage {
  private readonly shippingForm: Locator
  private readonly paymentForm: Locator
  private readonly orderSummary: Locator
  private readonly submitButton: Locator
  private readonly errorMessages: Locator

  constructor(page: Page) {
    super(page)
    this.shippingForm = page.locator('[data-testid="shipping-form"]')
    this.paymentForm = page.locator('[data-testid="payment-form"]')
    this.orderSummary = page.locator('[data-testid="order-summary"]')
    this.submitButton = page.locator('[data-testid="submit-order"]')
    this.errorMessages = page.locator('[data-testid="error-message"]')
  }

  async goto(): Promise<void> {
    await this.page.goto("/checkout")
    await this.waitForPageLoad()
  }

  /**
   * Complete full checkout flow - demonstrates E2E testing capability
   */
  async completeCheckoutFlow(userData: CheckoutData): Promise<string> {
    await this.fillShippingInfo(userData.shipping)
    await this.selectPaymentMethod(userData.payment.method)
    await this.fillPaymentInfo(userData.payment)
    await this.reviewOrder()

    const orderNumber = await this.submitOrder()
    await this.verifyOrderConfirmation(orderNumber)

    return orderNumber
  }

  async fillShippingInfo(shipping: ShippingInfo): Promise<void> {
    await this.page.fill('[data-testid="shipping-name"]', shipping.fullName)
    await this.page.fill('[data-testid="shipping-address"]', shipping.address)
    await this.page.fill('[data-testid="shipping-city"]', shipping.city)
    await this.page.fill('[data-testid="shipping-postal"]', shipping.postalCode)
    await this.page.selectOption('[data-testid="shipping-country"]', shipping.country)
  }

  async selectPaymentMethod(method: "credit-card" | "paypal" | "bank-transfer"): Promise<void> {
    await this.page.click(`[data-testid="payment-method-${method}"]`)
    await expect(this.page.locator(`[data-testid="payment-method-${method}"]`)).toBeChecked()
  }

  async fillPaymentInfo(payment: PaymentInfo): Promise<void> {
    if (payment.method === "credit-card") {
      await this.page.fill('[data-testid="card-number"]', payment.cardNumber!)
      await this.page.fill('[data-testid="card-expiry"]', payment.expiryDate!)
      await this.page.fill('[data-testid="card-cvv"]', payment.cvv!)
      await this.page.fill('[data-testid="card-name"]', payment.cardholderName!)
    }
  }

  async reviewOrder(): Promise<void> {
    await expect(this.orderSummary).toBeVisible()

    // Verify order details are displayed correctly
    await expect(this.page.locator('[data-testid="order-items"]')).toBeVisible()
    await expect(this.page.locator('[data-testid="order-total"]')).toBeVisible()
    await expect(this.page.locator('[data-testid="shipping-details"]')).toBeVisible()
  }

  async submitOrder(): Promise<string> {
    await this.submitButton.click()

    // Wait for order processing
    await this.page.waitForSelector('[data-testid="order-confirmation"]', { timeout: 10000 })

    // Extract order number
    const orderNumberElement = this.page.locator('[data-testid="order-number"]')
    const orderNumber = await orderNumberElement.textContent()

    return orderNumber?.replace("Order #", "") || ""
  }

  async verifyOrderConfirmation(orderNumber: string): Promise<void> {
    await expect(this.page.locator('[data-testid="order-confirmation"]')).toBeVisible()
    await expect(this.page.locator('[data-testid="order-number"]')).toContainText(orderNumber)
    await expect(this.page.locator('[data-testid="confirmation-message"]')).toBeVisible()
  }

  /**
   * Error handling validation - demonstrates robust testing approach
   */
  async validateErrorHandling(): Promise<void> {
    // Test empty form submission
    await this.submitButton.click()
    await expect(this.errorMessages).toBeVisible()

    // Test invalid payment info
    await this.fillPaymentInfo({
      method: "credit-card",
      cardNumber: "1234", // Invalid card number
      expiryDate: "01/20", // Expired date
      cvv: "12", // Invalid CVV
      cardholderName: "",
    })

    await this.submitButton.click()
    await expect(this.page.locator('[data-testid="payment-errors"]')).toBeVisible()
  }

  /**
   * Performance validation - ensures checkout completes within acceptable time
   */
  async validatePerformance(): Promise<number> {
    const startTime = Date.now()

    await this.goto()
    await this.waitForPageLoad()

    const loadTime = Date.now() - startTime

    // Assert performance criteria
    expect(loadTime).toBeLessThan(3000) // Should load within 3 seconds

    return loadTime
  }
}

// Supporting interfaces for type safety
interface CheckoutData {
  shipping: ShippingInfo
  payment: PaymentInfo
}

interface ShippingInfo {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

interface PaymentInfo {
  method: "credit-card" | "paypal" | "bank-transfer"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}
