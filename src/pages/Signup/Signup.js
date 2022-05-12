import "./Signup.scss";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post("http://localhost:4000/signup", {
        email: email,
        username: username,
        password: password,
      });
      console.log(response.data);

      if (response.data.token) {
        console.log("User logged in");
        setUser(response.data.token);
        alert("Vous êtes inscrit et connecté");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.status);
    }
  };

  return (
    <div>
      <p>Inscrivez-vous</p>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input type="submit" value="S'inscrire"></input>
      </form>
      <Link to="/login">
        <button>Déjà inscrit? Connectez-vous!</button>
      </Link>
    </div>
  );
};

export default Signup;
