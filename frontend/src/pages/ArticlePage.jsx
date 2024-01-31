import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import connexion from "../services/connexion";

import "./ArticlePage.css";

import ArticleCard from "../components/ArticleCard";

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
    <div className="article-page-body">
      <ArticleCard article={article} />
      <div className="article-page-content">{article.content}</div>
    </div>
  );
}

export default ArticlePage;
