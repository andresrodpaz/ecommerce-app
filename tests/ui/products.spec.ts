import { test, expect } from "@playwright/test"
import { ProductsPage } from "./pages/products-page"
import { LoginPage } from "./pages/login-page"
import { TestDataGenerator } from "../../utils/test-data"

test.describe("Products Tests", () => {
  let productsPage: ProductsPage

  test.beforeEach(async ({ page }) => {
    // Login before each test
    const loginPage = new LoginPage(page)
    await loginPage.goto()

    const testUsers = TestDataGenerator.getTestUsers()
    await loginPage.login(testUsers.customer.email, testUsers.customer.password)

    productsPage = new ProductsPage(page)
    await productsPage.goto()
  })

  test("should display products list", async () => {
    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)
  })

  test("should search products by name", async () => {
    await productsPage.searchProducts("laptop")

    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)

    const firstProductName = await productsPage.getProductName(0)
    expect(firstProductName.toLowerCase()).toContain("laptop")
  })

  test("should filter products by category", async () => {
    await productsPage.filterByCategory("Electronics")

    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)
  })

  test("should add product to cart", async ({ page }) => {
    await productsPage.addFirstProductToCart()

    // Verify success message or cart update
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })

  test("should navigate through product pages", async () => {
    const initialProductName = await productsPage.getProductName(0)

    await productsPage.goToNextPage()

    const newProductName = await productsPage.getProductName(0)
    expect(newProductName).not.toBe(initialProductName)
  })
})

test.describe("Products Responsive Tests", () => {
  test("should display products correctly on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const productsPage = new ProductsPage(page)
    await productsPage.goto()

    const productCount = await productsPage.getProductCount()
    expect(productCount).toBeGreaterThan(0)
  })
})
