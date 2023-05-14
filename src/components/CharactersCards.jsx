import { CharacterCardItem } from "./CharacterCardItem";

export const CharactersCards = ({ data }) => {
  return (
    <div className="container">
      {data.map((character) => (
        <CharacterCardItem key={character._id} character={character} />
      ))}
    </div>
  );
};
