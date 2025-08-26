import { type NextRequest, NextResponse } from "next/server"

// Mock database - In production, use real database
const mockWallets = new Map([
  [1, { id: 1, userId: 1, balance: 10000.0, currency: "EUR" }],
  [2, { id: 2, userId: 2, balance: 750.25, currency: "EUR" }],
  [3, { id: 3, userId: 3, balance: 500.5, currency: "EUR" }],
])

const mockTransactions = [
  {
    id: 1,
    walletId: 2,
    type: "deposit",
    amount: 800.0,
    description: "Transferencia bancaria",
    status: "completed",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    walletId: 2,
    type: "payment",
    amount: -49.75,
    description: "Compra de productos",
    status: "completed",
    createdAt: "2024-01-14T15:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  // Find wallet by userId
  const wallet = Array.from(mockWallets.values()).find((w) => w.userId === Number.parseInt(userId))

  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
  }

  // Get transactions for this wallet
  const transactions = mockTransactions.filter((t) => t.walletId === wallet.id)

  return NextResponse.json({
    wallet,
    transactions,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, amount, description } = body

    if (!userId || !type || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Find wallet
    const wallet = Array.from(mockWallets.values()).find((w) => w.userId === Number.parseInt(userId))

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    // Update balance
    if (type === "deposit") {
      wallet.balance += Number.parseFloat(amount)
    } else if (type === "payment" || type === "withdrawal") {
      if (wallet.balance < Number.parseFloat(amount)) {
        return NextResponse.json({ error: "Insufficient balance" }, { status: 400 })
      }
      wallet.balance -= Number.parseFloat(amount)
    }

    // Create transaction record
    const newTransaction = {
      id: mockTransactions.length + 1,
      walletId: wallet.id,
      type,
      amount: type === "payment" || type === "withdrawal" ? -Number.parseFloat(amount) : Number.parseFloat(amount),
      description: description || `${type} transaction`,
      status: "completed",
      createdAt: new Date().toISOString(),
    }

    mockTransactions.push(newTransaction)

    return NextResponse.json({
      success: true,
      wallet,
      transaction: newTransaction,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
