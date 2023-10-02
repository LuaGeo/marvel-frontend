import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

export const ComicCharacter = ({ background, spidermanLogo }) => {
  const characterId = useParams();
  console.log(characterId.characterId);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hash = import.meta.env.VITE_SOME_HASH;
        const apikey = import.meta.env.VITE_SOME_KEY;
        const limit = 20;
        const offset = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/characters/${characterId.characterId}/comics?limit=20&ts=1&orderBy=onsaleDate&apikey=${apikey}&hash=${hash}&offset=${offset}`
        );
        setData(response.data.data.results);
        console.log(response.data.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

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
            <article key={characterId} className="comicContainer">
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt={comic.title}
              />

              <div className="nameContainer">
                <h2>{comic.title}</h2>
              </div>
            </article>
          );
        })}
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage}>⏪</button>
        <p>{currentPage}</p>
        <button onClick={handleNextPage}>⏩</button>
      </div>
    </main>
  );
};
