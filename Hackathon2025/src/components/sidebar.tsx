import { ArrowLeftRight, DollarSign, CreditCard, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Define the props interface
interface SidebarProps {
  // Optional current path prop in case we're not using Router
  currentPath?: string;
}

export function Sidebar({ currentPath }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("home");
  
  const navItems = [
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight, to: "/transactions" },
    { id: "income", label: "Income", icon: DollarSign, to: "/income" },
    { id: "expenses", label: "Expenses", icon: CreditCard, to: "/expenses" },
    { id: "settings", label: "Settings", icon: Settings, to: "/settings" },
    { id: "profile", label: "Profile", icon: User, to: "/profile" },
  ];
  
  // If we have a currentPath, find the corresponding item and set it as active
  if (currentPath) {
    const activeNav = navItems.find((item) => item.to === currentPath);
    if (activeNav && activeItem !== activeNav.id) {
      // This will run once when the component mounts
      setTimeout(() => setActiveItem(activeNav.id), 0);
    }
  }

  return (
    <div className="col-span-2 row-span-6 bg-black text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Finance Tracker</h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeItem === item.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.label}</span>
              </Link>
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
  );
}