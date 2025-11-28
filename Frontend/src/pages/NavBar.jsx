import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"


function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token"); // check if user logged in

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="nav-logo">MyApp</div>

      <div className="nav-links">
        <Link to="/home_page">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
