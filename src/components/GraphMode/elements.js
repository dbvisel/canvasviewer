import styled from "styled-components";

export const GraphModeDiv = styled.div`
  width: 100%;
  height: 100%;
  & > nav {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: var(--backgroundColor);
    box-sizing: border-box;
    max-width: var(--navWidth);
    transition: 0.5s;
    padding: var(--innerMargin) var(--innerMargin) var(--outerMargin)
      var(--outerMargin);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    border-top-right-radius: var(--innerMargin);
    & > div + div {
      margin-top: var(--outerMargin);
    }
    & > div:last-child {
      margin-top: auto;
      user-select: none;
    }
    & h2 {
      margin: 0 0 var(--innerMargin) 0;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 16px;
    }
    & p {
      margin: 0;
    }
    & button {
      display: block;
      margin: var(--innerMargin) 0;
    }
  }
`;
