import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ background, gradientBackground, setVisible, visible }) => {
  return (
    <header
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <img src={gradientBackground} alt="" />
      <div>
        <button
          className="signupButton"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          S'inscrire
        </button>
        <div className="buttonsContainer">
          <Link onClick={() => (window.location.href = "/")}>
            <button>Personages</button>
          </Link>
          <Link to="/comics">
            <button>Comics</button>
          </Link>
          <Link to="/favorites">
            <button>Favoris</button>
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
