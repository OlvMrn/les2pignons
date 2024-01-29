import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./AdminHomePage.css";

function AdminHomePage() {
  return (
    <div>
      <h2>ADMINISTRATION PAGE</h2>
      <Link to="articles">Administration articles</Link>
      <Link to="users">Administration comptes utilisateurs</Link>
      <Outlet />
    </div>
  );
}

export default AdminHomePage;
