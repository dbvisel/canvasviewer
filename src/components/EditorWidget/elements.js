import styled from "styled-components";

export const EditorWidgetDiv = styled.nav`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: var(--innerMargin);
  background-color: var(--backgroundColor);
  border-top-left-radius: 10px;
  & h2 {
    margin: 0;
  }
  & label {
    display: flex;
    justify-content: space-between;
    margin: var(--innerMargin) 0;
    box-sizing: border-box;
    white-space: nowrap;
    & input,
    & select,
    & textarea {
      box-sizing: border-box;
      margin-left: var(--innerMargin);
      width: 100%;
      max-width: 180px;
      font-family: var(--bodyFont);
      font-size: 16px;
      padding: 4px;
    }
  }
`;
