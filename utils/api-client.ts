import supertest from "supertest"

export class ApiClient {
  private request: supertest.SuperTest<supertest.Test>
  private authToken?: string

  constructor(baseUrl: string = process.env.API_BASE_URL || "http://localhost:3001/api") {
    this.request = supertest(baseUrl)
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post("/auth/login").send({ email, password }).expect(200)

    this.authToken = response.body.token
    return this.authToken
  }

  async register(userData: any): Promise<any> {
    return await this.request.post("/auth/register").send(userData).expect(201)
  }

  async getProducts(params?: any): Promise<any> {
    let query = this.request.get("/products")

    if (params) {
      Object.keys(params).forEach((key) => {
        query = query.query({ [key]: params[key] })
      })
    }

    return await query.expect(200)
  }

  async getProduct(id: string): Promise<any> {
    return await this.request.get(`/products/${id}`).expect(200)
  }

  async addToCart(productId: string, quantity = 1): Promise<any> {
    return await this.request
      .post("/cart/items")
      .set("Authorization", `Bearer ${this.authToken}`)
      .send({ productId, quantity })
      .expect(201)
  }

  async getCart(): Promise<any> {
    return await this.request.get("/cart").set("Authorization", `Bearer ${this.authToken}`).expect(200)
  }

  async createOrder(orderData: any): Promise<any> {
    return await this.request
      .post("/orders")
      .set("Authorization", `Bearer ${this.authToken}`)
      .send(orderData)
      .expect(201)
  }

  async getOrders(): Promise<any> {
    return await this.request.get("/orders").set("Authorization", `Bearer ${this.authToken}`).expect(200)
  }

  logout(): void {
    this.authToken = undefined
  }
}
