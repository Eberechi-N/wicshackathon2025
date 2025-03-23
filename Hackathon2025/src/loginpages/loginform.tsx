import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.error || "Login failed.");
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Log In</button>
      <div>
        <p>have an account? <Link to="/">log in here</Link></p>
        </div>
    </form>
  );
}
