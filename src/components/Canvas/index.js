import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Point from "./../Point";
import Config from "./../../config";
import { ThickLine, ThinLine } from "./elements";

//TODO: If there's been dragging, we need to recalc line positions. Maybe that should be done in state?
// TODO: need to show previous things that link to currently selected

export const ItemTypes = { POINT: "point" };

const defaultTop = (index) => index * 100 + 10;
const defaultLeft = (index) => index * 100 + 10;

const getCenter = (point) => {
  // TODO: deal with actuality rather than what's defined
  const defaults = Config.defaultSizes[point.type];
  if (typeof point.left === "undefined") {
    point.left = defaultLeft(point.index);
  }
  if (typeof point.top === "undefined") {
    point.top = defaultTop(point.index);
  }
  if (typeof point.width === "undefined") {
    point.width = defaults.width;
  }
  if (typeof point.height === "undefined") {
    point.height = defaults.height;
  }
  if (point.width && point.left && point.top && point.height) {
    const centerX = point.left + point.width / 2;
    const centerY = point.top + point.height / 2;
    return { x: centerX, y: centerY };
  }
  console.log(point);
  return { x: "missing!", y: "missing!" };
};

const Canvas = ({
  points,
  selectedPoint,
  setSelectedPoint,
  showAnnotation,
  canvasId,
  setPresentationMode,
  useAnnotation,
  hasSpine,
}) => {
  const [boxes, setBoxes] = React.useState([]);
  const [myWidth, setMyWidth] = React.useState("100%");
  const [myHeight, setMyHeight] = React.useState("100%");
  const innerCanvas = React.useRef(null);
  const [dragCount, setDragCount] = React.useState(0);

  // console.log(selectedPoint);

  React.useEffect(() => {
    if (!boxes.length) {
      // console.log("Setting boxes!");
      const newBoxes = [];
      for (let i = 0; i < points.length; i++) {
        newBoxes[i] = points[i];
        newBoxes[i].index = i;
        if (typeof points[i].top === "undefined") {
          newBoxes[i].top = defaultTop(i);
        }
        if (typeof points[i].left === "undefined") {
          newBoxes[i].left = defaultLeft(i);
        }
      }
      setBoxes(newBoxes);
    }
  }, [points, boxes.length]);

  const moveBox = React.useCallback(
    (index, left, top) => {
      const newBoxes = boxes;
      newBoxes[index].left = left;
      newBoxes[index].top = top;
      setBoxes(newBoxes);
    },
    [boxes, setBoxes]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.POINT,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.index, left, top);
        setDragCount((dragCount) => dragCount + 1);
        return undefined;
      },
    }),
    [moveBox]
  );

  React.useEffect(() => {
    //TODO: make this fire when everything has been drawn!
    if (innerCanvas.current) {
      const points = innerCanvas.current.querySelectorAll(".point");
      if (points.length) {
        let rightMost = 0;
        let bottomMost = 0;
        for (let i = 0; i < points.length; i++) {
          const thisSize = points[i].getBoundingClientRect();
          rightMost = Math.max(rightMost, thisSize.x + thisSize.width);
          bottomMost = Math.max(bottomMost, thisSize.y + thisSize.height);
        }
        // console.log(rightMost, bottomMost);
        const padding = 100;
        setMyWidth(rightMost + padding + "px");
        setMyHeight(bottomMost + padding + "px");
      }
    }
  }, []);

  const getNextPoint = (id) => {
    if (id) {
      const results = points.filter((x) => x.id === id);
      if (results.length) {
        return results[0];
      }
    }
    return null;
  };

  const thisPointIsMainSpine = (point) => {
    if (typeof point.nextPoint !== "undefined") {
      return true;
    }
    // TODO: Check if another point in the canvas uses this as nextPoint.
    const nextPoints = boxes
      .map((x) => x.nextPoint)
      .filter((x) => typeof x !== "undefined");
    if (nextPoints.indexOf(point.id) > -1) {
      return true;
    }
    return false;
  };

  const getMyParentPoint = (point) => {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].sideTrips && boxes[i].sideTrips.length) {
        if (boxes[i].sideTrips.indexOf(point.id) > -1) {
          return boxes[i].id;
        }
      }
    }
    return null;
  };

  return (
    <div
      style={{ width: myWidth, height: myHeight }}
      ref={innerCanvas}
      key={`flipflop${dragCount}`}
    >
      <div ref={drop} style={{ width: "100%", height: "100%" }}>
        {boxes.map((point, index) => {
          const { x, y } = getCenter(point);
          const nextPoint = point.nextPoint
            ? getNextPoint(point.nextPoint)
            : {};
          // console.log(
          //   point.id,
          //   thisPointIsMainSpine(poit),
          //   getMyParentPoint(point)
          // );
          return (
            <React.Fragment key={point.id}>
              {thisPointIsMainSpine(point) ||
              getMyParentPoint(point) === selectedPoint ||
              point.id === selectedPoint ||
              !hasSpine ? (
                <Point
                  key={point.id}
                  index={index}
                  pointData={point}
                  selectedPoint={selectedPoint}
                  showAnnotation={showAnnotation}
                  setPresentationMode={setPresentationMode}
                  selectThis={() => {
                    setSelectedPoint(point.id);
                  }}
                  canvasId={canvasId}
                  useAnnotation={useAnnotation}
                />
              ) : null}
              {point.nextPoint ? (
                <ThickLine
                  x1={x}
                  y1={y}
                  x2={getCenter(nextPoint).x}
                  y2={getCenter(nextPoint).y}
                >
                  <div />
                </ThickLine>
              ) : null}
              {point.sideTrips && point.sideTrips.length
                ? point.sideTrips.map((sideTrip, index) => {
                    const thisSideTrip = getNextPoint(sideTrip);
                    // TODO: check whether to draw the line
                    const drawLine =
                      (thisPointIsMainSpine(point) ||
                        getMyParentPoint(point) === selectedPoint) &&
                      (thisPointIsMainSpine(thisSideTrip) ||
                        getMyParentPoint(thisSideTrip) === selectedPoint);

                    return drawLine ? (
                      <ThinLine
                        key={index}
                        x1={x}
                        y1={y}
                        x2={getCenter(thisSideTrip).x}
                        y2={getCenter(thisSideTrip).y}
                      />
                    ) : null;
                  })
                : null}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Canvas;

Canvas.propTypes = {
  useAnnotation: PropTypes.bool,
  hasSpine: PropTypes.bool,
};
