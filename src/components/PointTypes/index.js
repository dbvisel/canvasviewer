import * as React from "react";
import PropTypes from "prop-types";
import {
  CanvasEmbedDiv,
  BookEmbedWrapper,
  CommentPointDiv,
  AudioEmbedWrapper,
  ImageEmbedWrapper,
  VideoEmbedWrapper,
  WebEmbedWrapper,
  SoftwareEmbedWrapper,
} from "./elements";
import Config from "./../../config";

export const CanvasEmbed = ({
  title,
  text,
  src,
  presentationMode,
  noPreview,
  width = Config.defaultSizes.canvas.width,
  height = Config.defaultSizes.canvas.height,
}) => (
  <CanvasEmbedDiv
    className={presentationMode ? "presentationmode" : ""}
    width={width + "px"}
    height={height + "px"}
  >
    <p>
      <a href={src} target="_blank" rel="noopener noreferrer">
        {text || title}
      </a>
    </p>
  </CanvasEmbedDiv>
);

CanvasEmbed.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const BookEmbed = ({ src, id, presentationMode, noPreview }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <BookEmbedWrapper presentationMode={presentationMode} minWidth={"100%"}>
      {presentationMode || noPreview || loaded ? (
        <iframe
          src={src}
          width={"100%"}
          height={"100%"}
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
          width={"100%"}
          height={"100%"}
          onClick={(e) => {
            e.preventDefault();
            setLoaded(true);
          }}
        />
      )}
    </BookEmbedWrapper>
  );
};

BookEmbed.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
};

export const CommentPoint = ({
  text,
  presentationMode,
  isStartPoint,
  isStopPoint,
}) => (
  <CommentPointDiv
    className={presentationMode ? "presentationmode" : ""}
    isStartPoint={isStartPoint}
    isStopPoint={isStopPoint}
  >
    <div>{text}</div>
  </CommentPointDiv>
);

CommentPoint.propTypes = {
  text: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  isStartPoint: PropTypes.bool,
  isStopPoint: PropTypes.bool,
};

export const AudioEmbed = ({
  src,
  id,
  width = Config.defaultSizes.audio.width,
  height = Config.defaultSizes.audio.height,
  presentationMode,
  noPreview,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <AudioEmbedWrapper presentationMode={presentationMode}>
      {presentationMode || noPreview || loaded ? (
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

export const ImageEmbed = ({
  src,
  id,
  width = Config.defaultSizes.image.width,
  height = Config.defaultSizes.image.height,
  presentationMode,
  noPreview,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <ImageEmbedWrapper presentationMode={presentationMode}>
      {presentationMode || noPreview || loaded ? (
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

ImageEmbed.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const WebEmbed = ({
  src,
  id,
  width = Config.defaultSizes.web.width,
  height = Config.defaultSizes.web.height,
  presentationMode,
  noPreview,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <WebEmbedWrapper presentationMode={presentationMode} wrapperWidth={width}>
      {presentationMode || noPreview || loaded ? (
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

WebEmbed.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const VideoEmbed = ({ src, id, presentationMode, noPreview }) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <VideoEmbedWrapper
      presentationMode={presentationMode}
      minHeight={"100%"}
      minWidth={"100%"}
    >
      {presentationMode || noPreview || loaded ? (
        <iframe
          src={src}
          width={"100%"}
          height={"100%"}
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
          width={"100%"}
          height={"100%"}
          onClick={(e) => {
            e.preventDefault();
            setLoaded(true);
          }}
        />
      )}
    </VideoEmbedWrapper>
  );
};

VideoEmbed.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const SoftwareEmbed = ({
  src,
  id,
  width = Config.defaultSizes.software.width,
  height = Config.defaultSizes.software.height,
  presentationMode,
  noPreview,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <SoftwareEmbedWrapper
      presentationMode={presentationMode}
      width={width}
      height={height}
    >
      {presentationMode || noPreview || loaded ? (
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

SoftwareEmbed.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  presentationMode: PropTypes.bool,
  noPreview: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};
