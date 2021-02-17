import io from "socket.io-client";
import {
  pollUrlHandler,
  togglePreviewHandler,
  setUrlHandler,
  setTokenHandler,
} from "./socket-handlers";

import { getCollectionTypes } from "./collection-types";

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

export function runStrapiPreview(socketServer) {
  const socket = io(socketServer || "http://localhost:3000", {});
  const cleanupStyleSheet = createStyleSheet();
  const cleanupSocketPollUrl = pollUrlHandler(socket);
  const cleanupSocketToggle = togglePreviewHandler(socket);
  const cleanupSocketSetUrl = setUrlHandler(socket);
  const cleanupSocketSetToken = setTokenHandler(socket, (token) => {
    window.STRAPI_JWT_TOKEN = token;

    getCollectionTypes().then((collectionTypes) => {
      window.STRAPI_COLLECTION_TYPES = collectionTypes;
    });
  });

  socket.emit("client-handshake");

  window.addEventListener("unload", function (event) {
    cleanupStyleSheet();
    cleanupSocketPollUrl();
    cleanupSocketToggle();
    cleanupSocketSetUrl();
    cleanupSocketSetToken();
  });
}
