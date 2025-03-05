import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Sidebar from "./pages/Sidebar";
import Topic from "./pages/Topic";
import Forgate from "./password/Forgate";

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="md:ml-64">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/forgate-password" element={<Forgate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
