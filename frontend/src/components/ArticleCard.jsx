import React from "react";
import { Link } from "react-router-dom";

import "./ArticleCard.css";

function ArticleCard({ article }) {
  return (
    <div className="article-card-body">
      <div className="article-card-title">{article.title}</div>
      <div className="article-card-category">{article.category_id}</div>
      <img
        className="article-card-picture"
        src={article.picture}
        alt={`${article.title}`}
      />
      <div className="article-card-publish-date">{article.publish_date}</div>
      {/* <div className="article-card-destination">{article.country_name}</div> */}
      <div className="article-card-category">{article.category_label}</div>
      <Link to={`/articles/${article.id}`}>Plus d'informations ici</Link>
    </div>
  );
}

export default ArticleCard;
