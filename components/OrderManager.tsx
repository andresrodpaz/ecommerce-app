"use client"

import { useState, useEffect } from "react"

interface Order {
  id: number
  customer: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Simular carga de pedidos
    const mockOrders: Order[] = [
      {
        id: 1,
        customer: "Juan Pérez",
        email: "juan@email.com",
        total: 299.99,
        status: "pending",
        date: "2024-01-15",
        items: [{ name: "Laptop Gaming", quantity: 1, price: 299.99 }],
      },
      {
        id: 2,
        customer: "María García",
        email: "maria@email.com",
        total: 149.99,
        status: "shipped",
        date: "2024-01-14",
        items: [{ name: "Auriculares Bluetooth", quantity: 1, price: 149.99 }],
      },
      {
        id: 3,
        customer: "Carlos López",
        email: "carlos@email.com",
        total: 89.99,
        status: "delivered",
        date: "2024-01-13",
        items: [{ name: "Camiseta Deportiva", quantity: 3, price: 29.99 }],
      },
    ]
    setOrders(mockOrders)
  }, [])

  const updateOrderStatus = (orderId: number, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "var(--warning-color)",
      processing: "var(--primary-color)",
      shipped: "var(--secondary-color)",
      delivered: "var(--success-color)",
      cancelled: "var(--danger-color)",
    }
    return colors[status]
  }

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((order) => order.status === filterStatus)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>

        <select
          className="form-input"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "auto", minWidth: "150px" }}
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="processing">Procesando</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Lista de Pedidos */}
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>ID</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Cliente</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Fecha</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Total</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Estado</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem" }}>#{order.id}</td>
                  <td style={{ padding: "1rem" }}>
                    <div>
                      <p className="font-bold">{order.customer}</p>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{order.email}</p>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>{order.date}</td>
                  <td style={{ padding: "1rem" }} className="font-bold">
                    ${order.total}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius)",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        background: getStatusColor(order.status),
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn btn-secondary"
                        style={{ padding: "0.5rem" }}
                      >
                        👁️
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                        className="form-input"
                        style={{ width: "auto", padding: "0.5rem", fontSize: "0.75rem" }}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="processing">Procesando</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalles del Pedido */}
      {selectedOrder && (
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
          <div className="card" style={{ width: "90%", maxWidth: "600px" }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalles del Pedido #{selectedOrder.id}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-bold mb-4">Información del Cliente</h3>
                <p>
                  <strong>Nombre:</strong> {selectedOrder.customer}
                </p>
                <p>
                  <strong>Email:</strong> {selectedOrder.email}
                </p>
                <p>
                  <strong>Fecha:</strong> {selectedOrder.date}
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Estado del Pedido</h3>
                <span
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius)",
                    background: getStatusColor(selectedOrder.status),
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Productos</h3>
              {selectedOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-4"
                  style={{
                    padding: "1rem",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p style={{ color: "var(--text-secondary)" }}>Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1rem",
                  textAlign: "right",
                }}
              >
                <p className="text-xl font-bold">Total: ${selectedOrder.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
