import "./Comic.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comic/${id}`);
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
    <div className="carousel">
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <img
        className="comic-image"
        src={data.thumbnail.path + "/portrait_fantastic.jpg"}
        alt="comic-card"
      />
    </div>
  );
};

export default Comic;
