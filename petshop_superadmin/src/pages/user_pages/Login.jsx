import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/AuthContext";
import { MdLogin } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, logout } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  let googleLoginTimeout;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3007/api/login", {
        ...formData,
        loginType: "email",
      });

      const { token, user } = response.data;

      if (token && user) {
        login(token, user.role);
        navigate(`/${user.role}-dashboard/${user.id}`);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };


  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 mb-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <MdLogin className="mx-auto h-12 w-12 text-gray-600" />
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-600">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-maroon-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-maroon-600 sm:text-sm"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </div>
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-gray-800 bg-gray-200 rounded font-semibold transition-all duration-200 hover:bg-black hover:text-white hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-lg text-gray-800">
          Don't have an account? {" "}
          <a href="/register" className="font-semibold text-red-800 hover:text-black">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
