import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Billing = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [currentPlan, setCurrentPlan] = useState("Free");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [email, setEmail] = useState("");
  const totalCredits = 10000;
  const usedCredits = 0;

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.email);
    }
  }, []);

  const handleContinue = () => {
    const token = Cookies.get("token");
    fetch(`${API_BASE_URL}/checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ plan_name: selectedPlan, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          alert("Failed to create checkout session");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 text-white p-6">
      <div className="w-full max-w-6xl bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Subscription</h1>

        {/* Subscription Details */}
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Subscription Details</h2>
            <button className="px-4 py-2 bg-gray-600 rounded-md text-sm">
              Manage billing info
            </button>
          </div>
          <div className="mt-4 border-t border-gray-600 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Current Plan</span>
              <span className="px-3 py-1 bg-gray-600 rounded-md text-sm">
                {currentPlan}
              </span>
            </div>
          </div>

          {/* Credit Usage */}
          <div className="mt-4 border-t border-gray-600 pt-4">
            <span className="text-gray-300">Credit Usage</span>
            <div className="w-full bg-gray-600 h-2 rounded-full mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(usedCredits / totalCredits) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              {usedCredits}/{totalCredits} used (Resets in 24 days)
            </p>
          </div>
        </div>
      </div>
      {/* Plan Selection */}
      <div className="w-full max-w-6xl bg-gray-800 shadow-md rounded-lg p-6 mt-3">
        <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-4">
          <h2 className="text-lg font-semibold">Select a Plan</h2>
          <div className="mt-4 flex gap-4">
            <div
              className={`border rounded-lg p-4 w-1/2 cursor-pointer ${
                selectedPlan === "Basic" ? "border-blue-500" : "border-gray-600"
              }`}
              onClick={() => setSelectedPlan("Basic")}
            >
              <h3 className="text-xl font-semibold">Basic Plan</h3>
              <p className="text-sm text-gray-300 mt-2">
                Description: Access to basic features.
              </p>
              <p className="text-lg font-bold mt-2">$5/month</p>
            </div>
            <div
              className={`border rounded-lg p-4 w-1/2 cursor-pointer ${
                selectedPlan === "Standard"
                  ? "border-blue-500"
                  : "border-gray-600"
              }`}
              onClick={() => setSelectedPlan("Standard")}
            >
              <h3 className="text-xl font-semibold">Standard Plan</h3>
              <p className="text-sm text-gray-300 mt-2">
                Description: Access to all features.
              </p>
              <p className="text-lg font-bold mt-2">$10/month</p>
            </div>
          </div>
        </div>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={handleContinue}
          disabled={!selectedPlan}
        >
          Continue to {selectedPlan}
        </button>
      </div>
    </div>
  );
};

export default Billing;
