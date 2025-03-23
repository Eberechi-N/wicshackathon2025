import { useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import { Sidebar } from "../components/sidebar";

// Account types that can be selected
const accountTypes = [
  "Cash",
  "Credit",
  "Debit",
  "Checking",
  "Investment",
  "Savings",
];

// Tailwind classes; color-codes each account type
const colorMap: Record<string, string> = {
  Cash: "bg-green-200 text-green-800",
  Credit: "bg-red-200 text-red-800",
  Debit: "bg-blue-200 text-blue-800",
  Checking: "bg-gray-200 text-gray-800",
  Investment: "bg-purple-200 text-purple-800",
  Savings: "bg-teal-200 text-teal-800",
};

// Define the shape of an account
interface Account {
  id: number;
  name: string;
  type: string;
  balance: number;
}

// State Management
export default function Accounts() {
  const [activeView, setActiveView] = useState<
  "home" | "income" | "expenses" | "savings" | "settings" | "accounts" | "dashboard"
>("accounts");
  const [accounts, setAccounts] = useState<Account[]>([]); // Stores the list of user accounts
  const [editingAccountId, setEditingAccountId] = useState<number | null>(null); // Keeps track of the account being edited
  const [editedBalance, setEditedBalance] = useState<number | string>(""); // Holds the edited value for balance
  const [editedName, setEditedName] = useState<string>(""); // Holds the edited value for name

  // Add a new account with a default type
  const addAccount = () => {
    const nextType = accountTypes[accounts.length % accountTypes.length];
    setAccounts([
      ...accounts,
      {
        id: Date.now(),
        name: `Account ${accounts.length + 1}`,
        type: nextType,
        balance: 0,
      },
    ]);
  };

  // Remove an account
  const removeAccount = (id: number) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  // When the user clicks the account type, cycle to the next type in the list
  const cycleType = (id: number) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const index = accountTypes.indexOf(acc.type);
          const nextType = accountTypes[(index + 1) % accountTypes.length];
          return { ...acc, type: nextType };
        }
        return acc;
      })
    );
  };

  // Handle balance and name change
  const handleSave = (id: number) => {
    if (editedBalance === "" || isNaN(Number(editedBalance))) return; // Validates if value is a number (isNan) and not empty
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id
          ? {
              ...account,
              balance: Number(editedBalance),
              name: editedName || account.name,
            }
          : account
      )
    );
    setEditingAccountId(null);
    setEditedBalance(""); // Reset after saving
    setEditedName(""); // Reset after saving
  };

  const handleNavItemClick = (
    view: "home" | "dashboard" | "income" | "accounts" | "savings" | "settings"
  ) => {
    setActiveView(view);
  };

  return (
    <div className="h-screen p-6 bg-gray-100 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accounts</h1>

      {/* List of accounts */}
      {accounts.length === 0 ? (
        <p>No accounts found</p>
      )  : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between bg-gray-50 border rounded-xl p-4 mb-3 hover:shadow-sm transition"
            >
              {/* Account name */}
              <div className="flex flex-col space-x-4 mr-4 flex-1">
                {editingAccountId === account.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                    placeholder="Account name"
                  />
                ) : (
                  <span className="text-lg font-semibold">{account.name}</span>
                )}
              </div>

              {/* Account type */}
              <div className="flex items-center justify-center flex-1">
                <button
                  onClick={() => cycleType(account.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm ${colorMap[account.type]}`}
                >
                  {account.type}
                </button>
              </div>

              {/* Balance */}
              <div className="flex items-center justify-center flex-1">
                {editingAccountId === account.id ? (
                  <input
                    type="number"
                    value={editedBalance}
                    onChange={(e) => setEditedBalance(e.target.value)}
                    className="border p-2 rounded-md w-24"
                    placeholder="Enter amount"
                  />
                ) : (
                  <span className="text-lg font-semibold">
                    ${account.balance}
                  </span>
                )}
              </div>

              {/* Edit button */}
              <div className="flex items-center justify-center">
                <Edit
                  onClick={() => {
                    if (editingAccountId === account.id) {
                      handleSave(account.id);
                    } else {
                      setEditingAccountId(account.id);
                      setEditedBalance(account.balance.toString());
                      setEditedName(account.name);
                    }
                  }}
                  className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 mr-4"
                />
              </div>

              {/* Delete button */}
              <div className="flex items-center justify-center">
                <Trash
                  onClick={() => removeAccount(account.id)}
                  className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                />
              </div>
            </div>
          ))
        )}

        {/* Add account button */}
        <button
          onClick={addAccount}
          className="absolute top-8 right-8 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition shadow"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
  );
}
