import React, { useEffect, useState } from "react";

import connexion from "../services/connexion";

import ArticleCard from "../components/ArticleCard";

function HomePage() {
  const [latestTravelArticle, setLatestTravelArticle] = useState({});
  const [latestEventArticle, setLatestEventArticle] = useState({});

  const getLatestTravelArticle = async () => {
    try {
      const article = await connexion.get("/articles/latest/voyage");
      setLatestTravelArticle(article.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getLatestEventArticle = async () => {
    try {
      const article = await connexion.get("/articles/latest/evènement");
      setLatestEventArticle(article.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getLatestTravelArticle();
    getLatestEventArticle();
  }, []);

  return (
    <div>
      <ArticleCard article={latestTravelArticle} />
      <ArticleCard article={latestEventArticle} />
    </div>
  );
}

export default HomePage;
