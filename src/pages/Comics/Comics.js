import "./Comics.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Dodecahedron } from "@react-three/drei";

// component
import Fav from "../../components/Fav/Fav.js";

const Comics = ({ token }) => {
  const [offerlist, setOfferlist] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [idfav, setIdfav] = useState("");

  const [cart, setCart] = useState([]);
  const newCart = [...cart];
  const navigate = useNavigate();

  const handleFav = async (event) => {
    try {
      event.preventDefault();

      const response = await axios.post(`http://localhost:4000/fav`, {
        token: token,
        idfav: idfav,
      });
      console.log(response.data);
      console.log(token);
      console.log(idfav);

      console.log("Fav ajouté à la BDD");

      alert("Fav ajouté à la BDD");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.status);
    }
  };

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
            <div className="card">
              <p>{result._id}</p>
              <p>{result.title}</p>
              <img
                className="comic-image"
                src={imageCarousel}
                alt="comic-card"
              />
              <Link to={`/comic/${result._id}`} key={result._id}>
                <button>Consulte la fiche de ce comic</button>
              </Link>
              <button
                onClick={function (event) {
                  setIdfav(result._id);
                  handleFav(event);
                }}
              >
                Ajouter à ta liste de favoris
              </button>
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
              <Fav token={token} offerlist={offerlist} />
            </div>
            <div className="cart">
              {cart.map((favId) => {
                return (
                  <div>
                    {offerlist.results.map((result) => {
                      const imageFav =
                        result.thumbnail.path +
                        "/portrait_small." +
                        result.thumbnail.extension;
                      return (
                        <div>
                          {favId === result._id && (
                            <div className="fav-carousel">
                              <img
                                className="fav-image"
                                src={imageFav}
                                alt="fav"
                              />
                              <div>
                                <button
                                  className="minus pointer"
                                  onClick={() => {
                                    ///// to complete
                                  }}
                                >
                                  <p>-</p>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comics;
