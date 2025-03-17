import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      Cookies.set("token", token);
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
