import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    const logInfo = {
      username: username,
      password: password,
    };
    axios.post("/users/login", logInfo).then((res) => {
      if (res.data.message) {
        console.log(res.data.message);
      } else {
        navigate("/content",{state: {someData: res.data}});
      }
    });
  };
  return (
    <div className="loginBody">
      <div className="login-container">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form className="login-form" onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              onChange={(e) => setusername(e.target.value)}
              id="username"
              name="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              name="password"
              required
            />
          </div>
          <div className="form-group">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
          <div className="forgot-password">
            <Link to="/registration">Don't have account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
