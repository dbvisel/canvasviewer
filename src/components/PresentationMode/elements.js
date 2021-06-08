import styled from "styled-components";

export const PresentationModeDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  & .verticalonly {
    display: none;
  }
  & > div {
    box-sizing: border-box;
    height: 100%;
    background-color: var(--black);
    padding: var(--innerMargin);
    display: flex;
    position: relative;
  }
  & > nav {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    min-height: 100px;
    padding: var(--outerMargin);
  }
`;

export const PresentationPointWrapper = styled.div`
  box-sizing: border-box;
  background-color: var(--white);
  color: var(--text);
  width: 100%;
  height: 100%;
  padding: var(--innerMargin);
  padding: 0;
  border-radius: var(--innerMargin);
  --pointColor: var(--highlightColor);
  display: flex;
  justify-content: center;
  align-items: center;
`;
