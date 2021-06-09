import * as React from "react";
import {
  VideoEmbed,
  AudioEmbed,
  ImageEmbed,
  SoftwareEmbed,
  WebEmbed,
  BookEmbed,
  CanvasEmbed,
  CommentPoint,
} from "./../PointTypes";
import SelectedPoint from "./../SelectedPoint";
import { PresentationModeDiv, PresentationPointWrapper } from "./elements";

const PresentationPoint = ({ pointData, canvasId }) => {
  const myCommentId = canvasId + "-" + pointData.id;

  return (
    <PresentationPointWrapper>
      {pointData.type && pointData.type === "video" ? (
        <VideoEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "audio" ? (
        <AudioEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "canvas" ? (
        <CanvasEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          title={pointData.title}
          text={pointData.text}
          presentationMode
        />
      ) : pointData.type && pointData.type === "book" ? (
        <BookEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "image" ? (
        <ImageEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "web" ? (
        <WebEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "software" ? (
        <SoftwareEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          presentationMode
        />
      ) : pointData.type && pointData.type === "comment" ? (
        <CommentPoint
          text={pointData.text}
          id={myCommentId}
          presentationMode
          width={pointData.width}
          height={pointData.height}
          isStartPoint={pointData.isStartPoint}
          isStopPoint={pointData.isStopPoint}
        />
      ) : (
        <div>{JSON.stringify(pointData)}</div>
      )}
    </PresentationPointWrapper>
  );
};

const PresentationMode = ({
  currentCanvas,
  selectedPoint,
  setSelectedPoint,
}) => {
  React.useEffect(() => {
    // console.log("firing useeffect");
    if (selectedPoint === "") {
      console.log("No point selected!");
      // console.log(currentCanvas.points[0].id);
      setSelectedPoint(
        currentCanvas.points[0] ? currentCanvas.points[0].id : ""
      );
    }
  }, [selectedPoint, setSelectedPoint, currentCanvas]);
  // console.log(currentCanvas.points, selectedPoint);
  return selectedPoint ? (
    <PresentationModeDiv>
      <div>
        <PresentationPoint
          canvasId={currentCanvas.id}
          pointData={
            currentCanvas.points.filter((x) => x.id === selectedPoint)[0]
          }
        />
      </div>
      <nav>
        <SelectedPoint
          isBottom
          currentCanvas={currentCanvas}
          point={currentCanvas.points.filter((x) => x.id === selectedPoint)[0]}
          setSelectedPoint={setSelectedPoint}
        />
      </nav>
    </PresentationModeDiv>
  ) : null;
};

export default PresentationMode;
