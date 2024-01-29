import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import connexion from "../services/connexion";

import "./ManageArticle.css";

const articleTemplate = {
  category: "",
  title: "",
  picture: "",
  content: "",
  publish_date: "",
  country_id: "",
};

function ManageArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(articleTemplate);
  const [countriesData, setCountriesData] = useState([]);
  const categories = ["Travel"];

  const getCountries = async () => {
    try {
      const response = await connexion.get(`/countries`);
      setCountriesData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getArticleData = async () => {
    try {
      const response = await connexion.get(`/articles/${id}`);
      setArticle(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountries();
    if (id !== "new") {
      getArticleData();
    }
  }, [id]);

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
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  const putArticle = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/articles/${id}`, article);
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form
        className="input-form-body"
        onSubmit={id !== "new" ? putArticle : postArticle}
      >
        <label className="form-element">
          <select name="category" onChange={handleArticle}>
            {id === "new" ? (
              <option value="">--Select a category--</option>
            ) : (
              <option value={article.category}>{article.category}</option>
            )}
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label className="form-element">
          <select name="country_id" onChange={handleArticle}>
            {id === "new" ? (
              <option value="">--Select a country--</option>
            ) : (
              <option value={article.country_id}>{article.country_name}</option>
            )}
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

export default ManageArticle;
