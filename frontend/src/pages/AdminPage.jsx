import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminPage() {
  return (
    <div>
      <h2>ADMINISTRATION PAGE</h2>
      <Link to="/admin/post">Post article</Link>
      <Outlet />
    </div>
  );
}

export default AdminPage;
