import { useState } from "react";
import { Plus, Trash } from "lucide-react";

// Account types that can be selected
const accountTypes = ["Cash", "Credit", "Debit", "Checking", "Investment", "Savings"];

// Tailwind classes; color-codes each account type
const colorMap: Record<string, string> = {
  Cash: "bg-gray-200 text-gray-800",
  Credit: "bg-red-200 text-red-800",
  Debit: "bg-blue-200 text-blue-800",
  Checking: "bg-green-200 text-green-800",
  Investment: "bg-purple-200 text-purple-800",
  Savings: "bg-teal-200 text-teal-800",
};

// Define the shape of an account
interface Account {
  id: number;
  type: string;
}

export default function Accounts() {
  // Define the state to hold the list of the user-created accounts; each type having an 'id' and 'type' as defined in the interface above
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Add a new account with a default type; cycles through the list, so each account gets a different default type
  const addAccount = () => {
    const nextType = accountTypes[accounts.length % accountTypes.length];

    // Append the new account to the list
    setAccounts([...accounts, { id: Date.now(), type: nextType }]);
  };

  // Remove an account from the list based off id; only keeps the accounts that don't match the id given
  const removeAccount = (id: number) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  // When the user clicks the account type, cycle to the next type in the list
  const cycleType = (id: number) => {
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.id === id) {
          const index = accountTypes.indexOf(acc.type); // Current type's index
          const nextType = accountTypes[(index + 1) % accountTypes.length]; // Pick the next type (modulo keeps index from reaching out of bounds)
          return { ...acc, type: nextType }; // Return a new object with the updated type
        }
        return acc; // Remain unchanged if the account type is not clicked
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-300 p-10">
      <div className="max-w-4x1 mx-auto bg-white rounded-2xl shadow-lg p-8 relative">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Accounts</h1>

        {/* List of accounts */}
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center justify-between bg-gray-50 border rounded-xl p-4 mb-3 hover:shadow-sm transition"
          >
            {/* Account type button — clicking cycles through types */}
            <button
              onClick={() => cycleType(account.id)}
              className={`px-4 py-2 rounded-full font-medium text-sm ${colorMap[account.type]}`}
            >
              {account.type}
            </button>

            {/* Trash/Delete icon */}
            <Trash
              onClick={() => removeAccount(account.id)}
              className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
            />
          </div>
        ))}

        {/* Add new account button (top-right corner) */}
        <button
          onClick={addAccount}
          className="absolute top-8 right-8 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition shadow"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
