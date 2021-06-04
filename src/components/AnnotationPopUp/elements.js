import styled from "styled-components";

/* TODO: make this adjustable width? */

export const AnnotationWrapper = styled.div`
  --annotationWidth: 50vw;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  bottom: 0;
  width: var(--annotationWidth);
  right: ${(props) =>
    props.visible ? "0" : "calc(0px - var(--annotationWidth))"};
  background-color: var(--backgroundColor);
  transition: 0.5s;
  z-index: 10;
  padding: var(--outerMargin) var(--outerMargin) var(--outerMargin)
    var(--innerMargin);
  /* border-left: 1px solid var(--lineColor); */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  & > a:first-child {
    font-size: 24px;
    position: absolute;
    right: var(--innerMargin);
    top: var(--innerMargin);
    color: var(--text);
    opacity: 0.5;
    transition: 0.25s;
    &:hover {
      opacity: 1;
    }
  }
  & > div {
    /* background-color: var(--white); */
    & #disqus_recommendations {
      display: none;
    }
  }
`;
