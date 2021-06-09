import * as React from "react";
import Layout from "./../components/Layout";
import Header from "./../components/Header";
import PresentationMode from "./../components/PresentationMode";
import GraphMode from "./../components/GraphMode";
import CanvasMode from "./../components/CanvasMode";

const EditorPage = () => {
  const [mode, setMode] = React.useState("canvas");
  const [thisCanvas, setThisCanvas] = React.useState({
    id: "editedCanvas",
    title: "Edit this canvas",
    useAnnotation: false,
    points: [],
  });
  const [hasSpine, setHasSpine] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState("");
  console.log(thisCanvas);
  return (
    <Layout>
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
    </Layout>
  );
};

export default EditorPage;
