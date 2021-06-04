import React from "react";
import { SelectedStopDiv } from "./elements";

const usePreviousSideTrips = false;

// TODO: clean this up. It's a mess.

const SelectedStop = ({
  stop,
  setSelectedStop,
  setPresentationMode,
  currentWalk,
  isBottom,
}) => {
  const getPreviousStop = (id) => {
    let previousStop = "";
    for (let i = 0; i < currentWalk.stops.length; i++) {
      if (
        currentWalk.stops[i].nextStop &&
        currentWalk.stops[i].nextStop === id
      ) {
        previousStop = currentWalk.stops[i].id;
      }
    }
    return previousStop;
  };

  const getPreviousSideTrips = (id) => {
    const previousSideTrips = [];
    for (let i = 0; i < currentWalk.stops.length; i++) {
      if (
        currentWalk.stops[i].sideTrips &&
        currentWalk.stops[i].sideTrips.length
      ) {
        if (currentWalk.stops[i].sideTrips.indexOf(id) > -1) {
          previousSideTrips[previousSideTrips.length] = currentWalk.stops[i].id;
        }
      }
    }
    return previousSideTrips;
  };

  const getTitleFromId = (id) => {
    const theStop = currentWalk.stops.filter((x) => x.id === id);
    return theStop.length && theStop[0].title ? theStop[0].title : "";
  };

  const previousStop = getPreviousStop(stop.id);

  const previousSideTrips = getPreviousSideTrips(stop.id);

  return (
    <SelectedStopDiv className={isBottom ? "horizontal" : ""}>
      {!isBottom ? <h2>Selected stop:</h2> : null}
      {isBottom && previousStop ? (
        <button
          onClick={() => {
            setSelectedStop(previousStop);
          }}
        >
          <span>←</span>
          {getTitleFromId(previousStop)}
        </button>
      ) : null}
      <div>
        <p>
          <strong className="verticalonly">Name: </strong>{" "}
          {stop.title || `Stop ${currentWalk.stops.indexOf(stop) + 1}`}
        </p>
        {stop.sideTrips || (previousSideTrips && usePreviousSideTrips) ? (
          <div className="sidetrips">
            <hr />
            <h4>Side trips:</h4>
            {previousSideTrips && usePreviousSideTrips
              ? previousSideTrips.map((previousSideTrip, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedStop(previousSideTrip);
                    }}
                  >
                    <span>↖</span>
                    {getTitleFromId(previousSideTrip)}
                  </button>
                ))
              : null}
            {stop.sideTrips
              ? stop.sideTrips.map((sideTrip, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedStop(sideTrip);
                    }}
                  >
                    <span>↘</span>
                    {getTitleFromId(sideTrip)}
                  </button>
                ))
              : null}
          </div>
        ) : null}

        {stop.text ? <p className="verticalonly">{stop.text}</p> : null}
      </div>
      {/*<p>{JSON.stringify(stop)}</p>*/}
      {!isBottom && previousStop ? (
        <div>
          <hr className="verticalonly" />
          <h4 className="verticalonly">Previous:</h4>
          <button
            onClick={() => {
              setSelectedStop(previousStop);
            }}
          >
            <span>←</span>
            {getTitleFromId(previousStop)}
          </button>
        </div>
      ) : null}
      {stop.nextStop ? (
        <div>
          <hr className="verticalonly" />
          <h4 className="verticalonly">Next:</h4>
          <button
            onClick={() => {
              setSelectedStop(stop.nextStop);
            }}
          >
            {getTitleFromId(stop.nextStop)}
            <span>→</span>
          </button>
        </div>
      ) : null}
      {!isBottom ? (
        <React.Fragment>
          <div>
            <hr />
          </div>
          <button
            onClick={() => {
              setPresentationMode(true);
            }}
          >
            Presentation mode
          </button>
          <hr />
        </React.Fragment>
      ) : null}
    </SelectedStopDiv>
  );
};

export default SelectedStop;
