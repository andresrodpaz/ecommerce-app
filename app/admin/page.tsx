"use client"

import type React from "react"

import { useState, useEffect } from "react"
import AdminHeader from "../../components/AdminHeader"
import ProductManager from "../../components/ProductManager"
import OrderManager from "../../components/OrderManager"
import UserManager from "../../components/UserManager"
import Dashboard from "../../components/Dashboard"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    // Simular verificación de admin
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth) {
      setIsAuthenticated(true)
      setAdminUser({ name: "Admin", role: "administrator" })
    }
  }, [])

  const handleLogin = (credentials: any) => {
    // Simular login de admin
    if (credentials.email === "admin@demo.com" && credentials.password === "admin123") {
      setIsAuthenticated(true)
      setAdminUser({ name: "Admin", role: "administrator" })
      localStorage.setItem("adminAuth", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAdminUser(null)
    localStorage.removeItem("adminAuth")
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div>
      <AdminHeader user={adminUser} activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      <main className="main">
        <div className="container">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "products" && <ProductManager />}
          {activeTab === "orders" && <OrderManager />}
          {activeTab === "users" && <UserManager />}
        </div>
      </main>
    </div>
  )
}

function AdminLogin({ onLogin }: { onLogin: (credentials: any) => void }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(credentials)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface-color)",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "400px" }}>
        <h1 className="text-2xl font-bold text-center mb-4">Panel Administrativo</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="admin@demo.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="admin123"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Iniciar Sesión
          </button>
        </form>

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "var(--surface-color)",
            borderRadius: "var(--radius)",
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
          }}
        >
          <strong>Credenciales de prueba:</strong>
          <br />
          Email: admin@demo.com
          <br />
          Contraseña: admin123
        </div>
      </div>
    </div>
  )
}
