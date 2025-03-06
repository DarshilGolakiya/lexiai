import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Signup = () => {
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const newErrors = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    };
    let isValid = true;

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
      isValid = false;
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Invalid email format";
        isValid = false;
      }
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
      setErrorMessage(
        "Ensure all fields are correctly filled out and resubmit."
      );
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/signup`, formData);
      console.log("SignUp Success:", res.data);
      Cookies.set("token", res.data.token);
      console.log(res.data.token);
      setErrorMessage("");
      navigate("/home");
    } catch (error) {
      console.error("Error Details:", error);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setErrors({
          firstname: errorData.firstname ? errorData.firstname.join(" ") : "",
          lastname: errorData.lastname ? errorData.lastname.join(" ") : "",
          email: errorData.email ? errorData.email.join(" ") : "",
          password: errorData.password ? errorData.password.join(" ") : "",
        });
        setErrorMessage("Signup failed.");
      } else {
        setErrorMessage("Error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const decoded = jwtDecode(token);
      console.log("Decoded User Info:", decoded);
      await axios.post(`${API_BASE_URL}/auth/google/callback`, { token });
      navigate("/");
    } catch (error) {
      console.error("Google Signup Error:", error);
      setErrorMessage("Google signup failed. Please try again.");
    }
  };

  const handleGoogleFailure = () => {
    setErrorMessage("Google signup failed. Try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              autoComplete="given-name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.firstname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.firstname && (
              <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              autoComplete="family-name"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
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
              autoComplete="new-password"
              className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-blue-600 hover:text-blue-800">
            Already have an account? Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
