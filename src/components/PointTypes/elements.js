import styled from "styled-components";
import oval from "./../../images/oval.svg";

export const CanvasEmbedDiv = styled.div`
  box-sizing: border-box;
  padding: var(--innerMargin);
  border-radius: 4px;
  width: ${(props) => (props.width ? props.width : "360px")};
  height: ${(props) => (props.height ? props.height : "180px")};
  /* max-width: 250px; */
  &.presentationmode {
    max-width: initial;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    line-height: 40px;
    background-color: var(--white);
    border-width: 4px;
    padding: var(--outerMargin);
    display: flex;
    justify-content: center;
    & > div {
      max-width: 800px;
    }
  }
`;

export const BookEmbedWrapper = styled.div`
  background: url(${oval}) center center no-repeat;
  background-size: contain;
  min-height: ${(props) =>
    props.presentationMode ? "100%" : "var(--myHeight)"};
  height: ${(props) => (props.presentationMode ? "100%" : "var(--myHeight)")};
  ${(props) => props.presentationMode && "width: 100%;"}
  & iframe {
    min-height: 100%;
    height: 100%;
  }
  & > img {
    max-width: 100%;
    display: block;
    overflow-wrap: anywhere;
  }
`;

export const CommentPointDiv = styled.div`
  box-sizing: border-box;
  padding: var(--innerMargin);
  border-radius: 4px;
  border: 2px solid var(--pointColor);
  background-color: var(--backgroundColor);
  min-width: 150px;
  height: 100%;
  border-color: ${(props) =>
    props.isStartPoint
      ? "green"
      : props.isStopPoint
      ? "red"
      : "var(--pointColor)"};
  &.presentationmode {
    min-width: initial;
    max-width: initial;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    line-height: 40px;
    background-color: var(--white);
    border-width: 4px;
    padding: var(--outerMargin);
    display: flex;
    justify-content: center;
    & > div {
      max-width: 800px;
    }
  }
`;

export const AudioEmbedWrapper = styled.div`
  /* background: url(${oval}) center center no-repeat;
  background-size: contain; */
  ${(props) => props.presentationMode && "min-height: 100%;"}
  ${(props) => props.presentationMode && "height: 100%;"}
  ${(props) => props.presentationMode && "width: 100%;"}
	display: flex;
  justify-content: center;
  align-items: center;
  /* & iframe {
    ${(props) => props.presentationMode && "min-height: 100%;"}
    ${(props) => props.presentationMode && "height: 100%;"}
  } */
`;

export const ImageEmbedWrapper = styled.div`
  background: url(${oval}) center center no-repeat;
  background-size: contain;
  ${(props) => props.presentationMode && "min-height: 100%;"}
  ${(props) => props.presentationMode && "height: 100%;"}
  ${(props) => props.presentationMode && "width: 100%;"}
  & iframe {
    ${(props) => props.presentationMode && "min-height: 100%;"}
    ${(props) => props.presentationMode && "height: 100%;"}
  }
`;

export const WebEmbedWrapper = styled.div`
  background: url(${oval}) center center no-repeat;
  background-size: 200px 200px;
  width: ${(props) =>
    props.wrapperWidth ? props.wrapperWidth + "px" : "100%"};
  ${(props) => props.presentationMode && "min-height: 100%;"}
  ${(props) => props.presentationMode && "height: 100%;"}
  & iframe {
    ${(props) => props.presentationMode && "min-height: 100%;"}
    ${(props) => props.presentationMode && "height: 100%;"}
  }
`;

export const VideoEmbedWrapper = styled.div`
  background: url(${oval}) center center no-repeat;
  background-size: 200px 200px;
  min-height: ${(props) =>
    props.presentationMode ? "100%" : "var(--myHeight)"};
  height: ${(props) => (props.presentationMode ? "100%" : "var(--myHeight)")};
  ${(props) => props.presentationMode && "width: 100%;"}
  & iframe, & img {
    ${(props) => props.presentationMode && "min-height: 100%;"}
    ${(props) => props.presentationMode && "height: 100%;"}
  }
  & > img {
    min-height: ${(props) => props.minHeight && props.minHeight + "px"};
    max-width: 100%;
    display: block;
    overflow-wrap: anywhere;
  }
`;

export const SoftwareEmbedWrapper = styled.div`
  background: url(${oval}) center center no-repeat;
  background-size: 200px 200px;
  ${(props) => props.presentationMode && "height: " + props.height + "px;"}
  & iframe {
    ${(props) =>
      props.presentationMode && "min-height: " + props.height + "px;"}
    ${(props) => props.presentationMode && "height: " + props.height + "px;"}
  ${(props) => props.presentationMode && "width: " + props.width + "px;"}
  }
`;
