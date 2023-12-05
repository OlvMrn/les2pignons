import { useLoaderData } from "react-router-dom";

import "./ArticlePage.css";

import ArticleCard from "../components/ArticleCard";

function ArticlePage() {
  const article = useLoaderData();

  return (
    <div className="article-page-body">
      <ArticleCard article={article} />
      <div className="article-page-content">{article.content}</div>
    </div>
  );
}

export default ArticlePage;
