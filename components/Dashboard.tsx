"use client"

import { useState, useEffect } from "react"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    recentOrders: [],
    topProducts: [],
  })

  useEffect(() => {
    // Simular carga de estadísticas
    setStats({
      totalSales: 15420.5,
      totalOrders: 127,
      totalProducts: 45,
      totalUsers: 89,
      recentOrders: [
        { id: 1, customer: "Juan Pérez", total: 299.99, status: "completed", date: "2024-01-15" },
        { id: 2, customer: "María García", total: 149.99, status: "pending", date: "2024-01-15" },
        { id: 3, customer: "Carlos López", total: 89.99, status: "shipped", date: "2024-01-14" },
      ],
      topProducts: [
        { name: "Laptop Gaming", sales: 25, revenue: 32499.75 },
        { name: "Smartphone Pro", sales: 18, revenue: 16199.82 },
        { name: "Auriculares Bluetooth", sales: 32, revenue: 6399.68 },
      ],
    })
  }, [])

  const statCards = [
    { title: "Ventas Totales", value: `$${stats.totalSales.toFixed(2)}`, icon: "💰", color: "var(--success-color)" },
    { title: "Pedidos", value: stats.totalOrders, icon: "📦", color: "var(--primary-color)" },
    { title: "Productos", value: stats.totalProducts, icon: "🛍️", color: "var(--warning-color)" },
    { title: "Usuarios", value: stats.totalUsers, icon: "👥", color: "var(--secondary-color)" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 mb-4" style={{ marginBottom: "2rem" }}>
        {statCards.map((stat, index) => (
          <div key={index} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <h3 className="text-lg font-bold" style={{ color: stat.color }}>
              {stat.value}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pedidos Recientes */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Pedidos Recientes</h2>
          <div>
            {stats.recentOrders.map((order: any) => (
              <div
                key={order.id}
                className="flex justify-between items-center mb-4"
                style={{
                  padding: "1rem",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div>
                  <p className="font-bold">{order.customer}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{order.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="font-bold">${order.total}</p>
                  <span
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "var(--radius)",
                      fontSize: "0.75rem",
                      background:
                        order.status === "completed"
                          ? "var(--success-color)"
                          : order.status === "pending"
                            ? "var(--warning-color)"
                            : "var(--primary-color)",
                      color: "white",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Top */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Productos Más Vendidos</h2>
          <div>
            {stats.topProducts.map((product: any, index) => (
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
                  <p className="font-bold">{product.name}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{product.sales} ventas</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="font-bold" style={{ color: "var(--success-color)" }}>
                    ${product.revenue.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
