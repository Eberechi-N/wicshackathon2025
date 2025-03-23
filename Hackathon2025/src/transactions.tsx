import { useState, useEffect } from "react";
import "./transactions.css";
import axios from "axios";

// Define types for state
interface Income {
    id?: number;
    source: string;
    amount: number;
}

interface Expense {
    id?: number;
    category: string;
    amount: number;
}

function Transactions() {
    const [income, setIncome] = useState<Income[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Form States
    const [newIncome, setNewIncome] = useState<Income>({ source: "", amount: 0 });
    const [newExpense, setNewExpense] = useState<Expense>({ category: "", amount: 0 });

    // Fetch income and expenses data
    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("supabase_token"); // Get stored token

        try {
            const [incomeResponse, expensesResponse] = await Promise.all([
                axios.get<Income[]>("http://localhost:8080/api/income", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
                axios.get<Expense[]>("http://localhost:8080/api/expenses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            setIncome(incomeResponse.data);
            setExpenses(expensesResponse.data);
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setIncome([...income, response.data]); // Update UI
        setNewIncome({ source: "", amount: 0 }); // Clear form
    } catch (err: any) {
        console.error("Error adding income:", err.message);
    }
};


  const addExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("supabase_token");

    try {
        const response = await axios.post<Expense>(
            "http://localhost:8080/api/expenses",
            newExpense,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setExpenses([...expenses, response.data]); // Update UI
        setNewExpense({ category: "", amount: 0 }); // Clear form
    } catch (err: any) {
        console.error("Error adding expense:", err.message);
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
                        Source: {item.source}, Amount: ${item.amount}
                    </li>
                ))}
            </ul>

            {/* Expenses Table */}
            <h3>Expenses Table</h3>
            <ul>
                {expenses.map((item) => (
                    <li key={item.id}>
                        Category: {item.category}, Amount: ${item.amount}
                    </li>
                ))}
            </ul>

            {/* Add New Income */}
            <h3>Add Income</h3>
            <form onSubmit={addIncome}>
                <input
                    type="text"
                    placeholder="Source"
                    value={newIncome.source}
                    onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newIncome.amount}
                    onChange={(e) => setNewIncome({ ...newIncome, amount: Number(e.target.value) })}
                    required
                />
                <button type="submit">Add Income</button>
            </form>

            {/* Add New Expense */}
            <h3>Add Expense</h3>
            <form onSubmit={addExpense}>
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
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default Transactions;
