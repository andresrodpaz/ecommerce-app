"use client"

interface AdminHeaderProps {
  user: any
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
}

export default function AdminHeader({ user, activeTab, onTabChange, onLogout }: AdminHeaderProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Productos", icon: "📦" },
    { id: "orders", label: "Pedidos", icon: "🛒" },
    { id: "users", label: "Usuarios", icon: "👥" },
  ]

  return (
    <header className="header" style={{ background: "var(--primary-color)", color: "white" }}>
      <div className="container">
        <nav className="nav">
          <div className="flex items-center gap-4">
            <a href="/admin" style={{ color: "white", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
              🔧 Admin Panel
            </a>

            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="btn"
                  style={{
                    background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "transparent",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>👋 {user?.name}</span>
            <button onClick={onLogout} className="btn btn-danger">
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
