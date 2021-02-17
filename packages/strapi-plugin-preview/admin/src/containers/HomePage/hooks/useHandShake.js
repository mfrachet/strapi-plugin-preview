import { useEffect } from "react";

export const useHandShake = (ioRef) => {
  useEffect(() => {
    const ssToken = window.sessionStorage.getItem("jwtToken");
    const lsToken = window.localStorage.getItem("jwtToken");
    const jwtToken = ssToken || lsToken;

    function handshake() {
      ioRef.current.emit("jwt-token", JSON.parse(jwtToken));
    }

    let alreadyConnected;
    function handleTokenResponse(token) {
      if (!alreadyConnected) {
        strapi.notification.toggle({
          type: "info",
          message: "The client application is now connected.",
        });

        alreadyConnected = true;
      }

      window.STRAPI_JWT_TOKEN = token;
    }

    ioRef.current.on("token-received", handleTokenResponse);
    ioRef.current.on("client-handshake", handshake);

    return () => {
      ioRef.current.off("token-received");
      ioRef.current.off("client-handshake");
    };
  }, []);
};
