import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/authContext";

import "./Navbar.css";

import logo from "../public/logo.png";

function Navbar() {
  const { connected } = useAuthContext();

  return (
    <div className="navbar-body">
      <div className="navbar-left">
        <Link className="navbar-logo" to="/">
          <img src={logo} alt="Les 2 pignons" />
        </Link>
      </div>
      <div className="navbar-right">
        <Link className="navbar-link" to="/articles">
          <h2>Articles</h2>
        </Link>
        {connected.roleId === 2 && (
          <Link className="navbar-link" to="/admin">
            <h2>Page d'administration</h2>
          </Link>
        )}
        <Link className="navbar-link" to="/login">
          <h2>Se connecter</h2>
        </Link>
        <Link className="navbar-link" to="/register">
          <h2>S'inscrire</h2>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
