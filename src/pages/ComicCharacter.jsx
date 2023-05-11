import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";

const ComicCharacter = ({ background, spidermanLogo }) => {
  const id = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000//comics/${id}`);
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
      <div className="container">
        {data.comics.map((comic) => {
          return (
            <article key={comic._id}>
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
export default ComicCharacter;
