import background_image1 from "../assets/signup_background.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/signup");
  }
  return (
    <div className="min-h-screen bg-gray-300 grid grid-cols-6 grid-rows-6">
      {/* Image (left)*/}
      <div className="col-span-4 row-span-6">
        <img
          src={background_image1}
          alt="Login Background Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Signup (right)*/}
      <div className="col-span-2 row-span-6 bg-white rounded-xl p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-8 text-center ">Welcome Back!</h2>
        <h3 className="text-md text-center mb-4 ">Please login to continue</h3>

        {/* Form container */}
        <div className="flex flex-col gap-6">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
          />

        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-green-400 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Login
        </button>
        <h3 className="text-md text-center mt-4">Don't have an account?</h3>

        <button
          type="button"
          onClick={handleClick}
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-800 transition duration-300"

        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
