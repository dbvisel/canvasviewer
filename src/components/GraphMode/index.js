import * as React from "react";
import Graph from "react-graph-vis";
import SelectedStop from "./../SelectedStop";
import { GraphModeDiv } from "./elements";

//TODO: distinguish nextStop/sideTrips

const GraphMode = ({
  currentWalk,
  selectedStop,
  setSelectedStop,
  setPresentationMode,
}) => {
  const [graph, setGraph] = React.useState(null);
  const [walkId, setWalkId] = React.useState(currentWalk.id);
  const graphElement = React.useRef();

  React.useEffect(() => {
    console.log("Rebuilding graph!");
    setWalkId(currentWalk.id);
    const makeEdges = (stops) => {
      const edges = [];
      for (let i = 0; i < stops.length; i++) {
        if (stops[i].nextStop) {
          edges[edges.length] = {
            from: currentWalk.id + "_" + stops[i].id,
            to: currentWalk.id + "_" + stops[i].nextStop,
          };
        }
        if (stops[i].sideTrips && stops[i].sideTrips.length) {
          for (let j = 0; j < stops[i].sideTrips.length; j++) {
            edges[edges.length] = {
              from: currentWalk.id + "_" + stops[i].id,
              to: currentWalk.id + "_" + stops[i].sideTrips[j],
            };
          }
        }
      }
      return edges;
    };

    const thisGraph = {
      nodes: currentWalk.stops.map((x) => {
        return {
          id: currentWalk.id + "_" + x.id,
          label: x.title || x.id,
          type: x.type,
        };
      }),
      edges: makeEdges(currentWalk.stops),
    };
    setGraph(thisGraph);
  }, [currentWalk]);

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
        setSelectedStop(nodes[0].split(walkId + "_")[1]);
      }
    },
  };
  console.log(currentWalk, graph, graphElement.current);

  return (
    <GraphModeDiv>
      {graph !== null ? (
        <Graph
          ref={graphElement}
          key={walkId}
          graph={graph}
          options={options}
          events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      ) : null}
      <nav>
        {selectedStop ? (
          <SelectedStop
            currentWalk={currentWalk}
            stop={currentWalk.stops.filter((x) => x.id === selectedStop)[0]}
            setSelectedStop={setSelectedStop}
            setPresentationMode={setPresentationMode}
          />
        ) : null}
      </nav>
    </GraphModeDiv>
  );
};

export default GraphMode;
