import { motion } from "framer-motion"
import { Plus, ArrowRight, CreditCard, TrendingUp, ShoppingBag, Plane } from "lucide-react"
import * as Progress from "@radix-ui/react-progress"
import type { Expense, Income, SavingsGoal } from "../paget"

type DashboardPageProps = {
  incomeData: Income[]
  expenseData: Expense[]
  savingsGoals: SavingsGoal[]
  onAddGoal: () => void
}

export function DashboardPage({ incomeData, expenseData, savingsGoals, onAddGoal }: DashboardPageProps) {
  // Calculate total balance
  const totalIncome = incomeData.reduce((sum, income) => sum + income.amount, 0)
  const totalExpenses = expenseData.reduce((sum, expense) => sum + expense.amount, 0)
  const totalBalance = totalIncome - totalExpenses

  // Calculate spending limit (for demo purposes)
  const dailyLimit = 2499.0
  const dailySpent = 199.0
  const spendingPercentage = (dailySpent / dailyLimit) * 100

  // Get recent transactions
  const recentTransactions = [...expenseData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  // Calculate outcome statistics
  const expensesByCategory: Record<string, number> = {}
  expenseData.forEach((expense) => {
    if (expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] += expense.amount
    } else {
      expensesByCategory[expense.category] = expense.amount
    }
  })

  const topCategories = Object.entries(expensesByCategory)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .slice(0, 3)
    .map(([category, amount]) => ({ category, amount }))

  // Calculate total expenses for percentage calculation
  const totalExpensesAmount = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0)

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return <ShoppingBag className="h-4 w-4 text-green-500" />
      case "travel":
      case "transportation":
        return <Plane className="h-4 w-4 text-blue-500" />
      case "shopping":
        return <ShoppingBag className="h-4 w-4 text-purple-500" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cards List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg border shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Cards list</h2>
          </div>

          <div className="p-6 relative">
            <div className="relative z-10">
              <div className="absolute -top-4 -left-2 w-full">
                <div className="bg-gray-800 rounded-lg p-4 w-11/12 h-40 transform rotate-6 opacity-20"></div>
              </div>
              <div className="absolute -top-2 -left-1 w-full">
                <div className="bg-gray-700 rounded-lg p-4 w-11/12 h-40 transform rotate-3 opacity-40"></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 relative z-20">
              <div className="flex justify-between items-start mb-8">
                <div className="text-white opacity-80 text-sm">VISA</div>
                <div className="text-white opacity-80 text-sm">
                  <CreditCard className="h-5 w-5" />
                </div>
              </div>

              <div className="text-white text-lg font-medium mb-6">1200 1120 9876 ****</div>

              <div className="flex justify-between items-center">
                <div className="text-white opacity-80 text-xs">09/23</div>
                <div className="text-white opacity-80 text-xs">John Doe</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="text-3xl font-bold text-gray-800">${totalBalance.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total Balance</div>
            </div>

            <div className="absolute bottom-6 right-6">
              <div className="bg-gray-100 rounded-full p-3">
                <ArrowRight className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>

          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Spending limits</h3>
            <div className="text-sm text-gray-500 mb-2">DAILY TRANSACTION LIMIT</div>

            <Progress.Root
              className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2"
              value={spendingPercentage}
            >
              <Progress.Indicator
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${spendingPercentage}%` }}
              />
            </Progress.Root>

            <div className="flex justify-between text-sm">
              <div className="text-gray-600">
                ${dailySpent.toLocaleString()} spent of ${dailyLimit.toLocaleString()}
              </div>
              <div className="font-medium">{spendingPercentage.toFixed(0)}%</div>
            </div>
          </div>

          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Outcome Statistics</h3>

            <div className="space-y-4">
              {topCategories.map(({ category, amount }) => {
                const percentage = totalExpensesAmount > 0 ? (amount / totalExpensesAmount) * 100 : 0

                return (
                  <div key={category}>
                    <div className="flex items-center gap-2 mb-2">
                      {getCategoryIcon(category)}
                      <span className="text-sm font-medium">{category}</span>
                    </div>

                    <Progress.Root
                      className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2"
                      value={percentage}
                    >
                      <Progress.Indicator
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </Progress.Root>

                    <div className="flex justify-between text-sm">
                      <div className="text-gray-600">${amount.toLocaleString()}</div>
                      <div className="font-medium">{percentage.toFixed(0)}%</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Goals and Transactions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Goals</h2>
              <button
                onClick={onAddGoal}
                className="rounded-full h-8 w-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {savingsGoals.slice(0, 4).map((goal) => {
                  const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100

                  return (
                    <div key={goal.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          {goal.category === "Travel" ? (
                            <Plane className="h-4 w-4 text-blue-500" />
                          ) : goal.category === "Electronics" ? (
                            <CreditCard className="h-4 w-4 text-purple-500" />
                          ) : (
                            <ShoppingBag className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{goal.category}</div>
                      </div>

                      <div className="font-medium mb-1">{goal.name}</div>

                      <div className="text-sm text-gray-500 mb-1">BUDGET</div>
                      <div className="text-lg font-bold">${goal.targetAmount.toLocaleString()}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Transactions</h2>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                {recentTransactions.slice(0, 2).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {transaction.emoji || "👤"}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-5 w-5 rounded-full bg-red-500"></div>
                        <div className="text-xs">**** {Math.floor(Math.random() * 9000) + 1000}</div>
                      </div>

                      <div className="font-medium">${transaction.amount.toLocaleString()}</div>

                      <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Success</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Transaction History</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">Receiver</th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {transaction.emoji || "👤"}
                          </div>
                          <span>{transaction.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{transaction.category}</td>
                      <td className="py-3 px-4">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 font-medium">${transaction.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

