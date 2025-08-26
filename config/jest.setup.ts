import dotenv from "dotenv"
import { beforeAll, afterAll } from "@jest/globals"

// Load environment variables for testing
dotenv.config({ path: ".env.test" })

// Global test setup
beforeAll(() => {
  console.log("🚀 Starting API Test Suite")
})

afterAll(() => {
  console.log("✅ API Test Suite Completed")
})
