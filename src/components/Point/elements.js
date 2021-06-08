import styled from "styled-components";

export const PointWrapper = styled.div`
  background-color: var(--white);
  box-sizing: border-box;
  color: var(--text);
  position: absolute;
  top: ${(props) => props.top || 0}px;
  left: ${(props) => props.left || 0}px;
  padding: var(--innerMargin);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border: 4px solid transparent;
  transition: 0.25s;
  cursor: pointer;
  z-index: 2;
  &.selected {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-color: var(--highlightColor);
    z-index: 9;
  }
  & h2 {
    margin: 0 0 var(--innerMargin) 0;
    font-size: 16px;
    display: flex;
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
    margin: var(--innerMargin) 0 0 0;
    font-size: 16px;
    text-align: right;
    line-height: 16px;
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
`;
