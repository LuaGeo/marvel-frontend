import { Link } from "react-router-dom";

const Header = ({ background, gradientBackground }) => {
  return (
    <header
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="buttonsContainer">
        <Link to="/">
          <button>Personages</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to="/favorites">
          <button>Favoris</button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
