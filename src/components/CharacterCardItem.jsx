import Heart from "react-heart";
import { Link } from "react-router-dom";
import { useState } from "react";
import noImageHero from "../assets/imgs/no-photo-hero.jpg";
import noImageHeroGreen from "../assets/imgs/no-photo-hero-green.png";

export const CharacterCardItem = ({ character }) => {
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);

  const [checkedCards, setCheckedCards] = useState([]);
  const cardId = character._id;

  const handleHeartClick = (cardId) => {
    setActive(!active);
    setChecked(!checked);

    const updatedCheckedCards = [...checkedCards];

    const cardIndex = updatedCheckedCards.findIndex(
      (card) => card.id === cardId
    );

    if (cardIndex >= 0 && !checked) {
      // card already exists, remove it
      updatedCheckedCards.splice(cardIndex, 1);
    } else {
      // card doesn't exist, add it
      updatedCheckedCards.push({
        id: cardId,
        name: character.name,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        description: character.description,
      });
    }

    setCheckedCards(updatedCheckedCards);
  };
  console.log(checkedCards);

  return (
    <article>
      <div className="heartContainer">
        <div>
          <Heart isActive={active} onClick={() => handleHeartClick(cardId)} />
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
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
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
