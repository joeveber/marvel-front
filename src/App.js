import "./App.scss";
// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Cookies from "js-cookie";

// pages
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Comic from "./pages/Comic/Comic";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

//components
import Header from "./components/Header/Header.js";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
