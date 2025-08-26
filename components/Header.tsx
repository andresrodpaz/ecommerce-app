"use client"

interface HeaderProps {
  user: any
  cartItemsCount: number
  onCartClick: () => void
  onLoginClick: () => void
  onLogout: () => void
}

export default function Header({ user, cartItemsCount, onCartClick, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <a href="/" className="nav-brand">
            🛒 E-Commerce
          </a>

          <ul className="nav-links">
            <li>
              <a href="/" className="nav-link">
                Inicio
              </a>
            </li>
            <li>
              <a href="/products" className="nav-link">
                Productos
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link">
                Acerca de
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <button onClick={onCartClick} className="btn btn-secondary" style={{ position: "relative" }}>
              🛒 Carrito
              {cartItemsCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    background: "var(--danger-color)",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <span>Hola, {user.name}</span>
                <button onClick={onLogout} className="btn btn-danger">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn btn-primary">
                Iniciar Sesión
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
