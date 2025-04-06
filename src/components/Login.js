import React, { useState } from "react";
import "../styles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = () => {
    const formData = { username, password };

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.userType === "admin") {
            window.location.href = "/admin";
          } else if (data.userType === "client") {
            window.location.href = `/client?userId=${data.userId}`;
          }
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={submitForm}>
          Log In
        </button>

        <div className="signup-link">
          <a href="/signup">Don't have an account? Sign up here</a>
        </div>
        <div className="forgot-password-link">
          <a href="/forgotPassword">Forgot Password?</a>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
