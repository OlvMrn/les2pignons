import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import connexion from "../services/connexion";
import AdminCard from "../components/AdminCard";

import "./AdminPage.css";

function AdminPage({ title, route }) {
  const [item, setItem] = useState([]);

  const getItemData = async () => {
    try {
      const response = await connexion.get(route);
      setItem(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getItemData();
  }, []);

  return (
    <div className="admin-page-body">
      <h2 className="admin-category-title">{title}</h2>
      <Link to="new" className="admin-nav-link">
        Ajouter un article
      </Link>
      {item.map((elt, index) => (
        <React.Fragment key={elt.id}>
          <AdminCard
            key={elt.id}
            element={elt}
            route={route}
            item={item}
            setItem={setItem}
          />
          {index < item.length - 1 && <div className="line-separator" />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default AdminPage;
