import { ApiClient } from "../../utils/api-client"
import { TestDataGenerator } from "../../utils/test-data"

describe("Products API Tests", () => {
  let apiClient: ApiClient

  beforeEach(async () => {
    apiClient = new ApiClient()

    // Login for authenticated requests
    const testUsers = TestDataGenerator.getTestUsers()
    await apiClient.login(testUsers.customer.email, testUsers.customer.password)
  })

  describe("GET /products", () => {
    test("should return products list", async () => {
      const response = await apiClient.getProducts()

      expect(response.status).toBe(200)
      expect(response.body.products).toBeDefined()
      expect(Array.isArray(response.body.products)).toBe(true)
      expect(response.body.products.length).toBeGreaterThan(0)
    })

    test("should support pagination", async () => {
      const response = await apiClient.getProducts({ page: 1, limit: 10 })

      expect(response.status).toBe(200)
      expect(response.body.products.length).toBeLessThanOrEqual(10)
      expect(response.body.pagination).toBeDefined()
    })

    test("should filter by category", async () => {
      const response = await apiClient.getProducts({ category: "Electronics" })

      expect(response.status).toBe(200)
      response.body.products.forEach((product: any) => {
        expect(product.category).toBe("Electronics")
      })
    })

    test("should search by name", async () => {
      const response = await apiClient.getProducts({ search: "laptop" })

      expect(response.status).toBe(200)
      response.body.products.forEach((product: any) => {
        expect(product.name.toLowerCase()).toContain("laptop")
      })
    })

    test("should validate response schema", async () => {
      const response = await apiClient.getProducts()

      expect(response.body).toHaveProperty("products")
      expect(response.body).toHaveProperty("pagination")

      const product = response.body.products[0]
      expect(product).toHaveProperty("id")
      expect(product).toHaveProperty("name")
      expect(product).toHaveProperty("price")
      expect(product).toHaveProperty("category")
      expect(product).toHaveProperty("stock")
    })
  })

  describe("GET /products/:id", () => {
    test("should return single product", async () => {
      // First get a product ID
      const productsResponse = await apiClient.getProducts()
      const productId = productsResponse.body.products[0].id

      const response = await apiClient.getProduct(productId)

      expect(response.status).toBe(200)
      expect(response.body.id).toBe(productId)
    })

    test("should return 404 for non-existent product", async () => {
      await expect(apiClient.getProduct("non-existent-id")).rejects.toThrow()
    })
  })

  describe("Performance Tests", () => {
    test("should respond within acceptable time", async () => {
      const startTime = Date.now()

      await apiClient.getProducts()

      const responseTime = Date.now() - startTime
      expect(responseTime).toBeLessThan(2000) // Less than 2 seconds
    })
  })
})
