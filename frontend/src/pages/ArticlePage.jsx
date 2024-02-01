import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import connexion from "../services/connexion";

import "./ArticlePage.css";

function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const getArticle = async () => {
    try {
      const response = await connexion.get(`/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getArticle();
  }, [id]);

  return (
    <div className="article-page">
      <img
        className="article-picture"
        src={article.picture}
        alt={`${article.title}`}
      />
      <div className="article-body">
        <h1 className="article-title">{article.title}</h1>
        <div className="article-content">{article.content}</div>
      </div>
    </div>
  );
}

export default ArticlePage;
