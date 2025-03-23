import { useState } from "react"
// import { Sidebar } from "./components/sidebar";
import { IncomeSection } from "./components/income_section";
import { ExpenseSection } from "./components/expense_section";
import { AddIncomeModal } from "./components/add_income_modal";
import { AddExpenseModal } from "./components/add_expense_modal";
import { EditIncomeModal } from "./components/edit_income_modal";
import { EditExpenseModal } from "./components/edit_expense_modal";


export type Income = {
  id: number
  name: string
  category: string
  date: string
  amount: number
  accountName: string
}

export type Expense = {
  id: number
  name: string
  category: string
  date: string
  amount: number
  accountName: string
  emoji?: string
}

export default function Dashboard() {
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  // Sample data for income and expenses
  const [incomeData, setIncomeData] = useState<Income[]>([
    { id: 1, name: "Salary", category: "Employment", date: "2025-03-15", amount: 5000, accountName: "Main Account" },
    {
      id: 2,
      name: "Freelance Work",
      category: "Side Hustle",
      date: "2025-03-10",
      amount: 1200,
      accountName: "Business Account",
    },
    {
      id: 3,
      name: "Dividend",
      category: "Investment",
      date: "2025-03-05",
      amount: 350,
      accountName: "Investment Account",
    },
  ])

  const [expenseData, setExpenseData] = useState<Expense[]>([
    {
      id: 1,
      name: "Groceries",
      category: "Food",
      date: "2025-03-18",
      amount: 150,
      accountName: "Credit Card",
      emoji: "🛒",
    },
    {
      id: 2,
      name: "Electricity Bill",
      category: "Utilities",
      date: "2025-03-12",
      amount: 85,
      accountName: "Main Account",
      emoji: "💡",
    },
    {
      id: 3,
      name: "Netflix",
      category: "Entertainment",
      date: "2025-03-08",
      amount: 15,
      accountName: "Credit Card",
      emoji: "📺",
    },
  ])

  const handleEditIncome = (income: Income) => {
    setEditingIncome(income)
  }

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense)
  }

  const handleUpdateIncome = (updatedIncome: Income) => {
    console.log("Updating income:", updatedIncome)
    setIncomeData((prevData) => prevData.map((item) => (item.id === updatedIncome.id ? updatedIncome : item)))
    setEditingIncome(null)
  }

  const handleUpdateExpense = (updatedExpense: Expense) => {
    console.log("Updating expense:", updatedExpense)
    setExpenseData((prevData) => prevData.map((item) => (item.id === updatedExpense.id ? updatedExpense : item)))
    setEditingExpense(null)
  }

  const handleAddIncome = (newIncome: Omit<Income, "id">) => {
    console.log("Adding income:", newIncome)
    const newId = Math.max(0, ...incomeData.map((item) => item.id)) + 1
    setIncomeData((prev) => [...prev, { ...newIncome, id: newId }])
    setShowIncomeModal(false)
  }

  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    console.log("Adding expense:", newExpense)
    const newId = Math.max(0, ...expenseData.map((item) => item.id)) + 1
    setExpenseData((prev) => [...prev, { ...newExpense, id: newId }])
    setShowExpenseModal(false)
  }

  return (
    <div className="grid grid-cols-10 grid-rows-6 h-screen">
      {/* <Sidebar /> */}

      <div className="col-span-8 col-start-3 row-span-6 p-6 bg-gray-50 overflow-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeSection
            incomeData={incomeData}
            onAddIncome={() => setShowIncomeModal(true)}
            onEditIncome={handleEditIncome}
          />

          <ExpenseSection
            expenseData={expenseData}
            onAddExpense={() => setShowExpenseModal(true)}
            onEditExpense={handleEditExpense}
          />
        </div>
      </div>

      {showIncomeModal && <AddIncomeModal onClose={() => setShowIncomeModal(false)} onSave={handleAddIncome} />}

      {showExpenseModal && <AddExpenseModal onClose={() => setShowExpenseModal(false)} onSave={handleAddExpense} />}

      {editingIncome && (
        <EditIncomeModal income={editingIncome} onClose={() => setEditingIncome(null)} onSave={handleUpdateIncome} />
      )}

      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleUpdateExpense}
        />
      )}
    </div>
  )
}

