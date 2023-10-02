import Heart from "react-heart";
import { Link } from "react-router-dom";
import { useState } from "react";
import noImageHero from "../assets/imgs/no-photo-hero.jpg";
import noImageHeroGreen from "../assets/imgs/no-photo-hero-green.png";
import axios from "axios";

export const CharacterCardItem = ({
  character,
  userId,
  characterHasThumbnailExtension,
}) => {
  const [isFavorite, setIsFavorite] = useState(character.isFavorite);

  const characterId = character._id;
  const image = characterHasThumbnailExtension
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : character.thumbnail.path;

  const handleHeartClick = async (characterId) => {
    try {
      if (isFavorite) {
        await axios.delete(
          "https://site--marvel-backend--6v4khcscf8qp.code.run/characters/favorite",
          {
            data: {
              characterId,
              userId,
            },
          }
        );
      } else {
        await axios.post(
          "https://site--marvel-backend--6v4khcscf8qp.code.run/characters/favorite",
          {
            characterId,
            userId,
            name: character.name,
            description: character.description,
            image,
          }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="characterContainer">
      <div className="heartContainer">
        <div>
          {userId && (
            <Heart
              isActive={isFavorite}
              onClick={() => handleHeartClick(characterId)}
            />
          )}
        </div>
      </div>
      <Link
        to={`/comics/${character.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="nameContainer">
          <h2>{character.name}</h2>
        </div>
        {!character?.thumbnail?.path ||
        character.thumbnail.path ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ||
        image.includes(
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
        ) ? (
          isFavorite ? (
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
              isFavorite
                ? "imgCharacterContainer-checked"
                : "imgCharacterContainer"
            }
          >
            <img src={image} alt={character.name} />
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
