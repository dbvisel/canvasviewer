import React from "react";
import { useDrag } from "react-dnd";
import { BiCommentAdd } from "react-icons/bi";
import { FiMaximize2 } from "react-icons/fi";
import { CommentCount } from "disqus-react";
import Config from "./../../config";
import VideoEmbed from "./../VideoEmbed";
import AudioEmbed from "./../AudioEmbed";
import BookEmbed from "./../BookEmbed";
import ImageEmbed from "./../ImageEmbed";
import WebEmbed from "./../WebEmbed";
import CommentStop from "./../CommentStop";
import SoftwareEmbed from "./../SoftwareEmbed";
import { StopWrapper } from "./elements";
import { ItemTypes } from "./../Walk";

const Stop = ({
  index,
  stopData,
  selectedStop,
  selectThis,
  showAnnotation,
  walkId,
  setPresentationMode,
}) => {
  const myTitle = stopData.title || `Stop ${index + 1}`;
  const myUrl = `${Config.disqus.url}/${stopData.id}`;
  const myCommentId = walkId + "-" + stopData.id;

  const [, /*{ isDragging }, */ drag] = useDrag(
    () => ({
      type: ItemTypes.STOP,
      item: {
        ...stopData,
        left: stopData.left,
        top: stopData.top,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [stopData]
  );
  // if (isDragging) {
  //   console.log("dragging!", stopData);
  // }

  return (
    <StopWrapper
      id={stopData.id}
      top={stopData.top}
      left={stopData.left}
      className={`stop ${selectedStop === stopData.id ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        selectThis(stopData.id);
      }}
      ref={drag}
    >
      <h2>
        {myTitle}
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            setPresentationMode(true);
          }}
        >
          <FiMaximize2 />
        </a>
      </h2>
      {stopData.type && stopData.type === "video" ? (
        <VideoEmbed
          id={myCommentId}
          src={stopData.url}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "audio" ? (
        <AudioEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "book" ? (
        <BookEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "image" ? (
        <ImageEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "web" ? (
        <WebEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "comment" ? (
        <CommentStop
          text={stopData.text}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : stopData.type && stopData.type === "software" ? (
        <SoftwareEmbed
          src={stopData.url}
          id={myCommentId}
          width={stopData.width}
          height={stopData.height}
        />
      ) : (
        <div>{JSON.stringify(stopData)}</div>
      )}
      <h3>
        <a
          href="/#"
          className="comment"
          onClick={(e) => {
            e.preventDefault();
            showAnnotation(stopData.id);
          }}
        >
          <BiCommentAdd />
          <CommentCount
            shortname={Config.disqus.shortName}
            config={{
              url: myUrl,
              identifier:
                myCommentId +
                "_0" /* https://github.com/disqus/disqus-react/issues/83 */,
              title: myCommentId,
              language: "en_US",
            }}
          ></CommentCount>
        </a>
      </h3>
    </StopWrapper>
  );
};

export default Stop;
