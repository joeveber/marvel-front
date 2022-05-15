import "./Character.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-joey.herokuapp.com/character/${id}`
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
  }, [id]);

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <div className="container">
      <div className="card">
        <h1>{data.name}</h1>
        <img
          className="character-image"
          src={data.thumbnail.path + "/portrait_fantastic.jpg"}
          alt="character-card"
        />
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Character;
