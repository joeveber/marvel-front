import "./Header.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ setUser, token }) => {
  const [input, setInput] = useState("");

  return (
    <div className="header">
      <nav>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/comics">
          <p>Comics</p>
        </Link>
        <Link to="/characters">
          <p>Characters</p>
        </Link>
      </nav>
      <div className="searchbar">
        <span>Recherche </span>
        <input
          type="text"
          placeholder="Pas assez de temps..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div>
        {token === null ? (
          <div className="login">
            <Link to="/login">
              <p>Connexion</p>
            </Link>
            <Link to="/signup">
              <p>Inscription</p>
            </Link>
          </div>
        ) : (
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
