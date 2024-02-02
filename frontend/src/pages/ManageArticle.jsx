import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import connexion from "../services/connexion";

import "./ManageArticle.css";

const articleTemplate = {
  title: "",
  picture: "",
  summary: "",
  content: "",
  category_id: "",
  country_id: "",
};

function ManageArticle() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(articleTemplate);
  const [countriesData, setCountriesData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const getCountries = async () => {
    try {
      const response = await connexion.get(`/countries`);
      setCountriesData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCategories = async () => {
    try {
      const response = await connexion.get(`/categories`);
      setCategoriesData(response.data);
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
    getCategories();
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
    if (article.category_label !== "Voyage") {
      setArticle((previousState) => ({
        ...previousState,
        country_name: null,
        country_id: null,
      }));
    }
    try {
      await connexion.post("/articles", article);
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  const putArticle = async (event) => {
    event.preventDefault();
    if (article.category_label !== "Voyage") {
      setArticle((previousState) => ({
        ...previousState,
        country_name: null,
        country_id: null,
      }));
    }
    try {
      await connexion.put(`/articles/${id}`, article);
      navigate("/admin/articles");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="input-form">
      <form
        className="input-form-body"
        onSubmit={id !== "new" ? putArticle : postArticle}
      >
        <h2 className="input-form-title">
          {id === "new" ? "Ajouter un nouvel article" : "Modifier l'article"}
        </h2>
        <label className="form-element">
          <h3 className="input-label">Catégorie:</h3>
          <select
            name="category_id"
            onChange={handleArticle}
            value={article.category_id}
          >
            {id === "new" ? (
              <option value="">--Selectionner une catégorie--</option>
            ) : (
              <option
                value={
                  categoriesData.find(
                    (cat) => cat.label === article.category_label
                  )?.id || ""
                }
              >
                {categoriesData.find(
                  (cat) => cat.label === article.category_label
                )?.label || ""}
              </option>
            )}
            {categoriesData
              .filter((cat) => cat.label !== article.category_label)
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
          </select>
        </label>
        {parseInt(article.category_id, 10) === 1 && (
          <label className="form-element">
            <h3 className="input-label">Pays:</h3>
            <select
              name="country_id"
              onChange={handleArticle}
              value={article.country_id}
            >
              {id === "new" ? (
                <option value="">--Selectionner un pays--</option>
              ) : (
                <option
                  value={
                    countriesData.find(
                      (country) => country.name === article.country_name
                    )?.id || ""
                  }
                >
                  {countriesData.find(
                    (country) => country.name === article.country_name
                  )?.name || ""}
                </option>
              )}
              {countriesData
                .filter((country) => country.name !== article.country_name)
                .map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
            </select>
          </label>
        )}
        <label className="form-element">
          <h3 className="input-label">Titre:</h3>
          <input
            type="text"
            name="title"
            className="input-title"
            placeholder="Titre de l'article"
            required
            value={article.title}
            onChange={handleArticle}
          />
        </label>
        <label className="form-element">
          <h3 className="input-label">Résumé:</h3>
          <input
            type="text"
            name="summary"
            className="input-summary"
            placeholder="Résumé de l'article"
            required
            value={article.summary}
            onChange={handleArticle}
          />
        </label>

        <label className="form-element">
          <h3 className="input-label">Contenu:</h3>
          <input
            type="text"
            name="content"
            className="input-content"
            placeholder="Contenu de l'article"
            required
            value={article.content}
            onChange={handleArticle}
          />
        </label>

        <label className="form-element">
          <h3 className="input-label">Image:</h3>
          <input
            type="URL"
            name="picture"
            className="input-picture"
            placeholder="URL de l'image"
            required
            value={article.picture}
            onChange={handleArticle}
          />
        </label>

        <button type="submit" className="submit-button">
          {id === "new" ? "Ajouter" : "Modifier"}
        </button>
      </form>
    </div>
  );
}

export default ManageArticle;
