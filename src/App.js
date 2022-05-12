import "./App.scss";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// pages
import Home from "./pages/Home/Home";
import Comics from "./pages/Comics/Comics";
import Comic from "./pages/Comic/Comic";
import Characters from "./pages/Characters/Characters";
import Character from "./pages/Character/Character";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// components
import Header from "./components/Header/Header.js";

const App = () => {
  // cookie
  const [token, setToken] = useState(Cookies.get("marvelousCookie") || null);

  const setUser = (token) => {
    if (token !== null) {
      console.log("Création d'un cookie");
      Cookies.set("marvelousCookie", token, { expires: 15 });
    } else {
      console.log("Suppression du cookie");
      Cookies.remove("marvelousCookie");
    }
    setToken(token);
    console.log(`Mise à jour du state Token avec ${token}`);
  };

  return (
    <Router>
      <Header setUser={setUser} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comics" element={<Comics token={token} />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:id" element={<Character />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} token={token} />}
        />
        <Route
          path="/signup"
          element={<Signup setUser={setUser} token={token} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
