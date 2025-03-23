import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import background_image from '../assets/signup_background.jpg';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError(""); // Clear previous errors


    try {
      const response = await axios.post("http://localhost:8080/signup", {
        email,
        password,
        username,
      });
      alert(response.data.message);
      navigate("/userdash");
    } catch (error: any) {
      alert(error.response?.data?.error || "Signup failed.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-300 grid grid-cols-6 grid-rows-6">
      {/* Image (left)*/}
      <div className="col-span-4 row-span-6">
        <img
          src={background_image}
          alt="Signup Tree background image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Signup Form (right) */}
      <div className="col-span-2 row-span-6 bg-white rounded-xl p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        {/* Form */}
        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Email */}
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

          {/* Confirm Password Field (Separate State) */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-md pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
      
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-green-400 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
