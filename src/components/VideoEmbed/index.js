import React from "react";
import { VideoEmbedWrapper } from "./elements";
import Config from "./../../config";

const VideoEmbed = ({
  src,
  id,
  width = Config.defaultSizes.video.width,
  height = Config.defaultSizes.video.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <VideoEmbedWrapper
      presentationMode={presentationMode}
      minHeight={height}
      minWidth={width}
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
          width={width + "px"}
          height={height + "px"}
          onClick={(e) => {
            e.preventDefault();
            setLoaded(true);
          }}
        />
      )}
    </VideoEmbedWrapper>
  );
};

export default VideoEmbed;
