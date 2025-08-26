import { faker } from "@faker-js/faker"

export interface TestUser {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface TestProduct {
  id: string
  name: string
  price: number
  category: string
  stock: number
  rating: number
}

export interface TestAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export class TestDataGenerator {
  static generateUser(): TestUser {
    return {
      email: faker.internet.email(),
      password: "Test123!",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
    }
  }

  static generateProduct(): TestProduct {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: Number.parseFloat(faker.commerce.price()),
      category: faker.helpers.arrayElement(["Electronics", "Clothing", "Home & Garden", "Books", "Sports"]),
      stock: faker.number.int({ min: 0, max: 100 }),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    }
  }

  static generateAddress(): TestAddress {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: "United States",
    }
  }

  static getTestUsers() {
    return {
      admin: {
        email: process.env.ADMIN_EMAIL || "admin@ecommerce-demo.com",
        password: process.env.ADMIN_PASSWORD || "Admin123!",
      },
      customer: {
        email: process.env.CUSTOMER_EMAIL || "customer1@test.com",
        password: process.env.CUSTOMER_PASSWORD || "Test123!",
      },
    }
  }
}
