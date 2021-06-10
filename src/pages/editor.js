import * as React from "react";
import Layout from "./../components/Layout";
import Header from "./../components/Header";
import PresentationMode from "./../components/PresentationMode";
import GraphMode from "./../components/GraphMode";
import CanvasMode from "./../components/CanvasMode";
import EditorWidget from "./../components/EditorWidget";

// TODO: add a way to download current JSON?

const EditorPage = () => {
  const [mode, setMode] = React.useState("canvas");
  const [counter, setCounter] = React.useState(0);
  const [thisCanvas, setThisCanvas] = React.useState({
    id: "editedCanvas",
    title: "Edit this canvas",
    useAnnotation: false,
    points: [],
  });
  const [hasSpine, setHasSpine] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState("");

  const getPointFromId = (id) =>
    thisCanvas.points.filter((x) => x.id === id)[0];

  const setPoints = (points) => {
    console.log("new points: ", points);
    const newCanvas = thisCanvas;
    newCanvas.points = points;
    setThisCanvas(newCanvas);
    setCounter((counter) => counter + 1);
    // dealing with error from deleting point
    setSelectedPoint("");
  };

  React.useEffect(() => {
    const hasNext = thisCanvas.points.filter((x) => x.nextPoint).length > 0;
    console.log("Checking for spine: ", thisCanvas.points, hasNext);
    setHasSpine(hasNext);
  }, [thisCanvas.points]);

  // console.log(thisCanvas);
  return (
    <Layout key={`key_${counter}`}>
      <Header
        useAnnotation={false}
        mode={mode}
        currentCanvas={thisCanvas}
        setMode={setMode}
      />
      {mode === "presentation" ? (
        <PresentationMode
          currentCanvas={thisCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
        />
      ) : mode === "canvas" ? (
        <CanvasMode
          currentCanvas={thisCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          setPresentationMode={() => {
            setMode("presentation");
          }}
          useAnnotation={false}
          hasSpine={hasSpine}
        />
      ) : (
        <GraphMode
          currentCanvas={thisCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          setPresentationMode={() => {
            setMode("presentation");
          }}
        />
      )}
      <EditorWidget
        mode={mode}
        selectedPoint={
          selectedPoint === "" ? null : getPointFromId(selectedPoint)
        }
        points={thisCanvas.points}
        setPoints={setPoints}
      />
    </Layout>
  );
};

export default EditorPage;
