import { useLoaderData } from "react-router-dom";

import "./AllArticles.css";

import ArticleCard from "../components/ArticleCard";

function AllArticles() {
  const allArticles = useLoaderData();

  return (
    <div className="all-articles-body">
      <h2 className="all-articles-title">ARTICLES</h2>
      <div className="all-articles-cards-container">
        {allArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default AllArticles;
