import styled from "styled-components";
import oval from "./../../images/oval.svg";

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
