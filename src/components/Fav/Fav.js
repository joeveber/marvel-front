import "./Fav.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const Fav = ({ token, offerlist, idfav }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [idfavtodelete, setIdfavtodelete] = useState("");

  ///
  const deleteFav = async (event) => {
    try {
      event.preventDefault();
      console.log(idfavtodelete);
      const response = await axios.post(
        `https://marvel-back-joey.herokuapp.com/deletefav`,
        {
          token: token,
          idfavtodelete: idfavtodelete,
        }
      );
      setIdfavtodelete("0");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.log(error.response.status);
    }
  };
  ///

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `https://marvel-back-joey.herokuapp.com/allfavs`,
          {
            token: token,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [idfav, idfavtodelete]);

  return isLoading === true ? (
    <h1>En cours de chargement</h1>
  ) : (
    <div>
      <h2>Votre liste de favoris contient {data.favs.length} éléments</h2>
      <div className="favbox">
        {data.favs.map((favId) => {
          return (
            <div key={favId}>
              {offerlist.results.map((result) => {
                const imageFav =
                  result.thumbnail.path +
                  "/portrait_small." +
                  result.thumbnail.extension;
                return (
                  <div key={result._id}>
                    {favId === result._id && (
                      <div className="fav-carousel">
                        <img className="fav-image" src={imageFav} alt="fav" />
                        <div>
                          <button
                            className="minus pointer"
                            onMouseOver={() => {
                              setIdfavtodelete(result._id);
                            }}
                            onClick={(event) => {
                              deleteFav(event);
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
