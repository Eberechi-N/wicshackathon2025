import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import background_image1 from "../assets/signup_background.jpg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
         // Store token in localStorage
         if (response.data.token) {
          localStorage.setItem("supabase_token", response.data.token);
          console.log("Token saved:", response.data.token);
      } else {
          console.error("No token received");
      }
      alert(response.data.message);
      navigate("/transactions");
    } catch (error: any) {
      alert(error.response?.data?.error || "Login failed.");
    }
  }

  function handleSignupRedirect() {
    navigate("/signup");
  }

  return (
    <div className="min-h-screen bg-gray-300 grid grid-cols-6 grid-rows-6">
      {/* Image (left) */}
      <div className="col-span-4 row-span-6">
        <img
          src={background_image1}
          alt="Login Background Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Login Form (right) */}
      <div className="col-span-2 row-span-6 bg-white rounded-xl p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-8 text-center">Welcome Back!</h2>
        <h3 className="text-md text-center mb-4">Please login to continue</h3>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

             {/* Password Field */}
             <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-400 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <h3 className="text-md text-center mt-4">Don't have an account?</h3>

        <button
          type="button"
          onClick={handleSignupRedirect}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-800 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
