import React from "react";
import { CommentStopDiv } from "./elements";

const CommentStop = ({ text, presentationMode, isStartPoint, isStopPoint }) => (
  <CommentStopDiv
    className={presentationMode ? "presentationmode" : ""}
    isStartPoint={isStartPoint}
    isStopPoint={isStopPoint}
  >
    <div>{text}</div>
  </CommentStopDiv>
);

export default CommentStop;
