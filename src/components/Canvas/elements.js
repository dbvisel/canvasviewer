import styled from "styled-components";

export const ThickLine = styled.div`
  position: absolute;
  height: 10px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
  z-index: 1;
  opacity: 1;
  left: ${(props) => props.x1 + "px"};
  top: ${(props) => props.y1 + "px"};
  width: ${({ x1, x2, y1, y2 }) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + "px"};
  transform-origin: left center;
  transform: rotate(
    ${({ x1, x2, y1, y2 }) => {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      return angle + "rad";
    }}
  );
`;

export const ThinLine = styled.div`
  position: absolute;
  border-top: 4px dotted var(--white);
  z-index: 1;
  opacity: 0.5;
  left: ${(props) => props.x1 + "px"};
  top: ${(props) => props.y1 + "px"};
  width: ${({ x1, x2, y1, y2 }) =>
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + "px"};
  transform-origin: left center;
  transform: rotate(
    ${({ x1, x2, y1, y2 }) => {
      const angle = Math.atan2(y2 - y1, x2 - x1);
      return angle + "rad";
    }}
  );
`;
