import React, { useState } from "react";
import connexion from "../services/connexion";

import "./SignForm.css";

function SignForm({ type }) {
  const userModel = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(userModel);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUser = (e) => {
    setUser((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateSignUp = async () => {
    if (user.password === confirmPassword) {
      try {
        await connexion.post("/users", user);
      } catch (error) {
        console.info(error);
      }
    } /* else {
      console.log("Les mots de passe ne correspondent pas");
    } */
  };

  const validateSignIn = () => {
    /* console.log("signin"); */
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
          onChange={handleConfirmPasswordChange}
        />
      )}
      <button type="submit">
        {type === "signup" ? "S'inscrire" : "Se connecter"}
      </button>
    </form>
  );
}

export default SignForm;
