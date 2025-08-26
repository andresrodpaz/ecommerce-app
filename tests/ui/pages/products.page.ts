import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base.page"

class ProductsPage extends BasePage {
  private searchInput: Locator
  private searchButton: Locator
  private categoryFilter: Locator
  private priceFilter: Locator
  private productCards: Locator
  private addToCartButtons: Locator
  private paginationNext: Locator
  private paginationPrev: Locator

  constructor(page: Page) {
    super(page)
    this.searchInput = page.locator('[data-testid="search-input"]')
    this.searchButton = page.locator('[data-testid="search-button"]')
    this.categoryFilter = page.locator('[data-testid="category-filter"]')
    this.priceFilter = page.locator('[data-testid="price-filter"]')
    this.productCards = page.locator('[data-testid="product-card"]')
    this.addToCartButtons = page.locator('[data-testid="add-to-cart"]')
    this.paginationNext = page.locator('[data-testid="pagination-next"]')
    this.paginationPrev = page.locator('[data-testid="pagination-prev"]')
  }

  async goto(): Promise<void> {
    await super.goto("/products")
    await this.waitForPageLoad()
  }

  async searchProducts(query: string): Promise<void> {
    await this.fillInput(this.searchInput, query)
    await this.clickElement(this.searchButton)
    await this.waitForPageLoad()
  }

  async filterByCategory(category: string): Promise<void> {
    await this.categoryFilter.selectOption(category)
    await this.waitForPageLoad()
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count()
  }

  async addFirstProductToCart(): Promise<void> {
    await this.clickElement(this.addToCartButtons.first())
  }

  async getProductName(index = 0): Promise<string> {
    const productCard = this.productCards.nth(index)
    const nameElement = productCard.locator('[data-testid="product-name"]')
    return await this.getText(nameElement)
  }

  async goToNextPage(): Promise<void> {
    await this.clickElement(this.paginationNext)
    await this.waitForPageLoad()
  }
}

export { ProductsPage }
