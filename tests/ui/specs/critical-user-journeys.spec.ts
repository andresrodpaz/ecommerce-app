import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/login.page"
import { ProductsPage } from "../pages/products.page"
import { CartPage } from "../pages/cart.page"
import { CheckoutPage } from "../pages/checkout.page"
import { testData } from "../../fixtures/test-data"

test.describe("Critical User Journeys - E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await page.evaluate(() => localStorage.clear())
  })

  test("Complete Purchase Flow - Happy Path", async ({ page }) => {
    const loginPage = new LoginPage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)

    // Step 1: User Authentication
    await test.step("User logs in successfully", async () => {
      await loginPage.goto()
      await loginPage.login(testData.validUser.email, testData.validUser.password)
      await expect(page.locator('[data-testid="user-menu"]')).toBeVisible()
    })

    // Step 2: Product Discovery and Selection
    await test.step("User browses and selects products", async () => {
      await productsPage.goto()
      await productsPage.searchProduct("laptop")
      await productsPage.filterByCategory("electronics")
      await productsPage.addProductToCart("gaming-laptop")

      await expect(page.locator('[data-testid="cart-badge"]')).toContainText("1")
    })

    // Step 3: Cart Management
    await test.step("User reviews cart and updates quantities", async () => {
      await cartPage.goto()
      await cartPage.updateQuantity("gaming-laptop", 2)
      await cartPage.verifyTotalPrice("2398.00")

      await expect(page.locator('[data-testid="cart-total"]')).toContainText("$2,398.00")
    })

    // Step 4: Checkout Process
    await test.step("User completes checkout successfully", async () => {
      await checkoutPage.goto()
      await checkoutPage.fillShippingInfo(testData.shippingInfo)
      await checkoutPage.selectPaymentMethod("credit-card")
      await checkoutPage.fillPaymentInfo(testData.paymentInfo)
      await checkoutPage.submitOrder()

      await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible()
      await expect(page.locator('[data-testid="order-number"]')).toBeVisible()
    })
  })

  test("Error Handling - Invalid Payment", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)

    await test.step("Setup cart with products", async () => {
      await page.goto("/checkout")
      // Simulate cart with products
      await page.evaluate(() => {
        localStorage.setItem("cart", JSON.stringify([{ id: "laptop-1", quantity: 1, price: 1199.0 }]))
      })
      await page.reload()
    })

    await test.step("Handle invalid payment gracefully", async () => {
      await checkoutPage.fillShippingInfo(testData.shippingInfo)
      await checkoutPage.fillPaymentInfo(testData.invalidPaymentInfo)
      await checkoutPage.submitOrder()

      await expect(page.locator('[data-testid="payment-error"]')).toBeVisible()
      await expect(page.locator('[data-testid="payment-error"]')).toContainText("Invalid payment information")
    })
  })

  test("Mobile Responsive - Critical Flows", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE

    await test.step("Mobile navigation works correctly", async () => {
      await page.goto("/")
      await page.locator('[data-testid="mobile-menu-toggle"]').click()
      await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible()
    })

    await test.step("Mobile checkout is functional", async () => {
      const checkoutPage = new CheckoutPage(page)
      await checkoutPage.goto()

      // Verify mobile-optimized form layout
      await expect(page.locator('[data-testid="mobile-checkout-form"]')).toBeVisible()
      await expect(page.locator('[data-testid="mobile-payment-section"]')).toBeVisible()
    })
  })
})
