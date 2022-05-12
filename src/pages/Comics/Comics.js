import "./Comics.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Dodecahedron } from "@react-three/drei";

const Comics = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const newCart = [...cart];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comics`);
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
    <div className="container">
      <h1>Choissisez vos comics préférés</h1>
      <div className="carousel">
        {data.results.map((result) => {
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
                onClick={() => {
                  if (token === null) {
                    alert("Connectez-vous pour créer une liste de favoris");
                    navigate("/login");
                  } else {
                    if (cart.indexOf(result._id) === -1) {
                      newCart.push(result._id);
                      setCart(newCart);
                    } else {
                      alert("Ce comic fait déjà parti de vos favoris");
                    }
                  }
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
            <h2>Votre liste de favoris contient {cart.length} élements</h2>
            <div className="cart">
              {cart.map((favId) => {
                return (
                  <div>
                    {data.results.map((result) => {
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
