import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Transactions from "./transactions";
import Fake from "./paget";
import Dashboard from "./loginpages/Usersahboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Routes that include the dashboard and sidebar */}
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/userdash" element={<Dashboard />} />
        <Route path="/fake" element={<Fake />} />
        
        {/* Add routes for the sidebar navigation items */}
        <Route path="/income" element={<Dashboard />} />
        <Route path="/expenses" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;