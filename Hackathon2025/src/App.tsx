import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Transactions from "./transactions";
import Dashboard from "./loginpages/Usersahboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*mean that first page that opens it login*/}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path = "/userdash" element = {<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
