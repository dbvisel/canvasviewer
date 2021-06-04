import styled from "styled-components";
import oval from "./../../images/oval.svg";

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
