"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, ArrowUpCircle, ArrowDownCircle, Search, ArrowUpDown } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js"
import type { SavingsGoal, SavingsTransaction } from "../paget"
import { AddSavingsGoalModal } from "./add_savings_goal_modal"
import { EditSavingsGoalModal } from "./edit_saving_goals_modal"
import { AddSavingsTransactionModal } from "./add_saving_trans_modal"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend)

type SavingsPageProps = {
  savingsGoals: SavingsGoal[]
  savingsTransactions: SavingsTransaction[]
  onAddGoal: (goal: Omit<SavingsGoal, "id">) => void
  onUpdateGoal: (goal: SavingsGoal) => void
  onDeleteGoal: (goalId: number) => void
  onAddTransaction: (transaction: Omit<SavingsTransaction, "id">) => void
}

export function SavingsPage({
  savingsGoals,
  savingsTransactions,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onAddTransaction,
}: SavingsPageProps) {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false)
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null)
  const [selectedGoalForTransaction, setSelectedGoalForTransaction] = useState<SavingsGoal | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Calculate total savings
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalGoals = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalProgress = totalGoals > 0 ? (totalSavings / totalGoals) * 100 : 0

  // Filter goals based on search query
  const filteredGoals = savingsGoals
    .filter((goal) => goal.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.currentAmount / a.targetAmount - b.currentAmount / b.targetAmount
      } else {
        return b.currentAmount / b.targetAmount - a.currentAmount / a.targetAmount
      }
    })

  // Prepare chart data
  const prepareChartData = () => {
    // Get last 6 months of data
    const today = new Date()
    const labels = []
    const data = []

    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const monthName = month.toLocaleString("default", { month: "short" })
      labels.push(`${monthName} ${month.getFullYear()}`)

      // Calculate total savings for this month
      // For demo purposes, we'll just use a percentage of the current total
      // In a real app, you'd calculate this from actual transaction history
      const monthSavings = totalSavings * (0.5 + i * 0.1)
      data.push(monthSavings)
    }

    return {
      labels,
      datasets: [
        {
          label: "Total Savings",
          data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
      ],
    }
  }

  const chartData = prepareChartData()
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Savings Growth Over Time",
      },
    },
  }

  // Filter recent transactions
  const recentTransactions = [...savingsTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const handleAddTransactionClick = (goal: SavingsGoal) => {
    setSelectedGoalForTransaction(goal)
    setShowAddTransactionModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Savings Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Savings Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Total Savings</h3>
              <p className="text-3xl font-bold">${totalSavings.toLocaleString()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Saved vs Goal</h3>
              <p className="text-3xl font-bold">
                ${totalSavings.toLocaleString()} of ${totalGoals.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500">Overall Progress</h3>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(totalProgress, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm font-medium">{totalProgress.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-lg border shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Savings Goals</h2>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 text-xs rounded z-[100]" sideOffset={5}>
                  Add Savings Goal
                  <Tooltip.Arrow className="fill-gray-800" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search goals..."
                className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
            >
              Sort by Progress
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => {
                const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100

                return (
                  <div key={goal.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{goal.name}</h3>
                        <p className="text-sm text-gray-500">{goal.category}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddTransactionClick(goal)}
                          className="p-1 rounded-md hover:bg-gray-200"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button onClick={() => setEditingGoal(goal)} className="p-1 rounded-md hover:bg-gray-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteGoal(goal.id)}
                          className="p-1 rounded-md hover:bg-gray-200 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">
                        ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                      </span>
                      <span className="text-sm font-medium">{progressPercentage.toFixed(1)}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Account: {goal.accountName}</span>
                      <div className="flex items-center">
                        <span className={`px-2 py-0.5 rounded-full ${getStatusColor(goal.status)}`}>
                          {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                        </span>
                        {goal.dueDate && (
                          <span className="ml-2">Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No savings goals found</p>
                <button onClick={() => setShowAddGoalModal(true)} className="mt-2 text-blue-500 hover:underline">
                  Create your first goal
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-lg border shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Recent Transactions</h2>
        </div>

        <div className="p-4">
          <div className="rounded-md border overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700 sticky top-0">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Goal</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => {
                      const relatedGoal = savingsGoals.find((goal) => goal.id === transaction.goalId)

                      return (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{relatedGoal?.name || "Unknown Goal"}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {transaction.type === "deposit" ? (
                                <>
                                  <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
                                  <span>Deposit</span>
                                </>
                              ) : (
                                <>
                                  <ArrowDownCircle className="h-4 w-4 text-red-500 mr-1" />
                                  <span>Withdrawal</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td
                            className={`py-3 px-4 font-medium ${transaction.type === "deposit" ? "text-green-500" : "text-red-500"}`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">{transaction.description}</td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">
                        No recent transactions
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings History/Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white rounded-lg border shadow-sm overflow-hidden"
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Savings History</h2>
        </div>

        <div className="p-4">
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {showAddGoalModal && <AddSavingsGoalModal onClose={() => setShowAddGoalModal(false)} onSave={onAddGoal} />}

      {editingGoal && (
        <EditSavingsGoalModal goal={editingGoal} onClose={() => setEditingGoal(null)} onSave={onUpdateGoal} />
      )}

      {showAddTransactionModal && selectedGoalForTransaction && (
        <AddSavingsTransactionModal
          goal={selectedGoalForTransaction}
          onClose={() => {
            setShowAddTransactionModal(false)
            setSelectedGoalForTransaction(null)
          }}
          onSave={(transaction) => {
            onAddTransaction(transaction)
            setShowAddTransactionModal(false)
            setSelectedGoalForTransaction(null)
          }}
        />
      )}
    </div>
  )
}

