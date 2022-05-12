import "./Characters.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/characters`);
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <div className="carousel">
      <h1>Choissisez vos characters préférés</h1>

      {data.results.map((result) => {
        const imagePath = result.thumbnail.path + "/portrait_fantastic.jpg";
        return (
          <Link to={`/character/${result._id}`} key={result._id}>
            <div className="card">
              <p>{result._id}</p>
              <p>{result.title}</p>
              <img
                className="character-image"
                src={imagePath}
                alt="character-card"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Characters;
