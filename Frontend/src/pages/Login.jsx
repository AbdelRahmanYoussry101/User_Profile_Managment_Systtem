import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const emailState = useState("");
  const passwordState = useState("");
  const errorState = useState("");

  const email = emailState[0];
  const setEmail = emailState[1];

  const password = passwordState[0];
  const setPassword = passwordState[1];



  const errorMessage = errorState[0];
  const setErrorMessage = errorState[1];

async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.message || "Failed to login, please check email or password");
      return;
    }

    
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("userName", data.user.name);

    console.log("Logged in successfully:", data.user);

    // ✅ Redirect to profile
    navigate("/profile");

  } catch (error) {
    console.error(error);
    setErrorMessage("Error connecting to server");
  }
}

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function (e) { setEmail(e.target.value); }}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function (e) { setPassword(e.target.value); }}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <p>Don’t have an account?</p>
      <Link to="/register">
        <button type="button">Go to Register</button>
      </Link>
    </div>
  );
}
