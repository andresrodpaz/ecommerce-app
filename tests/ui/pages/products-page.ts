import { BasePage } from "./base-page"
import type { Page } from "@playwright/test"

export class ProductsPage extends BasePage {
  private productGrid = '[data-testid="product-grid"]'
  private productCard = '[data-testid="product-card"]'
  private addToCartButton = '[data-testid="add-to-cart"]'
  private cartIcon = '[data-testid="cart-icon"]'
  private searchInput = '[data-testid="search-input"]'
  private filterButton = '[data-testid="filter-button"]'

  constructor(page: Page) {
    super(page)
  }

  async navigateToProducts() {
    await this.goto("/products")
    await this.waitForSelector(this.productGrid)
  }

  async searchProduct(productName: string) {
    await this.fill(this.searchInput, productName)
    await this.page.keyboard.press("Enter")
    await this.waitForLoadState()
  }

  async addProductToCart(productIndex = 0) {
    const products = await this.page.locator(this.productCard).all()
    if (products[productIndex]) {
      await products[productIndex].locator(this.addToCartButton).click()
    }
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productCard).count()
  }

  async openCart() {
    await this.click(this.cartIcon)
  }
}
