"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Label from "@radix-ui/react-label"
import * as Select from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import type { SavingsGoal } from "../paget"

type EditSavingsGoalModalProps = {
  goal: SavingsGoal
  onClose: () => void
  onSave: (data: SavingsGoal) => void
}

export function EditSavingsGoalModal({ goal, onClose, onSave }: EditSavingsGoalModalProps) {
  const [formData, setFormData] = useState({
    id: goal.id,
    name: goal.name,
    targetAmount: goal.targetAmount.toString(),
    currentAmount: goal.currentAmount.toString(),
    category: goal.category,
    dueDate: goal.dueDate || "",
    accountName: goal.accountName,
    status: goal.status,
  })

  useEffect(() => {
    setFormData({
      id: goal.id,
      name: goal.name,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      category: goal.category,
      dueDate: goal.dueDate || "",
      accountName: goal.accountName,
      status: goal.status,
    })
  }, [goal])

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

    onSave({
      ...formData,
      targetAmount: Number.parseFloat(formData.targetAmount),
      currentAmount: Number.parseFloat(formData.currentAmount),
      status: formData.status as "active" | "completed" | "canceled",
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
                <Dialog.Title className="text-xl font-semibold">Edit Savings Goal</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Goal Name
                  </Label.Root>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Emergency Fund"
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
                            {[
                              "Emergency",
                              "Travel",
                              "Housing",
                              "Transportation",
                              "Electronics",
                              "Education",
                              "Retirement",
                              "Other",
                            ].map((category) => (
                              <Select.Item
                                key={category}
                                value={category}
                                className="relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none data-[state=checked]:bg-blue-50"
                              >
                                <Select.ItemText>{category}</Select.ItemText>
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
                  <Label.Root htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">
                    Target Amount
                  </Label.Root>
                  <input
                    id="targetAmount"
                    name="targetAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="currentAmount" className="block text-sm font-medium text-gray-700">
                    Current Amount
                  </Label.Root>
                  <input
                    id="currentAmount"
                    name="currentAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.currentAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Due Date (Optional)
                  </Label.Root>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            {["Main Account", "Savings Account", "Investment Account", "Business Account"].map(
                              (account) => (
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
                              ),
                            )}
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
                  <Label.Root htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </Label.Root>
                  <Select.Root value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <Select.Trigger
                      id="status"
                      className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      aria-label="Status"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Select.Value placeholder="Select status" />
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
                        <Select.Viewport className="p-1">
                          <Select.Group>
                            {[
                              { value: "active", label: "Active" },
                              { value: "completed", label: "Completed" },
                              { value: "canceled", label: "Canceled" },
                            ].map((status) => (
                              <Select.Item
                                key={status.value}
                                value={status.value}
                                className="relative flex items-center px-8 py-2 text-sm rounded-md cursor-default select-none hover:bg-blue-50 focus:bg-blue-50 focus:outline-none data-[state=checked]:bg-blue-50"
                              >
                                <Select.ItemText>{status.label}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                                  <CheckIcon />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Group>
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
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

