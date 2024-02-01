import React from "react";
import { Link } from "react-router-dom";
import connexion from "../services/connexion";
import ArticleCard from "./ArticleCard";

import "./AdminCard.css";

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
    <div className="admin-card-body">
      <div className="article-card-top">
        <ArticleCard article={element} />
      </div>
      <div className="admin-card-bottom">
        <Link to={`${element.id}`}>
          <button type="button" className="admin-button">
            Modifier
          </button>
        </Link>
        <button
          type="button"
          onClick={() => handleDeleteClick(element.id)}
          className="admin-button"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default AdminCard;
