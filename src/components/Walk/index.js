import React from "react";
import { useDrop } from "react-dnd";
// import walkData from "../../assets/walkData";
import Stop from "./../Stop";
import Config from "./../../config";
import { ThickLine } from "./elements";

//TODO: If there's been dragging, we need to recalc line positions. Maybe that should be done in state?
// TODO: need to show previous things that link to currently selected

export const ItemTypes = { STOP: "stop" };

const defaultTop = (index) => index * 100 + 10;
const defaultLeft = (index) => index * 100 + 10;

const getCenter = (stop) => {
  // TODO: deal with actuality rather than what's defined
  const defaults = Config.defaultSizes[stop.type];
  if (typeof stop.left === "undefined") {
    stop.left = defaultLeft(stop.index);
  }
  if (typeof stop.top === "undefined") {
    stop.top = defaultTop(stop.index);
  }
  if (typeof stop.width === "undefined") {
    stop.width = defaults.width;
  }
  if (typeof stop.height === "undefined") {
    stop.height = defaults.height;
  }
  if (stop.width && stop.left && stop.top && stop.height) {
    const centerX = stop.left + stop.width / 2;
    const centerY = stop.top + stop.height / 2;
    return { x: centerX, y: centerY };
  }
  console.log(stop);
  return { x: "missing!", y: "missing!" };
};

const Walk = ({
  stops,
  selectedStop,
  setSelectedStop,
  showAnnotation,
  walkId,
  setPresentationMode,
}) => {
  const [boxes, setBoxes] = React.useState([]);
  const [myWidth, setMyWidth] = React.useState("100%");
  const [myHeight, setMyHeight] = React.useState("100%");
  const innerCanvas = React.useRef(null);

  // console.log(selectedStop);

  React.useEffect(() => {
    if (!boxes.length) {
      // console.log("Setting boxes!");
      const newBoxes = [];
      for (let i = 0; i < stops.length; i++) {
        newBoxes[i] = stops[i];
        newBoxes[i].index = i;
        if (typeof stops[i].top === "undefined") {
          newBoxes[i].top = defaultTop(i);
        }
        if (typeof stops[i].left === "undefined") {
          newBoxes[i].left = defaultLeft(i);
        }
      }
      setBoxes(newBoxes);
    }
  }, [stops, boxes.length]);

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
      accept: ItemTypes.STOP,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.index, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  React.useEffect(() => {
    //TODO: make this fire when everything has been drawn!
    if (innerCanvas.current) {
      const stops = innerCanvas.current.querySelectorAll(".stop");
      if (stops.length) {
        let rightMost = 0;
        let bottomMost = 0;
        for (let i = 0; i < stops.length; i++) {
          const thisSize = stops[i].getBoundingClientRect();
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

  const getNextStop = (id) => {
    if (id) {
      const results = stops.filter((x) => x.id === id);
      if (results.length) {
        return results[0];
      }
    }
    return null;
  };

  const thisStopIsMainSpine = (stop) => {
    if (typeof stop.nextStop !== "undefined") {
      return true;
    }
    // TODO: Check if another stop in the walk uses this as nextStop.
    const nextStops = boxes
      .map((x) => x.nextStop)
      .filter((x) => typeof x !== "undefined");
    if (nextStops.indexOf(stop.id) > -1) {
      return true;
    }
    return false;
  };

  const getMyParentStop = (stop) => {
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].sideTrips && boxes[i].sideTrips.length) {
        if (boxes[i].sideTrips.indexOf(stop.id) > -1) {
          return boxes[i].id;
        }
      }
    }
    return null;
  };

  return (
    <div style={{ width: myWidth, height: myHeight }} ref={innerCanvas}>
      <div ref={drop} style={{ width: "100%", height: "100%" }}>
        {boxes.map((stop, index) => {
          const { x, y } = getCenter(stop);
          const nextStop = stop.nextStop ? getNextStop(stop.nextStop) : {};
          // console.log(
          //   stop.id,
          //   thisStopIsMainSpine(stop),
          //   getMyParentStop(stop)
          // );
          return (
            <React.Fragment key={stop.id}>
              {thisStopIsMainSpine(stop) ||
              getMyParentStop(stop) === selectedStop ||
              stop.id === selectedStop ? (
                <Stop
                  key={stop.id}
                  index={index}
                  stopData={stop}
                  selectedStop={selectedStop}
                  showAnnotation={showAnnotation}
                  setPresentationMode={setPresentationMode}
                  selectThis={() => {
                    setSelectedStop(stop.id);
                  }}
                  walkId={walkId}
                />
              ) : null}
              {stop.nextStop ? (
                <ThickLine
                  x1={x}
                  y1={y}
                  x2={getCenter(nextStop).x}
                  y2={getCenter(nextStop).y}
                />
              ) : null}
              {stop.sideTrips && stop.sideTrips.length
                ? stop.sideTrips.map((sideTrip, index) => {
                    const thisSideTrip = getNextStop(sideTrip);
                    // TODO: check whether to draw the line
                    const drawLine =
                      (thisStopIsMainSpine(stop) ||
                        getMyParentStop(stop) === selectedStop) &&
                      (thisStopIsMainSpine(thisSideTrip) ||
                        getMyParentStop(thisSideTrip) === selectedStop);

                    return drawLine ? (
                      <ThickLine
                        key={index}
                        x1={x}
                        y1={y}
                        x2={getCenter(thisSideTrip).x}
                        y2={getCenter(thisSideTrip).y}
                        isAnnotation
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

export default Walk;
