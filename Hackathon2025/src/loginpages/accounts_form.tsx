// accounts_form.tsx: Handles API requests for accounts
const AccountsForm = {
    // Add a new account
    addAccount: async (name: string) => {
      try {
        const response = await fetch("http://localhost:8080/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            type: "Cash", // Default account type
            balance: 0, // Default balance
          }),
        });
        const newAccount = await response.json();
        return newAccount; // Return the new account data
      } catch (error) {
        console.error("Error adding account:", error);
        return null;
      }
    },
  
    // Delete an account by ID
    deleteAccount: async (accountId: number) => {
      try {
        await fetch(`http://localhost:8080/api/accounts/${accountId}`, {
          method: "DELETE",
        });
        return true; // Return success
      } catch (error) {
        console.error("Error deleting account:", error);
        return false;
      }
    },
  };
  
  export default AccountsForm;
  