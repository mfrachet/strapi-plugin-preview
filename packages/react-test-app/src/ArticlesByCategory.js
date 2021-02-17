import { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Layout } from "./Layout";

export function ArticlesByCategory({ slug }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/categories/${slug}`)
      .then((res) => res.json())
      .then(({ articles }) => setArticles(articles));
  }, [slug]);

  return (
    <Layout>
      <main>
        <Link to="/">Back to categories</Link>

        <h1>Articles of a category</h1>

        <ul className="list">
          {articles.map((article) => (
            <li key={article.id}>
              <strong>
                <Link
                  to={`/articles/${article.slug}`}
                  data-strapi-entity={`articles::title::${article.id}`}
                >
                  {article.title}
                </Link>
              </strong>{" "}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
