import io from "socket.io-client";
import { handleBlur, handlePreventClick } from "./event-listeners";

function createStyleSheet() {
  const stylesheet = document.createElement("style");
  stylesheet.innerHTML = `[contenteditable="plaintext-only"] {
          outline: 2px dotted tomato;
          min-height: 20px;
          max-height: 100%;
          }`;

  document.head.appendChild(stylesheet);

  return () => stylesheet.remove();
}

function toggleAllContentEditable(contentEditable) {
  document.querySelectorAll("[data-strapi-entity]").forEach((node) => {
    node.setAttribute(
      "contenteditable",
      contentEditable ? "plaintext-only" : false
    );

    const strapiEntity = node.getAttribute("data-strapi-entity");
    const entity = strapiEntity.split("::");
    const content = entity[3];

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

function pollUrl(onUrlChange) {
  let oldUrl = null;

  const timerId = setInterval(() => {
    if (oldUrl !== window.location.href) {
      oldUrl = window.location.href;
      onUrlChange(oldUrl);
    }
  }, 100);

  return () => clearInterval(timerId);
}

function togglePreviewHandler(socket) {
  let isToggledPreview = false;

  function handleTogglePreview() {
    isToggledPreview = !isToggledPreview;
    toggleAllContentEditable(isToggledPreview);
  }

  socket.on("toggle-preview", handleTogglePreview);

  return () => socket.off("toggle-preview", handleTogglePreview);
}

function setUrlHandler(socket) {
  function handleSetUrl(url) {
    window.location.href = url;
  }

  socket.on("set-url", handleSetUrl);

  return () => socket.off("set-url", handleSetUrl);
}

function setTokenHandler(socket, callback) {
  function handleSetToken(token) {
    socket.emit("token-received");
    callback(token);
  }

  socket.on("jwt-token", handleSetToken);

  return () => socket.off("jwt-token", handleSetToken);
}

export function runStrapiPreview(socketServer) {
  const socket = io(socketServer || "http://localhost:3000", {});
  const cleanupStyleSheet = createStyleSheet();
  const cleanupPollUrl = pollUrl((newUrl) => socket.emit("url-change", newUrl));
  const cleanupSocketToggle = togglePreviewHandler(socket);
  const cleanupSocketSetUrl = setUrlHandler(socket);
  const cleanupSocketSetToken = setTokenHandler(socket, (token) => {
    window.STRAPI_JWT_TOKEN = token;
  });

  socket.emit("client-handshake");

  window.addEventListener("unload", function (event) {
    cleanupStyleSheet();
    cleanupPollUrl();
    cleanupSocketToggle();
    cleanupSocketSetUrl();
    cleanupSocketSetToken();
  });
}
