import React from "react";
import { AudioEmbedWrapper } from "./elements";
import Config from "./../../config";

const AudioEmbed = ({
  src,
  id,
  width = Config.defaultSizes.audio.width,
  height = Config.defaultSizes.audio.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <AudioEmbedWrapper presentationMode={presentationMode}>
      {presentationMode || loaded ? (
        <iframe
          src={src}
          width={presentationMode ? "100%" : width}
          height={height}
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
    </AudioEmbedWrapper>
  );
};
export default AudioEmbed;
