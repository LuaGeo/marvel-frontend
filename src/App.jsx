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
import { Characters } from "./pages/Characters";
import { Comics } from "./pages/Comics";
import { ComicCharacter } from "./pages/ComicCharacter";
import { Favorites } from "./pages/Favorites";

// --- Components --- //
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

// --- Images --- //
import spidermanLogo from "./assets/imgs/spiderman-logo.svg";
import background from "./assets/imgs/venom-background.jpg";
// import gradientBackground from "./assets/imgs/gradient.png";

function App() {
  const { characterId } = useParams();
  // console.log(characterId);

  const [token, setToken] = useState(Cookies.get("marvel-token") || null);
  const [userId, setUserId] = useState(Cookies.get("marvel-user-id") || null);

  const [visible, setVisible] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

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
        /*gradientBackground={gradientBackground}*/
        handleUserData={handleUserData}
        token={token}
        setVisible={setVisible}
        visible={visible}
        setVisibleLogin={setVisibleLogin}
        visibleLogin={visibleLogin}
        userId={userId}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters spidermanLogo={spidermanLogo} background={background} />
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
        <Route
          path="/characters/favorite/:userId"
          element={
            <Favorites
              background={background}
              spidermanLogo={spidermanLogo}
              userId={userId}
            />
          }
        />
      </Routes>
      {visible && (
        <SignUp handleUserData={handleUserData} setVisible={setVisible} />
      )}
      {visibleLogin && (
        <Login
          handleUserData={handleUserData}
          setVisibleLogin={setVisibleLogin}
        />
      )}
    </Router>
  );
}

export default App;
