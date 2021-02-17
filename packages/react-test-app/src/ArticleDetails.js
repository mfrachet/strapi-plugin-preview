import { useState, useEffect } from "react";
import { Link } from "@reach/router";
import marked from "marked";
import { Layout } from "./Layout";

export function ArticleDetails({ slug }) {
  const [article, setArticle] = useState(undefined);

  useEffect(() => {
    fetch(`http://localhost:1337/articles/${slug}`)
      .then((res) => res.json())
      .then(setArticle);
  }, [slug]);

  if (!article) {
    return <p>Loading...</p>;
  }

  const html = marked(article.content);

  return (
    <Layout>
      <main>
        <Link to="/">Back to categories</Link>

        <h1 data-strapi-entity={`articles::title::${article.id}`}>
          {article.title}
        </h1>

        <p data-strapi-entity={`articles::description::${article.id}`}>
          {article.description}
        </p>

        <div
          data-strapi-entity={`articles::content::${article.id}::${article.content}`}
        >
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </main>
    </Layout>
  );
}
