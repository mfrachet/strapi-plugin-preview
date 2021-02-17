export function request(url, opts = {}) {
  const { headers, ...otherOptions } = opts;

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.STRAPI_JWT_TOKEN}`,
      ...(headers || {}),
    },
    ...(otherOptions || {}),
  });
}
