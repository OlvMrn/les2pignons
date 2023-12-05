import { useLoaderData } from "react-router-dom";

import "./AllArticles.css";

import ArticleCard from "../components/ArticleCard";

function AllArticles() {
  const allArticles = useLoaderData();

  return (
    <div className="all-articles-body">
      <h2>ARTICLES</h2>
      {allArticles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default AllArticles;
