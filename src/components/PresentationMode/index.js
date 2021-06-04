import * as React from "react";
import VideoEmbed from "./../VideoEmbed";
import AudioEmbed from "./../AudioEmbed";
import BookEmbed from "./../BookEmbed";
import ImageEmbed from "./../ImageEmbed";
import CommentStop from "./../CommentStop";
import SelectedStop from "./../SelectedStop";
import SoftwareEmbed from "./../SoftwareEmbed";
import WebEmbed from "./../WebEmbed";
import { PresentationModeDiv, PresentationStopWrapper } from "./elements";

const PresentationStop = ({ stopData, walkId }) => {
  const myCommentId = walkId + "-" + stopData.id;

  return (
    <PresentationStopWrapper>
      {stopData.type && stopData.type === "video" ? (
        <VideoEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "audio" ? (
        <AudioEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "book" ? (
        <BookEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "image" ? (
        <ImageEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "web" ? (
        <WebEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "software" ? (
        <SoftwareEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
          presentationMode
        />
      ) : stopData.type && stopData.type === "comment" ? (
        <CommentStop
          text={stopData.text}
          id={myCommentId}
          presentationMode
          width={stopData.width}
          height={stopData.height}
          isStartPoint={stopData.isStartPoint}
          isStopPoint={stopData.isStopPoint}
        />
      ) : (
        <div>{JSON.stringify(stopData)}</div>
      )}
    </PresentationStopWrapper>
  );
};

const PresentationMode = ({ currentWalk, selectedStop, setSelectedStop }) => {
  React.useEffect(() => {
    // console.log("firing useeffect");
    if (selectedStop === "") {
      console.log("No stop selected!");
      // console.log(currentWalk.stops[0].id);
      setSelectedStop(currentWalk.stops[0].id);
    }
  }, [selectedStop, setSelectedStop, currentWalk]);
  // console.log(currentWalk.stops, selectedStop);
  return selectedStop ? (
    <PresentationModeDiv>
      <div>
        <PresentationStop
          walkId={currentWalk.id}
          stopData={currentWalk.stops.filter((x) => x.id === selectedStop)[0]}
        />
      </div>
      <nav>
        <SelectedStop
          isBottom
          currentWalk={currentWalk}
          stop={currentWalk.stops.filter((x) => x.id === selectedStop)[0]}
          setSelectedStop={setSelectedStop}
        />
      </nav>
    </PresentationModeDiv>
  ) : null;
};

export default PresentationMode;
