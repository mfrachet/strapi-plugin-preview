import { useEffect, useRef, useState } from "react";

function getInitialUrl() {
  return new URLSearchParams(window.location.search);
}

export const usePollUrl = (ioRef) => {
  const query = getInitialUrl();
  const isFirstRenderRef = useRef(false);
  const [url, setUrl] = useState(query.get("frameUrl"));

  useEffect(() => {
    function handleUrlChange(nextUrl) {
      // Avoid refreshing on first load when things exists
      if (url && !isFirstRenderRef.current) {
        isFirstRenderRef.current = true;

        if (url !== nextUrl) {
          ioRef.current.emit("set-url", url);
        }

        return;
      }

      const newUrl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        `?frameUrl=${nextUrl}`;

      window.history.pushState({ path: newUrl }, "", newUrl);
      setUrl(nextUrl);
    }

    ioRef.current.on("url-change", handleUrlChange);

    return () => ioRef.current.off("url-change", handleUrlChange);
  }, []);

  return url;
};
