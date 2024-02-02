import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./ArticleCard.css";

function ArticleCard({ article }) {
  const cardRef = useRef(null);

  const slideFromBottom = (card) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  };

  useEffect(() => {
    const card = cardRef.current;
    slideFromBottom(card);
  }, []);

  return (
    <div className="article-card-body" ref={cardRef}>
      <div className="article-card-left">
        <img
          className="article-card-picture"
          src={article.picture}
          alt={`${article.title}`}
        />
      </div>
      <div className="article-card-right">
        <h2 className="article-card-title">{article.title}</h2>
        <div className="article-card-summary">{article.summary}</div>
        <div className="article-card-infos-container">
          <h3 className="article-card-info">
            Catégorie: {article.category_label}
          </h3>
          <h3 className="article-card-info">
            Publié le: {article.publish_date}
          </h3>
          {article.country_name && (
            <h3 className="article-card-info">Pays: {article.country_name}</h3>
          )}
        </div>
        <Link to={`/articles/${article.id}`} className="article-link">
          Plus d'informations ici
        </Link>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    category_label: PropTypes.string.isRequired,
    publish_date: PropTypes.string.isRequired,
    country_name: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
