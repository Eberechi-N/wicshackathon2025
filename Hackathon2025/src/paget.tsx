import { useState } from "react"
import { Sidebar } from "./components/sidebar";
import { IncomeSection } from "./components/income_section";
import { ExpenseSection } from "./components/expense_section";
import { AddIncomeModal } from "./components/add_income_modal";
import { AddExpenseModal } from "./components/add_expense_modal";
import { EditIncomeModal } from "./components/edit_income_modal";
import { EditExpenseModal } from "./components/edit_expense_modal";
import { SavingsPage } from "./components/savings-page"
import { SettingsPage } from "./components/settings-page"
import { DashboardPage } from "./components/dashboard"
import { AddSavingsGoalModal } from "./components/add_savings_goal_modal"


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
  
  export type SavingsGoal = {
    id: number
    name: string
    targetAmount: number
    currentAmount: number
    category: string
    dueDate?: string
    accountName: string
    status: "active" | "completed" | "canceled"
  }
  
  export type SavingsTransaction = {
    id: number
    goalId: number
    type: "deposit" | "withdrawal"
    amount: number
    date: string
    description: string
  }
  
  export type Category = {
    id: number
    name: string
    color: string
  }
  
  export default function Dashboard() {
    const [activeView, setActiveView] = useState<"home" | "dashboard" | "income" | "expenses" | "savings" | "settings">(
      "dashboard",
    )
    const [showIncomeModal, setShowIncomeModal] = useState(false)
    const [showExpenseModal, setShowExpenseModal] = useState(false)
    const [showAddGoalModal, setShowAddGoalModal] = useState(false)
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
      {
        id: 4,
        name: "Bonus",
        category: "Employment",
        date: "2025-03-01",
        amount: 2000,
        accountName: "Main Account",
      },
      {
        id: 5,
        name: "Rental Income",
        category: "Investment",
        date: "2025-02-28",
        amount: 1500,
        accountName: "Investment Account",
      },
    ])
  
    const [expenseData, setExpenseData] = useState<Expense[]>([
      {
        id: 1,
        name: "Starbucks Coffee",
        category: "Food",
        date: "2025-03-18",
        amount: 75.67,
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
      {
        id: 4,
        name: "Nagad Bangladesh",
        category: "Shopping",
        date: "2025-03-01",
        amount: 250,
        accountName: "Main Account",
        emoji: "🏠",
      },
      {
        id: 5,
        name: "Pathao Bangladesh",
        category: "Transportation",
        date: "2025-02-28",
        amount: 19.5,
        accountName: "Credit Card",
        emoji: "💪",
      },
    ])
  
    // Sample data for savings goals
    const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([
      {
        id: 1,
        name: "Holiday trip",
        targetAmount: 655,
        currentAmount: 300,
        category: "Travel",
        dueDate: "2025-12-31",
        accountName: "Savings Account",
        status: "active",
      },
      {
        id: 2,
        name: "Renovation",
        targetAmount: 235,
        currentAmount: 100,
        category: "Housing",
        dueDate: "2025-06-15",
        accountName: "Savings Account",
        status: "active",
      },
      {
        id: 3,
        name: "Xbox",
        targetAmount: 854,
        currentAmount: 400,
        category: "Electronics",
        dueDate: "2025-02-01",
        accountName: "Main Account",
        status: "active",
      },
      {
        id: 4,
        name: "Birthday",
        targetAmount: 495,
        currentAmount: 200,
        category: "Entertainment",
        dueDate: "2026-01-15",
        accountName: "Savings Account",
        status: "active",
      },
      {
        id: 5,
        name: "Home Renovation",
        targetAmount: 8000,
        currentAmount: 2000,
        category: "Housing",
        dueDate: "2025-09-30",
        accountName: "Investment Account",
        status: "active",
      },
    ])
  
    // Sample data for savings transactions
    const [savingsTransactions, setSavingsTransactions] = useState<SavingsTransaction[]>([
      {
        id: 1,
        goalId: 1,
        type: "deposit",
        amount: 1000,
        date: "2025-03-15",
        description: "Monthly emergency fund contribution",
      },
      {
        id: 2,
        goalId: 2,
        type: "deposit",
        amount: 500,
        date: "2025-03-10",
        description: "Vacation savings",
      },
      {
        id: 3,
        goalId: 3,
        type: "deposit",
        amount: 300,
        date: "2025-03-05",
        description: "Laptop fund",
      },
      {
        id: 4,
        goalId: 1,
        type: "withdrawal",
        amount: 200,
        date: "2025-03-02",
        description: "Unexpected car repair",
      },
      {
        id: 5,
        goalId: 4,
        type: "deposit",
        amount: 250,
        date: "2025-02-28",
        description: "Car down payment savings",
      },
      {
        id: 6,
        goalId: 5,
        type: "deposit",
        amount: 500,
        date: "2025-02-25",
        description: "Home renovation fund",
      },
      {
        id: 7,
        goalId: 2,
        type: "deposit",
        amount: 300,
        date: "2025-02-20",
        description: "Vacation savings",
      },
      {
        id: 8,
        goalId: 1,
        type: "deposit",
        amount: 1000,
        date: "2025-02-15",
        description: "Monthly emergency fund contribution",
      },
    ])
  
    // Categories data
    const [expenseCategories, setExpenseCategories] = useState<Category[]>([
      { id: 1, name: "Food", color: "#ef4444" },
      { id: 2, name: "Housing", color: "#3b82f6" },
      { id: 3, name: "Transportation", color: "#10b981" },
      { id: 4, name: "Utilities", color: "#f59e0b" },
      { id: 5, name: "Entertainment", color: "#8b5cf6" },
      { id: 6, name: "Healthcare", color: "#ec4899" },
      { id: 7, name: "Shopping", color: "#6366f1" },
      { id: 8, name: "Health", color: "#14b8a6" },
    ])
  
    const [incomeCategories, setIncomeCategories] = useState<Category[]>([
      { id: 1, name: "Employment", color: "#3b82f6" },
      { id: 2, name: "Business", color: "#10b981" },
      { id: 3, name: "Investment", color: "#f59e0b" },
      { id: 4, name: "Side Hustle", color: "#8b5cf6" },
      { id: 5, name: "Other", color: "#6b7280" },
    ])
  
    const [savingsCategories, setSavingsCategories] = useState<Category[]>([
      { id: 1, name: "Emergency", color: "#ef4444" },
      { id: 2, name: "Travel", color: "#3b82f6" },
      { id: 3, name: "Housing", color: "#10b981" },
      { id: 4, name: "Transportation", color: "#f59e0b" },
      { id: 5, name: "Electronics", color: "#8b5cf6" },
      { id: 6, name: "Education", color: "#ec4899" },
      { id: 7, name: "Retirement", color: "#6366f1" },
      { id: 8, name: "Other", color: "#6b7280" },
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
  
    // Savings goal handlers
    const handleAddSavingsGoal = (newGoal: Omit<SavingsGoal, "id">) => {
      const newId = Math.max(0, ...savingsGoals.map((goal) => goal.id)) + 1
      setSavingsGoals((prev) => [...prev, { ...newGoal, id: newId }])
      setShowAddGoalModal(false)
    }
  
    const handleUpdateSavingsGoal = (updatedGoal: SavingsGoal) => {
      setSavingsGoals((prevGoals) => prevGoals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    }
  
    const handleDeleteSavingsGoal = (goalId: number) => {
      setSavingsGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId))
      // Also delete related transactions
      setSavingsTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.goalId !== goalId),
      )
    }
  
    // Savings transaction handlers
    const handleAddSavingsTransaction = (newTransaction: Omit<SavingsTransaction, "id">) => {
      const newId = Math.max(0, ...savingsTransactions.map((transaction) => transaction.id)) + 1
      setSavingsTransactions((prev) => [...prev, { ...newTransaction, id: newId }])
  
      // Update the current amount in the related goal
      setSavingsGoals((prevGoals) =>
        prevGoals.map((goal) => {
          if (goal.id === newTransaction.goalId) {
            const amountChange = newTransaction.type === "deposit" ? newTransaction.amount : -newTransaction.amount
  
            const newCurrentAmount = goal.currentAmount + amountChange
  
            // Check if goal is completed
            const newStatus = newCurrentAmount >= goal.targetAmount ? "completed" : goal.status
  
            return {
              ...goal,
              currentAmount: newCurrentAmount,
              status: newStatus,
            }
          }
          return goal
        }),
      )
    }
  
    // Category handlers
    const handleAddCategory = (type: "expense" | "income" | "savings", newCategory: Omit<Category, "id">) => {
      let newId: number
  
      if (type === "expense") {
        newId = Math.max(0, ...expenseCategories.map((cat) => cat.id)) + 1
        setExpenseCategories((prev) => [...prev, { ...newCategory, id: newId }])
      } else if (type === "income") {
        newId = Math.max(0, ...incomeCategories.map((cat) => cat.id)) + 1
        setIncomeCategories((prev) => [...prev, { ...newCategory, id: newId }])
      } else {
        newId = Math.max(0, ...savingsCategories.map((cat) => cat.id)) + 1
        setSavingsCategories((prev) => [...prev, { ...newCategory, id: newId }])
      }
    }
  
    const handleUpdateCategory = (type: "expense" | "income" | "savings", updatedCategory: Category) => {
      if (type === "expense") {
        setExpenseCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
      } else if (type === "income") {
        setIncomeCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
      } else {
        setSavingsCategories((prev) => prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat)))
      }
    }
  
    const handleDeleteCategory = (type: "expense" | "income" | "savings", categoryId: number) => {
      if (type === "expense") {
        setExpenseCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
      } else if (type === "income") {
        setIncomeCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
      } else {
        setSavingsCategories((prev) => prev.filter((cat) => cat.id !== categoryId))
      }
    }
  
    const handleNavItemClick = (view: "home" | "dashboard" | "income" | "expenses" | "savings" | "settings") => {
      setActiveView(view)
    }
  
    return (
      <div className="grid grid-cols-10 grid-rows-6 h-screen">
        <Sidebar onNavItemClick={handleNavItemClick} activeItem={activeView} />
  
        <div className="col-span-8 col-start-3 row-span-6 p-6 bg-gray-50 overflow-auto">
          {activeView === "dashboard" ? (
            <DashboardPage
              incomeData={incomeData}
              expenseData={expenseData}
              savingsGoals={savingsGoals}
              onAddGoal={() => setShowAddGoalModal(true)}
            />
          ) : activeView === "savings" ? (
            <SavingsPage
              savingsGoals={savingsGoals}
              savingsTransactions={savingsTransactions}
              onAddGoal={handleAddSavingsGoal}
              onUpdateGoal={handleUpdateSavingsGoal}
              onDeleteGoal={handleDeleteSavingsGoal}
              onAddTransaction={handleAddSavingsTransaction}
            />
          ) : activeView === "settings" ? (
            <SettingsPage
              expenseCategories={expenseCategories}
              incomeCategories={incomeCategories}
              savingsCategories={savingsCategories}
              onAddCategory={handleAddCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          ) : (
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
          )}
        </div>
  
        {showIncomeModal && (
          <AddIncomeModal
            onClose={() => setShowIncomeModal(false)}
            onSave={handleAddIncome}
            categories={incomeCategories}
          />
        )}
  
        {showExpenseModal && (
          <AddExpenseModal
            onClose={() => setShowExpenseModal(false)}
            onSave={handleAddExpense}
            categories={expenseCategories}
          />
        )}
  
        {showAddGoalModal && (
          <AddSavingsGoalModal onClose={() => setShowAddGoalModal(false)} onSave={handleAddSavingsGoal} />
        )}
  
        {editingIncome && (
          <EditIncomeModal
            income={editingIncome}
            onClose={() => setEditingIncome(null)}
            onSave={handleUpdateIncome}
            categories={incomeCategories}
          />
        )}
  
        {editingExpense && (
          <EditExpenseModal
            expense={editingExpense}
            onClose={() => setEditingExpense(null)}
            onSave={handleUpdateExpense}
            categories={expenseCategories}
          />
        )}
      </div>
    )
  }
  
  