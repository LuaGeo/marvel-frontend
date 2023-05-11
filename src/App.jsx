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

function App() {
  return (
    <Router>
      <Header background={background} />
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
          element={<Favorites background={background} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
