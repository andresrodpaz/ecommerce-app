"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import Cart from "../components/Cart"
import LoginModal from "../components/LoginModal"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // Simular carga de productos
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Laptop Gaming",
        price: 1299.99,
        image: "/gaming-laptop.png",
        category: "electronics",
        stock: 5,
      },
      {
        id: 2,
        name: "Smartphone Pro",
        price: 899.99,
        image: "/modern-smartphone.png",
        category: "electronics",
        stock: 10,
      },
      {
        id: 3,
        name: "Auriculares Bluetooth",
        price: 199.99,
        image: "/bluetooth-headphones.png",
        category: "electronics",
        stock: 15,
      },
      {
        id: 4,
        name: "Camiseta Deportiva",
        price: 29.99,
        image: "/sports-shirt.png",
        category: "clothing",
        stock: 20,
      },
      {
        id: 5,
        name: "Zapatillas Running",
        price: 129.99,
        image: "/running-shoes-on-track.png",
        category: "clothing",
        stock: 8,
      },
      {
        id: 6,
        name: "Libro Programación",
        price: 49.99,
        image: "/programming-book.png",
        category: "books",
        stock: 12,
      },
    ]
    setProducts(mockProducts)
  }, [])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))]

  return (
    <div>
      <Header
        user={user}
        cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={() => setUser(null)}
      />

      <main className="main">
        <div className="container">
          {/* Hero Section */}
          <section
            className="text-center mb-4"
            style={{
              padding: "4rem 0",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "var(--radius)",
              color: "white",
              marginBottom: "3rem",
            }}
          >
            <h1 className="text-2xl font-bold" style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              E-Commerce Demo
            </h1>
            <p className="text-lg" style={{ fontSize: "1.25rem", opacity: 0.9 }}>
              Aplicación completa con testing automatizado
            </p>
          </section>

          {/* Filtros */}
          <div className="flex items-center gap-4 mb-4" style={{ marginBottom: "2rem", flexWrap: "wrap" }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1, minWidth: "200px" }}>
              <input
                type="text"
                placeholder="Buscar productos..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="form-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: "auto", minWidth: "150px" }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "Todas las categorías" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Productos */}
          <div className="grid grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center p-4">
              <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem" }}>No se encontraron productos</p>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 E-Commerce Demo - Proyecto QA Automation</p>
        </div>
      </footer>

      {/* Modales */}
      {isCartOpen && (
        <Cart
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />
      )}

      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={setUser} />}
    </div>
  )
}
