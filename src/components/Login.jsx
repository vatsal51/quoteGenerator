import React, { useState } from "react";
import LoginBg from "../assets/loginbg.svg";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login validation
    if (username === "baya" && password === "password") {
      onLogin({ name: username });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-card w100p">
      <div className="rel inner-wrapy quote-wrapy clearfix glass container">
        <img alt="bg" src={LoginBg} className="loginbg" />
        <form onSubmit={handleSubmit} className="login-form glass">
          <h2 className="login-text">Please log in to continue</h2>
          <input
            className="form-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="form-submit" type="submit" title="login">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
