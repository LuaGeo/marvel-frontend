import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Header = ({
  background,
  gradientBackground,
  setVisible,
  visible,
  setVisibleLogin,
  visibleLogin,
  handleUserData,
  token,
  userId,
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
            <button>Personages</button>
          </Link>
          <Link onClick={() => (window.location.href = "/comics")}>
            <button>Comics</button>
          </Link>
          {userId && (
            <Link to={`/characters/favorite/${userId}`}>
              <button>Favoris</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
