import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background_image from '../assets/signup_background.jpg';

function Signup() {
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

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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
