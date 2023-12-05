import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import App from "./App";
import AllArticles from "./pages/AllArticles";
import ArticlePage from "./pages/ArticlePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "articles",
        element: <AllArticles />,
        loader: () => {
          return axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/articles`)
            .then((response) => {
              return response.data;
            });
        },
      },
      {
        path: "articles/:id",
        element: <ArticlePage />,
        loader: ({ params }) => {
          return axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/api/articles/${params.id}`
            )
            .then((response) => {
              return response.data;
            });
        },
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
