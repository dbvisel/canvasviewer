import * as React from "react";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Canvas from "./../Canvas";
import SelectedPoint from "./../SelectedPoint";
import { CanvasModeWrapper } from "./elements";

const CanvasMode = ({
  currentCanvas,
  selectedPoint,
  setSelectedPoint,
  showAnnotation,
  setPresentationMode,
  useAnnotation,
  hasSpine,
}) => {
  const canvas = React.useRef();
  const myStartPoints = currentCanvas.points.filter((x) => x.isStartPoint);

  React.useEffect(() => {
    if (selectedPoint && canvas.current) {
      const canvasPosition = canvas.current.getBoundingClientRect();
      const thisPoint = canvas.current.querySelector(`#${selectedPoint}`);
      if (thisPoint) {
        const thisPointPosition = thisPoint.getBoundingClientRect();

        const deltaX = thisPointPosition.x - canvasPosition.x - 10;
        const deltaY = thisPointPosition.y - canvasPosition.y - 10;
        // console.log(canvasPosition, thisPointPosition, deltaX, deltaY);

        canvas.current.scrollTo({
          top: deltaY,
          left: deltaX,
          behavior: "smooth",
        });
      }
    }
  }, [selectedPoint]);

  return (
    <CanvasModeWrapper key={currentCanvas.id} id="canvasmode">
      {selectedPoint ? (
        <nav>
          <SelectedPoint
            currentCanvas={currentCanvas}
            point={
              currentCanvas.points.filter((x) => x.id === selectedPoint)[0]
            }
            setSelectedPoint={setSelectedPoint}
            setPresentationMode={setPresentationMode}
          />
          ) : myStartPoints ? (
          <div>
            <h2>Go to start:</h2>
            {myStartPoints.map((startpoint, index) => (
              <button
                key={`startpoint_${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPoint(startpoint.id);
                }}
              >
                {startpoint.title
                  ? startpoint.title
                  : myStartPoints.length > 1
                  ? `Start point ${index + 1}`
                  : "Start point"}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
      <DndProvider backend={HTML5Backend}>
        <main
          ref={canvas}
          key={`dummy_${currentCanvas.id}`}
          onClick={(e) => {
            e.preventDefault();
            setSelectedPoint("");
          }}
        >
          <Canvas
            points={currentCanvas.points}
            selectedPoint={selectedPoint}
            setSelectedPoint={setSelectedPoint}
            showAnnotation={showAnnotation}
            canvasId={currentCanvas.id}
            setPresentationMode={setPresentationMode}
            useAnnotation={useAnnotation}
            hasSpine={hasSpine}
          />
        </main>
      </DndProvider>
    </CanvasModeWrapper>
  );
};

export default CanvasMode;

CanvasMode.propTypes = {
  currentCanvas: PropTypes.object,
  selectedPoint: PropTypes.string,
  setSelectedPoint: PropTypes.func,
  showAnnotation: PropTypes.func,
  useAnnotation: PropTypes.bool,
  hasSpine: PropTypes.bool,
};
