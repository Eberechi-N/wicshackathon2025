import background_image from '../assets/signup_background.jpg';

function Signup() {
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

      {/* Signup (right)*/}
      <div className="col-span-2 row-span-6 bg-white rounded-xl p-8 flex flex-col justify-center">
        
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

        {/* Form container */}
        <div className="flex flex-col gap-6">
          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md"
          />

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

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-green-400 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
