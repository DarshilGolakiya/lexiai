import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams for extracting token

const ResetPassword = () => {
    const { token } = useParams(); // Extract token from URL
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing token.");
        }
    }, [token]);

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(
                `http://192.168.29.3:8000/reset-password/?token=${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ 'new_password': newPassword ,
                                            'token':token
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Password reset successful! Please log in.");
                setError("");
            } else {
                setError(data.message || "Error resetting password.");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Reset Password</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md  text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-md  text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
