import { useState, useEffect } from "react";
import "./transactions.css";
import axios from "axios";

// Define types
interface Income {
    id?: number;
    name: string;
    amount: number;
    category: string;
    account_name: string;

}

interface Expense {
    id?: number;
    name: string;
    category: string;
    amount: number;
    account_name: string;
    emoji: string; 
}

function Transactions() {
    const [income, setIncome] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [accounts, setAccounts] = useState<string[]>([]); // Store only account names
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Form States
    const [newIncome, setNewIncome] = useState<Income>({ name: "", amount: 0, category: "", account_name: "" });
    const [newExpense, setNewExpense] = useState<Expense>({
        name: "",
        category: "",
        amount: 0,
        account_name: "",
        emoji: "💰"
    });

    // Fetch income, expenses, and accounts data
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("supabase_token");
            if (!token) {
                setError("Authentication token missing. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const [incomeResponse, expensesResponse, accountsResponse] = await Promise.all([
                    axios.get<Income[]>("http://localhost:8080/api/income", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get<Expense[]>("http://localhost:8080/api/expenses", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get<{ name: string }[]>("http://localhost:8080/api/expenses/accounts", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get<{ name: string }[]>("http://localhost:8080/api/income/accounts", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),

                ]);

                console.log("🛠 Debug: Accounts Data:", accountsResponse.data);

                setIncome(incomeResponse.data);
                setExpenses(expensesResponse.data);
                setAccounts(accountsResponse.data.map(acc => acc.name)); // Extract account names
            } catch (err: any) {
                setError(err.message || "An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to add new income
    const addIncome = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("supabase_token");

        try {
            const response = await axios.post<Income>(
                "http://localhost:8080/api/income",
                newIncome,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setIncome([...income, response.data]); // Update UI
            setNewIncome({ name: "", amount: 0, category: "" , account_name: "" }); // Clear form
        } catch (err: any) {
            console.error("🚨 Error adding income:", err.message);
        }
    };

    // Function to add new expense
    const addExpense = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("supabase_token");

        try {
            const response = await axios.post<Expense>(
                "http://localhost:8080/api/expenses",
                newExpense,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setExpenses([...expenses, response.data]); // Update UI
            setNewExpense({ name: "", category: "", amount: 0, account_name: "", emoji: "💰" }); // Clear form
        } catch (err: any) {
            console.error("🚨 Error adding expense:", err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Income & Expenses</h2>

            {/* Income Table */}
            <h3>Income Table</h3>
            <ul>
                {income.map((item) => (
                    <li key={item.id}>
                        Name: {item.name}, Amount: ${item.amount}, Category: {item.category},  Account: {item.account_name}
                    </li>
                ))}
            </ul>

            {/* Expenses Table */}
            <h3>Expenses Table</h3>
            <ul>
                {expenses.map((item) => (
                    <li key={item.id}>
                        Name: {item.name}, Category: {item.category}, Amount: ${item.amount}, Emoji: {item.emoji}, Account: {item.account_name}
                    </li>
                ))}
            </ul>

            {/* Add New Income */}
            <h3>Add Income</h3>
            <form onSubmit={addIncome}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newIncome.name}
                    onChange={(e) => setNewIncome({ ...newIncome, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newIncome.category}
                    onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
                    required
                />
                   {/* Account Name Dropdown */}
                   <select value={newIncome.account_name} onChange={(e) => setNewIncome({ ...newIncome, account_name: e.target.value })} required>
                    <option value="">Select Account</option>
                    {accounts.map((account, index) => (
                        <option key={index} value={account}>{account}</option>
                    ))}
                </select>
                <button type="submit">Add Income</button>
            </form>

            {/* Add New Expense */}
            <h3>Add Expense</h3>
            <form onSubmit={addExpense}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    required
                />

                {/* Account Name Dropdown */}
                <select
                    value={newExpense.account_name}
                    onChange={(e) => setNewExpense({ ...newExpense, account_name: e.target.value })}
                    required
                >
                    <option value="">Select Account</option>
                    {accounts.length > 0 ? (
                        accounts.map((account, index) => (
                            <option key={index} value={account}>{account}</option>
                        ))
                    ) : (
                        <option value="" disabled>No accounts available</option>
                    )}
                </select>

                {/* Emoji Dropdown */}
                <select
                    value={newExpense.emoji}
                    onChange={(e) => setNewExpense({ ...newExpense, emoji: e.target.value })}
                    required
                >
                    <option value="💰">💰 - Happy (Saved money)</option>
                    <option value="😢">😢 - Sad (Unexpected expenses)</option>
                    <option value="😡">😡 - Angry (Overpriced bills)</option>
                    <option value="😭">😭 - Crying (Big expenses)</option>
                    <option value="😠">😠 - Annoyed (Unwanted expenses)</option>
                    <option value="😌">😌 - Calm (Manageable spending)</option>
                </select>

                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default Transactions;
