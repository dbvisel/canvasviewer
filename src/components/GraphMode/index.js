import * as React from "react";
import Graph from "react-graph-vis";
import SelectedPoint from "./../SelectedPoint";
import { GraphModeDiv } from "./elements";

//TODO: distinguish nextPoint/sideTrips

const GraphMode = ({
  currentCanvas,
  selectedPoint,
  setSelectedPoint,
  setPresentationMode,
}) => {
  const [graph, setGraph] = React.useState(null);
  const graphElement = React.useRef();

  React.useEffect(() => {
    // NOTE: this only actually fires when this component is initialized. We don't actually change canvas while this mode is instantiated
    console.log("Rebuilding graph!");
    const makeEdges = (points) => {
      const edges = [];
      for (let i = 0; i < points.length; i++) {
        if (points[i].nextPoint) {
          edges[edges.length] = {
            from: currentCanvas.id + "_" + points[i].id,
            to: currentCanvas.id + "_" + points[i].nextPoint,
          };
        }
        if (points[i].sideTrips && points[i].sideTrips.length) {
          for (let j = 0; j < points[i].sideTrips.length; j++) {
            edges[edges.length] = {
              from: currentCanvas.id + "_" + points[i].id,
              to: currentCanvas.id + "_" + points[i].sideTrips[j],
            };
          }
        }
      }
      return edges;
    };

    const thisGraph = {
      nodes: currentCanvas.points.map((x) => {
        return {
          id: currentCanvas.id + "_" + x.id,
          label: x.title || x.id,
          type: x.type,
        };
      }),
      edges: makeEdges(currentCanvas.points),
    };
    setGraph(thisGraph);
  }, [currentCanvas]);

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "100%",
  };

  const events = {
    select: function (event) {
      var { nodes /*, edges*/ } = event;
      // console.log(nodes, edges);
      if (nodes.length) {
        console.log(nodes[0]);
        setSelectedPoint(nodes[0].split(currentCanvas.id + "_")[1]);
      }
    },
  };
  // console.log(currentCanvas, graph, graphElement.current);

  return (
    <GraphModeDiv>
      {graph !== null ? (
        <Graph
          ref={graphElement}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      ) : null}
      <nav>
        {selectedPoint ? (
          <SelectedPoint
            currentCanvas={currentCanvas}
            point={
              currentCanvas.points.filter((x) => x.id === selectedPoint)[0]
            }
            setSelectedPoint={setSelectedPoint}
            setPresentationMode={setPresentationMode}
          />
        ) : null}
      </nav>
    </GraphModeDiv>
  );
};

export default GraphMode;
