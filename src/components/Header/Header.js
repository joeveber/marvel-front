import "./Header.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ setUser, token }) => {
  const [input, setInput] = useState("");

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/characters">Characters</Link>
      </nav>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Your Search"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
      </div>
      <div>
        {token === null ? (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
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
