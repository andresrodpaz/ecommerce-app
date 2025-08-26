"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  description: string
  image: string
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  })

  useEffect(() => {
    // Simular carga de productos
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Laptop Gaming",
        price: 1299.99,
        category: "electronics",
        stock: 5,
        description: "Laptop de alto rendimiento",
        image: "/gaming-laptop.png",
      },
      {
        id: 2,
        name: "Smartphone Pro",
        price: 899.99,
        category: "electronics",
        stock: 10,
        description: "Smartphone última generación",
        image: "/modern-smartphone.png",
      },
      {
        id: 3,
        name: "Auriculares Bluetooth",
        price: 199.99,
        category: "electronics",
        stock: 15,
        description: "Auriculares inalámbricos",
        image: "/bluetooth-headphones.png",
      },
    ]
    setProducts(mockProducts)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      id: editingProduct?.id || Date.now(),
    }

    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? (productData as Product) : p)))
    } else {
      setProducts((prev) => [...prev, productData as Product])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", price: "", category: "", stock: "", description: "", image: "" })
    setEditingProduct(null)
    setIsModalOpen(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          ➕ Nuevo Producto
        </button>
      </div>

      {/* Lista de Productos */}
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Producto</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Categoría</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Precio</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Stock</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "var(--radius)" }}
                      />
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "1rem", textTransform: "capitalize" }}>{product.category}</td>
                  <td style={{ padding: "1rem" }}>${product.price}</td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        color:
                          product.stock > 10
                            ? "var(--success-color)"
                            : product.stock > 5
                              ? "var(--warning-color)"
                              : "var(--danger-color)",
                      }}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-secondary"
                        style={{ padding: "0.5rem" }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-danger"
                        style={{ padding: "0.5rem" }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Producto */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div className="card" style={{ width: "90%", maxWidth: "500px" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h2>
              <button
                onClick={resetForm}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Precio</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Categoría</label>
                <select
                  className="form-input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="electronics">Electrónicos</option>
                  <option value="clothing">Ropa</option>
                  <option value="books">Libros</option>
                  <option value="home">Hogar</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL de Imagen</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/placeholder.svg"
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingProduct ? "Actualizar" : "Crear"} Producto
                </button>
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
