"use client"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  stock: number
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      className="card"
      style={{ transition: "transform 0.2s ease", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "var(--radius)",
          marginBottom: "1rem",
        }}
      />

      <div>
        <h3 className="font-bold mb-4" style={{ fontSize: "1.125rem" }}>
          {product.name}
        </h3>

        <p style={{ color: "var(--text-secondary)", marginBottom: "0.5rem", textTransform: "capitalize" }}>
          {product.category}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
            ${product.price}
          </span>
          <span
            style={{
              color: product.stock > 5 ? "var(--success-color)" : "var(--warning-color)",
              fontSize: "0.875rem",
            }}
          >
            Stock: {product.stock}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="btn btn-primary"
          style={{ width: "100%" }}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
        </button>
      </div>
    </div>
  )
}
