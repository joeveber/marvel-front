import "./Header.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/comics">Comics</Link>
        <Link to="/characters">Characters</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </div>
  );
};

export default Home;
