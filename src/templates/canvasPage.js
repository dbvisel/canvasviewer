import * as React from "react";
import Header from "./../components/Header";
import Layout from "./../components/Layout";
import PresentationMode from "./../components/PresentationMode";
import CanvasMode from "./../components/CanvasMode";
import GraphMode from "./../components/GraphMode";
import AnnotationPopUp from "./../components/AnnotationPopUp";

const TemplatePage = ({ pageContext }) => {
  const currentCanvas = pageContext.myData;
  const useAnnotation = currentCanvas.useAnnotation || false;

  const [selectedPoint, setSelectedPoint] = React.useState("");
  const [mode, setMode] = React.useState("canvas");
  const [annotationShown, setAnnotationShown] = React.useState(false);
  const [annotationId, setAnnotationId] = React.useState(currentCanvas.id);
  const [annotationTitle, setAnnotationTitle] = React.useState(
    currentCanvas.title
  );
  const [flag, setFlag] = React.useState(false);

  React.useEffect(() => {
    // check if canvas has a spine
  }, []);

  React.useEffect(() => {
    if (selectedPoint) {
      const thisPoint = currentCanvas.points.filter(
        (x) => x.id === selectedPoint
      )[0];
      setAnnotationId(currentCanvas.id + "-" + selectedPoint);
      setAnnotationTitle(
        thisPoint.title ||
          `Point ${currentCanvas.points.indexOf(thisPoint) + 1}`
      );
    } else {
      setAnnotationId(currentCanvas.id);
      setAnnotationTitle(currentCanvas.title);
    }
  }, [selectedPoint, currentCanvas]);

  return (
    <Layout>
      <Header
        currentCanvas={currentCanvas}
        mode={mode}
        setMode={setMode}
        useAnnotation={useAnnotation}
        setAnnotationShown={() => {
          setAnnotationId(currentCanvas.id);
          setAnnotationShown(true);
        }}
        key={mode + String(flag)}
      />
      {mode === "presentation" ? (
        <PresentationMode
          currentCanvas={currentCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
        />
      ) : mode === "canvas" ? (
        <CanvasMode
          currentCanvas={currentCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          showAnnotation={(x) => {
            setAnnotationId(currentCanvas.id + "-" + x);
            setAnnotationShown(true);
          }}
          setPresentationMode={() => {
            setMode("presentation");
          }}
          useAnnotation={useAnnotation}
        />
      ) : (
        <GraphMode
          currentCanvas={currentCanvas}
          selectedPoint={selectedPoint}
          setSelectedPoint={setSelectedPoint}
          setPresentationMode={() => {
            setMode("presentation");
          }}
        />
      )}
      <AnnotationPopUp
        id={annotationId}
        annotationTitle={annotationTitle}
        visible={annotationShown}
        closeAnnotation={() => {
          setAnnotationShown(false);
          setFlag(() => !flag);
        }}
      />
    </Layout>
  );
};

export default TemplatePage;
