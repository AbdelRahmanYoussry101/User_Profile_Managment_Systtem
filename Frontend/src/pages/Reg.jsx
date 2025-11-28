import React, { useState } from "react";
import "./Reg.css"
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Reg() {
    const nameState = useState("");
    const emailState = useState("");
    const passwordState = useState("");
    const messageState = useState("");

    const name = nameState[0];
    const setName = nameState[1];

    const email = emailState[0];
    const setEmail = emailState[1];

    const password = passwordState[0];
    const setPassword = passwordState[1];

    const message = messageState[0];
    const setMessage = messageState[1];

    async function handleSubmit(e) {
    e.preventDefault(); // Stop the page from refreshing when the form submits

    const response = await fetch(`${backendUrl}/add-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name:name,email: email, password: password }),
    });

    const data = await response.text();
    setMessage(data); // Update message with server reply
  }

   return (
    <div className="register-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
          required
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={function (e) {
            setEmail(e.target.value);
          }}
          required
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={function (e) {
            setPassword(e.target.value);
          }}
          required
        />
        <br />
        <br />

        <button type="submit">Register</button>

        
      </form>

      {message && <p>{message}</p>}
        <Link to="/login">
              <button type="button">Go to Login page</button>
        </Link>    
    </div>
  );

    

}