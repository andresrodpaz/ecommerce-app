"use client"

import { useState, useEffect } from "react"

interface User {
  id: number
  name: string
  email: string
  role: "customer" | "admin"
  status: "active" | "inactive"
  registrationDate: string
  totalOrders: number
  totalSpent: number
}

export default function UserManager() {
  const [users, setUsers] = useState<User[]>([])
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Simular carga de usuarios
    const mockUsers: User[] = [
      {
        id: 1,
        name: "Juan Pérez",
        email: "juan@email.com",
        role: "customer",
        status: "active",
        registrationDate: "2024-01-10",
        totalOrders: 5,
        totalSpent: 1299.95,
      },
      {
        id: 2,
        name: "María García",
        email: "maria@email.com",
        role: "customer",
        status: "active",
        registrationDate: "2024-01-08",
        totalOrders: 3,
        totalSpent: 449.97,
      },
      {
        id: 3,
        name: "Admin User",
        email: "admin@demo.com",
        role: "admin",
        status: "active",
        registrationDate: "2024-01-01",
        totalOrders: 0,
        totalSpent: 0,
      },
      {
        id: 4,
        name: "Carlos López",
        email: "carlos@email.com",
        role: "customer",
        status: "inactive",
        registrationDate: "2024-01-05",
        totalOrders: 1,
        totalSpent: 89.99,
      },
    ]
    setUsers(mockUsers)
  }, [])

  const toggleUserStatus = (userId: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const changeUserRole = (userId: number, newRole: User["role"]) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesRole && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>

        <div className="flex gap-4">
          <select
            className="form-input"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ width: "auto", minWidth: "120px" }}
          >
            <option value="all">Todos los roles</option>
            <option value="customer">Clientes</option>
            <option value="admin">Administradores</option>
          </select>

          <select
            className="form-input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: "auto", minWidth: "120px" }}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-4 mb-4">
        <div className="card text-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--primary-color)" }}>
            {users.length}
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>Total Usuarios</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--success-color)" }}>
            {users.filter((u) => u.status === "active").length}
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>Activos</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--warning-color)" }}>
            {users.filter((u) => u.role === "customer").length}
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>Clientes</p>
        </div>
        <div className="card text-center">
          <h3 className="text-lg font-bold" style={{ color: "var(--secondary-color)" }}>
            {users.filter((u) => u.role === "admin").length}
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>Admins</p>
        </div>
      </div>

      {/* Lista de Usuarios */}
      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Usuario</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Rol</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Estado</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Registro</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Pedidos</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Total Gastado</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "1rem" }}>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{user.email}</p>
                    </div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user.id, e.target.value as User["role"])}
                      className="form-input"
                      style={{ width: "auto", padding: "0.5rem", fontSize: "0.875rem" }}
                    >
                      <option value="customer">Cliente</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius)",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        background: user.status === "active" ? "var(--success-color)" : "var(--danger-color)",
                        color: "white",
                        textTransform: "capitalize",
                      }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>{user.registrationDate}</td>
                  <td style={{ padding: "1rem" }}>{user.totalOrders}</td>
                  <td style={{ padding: "1rem" }} className="font-bold">
                    ${user.totalSpent.toFixed(2)}
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`btn ${user.status === "active" ? "btn-danger" : "btn-primary"}`}
                      style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                    >
                      {user.status === "active" ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
