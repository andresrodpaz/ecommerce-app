"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información de envío
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    // Información de pago
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const [cart] = useState([
    { id: 1, name: "Laptop Gaming", price: 1299.99, quantity: 1 },
    { id: 2, name: "Auriculares Bluetooth", price: 199.99, quantity: 1 },
  ])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.99
  const tax = total * 0.1
  const finalTotal = total + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Procesar pedido
      alert("¡Pedido procesado exitosamente!")
      router.push("/")
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-color)" }}>
      <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Checkout</h1>

          {/* Indicador de pasos */}
          <div className="flex justify-center items-center gap-4 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: step >= stepNum ? "var(--primary-color)" : "var(--border-color)",
                    color: step >= stepNum ? "white" : "var(--text-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    style={{
                      width: "60px",
                      height: "2px",
                      background: step > stepNum ? "var(--primary-color)" : "var(--border-color)",
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div
            className="flex justify-center gap-4 mt-4"
            style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
          >
            <span style={{ color: step >= 1 ? "var(--primary-color)" : "inherit" }}>Envío</span>
            <span style={{ color: step >= 2 ? "var(--primary-color)" : "inherit" }}>Pago</span>
            <span style={{ color: step >= 3 ? "var(--primary-color)" : "inherit" }}>Confirmación</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Formulario */}
          <div style={{ gridColumn: "span 2" }}>
            <div className="card">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Información de Envío</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Apellido</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Teléfono</label>
                        <input
                          type="tel"
                          className="form-input"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Dirección</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="form-group">
                        <label className="form-label">Ciudad</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Código Postal</label>
                        <input
                          type="text"
                          className="form-input"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">País</label>
                        <select
                          className="form-input"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          required
                        >
                          <option value="">Seleccionar país</option>
                          <option value="ES">España</option>
                          <option value="MX">México</option>
                          <option value="AR">Argentina</option>
                          <option value="CO">Colombia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Información de Pago</h2>

                    <div className="form-group">
                      <label className="form-label">Número de Tarjeta</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Nombre en la Tarjeta</label>
                      <input
                        type="text"
                        className="form-input"
                        value={formData.cardName}
                        onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Fecha de Expiración</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Confirmación del Pedido</h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-bold mb-4">Información de Envío</h3>
                        <p>
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.city}, {formData.postalCode}
                        </p>
                        <p>{formData.country}</p>
                      </div>
                      <div>
                        <h3 className="font-bold mb-4">Método de Pago</h3>
                        <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                        <p>{formData.cardName}</p>
                        <p>Expira: {formData.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn btn-secondary">
                      Anterior
                    </button>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ marginLeft: "auto" }}>
                    {step === 3 ? "Confirmar Pedido" : "Continuar"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div>
            <div className="card">
              <h3 className="font-bold mb-4">Resumen del Pedido</h3>

              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Cantidad: {item.quantity}</p>
                  </div>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <div className="flex justify-between mb-4">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Envío:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Impuestos:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div
                  className="flex justify-between font-bold text-lg"
                  style={{
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "1rem",
                    color: "var(--primary-color)",
                  }}
                >
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
