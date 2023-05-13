import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ handleUserData, setVisibleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://site--marvel-backend--6v4khcscf8qp.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        handleUserData({
          token: response.data.token,
          userId: response.data._id,
        });
        console.log(response);
        console.log(response.data.id);
        setVisibleLogin(false);
      }
      // console.log(response.data);
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setErrorMessage("Mot de passe incorrect");
      }
      // console.log(error.message);
      // console.log(error.response.data);
    }
  };

  return (
    <div
      className="modal"
      onClick={() => {
        setVisibleLogin(false);
      }}
    >
      <form
        className="container"
        onSubmit={handleLogin}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div>
          <button
            onClick={() => {
              setVisibleLogin(false);
            }}
          >
            X
          </button>
        </div>
        <h2>Se connecter</h2>
        <input
          type="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Mot de passe"
        />
        <button className="buttonsLoginSignUp" type="submit">
          Se connecter
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
