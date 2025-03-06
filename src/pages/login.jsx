import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email.trim())) {
      newErrors.email = "Only Gmail addresses are allowed";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      setErrorMessage("Please fix the errors before submitting.");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/login`, formData);
      console.log("Login Success:", res.data);
      Cookies.set("token", res.data.token);
      console.log(res.data.token);
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/auth/google`);
      if (res.status === 200 && res.data.auth_url) {
        window.open(res.data.auth_url, "_blank");
        navigate("/home");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setErrorMessage("Failed to authenticate with Google.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            <a
              href="/forgate-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot Password?
            </a>
          </p>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Login with Google
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
