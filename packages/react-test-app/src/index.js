import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { Home } from "./Home";
import { ArticlesByCategory } from "./ArticlesByCategory";
import { ArticleDetails } from "./ArticleDetails";

if (process.env.NODE_ENV !== "production") {
  const { runStrapiPreview } = require("@mfrachet/strapi-preview-client");

  runStrapiPreview();
}

render(
  <Router>
    <Home path="/" />
    <ArticlesByCategory path="/categories/:slug" />
    <ArticleDetails path="/articles/:slug" />
  </Router>,
  document.getElementById("root")
);
