import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const Comics = ({ background, spidermanLogo }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://site--marvel-backend--6v4khcscf8qp.code.run/comics"
        );
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
        {data.map((comic) => {
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
    </main>
  );
};

export default Comics;
