import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(`http://localhost:4000/login`, {
        email: email,
        password: password,
      });
      console.log(response.data);

      if (response.data.token) {
        console.log("User logged in");
        setUser(response.data.token);
        alert("Vous êtes connecté");
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div>
      <p>Connectez-vous</p>
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input type="submit" value="Se connecter"></input>
      </form>
      <Link to="/signup">
        <button>Pas encore de compte? Inscrivez-vous!</button>
      </Link>
    </div>
  );
};

export default Login;
