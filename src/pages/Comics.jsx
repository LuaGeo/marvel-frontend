import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

export const Comics = ({ background, spidermanLogo }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hash = import.meta.env.VITE_SOME_HASH;
        const apikey = import.meta.env.VITE_SOME_KEY;
        const limit = 20;
        const offset = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://gateway.marvel.com:443/v1/public/comics?limit=${limit}&ts=1&apikey=${apikey}&hash=${hash}&offset=${offset}
          `
        );
        setData(response.data.data.results);
        setIsLoading(false);
        console.log(apikey);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, currentPage]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
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
      <div className="searchBar container">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Cherchez vos personnages favoris..."
        />
      </div>
      <div className="container">
        {data
          .sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { numeric: true })
          )
          .map((comic) => {
            return (
              <article key={comic._id}>
                <div className="nameContainer">
                  <h2>{comic.title}</h2>
                </div>
                <div className="imgCharacterContainer">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt={`${comic.title}`}
                  />
                </div>

                <div className="descriptionContainer">
                  {comic.description && (
                    <p>{comic.description.replace(/&#39;/g, "'")} </p>
                  )}
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
