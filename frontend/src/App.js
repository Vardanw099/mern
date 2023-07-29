import React, { useEffect } from "react";
import axios from "axios";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // useEffect(() => {
  // axios.get("/users").then((res) => console.log(res.data));
  // axios
  //   .post("/users", {
  //     username: "Abul",
  //     password: "1002",
  //     firstname: "Abul",
  //     lastname: "Malxasyan",
  //     email: "ab.malxasyan@mail.ru",
  //     age: 28,
  //     todos: ["vkadj", "in kvencd", "alvknc"],
  //   })
  // .then((res) => alert(res.data.message));
  // }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
