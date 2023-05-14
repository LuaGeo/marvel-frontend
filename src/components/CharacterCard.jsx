import Heart from "react-heart";
import { Link } from "react-router-dom";
import { useState } from "react";
import noImageHero from "../assets/imgs/no-photo-hero.jpg";
import noImageHeroGreen from "../assets/imgs/no-photo-hero-green.png";

const CharacterCard = ({ data }) => {
  return (
    <div className="container">
      {data.map((character) => (
        <CharacterCardItem key={character._id} character={character} />
      ))}
    </div>
  );
};

const CharacterCardItem = ({ character }) => {
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleHeartClick = () => {
    setActive(!active);
    setChecked(!checked);
  };

  return (
    <article>
      <div className="heartContainer">
        <div>
          <Heart isActive={active} onClick={handleHeartClick} />
        </div>
      </div>
      <Link
        to={`/comics/${character._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="nameContainer">
          <h2>{character.name}</h2>
        </div>
        {character.thumbnail.path ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ? (
          checked ? (
            <div className="imgCharacterContainer">
              <img src={noImageHeroGreen} alt="" style={{ filter: "none" }} />
            </div>
          ) : (
            <div className="imgCharacterContainer">
              <img src={noImageHero} alt="" />
            </div>
          )
        ) : (
          <div
            className={
              checked
                ? "imgCharacterContainer-checked"
                : "imgCharacterContainer"
            }
          >
            <img
              src={
                character.thumbnail.path + "." + character.thumbnail.extension
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
      </Link>
    </article>
  );
};

export default CharacterCard;
