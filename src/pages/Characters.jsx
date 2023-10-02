import { useEffect, useState } from "react";
import axios from "axios";
// import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";
import { CharactersCards } from "../components/CharactersCards";
import Header from "../components/Header";

export const Characters = ({ spidermanLogo, background, userId }) => {
  const [data, setData] = useState();
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
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
          `https://gateway.marvel.com/v1/public/characters?limit=${limit}&ts=1&apikey=${apikey}&hash=${hash}&offset=${offset}&orderBy=name${
            search && `&nameStartsWith=${search}`
          }` //&nameStartsWith=${search}
        );
        setData(response.data.data.results);

        if (userId) {
          const favoriteCharactersResponse = await axios.get(
            `https://site--marvel-backend--6v4khcscf8qp.code.run/characters/favorite/${userId}`
          );
          setFavoriteCharacters(favoriteCharactersResponse.data);
        }
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
      <div className="searchBar container">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Cherchez vos personnages favoris..."
        />
      </div>
      <CharactersCards
        data={data.map((dataItem) => ({
          ...dataItem,
          isFavorite: Boolean(
            favoriteCharacters.find(
              (favoriteCharacter) =>
                favoriteCharacter.characterId === dataItem._id
            )
          ),
        }))}
        userId={userId}
        characterHasThumbnailExtension={true}
      />
      <div className="pagination">
        <button onClick={handlePreviousPage}>⏪</button>
        <p>{currentPage}</p>
        <button onClick={handleNextPage}>⏩</button>
      </div>
    </main>
  );
};
