import type React from "react"

import { Home, BadgeDollarSign , BarChart2, CreditCard, DollarSign, Settings, User, PiggyBank, LogOut, Package } from "lucide-react"

type SidebarProps = {
  activeItem: string
  onNavItemClick: (item: "home" | "dashboard" | "income" | "accounts" | "savings" | "settings") => void
}

export function Sidebar({ activeItem, onNavItemClick }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "income", label: "Transcations", icon: DollarSign },
    { id: "savings", label: "Savings", icon: BadgeDollarSign },
    { id: "accounts", label: "My Accounts", icon: CreditCard, path: "/accounts" },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="col-span-2 row-span-6 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <h1 className="text-xl font-bold">BandTech</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-gray-800 text-gray-300 pl-9 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>
      </div>

      <div className="mt-2 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">OVERVIEW</div>

      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeItem === item.id ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => {
                  if (
                    item.id === "home" ||
                    item.id === "dashboard" ||
                    item.id === "income" ||
                    item.id === "accounts" ||
                    item.id === "savings" ||
                    item.id === "settings"
                  ) {
                    onNavItemClick(item.id as "home" | "dashboard" | "income" | "accounts" | "savings" | "settings")
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800">
        <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
            <img src="/placeholder.svg?hfanalysis
            eight=40&width=40" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium">Jane Doe</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Active Now
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

