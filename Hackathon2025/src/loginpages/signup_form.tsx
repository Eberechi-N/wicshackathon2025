import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/signup", {
        email,
        password,
        username,
      });
      alert(response.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.error || "Signup failed.");
    }
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
    
  );
}
