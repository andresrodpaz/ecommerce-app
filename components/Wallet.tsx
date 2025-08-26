"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface WalletTransaction {
  id: number
  type: "deposit" | "withdrawal" | "payment" | "refund"
  amount: number
  description: string
  date: string
  status: "pending" | "completed" | "failed"
}

interface WalletProps {
  userId: number
  isOpen: boolean
  onClose: () => void
}

export default function Wallet({ userId, isOpen, onClose }: WalletProps) {
  const [balance, setBalance] = useState(750.25)
  const [depositAmount, setDepositAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      id: 1,
      type: "deposit",
      amount: 800.0,
      description: "Transferencia bancaria",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "payment",
      amount: -49.75,
      description: "Compra de productos",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "deposit",
      amount: 100.0,
      description: "Recarga de saldo",
      date: "2024-01-10",
      status: "completed",
    },
  ])

  const handleDeposit = async () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const amount = Number.parseFloat(depositAmount)
      setBalance((prev) => prev + amount)

      const newTransaction: WalletTransaction = {
        id: transactions.length + 1,
        type: "deposit",
        amount: amount,
        description: "Depósito manual",
        date: new Date().toISOString().split("T")[0],
        status: "completed",
      }

      setTransactions((prev) => [newTransaction, ...prev])
      setDepositAmount("")
      setIsLoading(false)
    }, 1500)
  }

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
      case "refund":
        return "text-green-600"
      case "payment":
      case "withdrawal":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status === "completed" ? "Completado" : status === "pending" ? "Pendiente" : "Fallido"}
      </Badge>
    )
  }

  if (!isOpen) return null

  return (
    <div className="wallet-overlay">
      <div className="wallet-modal">
        <Card className="wallet-card">
          <CardHeader>
            <div className="wallet-header">
              <div>
                <CardTitle>Mi Billetera Digital</CardTitle>
                <CardDescription>Gestiona tu saldo y transacciones</CardDescription>
              </div>
              <Button variant="ghost" onClick={onClose} className="close-button">
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="wallet-content">
            {/* Balance Section */}
            <div className="balance-section">
              <div className="balance-display">
                <span className="balance-label">Saldo Disponible</span>
                <span className="balance-amount">€{balance.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Deposit Section */}
            <div className="deposit-section">
              <h3 className="section-title">Recargar Saldo</h3>
              <div className="deposit-form">
                <Input
                  type="number"
                  placeholder="Cantidad a depositar"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="deposit-input"
                />
                <Button onClick={handleDeposit} disabled={isLoading || !depositAmount} className="deposit-button">
                  {isLoading ? "Procesando..." : "Depositar"}
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Transactions Section */}
            <div className="transactions-section">
              <h3 className="section-title">Historial de Transacciones</h3>
              <div className="transactions-list">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <div className="transaction-description">{transaction.description}</div>
                      <div className="transaction-date">{new Date(transaction.date).toLocaleDateString("es-ES")}</div>
                    </div>
                    <div className="transaction-details">
                      <div className={`transaction-amount ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? "+" : ""}€{Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        .wallet-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .wallet-modal {
          width: 90%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .wallet-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .wallet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .close-button {
          font-size: 18px;
          padding: 8px;
          min-width: auto;
        }

        .wallet-content {
          padding: 24px;
        }

        .balance-section {
          text-align: center;
          padding: 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
        }

        .balance-display {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .balance-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .balance-amount {
          font-size: 32px;
          font-weight: bold;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: #1f2937;
        }

        .deposit-form {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .deposit-input {
          flex: 1;
        }

        .deposit-button {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }

        .deposit-button:hover {
          background: #2563eb;
        }

        .deposit-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }

        .transaction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
        }

        .transaction-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .transaction-description {
          font-weight: 500;
          color: #1f2937;
        }

        .transaction-date {
          font-size: 12px;
          color: #6b7280;
        }

        .transaction-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .transaction-amount {
          font-weight: 600;
          font-size: 16px;
        }

        @media (max-width: 640px) {
          .wallet-modal {
            width: 95%;
            margin: 20px;
          }
          
          .deposit-form {
            flex-direction: column;
          }
          
          .deposit-input {
            width: 100%;
          }
          
          .transaction-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .transaction-details {
            align-items: flex-start;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
