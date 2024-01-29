import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import connexion from "./services/connexion";

import App from "./App";
import AllArticles from "./pages/AllArticles";
import ArticlePage from "./pages/ArticlePage";
import AdminHomePage from "./pages/AdminHomePage";
import ManageArticle from "./pages/ManageArticle";
import ConnexionPage from "./pages/ConnexionPage";
import AdminPage from "./pages/AdminPage";

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
        element: <AdminHomePage />,
        children: [
          {
            path: "articles",
            element: <AdminPage title="articles" route="/articles" />,
          },
          {
            path: "articles/:id",
            element: <ManageArticle />,
          },
          {
            path: "users",
            element: "",
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
