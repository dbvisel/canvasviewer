import styled from "styled-components";

export const SelectedStopDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isBottom ? "row" : "column")};
  justify-content: center;
  & button {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    & span {
      font-size: 150%;
      margin: 0 4px;
      display: inline-block;
      padding-bottom: 4px;
    }
  }
  & .sidetrips {
    & h4 {
      margin: 0;
    }
  }
  &.horizontal {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    user-select: none;
    & p {
      margin: 0;
    }
    & > div {
      margin-left: auto;
      margin-right: auto;
    }
    & .sidetrips {
      display: flex;
      margin-top: 8px;
      align-items: center;
      & h4,
      & button {
        margin: 0 8px 0 0;
        & span {
          font-size: 100%;
          padding-bottom: 0;
        }
      }
    }
  }
`;
