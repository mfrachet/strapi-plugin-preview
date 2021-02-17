import React from "react";
import { Button } from "@buffetjs/core";
import { MdDesktopMac, MdTabletMac, MdSmartphone } from "react-icons/md";

export const desktop = ["100%", "100vh"];
const iphoneSE = ["320px", "568px"];
const iphoneX = ["375px", "812px"];
const ipad = ["768px", "1024px"];

export const Devices = ({ onChange, rotated }) => {
  return (
    <div>
      <Button
        onClick={() => onChange(desktop)}
        color="secondary"
        style={{ marginRight: "8px" }}
        icon={<MdDesktopMac />}
        disabled={rotated}
      >
        Desktop
      </Button>

      <Button
        onClick={() => onChange(ipad)}
        color="secondary"
        style={{ marginRight: "8px" }}
        icon={<MdTabletMac />}
      >
        iPad
      </Button>
      <Button
        onClick={() => onChange(iphoneX)}
        color="secondary"
        style={{ marginRight: "8px" }}
        icon={<MdSmartphone />}
      >
        iPhone X
      </Button>
      <Button
        onClick={() => onChange(iphoneSE)}
        color="secondary"
        style={{ marginRight: "8px" }}
        icon={<MdSmartphone />}
      >
        iPhone SE
      </Button>
    </div>
  );
};
