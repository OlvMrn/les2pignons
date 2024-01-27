import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import connexion from "../services/connexion";

import "./PostArticle.css";

const articleType = {
  category: "",
  title: "",
  picture: "",
  content: "",
  publish_date: "",
  country_id: "",
};

function PostArticle() {
  const [article, setArticle] = useState(articleType);
  const countriesData = useLoaderData();
  const categories = ["Travel"];

  const handleArticle = (event) => {
    setArticle((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const postArticle = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/articles", article);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className="input-form-body" onSubmit={postArticle}>
        <label className="form-element">
          <select name="category" onChange={handleArticle}>
            <option value="">--Select a category--</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="form-element">
          <select name="country_id" onChange={handleArticle}>
            <option value="">--Select a country--</option>
            {countriesData.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          name="title"
          className="form-element input-title"
          placeholder="Titre de l'article"
          required
          value={article.title}
          onChange={handleArticle}
        />
        <input
          type="text"
          name="content"
          className="form-element input-content"
          placeholder="Contenu de l'article"
          required
          value={article.content}
          onChange={handleArticle}
        />
        <label className="form-element">
          <h4>Date de publication</h4>
          <input
            type="date"
            name="publish_date"
            className="form-element input-date"
            required
            value={article.publish_date}
            onChange={handleArticle}
          />
        </label>
        <input
          type="URL"
          name="picture"
          className="form-element input-picture"
          placeholder="URL de l'image"
          required
          value={article.picture}
          onChange={handleArticle}
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default PostArticle;
