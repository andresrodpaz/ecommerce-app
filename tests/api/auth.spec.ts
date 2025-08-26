import { ApiClient } from "../../utils/api-client"
import { TestDataGenerator } from "../../utils/test-data"

describe("Authentication API Tests", () => {
  let apiClient: ApiClient

  beforeEach(() => {
    apiClient = new ApiClient()
  })

  describe("POST /auth/login", () => {
    test("should login with valid credentials", async () => {
      const testUsers = TestDataGenerator.getTestUsers()

      const token = await apiClient.login(testUsers.customer.email, testUsers.customer.password)

      expect(token).toBeDefined()
      expect(typeof token).toBe("string")
    })

    test("should reject invalid credentials", async () => {
      await expect(apiClient.login("invalid@email.com", "wrongpassword")).rejects.toThrow()
    })

    test("should validate email format", async () => {
      await expect(apiClient.login("invalid-email", "password123")).rejects.toThrow()
    })
  })

  describe("POST /auth/register", () => {
    test("should register new user", async () => {
      const userData = TestDataGenerator.generateUser()

      const response = await apiClient.register(userData)

      expect(response.status).toBe(201)
      expect(response.body.user.email).toBe(userData.email)
    })

    test("should reject duplicate email", async () => {
      const userData = TestDataGenerator.generateUser()

      // Register user first time
      await apiClient.register(userData)

      // Try to register same user again
      await expect(apiClient.register(userData)).rejects.toThrow()
    })

    test("should validate required fields", async () => {
      const incompleteData = {
        email: "test@example.com",
        // Missing password and other required fields
      }

      await expect(apiClient.register(incompleteData)).rejects.toThrow()
    })
  })
})
