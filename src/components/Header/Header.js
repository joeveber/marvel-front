import "./Header.scss";
import { Link } from "react-router-dom";

const Home = ({ setUser, token }) => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/characters">Characters</Link>
      </nav>
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
