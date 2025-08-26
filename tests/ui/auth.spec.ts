import { test, expect } from "@playwright/test"
import { LoginPage } from "./pages/login-page"
import { TestDataGenerator } from "../../utils/test-data"

test.describe("Authentication Tests", () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.goto()
  })

  test("should login with valid credentials", async ({ page }) => {
    const testUsers = TestDataGenerator.getTestUsers()

    await loginPage.login(testUsers.customer.email, testUsers.customer.password)

    // Verify successful login by checking URL or dashboard elements
    await expect(page).toHaveURL(/.*dashboard/)
  })

  test("should show error with invalid credentials", async () => {
    await loginPage.login("invalid@email.com", "wrongpassword")

    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain("Invalid credentials")
  })

  test("should disable login button with empty fields", async () => {
    const isEnabled = await loginPage.isLoginButtonEnabled()
    expect(isEnabled).toBeFalsy()
  })

  test("should navigate to register page", async ({ page }) => {
    await loginPage.goToRegister()
    await expect(page).toHaveURL(/.*register/)
  })

  test("should validate email format", async () => {
    await loginPage.login("invalid-email", "password123")

    const errorMessage = await loginPage.getErrorMessage()
    expect(errorMessage).toContain("Invalid email format")
  })
})
