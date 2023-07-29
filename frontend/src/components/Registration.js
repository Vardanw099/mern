import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setusername] = useState("");
  const [fistname, setfistname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [age, setage] = useState();
  const navigate = useNavigate()
  const registration = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
      firstname: fistname,
      lastname: lastname,
      email: email,
      age: age,
      todos: [],
    };
    axios.post("/users/registration", userInfo).then((res) => {
      if (res.data.message !== undefined) {
        alert(res.data.message);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <div className="regBody">
      <div className="registration-container">
        <div className="registration-header">
          <h2 className="registration-title">Register</h2>
        </div>
        <form className="registration-form" onSubmit={registration}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => setusername(e.target.value)}
              type="text"
              id="username"
              name="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              onChange={(e) => setage(e.target.value)}
              type="number"
              id="age"
              name="age"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              onChange={(e) => setfistname(e.target.value)}
              type="text"
              id="firstname"
              name="firstname"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              onChange={(e) => setlastname(e.target.value)}
              type="text"
              id="lastname"
              name="lastname"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="registration-button">
              Register
            </button>
          </div>
          <div className="forgot-password">
            <Link to="/">Already signed in?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
