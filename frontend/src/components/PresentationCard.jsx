import React from "react";
import "./PresentationCard.css";
import { Link } from "react-router-dom";

function PresentationCard() {
  return (
    <div className="presentation-card">
      <div className="presentation-text-container">
        <p className="presentation-text">
          Nous sommes Charlotte et Arnaud, alias les 2 pignons, nous avons
          parcouru 14 222 km sur des pistes et routes à travers 20 pays pendant
          14 mois. <br /> Derrière ces chiffres se cachent surtout une aventure
          nomade, des rencontres, des épisodes de froid...
          <br /> Bref, une expérience de vie que nous partageons dans des
          articles sur ce site.
        </p>
        <Link to="/articles" className="card-link">
          Voir tous nos articles
        </Link>
      </div>
    </div>
  );
}

export default PresentationCard;
