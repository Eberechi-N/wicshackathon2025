import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Label from "@radix-ui/react-label"
import * as Select from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import type { Expense, Category } from "../paget"


type AddExpenseModalProps = {
  onClose: () => void
  onSave: (data: Omit<Expense, "id">) => void
  categories: Category[]
}

export function AddExpenseModal({ onClose, onSave, categories }: AddExpenseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    accountName: "",
    emoji: "🛒",
  })

  const emojis = ["🛒", "🍔", "🏠", "💡", "📱", "🚗", "✈️", "🎬", "🎮", "👕", "💊", "📚"]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("Submitting add expense form:", formData)
    onSave({
      ...formData,
      amount: Number.parseFloat(formData.amount),
    })
  }

  return (
    <Dialog.Root open={true} onOpenChange={() => onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <Dialog.Title className="text-xl font-semibold">Add New Expense</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </Label.Root>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Expense name"
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </Label.Root>
                  <Select.Root
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                  >
                    <Select.Trigger
                      id="category"
                      className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Category"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Select.Value placeholder="Select category" />
                      <Select.Icon>
                        <ChevronDownIcon />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        className="overflow-hidden bg-white rounded-md shadow-lg border z-[100]"
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronUpIcon />
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-1">
                          <Select.Group>
                            {categories.map((category) => (
                              <Select.Item
                                key={category.id}
                                value={category.name}
                                className="relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none data-[state=checked]:bg-blue-50"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                  ></div>
                                  <Select.ItemText>{category.name}</Select.ItemText>
                                </div>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>

                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronDownIcon />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </Label.Root>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                  </Label.Root>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                    Account
                  </Label.Root>
                  <Select.Root
                    value={formData.accountName}
                    onValueChange={(value) => handleSelectChange("accountName", value)}
                  >
                    <Select.Trigger
                      id="accountName"
                      className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Account"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Select.Value placeholder="Select account" />
                      <Select.Icon>
                        <ChevronDownIcon />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content
                        className="overflow-hidden bg-white rounded-md shadow-lg border z-[100]"
                        position="popper"
                        sideOffset={5}
                      >
                        <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronUpIcon />
                        </Select.ScrollUpButton>

                        <Select.Viewport className="p-1">
                          <Select.Group>
                            {["Main Account", "Credit Card", "Savings Account", "Business Account"].map((account) => (
                              <Select.Item
                                key={account}
                                value={account}
                                className="relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none data-[state=checked]:bg-blue-50"
                              >
                                <Select.ItemText>{account}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>

                        <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                          <ChevronDownIcon />
                        </Select.ScrollDownButton>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root className="block text-sm font-medium text-gray-700">Emoji</Label.Root>
                  <div className="grid grid-cols-6 gap-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={`h-10 w-10 flex items-center justify-center text-lg rounded-md ${
                          formData.emoji === emoji ? "bg-blue-500 text-white" : "bg-white border hover:bg-gray-50"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectChange("emoji", emoji)
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onClose()
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

