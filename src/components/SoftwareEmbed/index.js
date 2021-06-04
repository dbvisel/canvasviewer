import React from "react";
import { SoftwareEmbedWrapper } from "./elements";
import Config from "./../../config";

const SoftwareEmbed = ({
  src,
  id,
  width = Config.defaultSizes.software.width,
  height = Config.defaultSizes.software.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <SoftwareEmbedWrapper
      presentationMode={presentationMode}
      width={width}
      height={height}
    >
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
    </SoftwareEmbedWrapper>
  );
};

export default SoftwareEmbed;
