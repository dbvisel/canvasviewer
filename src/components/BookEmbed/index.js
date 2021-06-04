import React from "react";
import { BookEmbedWrapper } from "./elements";
import Config from "./../../config";

const BookEmbed = ({
  src,
  id,
  width = Config.defaultSizes.book.width,
  height = Config.defaultSizes.book.height,
  presentationMode,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <BookEmbedWrapper presentationMode={presentationMode} minWidth={width}>
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
    </BookEmbedWrapper>
  );
};

export default BookEmbed;
