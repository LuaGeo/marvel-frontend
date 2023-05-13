import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// --- Pages --- //
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicCharacter from "./pages/ComicCharacter";

// --- Components --- //
import Header from "./components/Header";
import SignUp from "./components/SignUp";

// --- Images --- //
import spidermanLogo from "./assets/imgs/spiderman-logo.svg";
import noImageHero from "./assets/imgs/no-photo-hero.jpg";
import background from "./assets/imgs/venom-background.jpg";
import gradientBackground from "./assets/imgs/gradient.png";

function App() {
  const { characterId } = useParams();
  // console.log(characterId);

  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  const [userId, setUserId] = useState(Cookies.get("marvel-user-id") || null);

  const [visible, setVisible] = useState(false);

  const handleUserData = (userData) => {
    if (userData && userData.token && userData.userId) {
      const { token, userId } = userData;
      setToken(token);
      setUserId(userId);
      Cookies.set("marvel-token", token, { expires: 7 });
      Cookies.set("marvel-user-id", userId, { expires: 7 });
    } else {
      setToken(null);
      setUserId(null);
      Cookies.remove("marvel-token");
      Cookies.remove("marvel-user-id");
    }
  };
  return (
    <Router>
      <Header
        background={background}
        gradientBackground={gradientBackground}
        handleUserData={handleUserData}
        token={token}
        setVisible={setVisible}
        visible={visible}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              spidermanLogo={spidermanLogo}
              noImageHero={noImageHero}
              background={background}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics background={background} spidermanLogo={spidermanLogo} />
          }
        />
        <Route
          path="/comics/:characterId"
          element={
            <ComicCharacter
              background={background}
              spidermanLogo={spidermanLogo}
            />
          }
        />
      </Routes>
      {visible && (
        <SignUp handleUserData={handleUserData} setVisible={setVisible} />
      )}
    </Router>
  );
}

export default App;
