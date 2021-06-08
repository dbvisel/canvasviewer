import React from "react";
import { CommentPointDiv } from "./elements";

const CommentPoint = ({
  text,
  presentationMode,
  isStartPoint,
  isStopPoint,
}) => (
  <CommentPointDiv
    className={presentationMode ? "presentationmode" : ""}
    isStartPoint={isStartPoint}
    isStopPoint={isStopPoint}
  >
    <div>{text}</div>
  </CommentPointDiv>
);

export default CommentPoint;
