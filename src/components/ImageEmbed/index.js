import React from "react";
import { ImageEmbedWrapper } from "./elements";
import Config from "./../../config";

const ImageEmbed = ({
  src,
  id,
  width = Config.defaultSizes.image.width,
  height = Config.defaultSizes.image.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <ImageEmbedWrapper presentationMode={presentationMode}>
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
    </ImageEmbedWrapper>
  );
};
export default ImageEmbed;
