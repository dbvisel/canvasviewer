import * as React from "react";
import Header from "./../components/Header";
import Layout from "./../components/Layout";
import PresentationMode from "./../components/PresentationMode";
import WalkMode from "./../components/WalkMode";
import GraphMode from "./../components/GraphMode";
import AnnotationPopUp from "./../components/AnnotationPopUp";

const TemplatePage = ({ pageContext }) => {
  const currentWalk = pageContext.myData;
  const [selectedStop, setSelectedStop] = React.useState("");
  const [mode, setMode] = React.useState("walk");
  const [annotationShown, setAnnotationShown] = React.useState(false);
  const [annotationId, setAnnotationId] = React.useState(currentWalk.id);
  const [annotationTitle, setAnnotationTitle] = React.useState(
    currentWalk.title
  );
  const [flag, setFlag] = React.useState(false);

  React.useEffect(() => {
    if (selectedStop) {
      const thisStop = currentWalk.stops.filter(
        (x) => x.id === selectedStop
      )[0];
      setAnnotationId(currentWalk.id + "-" + selectedStop);
      setAnnotationTitle(
        thisStop.title || `Stop ${currentWalk.stops.indexOf(thisStop) + 1}`
      );
    } else {
      setAnnotationId(currentWalk.id);
      setAnnotationTitle(currentWalk.title);
    }
  }, [selectedStop, currentWalk]);

  return (
    <Layout>
      <Header
        currentWalk={currentWalk}
        mode={mode}
        setMode={setMode}
        setSelectedStop={setSelectedStop}
        setAnnotationShown={() => {
          setAnnotationId(currentWalk.id);
          setAnnotationShown(true);
        }}
        key={mode + String(flag)}
      />
      {mode === "presentation" ? (
        <PresentationMode
          currentWalk={currentWalk}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
        />
      ) : mode === "walk" ? (
        <WalkMode
          currentWalk={currentWalk}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
          showAnnotation={(x) => {
            setAnnotationId(currentWalk.id + "-" + x);
            setAnnotationShown(true);
          }}
          setPresentationMode={() => {
            setMode("presentation");
          }}
        />
      ) : (
        <GraphMode
          currentWalk={currentWalk}
          selectedStop={selectedStop}
          setSelectedStop={setSelectedStop}
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
