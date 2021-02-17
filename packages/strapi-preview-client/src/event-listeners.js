export const handleBlur = (e) => {
  const strapiData = e.target.getAttribute("data-strapi-entity");
  const [entity, field, id, content] = strapiData.split("::");

  const endpoint = `http://localhost:1337/${entity}/${id}`;
  const data = JSON.stringify({ [field]: e.target.textContent });

  fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.STRAPI_JWT_TOKEN}`,
    },
    body: data,
  }).then(() => {
    if (content) {
      // force to reload since we don't know how the frontend deals with the data
      window.location.reload();
    }
  });
};

export const handlePreventClick = (e) => {
  e.preventDefault();
};
