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
import CommentPoint from "./../CommentPoint";
import SoftwareEmbed from "./../SoftwareEmbed";
import { PointWrapper } from "./elements";
import { ItemTypes } from "./../Canvas";

const Point = ({
  index,
  pointData,
  selectedPoint,
  selectThis,
  showAnnotation,
  canvasId,
  setPresentationMode,
}) => {
  const myTitle = pointData.title || `Point ${index + 1}`;
  const myUrl = `${Config.disqus.url}/${pointData.id}`;
  const myCommentId = canvasId + "-" + pointData.id;

  const [, /*{ isDragging }, */ drag] = useDrag(
    () => ({
      type: ItemTypes.POINT,
      item: {
        ...pointData,
        left: pointData.left,
        top: pointData.top,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [pointData]
  );
  // if (isDragging) {
  //   console.log("dragging!", pointData);
  // }

  return (
    <PointWrapper
      id={pointData.id}
      top={pointData.top}
      left={pointData.left}
      className={`point ${selectedPoint === pointData.id ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        selectThis(pointData.id);
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
      {pointData.type && pointData.type === "video" ? (
        <VideoEmbed
          id={myCommentId}
          src={pointData.url}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "audio" ? (
        <AudioEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "book" ? (
        <BookEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "image" ? (
        <ImageEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "web" ? (
        <WebEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "comment" ? (
        <CommentPoint
          text={pointData.text}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : pointData.type && pointData.type === "software" ? (
        <SoftwareEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
        />
      ) : (
        <div>{JSON.stringify(pointData)}</div>
      )}
      <h3>
        <a
          href="/#"
          className="comment"
          onClick={(e) => {
            e.preventDefault();
            showAnnotation(pointData.id);
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
    </PointWrapper>
  );
};

export default Point;
