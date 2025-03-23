
import { Home, DollarSign, CreditCard, Settings, User, PiggyBank } from "lucide-react"

type SidebarProps = {
  activeItem: string
  onNavItemClick: (item: "home" | "income" | "expenses" | "savings" | "settings") => void
}

export function Sidebar({ activeItem, onNavItemClick }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "income", label: "Income", icon: DollarSign },
    { id: "expenses", label: "Expenses", icon: CreditCard },
    { id: "savings", label: "Savings", icon: PiggyBank },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="col-span-2 row-span-6 bg-black text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Finance Tracker</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex w-full items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeItem === item.id ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => {
                  if (
                    item.id === "home" ||
                    item.id === "income" ||
                    item.id === "expenses" ||
                    item.id === "savings" ||
                    item.id === "settings"
                  ) {
                    onNavItemClick(item.id as "home" | "income" | "expenses" | "savings" | "settings")
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

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-700"></div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

