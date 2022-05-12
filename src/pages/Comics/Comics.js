import "./Comics.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=6heC5JHaDWef65UA`
        );
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
      <h1>Choissisez vos comics préférés</h1>

      {data.results.map((result) => {
        const imagePath = result.thumbnail.path + "/portrait_fantastic.jpg";
        return (
          <Link to={`/comic/${result._id}`} key={result._id}>
            <div className="card">
              <p>{result._id}</p>
              <p>{result.title}</p>
              <img className="comic-image" src={imagePath} alt="comic-card" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Comics;
