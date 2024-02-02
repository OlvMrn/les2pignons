import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import connexion from "../services/connexion";
import { AuthContext } from "../contexts/authContext";

import "./SignForm.css";

// Sign up => register
// Sign in => log in

const userModel = {
  email: "",
  password: "",
};

function SignForm({ type }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(userModel);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setConnected } = useContext(AuthContext);

  const validatePassword = () => {
    return (
      confirmPassword === user.password &&
      user.password.length >= 6 &&
      /[A-Z]/.test(user.password) &&
      /[@$!%*?&]/.test(user.password) &&
      /\d/.test(user.password)
    );
  };

  const handleUser = (e) => {
    setUser((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateSignUp = async () => {
    try {
      if (confirmPassword === user.password) {
        await connexion.post("/register", user);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        throw new Error(
          "Les mots de passe ne correspondent pas ou l'email existe déja"
        );
      }
    } catch (error) {
      setUser(userModel);
      setConfirmPassword("");
      setErrorMessage(
        "Les mots de passe ne correspondent pas ou l'email existe déja"
      );
    }
  };

  const validateSignIn = async () => {
    try {
      const valid = await connexion.post("/login", user);
      setConnected(valid.data);
      sessionStorage.setItem("connected", true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setUser(userModel);
      setErrorMessage("Mot de passe ou e-mail incorrect");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "signup") {
      validateSignUp();
    }
    if (type === "signin") {
      validateSignIn();
    }
  };

  return (
    <form className={`signform  ${type}`} onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        required
        placeholder="Adresse email"
        value={user.email}
        onChange={handleUser}
      />
      <input
        type="password"
        name="password"
        required
        placeholder="Mot de passe"
        value={user.password}
        onChange={handleUser}
      />
      {type === "signup" && (
        <input
          type="password"
          required
          placeholder="Confirmer mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      {type === "signup" && (
        <>
          {errorMessage && (
            <p className="validate-password" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          <p
            className="validate-password"
            style={{ color: validatePassword() ? "green" : "grey" }}
          >
            Le mot de passe doit comporter au moins 6 caractères, une majuscule,
            un caractère spécial, et un chiffre.
          </p>
        </>
      )}

      <button type="submit">
        {type === "signup" ? "S'inscrire" : "Se connecter"}
      </button>
    </form>
  );
}

SignForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SignForm;
