import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminHomePage.css";

function AdminHomePage() {
  return (
    <div className="admin-home-page">
      <div className="admin-home-page-navbar">
        <h2 className="admin-page-title">ADMINISTRATION PAGE</h2>
        <div className="admin-links">
          <Link to="articles" className="admin-nav-link">
            Administration articles
          </Link>
          <Link to="users" className="admin-nav-link">
            Administration comptes utilisateurs
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminHomePage;
