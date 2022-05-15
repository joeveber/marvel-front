import "./Comics.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// component
import Fav from "../../components/Fav/Fav.js";

const Comics = ({ token }) => {
  const [offerlist, setOfferlist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [idfav, setIdfav] = useState("00000");

  /// --- Adding a favorite
  const handleFav = async (event) => {
    try {
      event.preventDefault();
      console.log(idfav);
      const response = await axios.post(`http://localhost:4000/fav`, {
        token: token,
        idfav: idfav,
      });
      if (response.data !== "working") {
        alert(response.data);
      }

      setIdfav("0");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.status);
    }
  };

  /// --- Getting all fav
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comics`);
        setOfferlist(response.data);
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
    <div className="container">
      <h1>Choissisez vos comics préférés</h1>
      <div className="carousel">
        {offerlist.results.map((result) => {
          const imageCarousel =
            result.thumbnail.path +
            "/portrait_fantastic." +
            result.thumbnail.extension;

          return (
            <div className="card" key={result._id}>
              <p className="card-title">{result.title}</p>
              <Link to={`/comic/${result._id}`} key={result._id}>
                <img
                  className="comic-image"
                  src={imageCarousel}
                  alt="comic-card"
                />
              </Link>
              <button
                className="add-button pointer"
                onMouseOver={() => {
                  setIdfav(result._id);
                }}
                onClick={(event) => {
                  handleFav(event);
                }}
              >
                +
              </button>
              <Link to={`/comic/${result._id}`} key={result._id}>
                <button className="detailed-button pointer">
                  Consulter la fiche détaillée
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="container">
        {token === null ? (
          <div>
            <h2>
              Si vous voulez créer une liste de favoris,{" "}
              <Link className="link" to="/login">
                connectez-vous d'abord
              </Link>
              {"."}
            </h2>
          </div>
        ) : (
          <div>
            <div>
              <Fav token={token} offerlist={offerlist} idfav={idfav} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comics;
