import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = ({
  background,
  gradientBackground,
  setVisible,
  visible,
  setVisibleLogin,
  visibleLogin,
  handleUserData,
  token,
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
      <img src={gradientBackground} alt="" />
      <div className="allButtons">
        <div className="connectionButtons">
          {token ? (
            <button
              onClick={() => {
                handleUserData(null, null);
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          ) : (
            <div className="buttonsConnection">
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
