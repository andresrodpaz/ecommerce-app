"use client"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartProps {
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export default function Cart({ items, onClose, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
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
      <div
        className="card"
        style={{
          width: "90%",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Carrito de Compras</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-center p-4" style={{ color: "var(--text-secondary)" }}>
            Tu carrito está vacío
          </p>
        ) : (
          <>
            <div style={{ marginBottom: "2rem" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 mb-4"
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "var(--radius)" }}
                  />

                  <div style={{ flex: 1 }}>
                    <h4 className="font-bold">{item.name}</h4>
                    <p style={{ color: "var(--text-secondary)" }}>${item.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="btn"
                        style={{ padding: "0.25rem 0.5rem", minWidth: "30px" }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="btn"
                        style={{ padding: "0.25rem 0.5rem", minWidth: "30px" }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="btn btn-danger"
                      style={{ padding: "0.25rem 0.5rem" }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid var(--border-color)",
                paddingTop: "1rem",
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold" style={{ color: "var(--primary-color)" }}>
                  ${total.toFixed(2)}
                </span>
              </div>

              <button className="btn btn-primary" style={{ width: "100%" }}>
                Proceder al Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
