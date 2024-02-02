import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllArticles from "./pages/AllArticles";
import ArticlePage from "./pages/ArticlePage";
import AdminHomePage from "./pages/AdminHomePage";
import ManageArticle from "./pages/ManageArticle";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import SignForm from "./components/SignForm";
import { AuthProvider } from "./contexts/authContext";
import connexion from "./services/connexion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const latestTravelArticle = await connexion.get(
            "/articles/latest/voyage"
          );
          const latestEventArticle = await connexion.get(
            "/articles/latest/evènement"
          );
          return {
            latestTravelArticle: latestTravelArticle.data,
            latestEventArticle: latestEventArticle.data,
          };
        },
      },
      {
        path: "articles",
        element: <AllArticles />,
      },
      {
        path: "articles/:id",
        element: <ArticlePage />,
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
      {
        path: "login",
        element: <SignForm type="signin" />,
      },
      {
        path: "register",
        element: <SignForm type="signup" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
