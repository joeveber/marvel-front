import "./Fav.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Fav = ({ token, offerlist }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:4000/allfavs`, {
          token: token,
        });
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
    <div>
      <h2>Votre liste de favoris contient {data.favs.length} éléments</h2>
      <div className="favbox">
        {data.favs.map((favId) => {
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
                        <img className="fav-image" src={imageFav} alt="fav" />
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
  );
};

export default Fav;
