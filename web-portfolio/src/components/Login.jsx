import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(email, password);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', email);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md mx-auto bg-white/90 backdrop-blur-sm p-4 sm:p-8 shadow-xl rounded-lg border border-purple-100"
      >
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Login
        </h2>
        <input
          type="email"
          placeholder="abc@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 sm:p-3 border border-purple-200 rounded-lg mb-3 sm:mb-4 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all text-sm sm:text-base"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 sm:p-3 border border-purple-200 rounded-lg mb-3 sm:mb-4 focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all text-sm sm:text-base"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-mono font-semibold text-white py-2 sm:py-3 rounded-lg mb-3 sm:mb-4 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
        >
          Login
        </button>
        <p className="text-center font-serif text-gray-600 text-sm sm:text-base">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-purple-600 underline transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
