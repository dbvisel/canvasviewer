import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import useResizeObserver from "@react-hook/resize-observer";
import { BiCommentAdd } from "react-icons/bi";
import { FiMaximize2 } from "react-icons/fi";
import { CommentCount } from "disqus-react";
import Config from "./../../config";
import {
  SoftwareEmbed,
  WebEmbed,
  ImageEmbed,
  AudioEmbed,
  BookEmbed,
  CanvasEmbed,
  VideoEmbed,
  CommentPoint,
} from "./../PointTypes";
import { PointWrapper } from "./elements";
import { ItemTypes } from "./../Canvas";

// TODO: fix the present icon so it's more comprehensible
// TODO: fix sizing. Set sizing on outer wrapper. Set inner point to be 100% 100% (minus height of header + footer) so we can use resize

const Point = ({
  index,
  pointData,
  setPointData,
  selectedPoint,
  selectThis,
  showAnnotation,
  canvasId,
  setPresentationMode,
  useAnnotation,
}) => {
  const [oldSize, setOldSize] = React.useState({ width: 0, height: 0 });
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

  /*** START RESIZE HANDLER SECTION ***/

  const useSize = (target) => {
    const [size, setSize] = React.useState();

    React.useLayoutEffect(() => {
      setSize(target.current.getBoundingClientRect());
    }, [target]);

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect));
    return size;
  };

  const pointRef = React.useRef(null);
  const size = useSize(pointRef);

  React.useEffect(() => {
    if (oldSize && size && size.height && size.width) {
      if (size.height !== oldSize.height || size.width !== oldSize.width) {
        const newPointData = pointData;
        newPointData.width = size.width + 28;
        newPointData.height = size.height + 28;
        setPointData(newPointData);
      }
    }
  }, [size]);

  /*** END RESIZE HANDLER SECTION ***/

  return (
    <PointWrapper
      id={pointData.id}
      top={pointData.top}
      left={pointData.left}
      data-width={size && size.width}
      data-height={size && size.width}
      className={`point ${selectedPoint === pointData.id ? "selected" : ""} ${
        useAnnotation ? "annotation" : ""
      }`}
      style={{
        width:
          size && size.width
            ? size.width + 28
            : pointData.width ||
              Config.defaultSizes[pointData.type].width + "px",
        height:
          size && size.height
            ? size.height + 28
            : pointData.type === "comment"
            ? "initial"
            : pointData.height ||
              Config.defaultSizes[pointData.type].height + "px",
      }}
      onClick={(e) => {
        e.stopPropagation();
        selectThis(pointData.id);
      }}
      annotation={useAnnotation}
      ref={pointRef}
    >
      <h2 ref={drag}>
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
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "canvas" ? (
        <CanvasEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          title={pointData.title}
          text={pointData.text}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "audio" ? (
        <AudioEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "book" ? (
        <BookEmbed
          src={pointData.url}
          id={myCommentId}
          // width={pointData.width}
          // height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "image" ? (
        <ImageEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "web" ? (
        <WebEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "comment" ? (
        <CommentPoint
          text={pointData.text}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : pointData.type && pointData.type === "software" ? (
        <SoftwareEmbed
          src={pointData.url}
          id={myCommentId}
          width={pointData.width}
          height={pointData.height}
          noPreview={pointData.noPreview}
        />
      ) : (
        <div>{JSON.stringify(pointData)}</div>
      )}
      <h3>
        {useAnnotation ? (
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
        ) : null}
      </h3>
    </PointWrapper>
  );
};

export default Point;

Point.propTypes = {
  index: PropTypes.number,
  pointData: PropTypes.object,
  setPointData: PropTypes.func,
  selectedPoint: PropTypes.string,
  selectThis: PropTypes.func,
  showAnnotation: PropTypes.func,
  canvasId: PropTypes.string,
  setPresentationMode: PropTypes.func,
  useAnnotation: PropTypes.bool,
};
