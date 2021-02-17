import { useState, useEffect } from "react";
import { Link } from "@reach/router";
import { Layout } from "./Layout";

export function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <Layout>
      <main>
        <h1>Categories of articles</h1>

        <ul className="list">
          {categories.map((categ) => (
            <li key={categ.id}>
              <strong>
                <Link
                  to={`/categories/${categ.slug}`}
                  data-strapi-entity={`categories::name::${categ.id}`}
                >
                  {categ.name}
                </Link>
              </strong>{" "}
              - {categ.articles.length} post(s)
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
