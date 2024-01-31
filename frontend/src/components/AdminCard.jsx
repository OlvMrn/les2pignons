import React from "react";
import { Link } from "react-router-dom";
import connexion from "../services/connexion";
import ArticleCard from "./ArticleCard";

function AdminCard({ element, route, item, setItem }) {
  const handleDeleteClick = async (id) => {
    try {
      await connexion.delete(`${route}/${id}`);
      const updatedItem = item.filter((elt) => elt.id !== id);
      setItem(updatedItem);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="admin-card">
      <Link to={`${element.id}`}>
        <button type="button">Editer</button>
      </Link>
      <button type="button" onClick={() => handleDeleteClick(element.id)}>
        Supprimer
      </button>
      <ArticleCard article={element} />
    </div>
  );
}

export default AdminCard;
