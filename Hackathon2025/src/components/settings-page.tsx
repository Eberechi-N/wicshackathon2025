"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit, Check, X } from 'lucide-react'
import * as Tabs from "@radix-ui/react-tabs"
import * as Dialog from "@radix-ui/react-dialog"
import * as Label from "@radix-ui/react-label"
import type { Category } from "../paget"

type SettingsPageProps = {
  expenseCategories: Category[]
  incomeCategories: Category[]
  savingsCategories: Category[]
  onAddCategory: (type: 'expense' | 'income' | 'savings', category: Omit<Category, "id">) => void
  onUpdateCategory: (type: 'expense' | 'income' | 'savings', category: Category) => void
  onDeleteCategory: (type: 'expense' | 'income' | 'savings', categoryId: number) => void
}

export function SettingsPage({
  expenseCategories,
  incomeCategories,
  savingsCategories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState("expense")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<{ type: 'expense' | 'income' | 'savings', category: Category } | null>(null)
  const [editingInline, setEditingInline] = useState<{ type: 'expense' | 'income' | 'savings', id: number, name: string, color: string } | null>(null)

  const handleAddCategory = (type: 'expense' | 'income' | 'savings', name: string, color: string) => {
    onAddCategory(type, { name, color })
    setShowAddModal(false)
  }

  const handleUpdateCategory = (type: 'expense' | 'income' | 'savings', id: number, name: string, color: string) => {
    onUpdateCategory(type, { id, name, color })
    setEditingCategory(null)
  }

  const handleInlineEdit = (type: 'expense' | 'income' | 'savings', id: number, name: string, color: string) => {
    setEditingInline({ type, id, name, color })
  }

  const saveInlineEdit = () => {
    if (editingInline) {
      onUpdateCategory(editingInline.type, {
        id: editingInline.id,
        name: editingInline.name,
        color: editingInline.color
      })
      setEditingInline(null)
    }
  }

  const cancelInlineEdit = () => {
    setEditingInline(null)
  }

  const renderCategoryList = (type: 'expense' | 'income' | 'savings', categories: Category[]) => {
    return (
      <div className="space-y-2 mt-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div 
              key={category.id} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              {editingInline && editingInline.id === category.id && editingInline.type === type ? (
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="color"
                    value={editingInline.color}
                    onChange={(e) => setEditingInline({...editingInline, color: e.target.value})}
                    className="w-8 h-8 rounded-md border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingInline.name}
                    onChange={(e) => setEditingInline({...editingInline, name: e.target.value})}
                    className="flex-1 px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button 
                      onClick={saveInlineEdit}
                      className="p-1 rounded-md hover:bg-gray-200 text-green-600"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={cancelInlineEdit}
                      className="p-1 rounded-md hover:bg-gray-200 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleInlineEdit(type, category.id, category.name, category.color)}
                      className="p-1 rounded-md hover:bg-gray-200"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteCategory(type, category.id)}
                      className="p-1 rounded-md hover:bg-gray-200 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No categories found</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="mt-2 text-blue-500 hover:underline"
            >
              Add your first category
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Settings</h2>
          
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex border-b mb-4">
              <Tabs.Trigger 
                value="expense" 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'expense' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Expense Categories
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="income" 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'income' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Income Categories
              </Tabs.Trigger>
              <Tabs.Trigger 
                value="savings" 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'savings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Savings Categories
              </Tabs.Trigger>
            </Tabs.List>
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {activeTab === 'expense' ? 'Expense Categories' : 
                 activeTab === 'income' ? 'Income Categories' : 'Savings Categories'}
              </h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </button>
            </div>
            
            <Tabs.Content value="expense">
              {renderCategoryList('expense', expenseCategories)}
            </Tabs.Content>
            
            <Tabs.Content value="income">
              {renderCategoryList('income', incomeCategories)}
            </Tabs.Content>
            
            <Tabs.Content value="savings">
              {renderCategoryList('savings', savingsCategories)}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </motion.div>

      {/* Add Category Modal */}
      {showAddModal && (
        <AddCategoryModal 
          type={activeTab as 'expense' | 'income' | 'savings'}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCategory}
        />
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <EditCategoryModal 
          type={editingCategory.type}
          category={editingCategory.category}
          onClose={() => setEditingCategory(null)}
          onSave={handleUpdateCategory}
        />
      )}
    </div>
  )
}

type AddCategoryModalProps = {
  type: 'expense' | 'income' | 'savings'
  onClose: () => void
  onSave: (type: 'expense' | 'income' | 'savings', name: string, color: string) => void
}

function AddCategoryModal({ type, onClose, onSave }: AddCategoryModalProps) {
  const [name, setName] = useState("")
  const [color, setColor] = useState("#3b82f6") // Default blue color
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (name.trim()) {
      onSave(type, name, color)
    }
  }
  
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
  
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
                <Dialog.Title className="text-xl font-semibold">Add {typeLabel} Category</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Category Name
                  </Label.Root>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={`e.g. ${type === 'expense' ? 'Groceries' : type === 'income' ? 'Salary' : 'Emergency Fund'}`}
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Color
                  </Label.Root>
                  <div className="flex items-center gap-3">
                    <input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="text-sm text-gray-500">
                      Choose a color for this category
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
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

type EditCategoryModalProps = {
  type: 'expense' | 'income' | 'savings'
  category: Category
  onClose: () => void
  onSave: (type: 'expense' | 'income' | 'savings', id: number, name: string, color: string) => void
}

function EditCategoryModal({ type, category, onClose, onSave }: EditCategoryModalProps) {
  const [name, setName] = useState(category.name)
  const [color, setColor] = useState(category.color)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (name.trim()) {
      onSave(type, category.id, name, color)
    }
  }
  
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)
  
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
                <Dialog.Title className="text-xl font-semibold">Edit {typeLabel} Category</Dialog.Title>
                <Dialog.Close asChild>
                  <button className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Category Name
                  </Label.Root>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Label.Root htmlFor="color" className="block text-sm font-medium text-gray-700">
                    Color
                  </Label.Root>
                  <div className="flex items-center gap-3">
                    <input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="text-sm text-gray-500">
                      Choose a color for this category
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
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
