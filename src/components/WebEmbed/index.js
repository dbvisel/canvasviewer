import React from "react";
import { WebEmbedWrapper } from "./elements";
import Config from "./../../config";

const WebEmbed = ({
  src,
  id,
  width = Config.defaultSizes.web.width,
  height = Config.defaultSizes.web.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <WebEmbedWrapper presentationMode={presentationMode} wrapperWidth={width}>
      {presentationMode || loaded ? (
        <iframe
          src={src}
          width={presentationMode ? "100%" : width}
          height={presentationMode ? "100%" : height}
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          title={src}
        />
      ) : (
        <img
          src={`images/${id}.png`}
          alt={src}
          width={width}
          height={height}
          onClick={(e) => {
            e.preventDefault();
            setLoaded(true);
          }}
        />
      )}
    </WebEmbedWrapper>
  );
};

export default WebEmbed;
