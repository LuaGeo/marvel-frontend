import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

export const ComicCharacter = ({ background, spidermanLogo }) => {
  const characterId = useParams();
  console.log(characterId.characterId);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hash = import.meta.env.VITE_SOME_HASH;
        const apikey = import.meta.env.VITE_SOME_KEY;
        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${characterId.characterId}/comics?limit=20&ts=1&apikey=${apikey}&hash=${hash}`
        );
        setData(response.data.data.results);
        console.log(response.data.data.results);
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
        {data.map((comic) => {
          return (
            <article key={characterId}>
              <div className="nameContainer">
                <h2>{comic.title}</h2>
              </div>
              <div className="imgCharacterContainer">
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt={comic.title}
                />
              </div>

              <div className="descriptionContainer">
                <p>{comic.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
