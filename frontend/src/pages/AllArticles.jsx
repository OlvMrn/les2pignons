import React, { useState, useEffect } from "react";

import connexion from "../services/connexion";

import "./AllArticles.css";

import ArticleCard from "../components/ArticleCard";

function AllArticles() {
  const [allArticles, setAllArticles] = useState([]);

  const getArticles = async () => {
    try {
      const response = await connexion.get(`/articles`);
      setAllArticles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="all-articles-body">
      <h2 className="all-articles-title">ARTICLES</h2>
      <div className="all-articles-cards-container">
        {allArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <div className="blank-separator" />
    </div>
  );
}

export default AllArticles;
