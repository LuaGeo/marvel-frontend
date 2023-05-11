import { useEffect, useState } from "react";
import axios from "axios";
// import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";

const Characters = ({ spidermanLogo, noImageHero, background }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/characters");
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading spidermanLogo={spidermanLogo} background={background} />
  ) : (
    <main
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        {data.map((character) => {
          return (
            <article key={character._id}>
              <div className="nameContainer">
                <h2>{character.name}</h2>
              </div>
              {character.thumbnail.path ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
                <div className="imgCharacterContainer">
                  <img src={noImageHero} alt="" />
                </div>
              ) : (
                <div className="imgCharacterContainer">
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt="{character.name}"
                  />
                </div>
              )}

              <div className="descriptionContainer">
                <p>{character.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
export default Characters;
