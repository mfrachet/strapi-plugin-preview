import React, { useState } from "react";
import { Button } from "@buffetjs/core";
import { usePollUrl } from "./hooks/usePollUrl";
import { useSocketIo } from "./hooks/useSocketIo";
import { Wrapper, Flex, Anchor } from "./components";
import { useHandShake } from "./hooks/useHandShake";
import { Devices, desktop } from "./components/Devices";

const HomePage = () => {
  const [size, setSizes] = useState(desktop);
  const [isRotated, setRotated] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const ioRef = useSocketIo();

  useHandShake(ioRef);

  const url = usePollUrl(ioRef);

  return (
    <div
      style={
        isFullscreen
          ? {
              position: "absolute",
              zIndex: 9999,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "auto",
              background: "white",
            }
          : undefined
      }
    >
      <Anchor
        href={url}
        target="_blank"
        aria-label="Open in another tab"
        noMargin={isFullscreen}
      >
        {url}
      </Anchor>

      <Flex style={{ justifyContent: "space-between" }}>
        <Devices onChange={setSizes} rotated={isRotated} />

        <div>
          <Button
            onClick={() => setRotated((prev) => !prev)}
            color="secondary"
            style={{ marginRight: "8px" }}
            disabled={size === desktop}
          >
            Rotate device
          </Button>

          <Button
            onClick={() => setIsFullscreen((prev) => !prev)}
            color="secondary"
            style={{ marginRight: "8px" }}
          >
            Toggle fullscreen
          </Button>

          <Button
            color="primary"
            onClick={() => ioRef.current.emit("toggle-preview")}
            style={{ marginRight: "8px" }}
          >
            Toggle preview
          </Button>
        </div>
      </Flex>

      <Wrapper>
        <iframe
          name="strapi-preview"
          src="http://localhost:3001/"
          style={{
            height: isRotated ? size[0] : size[1],
            width: isRotated ? size[1] : size[0],
            border: "none",
            marginTop: size !== desktop ? "16px" : undefined,
            padding: 0,
            background: "white",
          }}
        />
      </Wrapper>
    </div>
  );
};

export default HomePage;
