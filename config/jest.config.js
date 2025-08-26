module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests/api"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["tests/api/**/*.ts", "utils/**/*.ts", "!**/*.d.ts"],
  coverageDirectory: "reports/coverage",
  coverageReporters: ["text", "lcov", "html"],
  setupFilesAfterEnv: ["<rootDir>/config/jest.setup.ts"],
  reporters: [
    "default",
    ["allure-jest/reporter", { outputDir: "allure-results" }],
    ["jest-junit", { outputDirectory: "reports", outputName: "jest-results.xml" }],
  ],
  testTimeout: 30000,
}
