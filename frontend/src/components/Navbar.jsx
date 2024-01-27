import { Link } from "react-router-dom";

import "./Navbar.css";

import logo from "../public/logo.png";

function Navbar() {
  return (
    <div className="navbar-body">
      <Link className="navbar-logo" to="/">
        <img src={logo} alt="Les 2 pignons" />
      </Link>
      <Link className="navbar-link" to="/articles">
        <h2>Articles</h2>
      </Link>
      <Link className="navbar-link" to="/admin">
        <h2>Page d'administration</h2>
      </Link>
      <Link className="navbar-link" to="/connexion">
        <h2>Formulaire de connexion</h2>
      </Link>
    </div>
  );
}

export default Navbar;
