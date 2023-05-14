import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import axios from "axios";
import { CharactersCards } from "../components/CharactersCards";

export const Favorites = ({ background, spidermanLogo, userId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--6v4khcscf8qp.code.run/characters/favorite/${userId}`
        );
        setData(response.data);
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
      <CharactersCards
        data={data.map((dataItem) => {
          return {
            ...dataItem,
            thumbnail: {
              path: dataItem.image,
            },
            isFavorite: true,
            _id: dataItem.characterId,
          };
        })}
        userId={userId}
        characterHasThumbnailExtension={false}
      />
    </main>
  );
};
