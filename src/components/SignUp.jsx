import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ handleUserData, setVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let infos = { email, username, password };
    try {
      const response = await axios.post(
        "https://site--marvel-backend--6v4khcscf8qp.code.run/user/signup",
        infos
      );
      if (response.data) {
        console.log(response.data.token);
        console.log(response.data.id);
        console.log(response);
        handleUserData({
          token: response.data.token,
          userId: response.data.id,
        });
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage(
          "Cet e-mail est déjà utilisé, veuillez en choisir un autre ^^"
        );
      } else if (error.response.data.error.message === "Missing Parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
    }
  };

  return (
    <div
      className="modal-signUp"
      onClick={() => {
        setVisible(false);
      }}
    >
      <form
        className="container"
        onSubmit={handleSubmit}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div>
          <button
            onClick={() => {
              setVisible(false);
            }}
          >
            X
          </button>
        </div>
        <h2>S'inscrire</h2>

        <input
          onChange={(event) => setUsername(event.target.value)}
          type="text"
          value={username}
          placeholder="Nom d'utilisateur"
        />
        <input
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          value={email}
          placeholder="Email"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
          placeholder="Mot de passe"
        />
        <button className="buttonsLoginSignUp" type="submit">
          S'inscrire
        </button>
        {errorMessage && (
          <p className="container" style={{ color: "red", width: "100" }}>
            {errorMessage}
          </p>
        )}
        <Link to="/login" className="container">
          Tu as déjà un compte ? Connecte-toi !
        </Link>
      </form>
    </div>
  );
};
export default Signup;
