import styled from "styled-components";
import oval from "./../../images/oval.svg";

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
