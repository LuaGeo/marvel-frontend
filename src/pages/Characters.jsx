import { useEffect, useState } from "react";
import axios from "axios";
// import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const Characters = ({ spidermanLogo, noImageHero, background }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 100;
        const skip = (currentPage - 1) * limit;
        const response = await axios.get(
          `http://localhost:3000/characters?name=${search}&skip=${skip}&limit=${limit}`
        );
        setData(response.data.results);
        setIsLoading(false);
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
      <input type="text" onChange={handleSearch} />
      <div className="container">
        {data.map((character) => {
          return (
            <Link
              to={`/comics/${character._id}`}
              key={character._id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <article>
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
                  {character.description && (
                    <p>{character.description.replace("/&#39;/", "'")} </p>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>
      <div>
        <button onClick={handlePreviousPage}>⏪</button>
        <p>{currentPage}</p>
        <button onClick={handleNextPage}>⏩</button>
      </div>
    </main>
  );
};
export default Characters;
