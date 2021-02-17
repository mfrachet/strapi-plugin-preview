import { useRef } from "react";
import io from "socket.io-client";

export const useSocketIo = () => {
  const ioRef = useRef();

  if (!ioRef.current) {
    ioRef.current = io("http://localhost:3000", {});
  }

  return ioRef;
};
