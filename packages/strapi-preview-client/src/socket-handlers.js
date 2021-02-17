import { handleBlur, handlePreventClick } from "./event-listeners";
import { hasPermissionToUpdate } from "./collection-types";

function toggleAllContentEditable(contentEditable) {
  document.querySelectorAll("[data-strapi-entity]").forEach((node) => {
    const strapiEntity = node.getAttribute("data-strapi-entity");
    const [collectionType, field, id, content] = strapiEntity.split("::");

    if (!hasPermissionToUpdate(collectionType, field)) return;

    node.setAttribute(
      "contenteditable",
      contentEditable ? "plaintext-only" : false
    );

    if (contentEditable) {
      node.addEventListener("blur", handleBlur);
      node.addEventListener("click", handlePreventClick);

      // Transforming complex type in plain text
      if (content) {
        node.textContent = content;
      }
    } else {
      node.removeEventListener("blur", handleBlur);
      node.removeEventListener("click", handlePreventClick);
    }
  });
}

export function pollUrlHandler(socket) {
  let oldUrl = null;

  const timerId = setInterval(() => {
    if (oldUrl !== window.location.href) {
      oldUrl = window.location.href;
      socket.emit("url-change", oldUrl);
    }
  }, 100);

  return () => clearInterval(timerId);
}

export function togglePreviewHandler(socket) {
  let isToggledPreview = false;

  function handleTogglePreview() {
    isToggledPreview = !isToggledPreview;
    toggleAllContentEditable(isToggledPreview);
  }

  socket.on("toggle-preview", handleTogglePreview);

  return () => socket.off("toggle-preview", handleTogglePreview);
}

export function setUrlHandler(socket) {
  function handleSetUrl(url) {
    window.location.href = url;
  }

  socket.on("set-url", handleSetUrl);

  return () => socket.off("set-url", handleSetUrl);
}

export function setTokenHandler(socket, callback) {
  function handleSetToken(token) {
    socket.emit("token-received");
    callback(token);
  }

  socket.on("jwt-token", handleSetToken);

  return () => socket.off("jwt-token", handleSetToken);
}
