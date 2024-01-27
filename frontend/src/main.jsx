import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import connexion from "./services/connexion";

import App from "./App";
import AllArticles from "./pages/AllArticles";
import ArticlePage from "./pages/ArticlePage";
import AdminPage from "./pages/AdminPage";
import PostArticle from "./pages/PostArticle";
import ConnexionPage from "./pages/ConnexionPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "articles",
        element: <AllArticles />,
        loader: () => {
          return connexion.get(`/articles`).then((response) => {
            return response.data;
          });
        },
      },
      {
        path: "articles/:id",
        element: <ArticlePage />,
        loader: ({ params }) => {
          return connexion.get(`/articles/${params.id}`).then((response) => {
            return response.data;
          });
        },
      },
      {
        path: "connexion",
        element: <ConnexionPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          {
            path: "post",
            element: <PostArticle />,
            loader: () => {
              return connexion.get(`/countries`).then((response) => {
                return response.data;
              });
            },
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
