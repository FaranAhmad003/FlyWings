import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = () => {
    setErrors({}); // Clear previous errors

    fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Signup successful!" && data.secretKey) {
          window.location.href = "/login";
        } else if (data.error) {
          if (data.errorFields) {
            const newErrors = {};
            data.errorFields.forEach((field) => {
              newErrors[field] = data.error;
            });
            setErrors(newErrors);
          } else {
            alert(data.error);
          }
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form className="signup-form">
      <h2>Sign Up</h2>

      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.firstName}</div>

      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.lastName}</div>

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.username}</div>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.email}</div>

      <label htmlFor="phoneNo">Phone Number:</label>
      <input
        type="tel"
        id="phoneNo"
        name="phoneNo"
        pattern="[0-9]{10}"
        placeholder="Enter 10-digit phone number"
        value={formData.phoneNo}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.phoneNo}</div>

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <div className="error-message">{errors.password}</div>

      <button type="button" onClick={submitForm}>
        Sign Up
      </button>

      <div className="login-link">
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </form>
  );
};

export default Signup;
// Commit update: Changes for commit
// Commit update: Changes for commit
