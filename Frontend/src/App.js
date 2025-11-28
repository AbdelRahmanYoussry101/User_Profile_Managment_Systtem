import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./pages/NavBar"

export default function App() {
  return (
    <>
      {/* ✅ Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home_page" element={<Home />} />
      </Routes>
    </>
  );
}
