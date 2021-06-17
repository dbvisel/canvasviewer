import styled from "styled-components";

export const PointWrapper = styled.div`
  --borderWidth: 4px;
  --headerHeight: 44px;
  --footerHeight: calc(var(--innerMargin) + var(--borderWidth));
  --sidePadding: calc(
    calc(calc(var(--innerMargin) + var(--innerMargin)) + var(--borderWidth)) +
      var(--borderWidth)
  );
  --annotation: ${(props) => (props.annotation ? 1 : 0)};
  --annotatationAddon: calc(
    calc(1 - var(--annotation)) * calc(var(--borderWidth) + var(--borderWidth))
  );
  --myHeight: calc(
    calc(calc(100% - var(--footerHeight)) - var(--innerMargin)) -
      var(--annotatationAddon)
  );
  background-color: var(--white);
  box-sizing: border-box;
  color: var(--text);
  position: absolute;
  top: ${(props) => props.top || 0}px;
  left: ${(props) => props.left || 0}px;
  padding: var(--innerMargin);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: var(--borderWidth) solid transparent;
  transition: 0.25s;
  cursor: pointer;
  z-index: 2;
  overflow: auto;
  resize: both; // this doesn't seem to work with draggable set
  &.selected {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-color: var(--highlightColor);
    z-index: 9;
  }
  & h2 {
    margin: 0;
    box-sizing: border-box;
    padding-bottom: var(--innerMargin);
    height: calc(
      calc(var(--headerHeight) - var(--innerMargin)) - var(--borderWidth)
    );
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & a {
      color: var(--text);
      opacity: 0.5;
      transition: 0.25s;
      &:hover {
        opacity: 1;
      }
    }
  }
  & h3 {
    box-sizing: border-box;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &.annotation {
    --footerHeight: calc(calc(var(--innerMargin) + var(--borderWidth)) + 31px);
    & h3 {
      padding-top: var(--innerMargin);
      text-align: right;
      line-height: 16px;
      font-size: 16px;
      height: calc(
        var(--footerHeight) -
          calc(var(--innerMargin) + calc(var(--innerMargin)))
      );
      & a {
        display: inline-flex;
        align-items: center;
        opacity: 0.5;
        transition: 0.25s;
        color: var(--text);
        text-decoration: none;
        & > svg + span {
          margin-left: 8px;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
