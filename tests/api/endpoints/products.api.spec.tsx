import { describe, test, expect, beforeAll, afterAll } from "@jest/globals"
import { ApiClient } from "../../utils/api-client"
import { testData } from "../../fixtures/test-data"
import { productSchema, productListSchema } from "../../schemas/product.schema"

describe("Products API - Comprehensive Testing", () => {
  let apiClient: ApiClient
  let authToken: string

  beforeAll(async () => {
    apiClient = new ApiClient(process.env.API_BASE_URL!)

    // Authenticate as admin for full API access
    const authResponse = await apiClient.post("/auth/login", {
      email: testData.adminUser.email,
      password: testData.adminUser.password,
    })

    authToken = authResponse.data.token
    apiClient.setAuthToken(authToken)
  })

  afterAll(async () => {
    await apiClient.cleanup()
  })

  describe("GET /api/products", () => {
    test("should return paginated products with correct schema", async () => {
      const response = await apiClient.get("/api/products?page=1&limit=10")

      expect(response.status).toBe(200)
      expect(response.data).toMatchSchema(productListSchema)
      expect(response.data.products).toHaveLength(10)
      expect(response.data.pagination).toHaveProperty("total")
      expect(response.data.pagination).toHaveProperty("pages")
    })

    test("should handle search and filtering correctly", async () => {
      const response = await apiClient.get("/api/products?search=laptop&category=electronics")

      expect(response.status).toBe(200)
      expect(
        response.data.products.every(
          (p: any) => p.name.toLowerCase().includes("laptop") && p.category === "electronics",
        ),
      ).toBe(true)
    })

    test("should return 400 for invalid pagination parameters", async () => {
      const response = await apiClient.get("/api/products?page=-1&limit=1000")

      expect(response.status).toBe(400)
      expect(response.data.error).toContain("Invalid pagination parameters")
    })
  })

  describe("POST /api/products", () => {
    test("should create product with valid data", async () => {
      const newProduct = {
        name: "Test Gaming Laptop",
        description: "High-performance gaming laptop for testing",
        price: 1299.99,
        category: "electronics",
        stock: 50,
        images: ["test-laptop.jpg"],
      }

      const response = await apiClient.post("/api/products", newProduct)

      expect(response.status).toBe(201)
      expect(response.data).toMatchSchema(productSchema)
      expect(response.data.name).toBe(newProduct.name)
      expect(response.data.id).toBeDefined()

      // Cleanup
      await apiClient.delete(`/api/products/${response.data.id}`)
    })

    test("should validate required fields", async () => {
      const invalidProduct = {
        name: "", // Invalid: empty name
        price: -100, // Invalid: negative price
        category: "invalid-category", // Invalid: non-existent category
      }

      const response = await apiClient.post("/api/products", invalidProduct)

      expect(response.status).toBe(400)
      expect(response.data.errors).toContain("Name is required")
      expect(response.data.errors).toContain("Price must be positive")
      expect(response.data.errors).toContain("Invalid category")
    })

    test("should require authentication for product creation", async () => {
      const unauthenticatedClient = new ApiClient(process.env.API_BASE_URL!)

      const response = await unauthenticatedClient.post("/api/products", {
        name: "Test Product",
        price: 99.99,
      })

      expect(response.status).toBe(401)
      expect(response.data.error).toBe("Authentication required")
    })
  })

  describe("Performance Testing", () => {
    test("should respond within acceptable time limits", async () => {
      const startTime = Date.now()

      const response = await apiClient.get("/api/products?limit=100")

      const responseTime = Date.now() - startTime

      expect(response.status).toBe(200)
      expect(responseTime).toBeLessThan(2000) // Should respond within 2 seconds
    })

    test("should handle concurrent requests efficiently", async () => {
      const concurrentRequests = Array(10)
        .fill(null)
        .map(() => apiClient.get("/api/products?page=1&limit=10"))

      const responses = await Promise.all(concurrentRequests)

      responses.forEach((response) => {
        expect(response.status).toBe(200)
        expect(response.data.products).toBeDefined()
      })
    })
  })

  describe("Security Testing", () => {
    test("should prevent SQL injection attacks", async () => {
      const maliciousQuery = "'; DROP TABLE products; --"

      const response = await apiClient.get(`/api/products?search=${encodeURIComponent(maliciousQuery)}`)

      expect(response.status).toBe(200) // Should handle gracefully, not crash
      expect(response.data.products).toBeDefined()
    })

    test("should sanitize XSS attempts in product data", async () => {
      const xssPayload = {
        name: '<script>alert("XSS")</script>',
        description: '<img src="x" onerror="alert(1)">',
        price: 99.99,
        category: "electronics",
      }

      const response = await apiClient.post("/api/products", xssPayload)

      if (response.status === 201) {
        expect(response.data.name).not.toContain("<script>")
        expect(response.data.description).not.toContain("onerror")

        // Cleanup
        await apiClient.delete(`/api/products/${response.data.id}`)
      }
    })
  })
})
