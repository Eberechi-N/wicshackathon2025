import { useState } from "react"
import { Search, ArrowUpDown, Plus } from "lucide-react"
import * as Tooltip from "@radix-ui/react-tooltip"
import { motion } from "framer-motion"
import type { Income } from "../paget"

type IncomeSectionProps = {
  incomeData: Income[]
  onAddIncome: () => void
  onEditIncome: (income: Income) => void
}

export function IncomeSection({ incomeData, onAddIncome, onEditIncome }: IncomeSectionProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  
    const filteredData = incomeData
      .filter((income) => income.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA
      })
  
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Income</h2>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={onAddIncome}
                    className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content className="bg-gray-800 text-white px-2 py-1 text-xs rounded z-[100]" sideOffset={5}>
                    Add Income
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
                  placeholder="Search income..."
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
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700 sticky top-0">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 font-medium">Account</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredData.length > 0 ? (
                      filteredData.map((income) => (
                        <tr
                          key={income.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => onEditIncome(income)}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-medium">{income.name}</div>
                              <div className="text-xs text-gray-500">{income.category}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{new Date(income.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4 font-medium">${income.amount.toLocaleString()}</td>
                          <td className="py-3 px-4">{income.accountName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">
                          No income entries found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
  
  