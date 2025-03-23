import { useState } from "react"
import { Search, ArrowUpDown, Plus } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { motion } from "framer-motion"
import type { Expense } from "../paget"

type ExpenseSectionProps = {
  expenseData: Expense[]
  onAddExpense: () => void
  onEditExpense: (expense: Expense) => void
}

export function ExpenseSection({ expenseData, onAddExpense, onEditExpense }: ExpenseSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredData = expenseData
    .filter((expense) => expense.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Expenses</h2>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onAddExpense}
                  className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 text-xs rounded z-[100]" sideOffset={5}>
                  Add Expense
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
                placeholder="Search expenses..."
                className="w-full pl-8 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-1 px-3 py-2 text-sm border rounded-md hover:bg-gray-50 transition-colors"
            >
              Sort by Date
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Account</th>
                  <th className="text-left py-3 px-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredData.length > 0 ? (
                  filteredData.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => onEditExpense(expense)}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{expense.name}</div>
                          <div className="text-xs text-gray-500">{expense.category}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{new Date(expense.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 font-medium text-red-500">-${expense.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">{expense.accountName}</td>
                      <td className="py-3 px-4">{expense.emoji}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No expense entries found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

