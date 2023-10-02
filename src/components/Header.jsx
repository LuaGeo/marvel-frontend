import { Link, useNavigate } from "react-router-dom";
import transparentBg from "../assets/imgs/newTransparenceBG.png";

const Header = ({
  background,
  setVisible,
  visible,
  setVisibleLogin,
  visibleLogin,
  handleUserData,
  token,
  userId,
  characters,
  comics,
}) => {
  const navigate = useNavigate();
  return (
    <header
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* <img src={gradientBackground} alt="" /> */}
      <img
        src={transparentBg}
        alt="transparent backgroung behind the buttons"
      />
      <div className="allButtons">
        <div className="connectionButtons">
          {token ? (
            <button
              onClick={() => {
                handleUserData(null, null);
                navigate(0);
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div className="connectionButtons">
              <button
                className="signupButton"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                S'inscrire
              </button>

              <button
                className="loginButton"
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                }}
              >
                Se connecter
              </button>
            </div>
          )}
        </div>

        <div className="buttonsContainer">
          <Link onClick={() => (window.location.href = "/")}>
            <button
              className={
                characters === "characters"
                  ? "selectedButton"
                  : "unselectedButton"
              }
            >
              Personages
            </button>
          </Link>
          <Link onClick={() => (window.location.href = "/comics")}>
            <button
              className={
                comics === "comics" ? "selectedButton" : "unselectedButton"
              }
            >
              Comics
            </button>
          </Link>
          {userId && (
            <Link to={`/characters/favorite/${userId}`}>
              <button
                className={
                  URLSearchParams.has("comics")
                    ? "selectedButton"
                    : "unselectedButton"
                }
              >
                Favoris
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
