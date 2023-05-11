import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// --- Pages --- //
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

// --- Components --- //
import Header from "./components/Header";

// --- Images --- //
import spidermanLogo from "./assets/imgs/spiderman-logo.svg";
import noImageHero from "./assets/imgs/no-photo-hero.jpg";
import background from "./assets/imgs/venom-background.jpg";
// import gradientBackground from "./assets/imgs/gradient-background.png";

function App() {
  return (
    <Router>
      <Header
        background={background} /*gradientBackground={gradientBackground} */
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
          path="/favorites"
          element={
            <Favorites background={background} spidermanLogo={spidermanLogo} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
