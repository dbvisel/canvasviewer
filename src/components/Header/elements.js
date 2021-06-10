import styled from "styled-components";

export const HeaderDiv = styled.header`
  background-color: var(--backgroundColor);
  padding: var(--outerMargin);
  height: var(--headerHeight);
  max-height: var(--headerHeight);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & h1 {
    margin: 0 auto 0 0;
    display: inline-flex;
    justify-content: space-between;
    & > a {
      text-decoration: none;
      margin-left: 8px;
      opacity: 0.5;
      color: var(--text);
      transition: 0.5s;
      font-size: 24px;
      display: inline-flex;
      align-items: center;
      &.download {
        align-items: baseline;
        font-size: 18px;
        position: relative;
        top: 4px;
        margin: 0 20px;
        &:after {
          margin-left: 4px;
          content: " ↓";
        }
      }
      & > svg + span {
        margin-left: 8px;
      }
      &:hover {
        opacity: 1;
      }
    }
  }
  & p {
    margin: 0;
    & + p {
      margin-left: 1em;
    }
  }
`;
