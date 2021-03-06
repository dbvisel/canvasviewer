import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import Point from "./../Point";
import Config from "./../../config";
import { ThickLine, ThinLine } from "./elements";

//TODO: If there's been dragging, we need to recalc line positions. Maybe that should be done in state?
// TODO: need to show previous things that link to currently selected
// TODO: add resize handler

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
  scale,
}) => {
  const [boxes, setBoxes] = React.useState([]);
  const [myWidth, setMyWidth] = React.useState("100%");
  const [myHeight, setMyHeight] = React.useState("100%");
  const innerCanvas = React.useRef(null);
  const [dragCount, setDragCount] = React.useState(0);
  const [currentSpinePoint, setCurrentSpinePoint] = React.useState("");

  // console.log(selectedPoint);

  React.useEffect(() => {
    if (!boxes.length) {
      console.log("Setting boxes!");
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
      console.log("About to set boxes!");
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
    if (hasSpine) {
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
    }
    return false;
  };

  const getMyParentPoint = (point) => {
    // TODO: This crashes if there's no spine!
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].sideTrips && boxes[i].sideTrips.length) {
        if (boxes[i].sideTrips.indexOf(point.id) > -1) {
          return boxes[i].id;
        }
      }
    }
    return null;
  };

  const getPointFromId = (id) => boxes.filter((x) => x.id === id)[0];

  const getMySpinePoint = (point) => {
    // TODO: This fails if there's no spine!
    // console.log("Getting spine point for", point.id);
    if (thisPointIsMainSpine(point)) {
      return point;
    }
    const myParentPointId = getMyParentPoint(point);
    const myParentPoint = getPointFromId(myParentPointId);
    return getMySpinePoint(myParentPoint);
  };

  return (
    <div
      style={{ width: myWidth, height: myHeight }}
      ref={innerCanvas}
      key={`flipflop${dragCount}`}
    >
      <div
        ref={drop}
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "top left",
          transition: "0.5s",
          transform: `scale(${scale})`,
        }}
      >
        {boxes.map((point, index) => {
          const { x, y } = getCenter(point);
          const nextPoint = point.nextPoint
            ? getNextPoint(point.nextPoint)
            : {};
          // console.log(point.id, getMySpinePoint(point).id, currentSpinePoint);
          return (
            <React.Fragment key={point.id}>
              {thisPointIsMainSpine(point) ||
              (hasSpine && getMySpinePoint(point).id === currentSpinePoint) ||
              point.id === selectedPoint ||
              !hasSpine ? (
                <Point
                  key={point.id}
                  index={index}
                  pointData={point}
                  setPointData={(newPoint) => {
                    console.log(newPoint);
                    const newBoxes = boxes;
                    newBoxes[index] = newPoint;
                    setBoxes(newBoxes);
                  }}
                  selectedPoint={selectedPoint}
                  showAnnotation={showAnnotation}
                  setPresentationMode={setPresentationMode}
                  selectThis={() => {
                    setSelectedPoint(point.id);
                    if (hasSpine) {
                      if (thisPointIsMainSpine(point)) {
                        setCurrentSpinePoint(point.id);
                      } else {
                        // console.log(point.id, thisPointIsMainSpine(point));
                        // console.log(
                        //   "Parent point: ",
                        //   getMySpinePoint(point).id
                        // );
                        setCurrentSpinePoint(getMySpinePoint(point).id);
                      }
                    }
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
                    if (hasSpine) {
                      const thisSideTrip = getNextPoint(sideTrip);
                      // check whether to draw the line
                      const drawLine =
                        (thisPointIsMainSpine(point) ||
                          getMySpinePoint(point).id === currentSpinePoint) &&
                        (thisPointIsMainSpine(thisSideTrip) ||
                          getMySpinePoint(point).id === currentSpinePoint);
                      // TODO: are we doubling lines? Maybe check?
                      return drawLine ? (
                        <ThinLine
                          key={index}
                          x1={x}
                          y1={y}
                          x2={getCenter(thisSideTrip).x}
                          y2={getCenter(thisSideTrip).y}
                        />
                      ) : null;
                    } else {
                      // there is no spine, just draw the line
                      const thisSideTrip = getNextPoint(sideTrip);
                      return (
                        <ThinLine
                          key={index}
                          x1={x}
                          y1={y}
                          x2={getCenter(thisSideTrip).x}
                          y2={getCenter(thisSideTrip).y}
                        />
                      );
                    }
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
  points: PropTypes.array,
  setSelectedPoint: PropTypes.func,
  showAnnotation: PropTypes.func,
  canvasId: PropTypes.string,
  setPresentationMode: PropTypes.func,
  useAnnotation: PropTypes.bool,
  hasSpine: PropTypes.bool,
  scale: PropTypes.number,
};
