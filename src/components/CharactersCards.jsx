import { CharacterCardItem } from "./CharacterCardItem";

export const CharactersCards = ({
  data,
  userId,
  characterHasThumbnailExtension,
}) => {
  return (
    <div className="container">
      {data.map((character) => (
        <CharacterCardItem
          key={character._id}
          character={character}
          userId={userId}
          characterHasThumbnailExtension={characterHasThumbnailExtension}
        />
      ))}
    </div>
  );
};
