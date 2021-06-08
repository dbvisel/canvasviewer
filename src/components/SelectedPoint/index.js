import React from "react";
import { SelectedPointDiv } from "./elements";

const usePreviousSideTrips = false;

// TODO: clean this up. It's a mess.

const SelectedPoint = ({
  point,
  setSelectedPoint,
  setPresentationMode,
  currentCanvas,
  isBottom,
}) => {
  const getPreviousPoint = (id) => {
    let previousPoint = "";
    for (let i = 0; i < currentCanvas.points.length; i++) {
      if (
        currentCanvas.points[i].nextPoint &&
        currentCanvas.points[i].nextPoint === id
      ) {
        previousPoint = currentCanvas.points[i].id;
      }
    }
    return previousPoint;
  };

  const getPreviousSideTrips = (id) => {
    const previousSideTrips = [];
    for (let i = 0; i < currentCanvas.points.length; i++) {
      if (
        currentCanvas.points[i].sideTrips &&
        currentCanvas.points[i].sideTrips.length
      ) {
        if (currentCanvas.points[i].sideTrips.indexOf(id) > -1) {
          previousSideTrips[previousSideTrips.length] =
            currentCanvas.points[i].id;
        }
      }
    }
    return previousSideTrips;
  };

  const getTitleFromId = (id) => {
    const thePoint = currentCanvas.points.filter((x) => x.id === id);
    return thePoint.length && thePoint[0].title ? thePoint[0].title : "";
  };

  const previousPoint = getPreviousPoint(point.id);

  const previousSideTrips = getPreviousSideTrips(point.id);

  return isBottom ? (
    <SelectedPointDiv className="horizontal">
      {previousPoint ? (
        <button
          onClick={() => {
            setSelectedPoint(previousPoint);
          }}
        >
          <span>←</span>
          {getTitleFromId(previousPoint)}
        </button>
      ) : null}
      <div className="middle">
        <p>
          <strong>
            {point.title || `Point ${currentCanvas.points.indexOf(point) + 1}`}
          </strong>{" "}
          {point.text || ""}
        </p>
        {point.sideTrips || (previousSideTrips && usePreviousSideTrips) ? (
          <div className="sidetrips">
            <h4>Side trips:</h4>
            {previousSideTrips && usePreviousSideTrips
              ? previousSideTrips.map((previousSideTrip, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedPoint(previousSideTrip);
                    }}
                  >
                    <span>↖</span>
                    {getTitleFromId(previousSideTrip)}
                  </button>
                ))
              : null}
            {point.sideTrips
              ? point.sideTrips.map((sideTrip, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedPoint(sideTrip);
                    }}
                  >
                    <span>↘</span>
                    {getTitleFromId(sideTrip)}
                  </button>
                ))
              : null}
          </div>
        ) : null}
      </div>
      {point.nextPoint ? (
        <button
          onClick={() => {
            setSelectedPoint(point.nextPoint);
          }}
        >
          {getTitleFromId(point.nextPoint)}
          <span>→</span>
        </button>
      ) : null}
    </SelectedPointDiv>
  ) : (
    <SelectedPointDiv className="vertical">
      <div>
        <p>
          <strong>
            {point.title || `Point ${currentCanvas.points.indexOf(point) + 1}`}
          </strong>
        </p>
        {point.text ? <p>{point.text}</p> : null}
      </div>
      {previousPoint || point.nextPoint ? (
        <div>
          <hr />
          <h4>On this path:</h4>
          {previousPoint ? (
            <button
              onClick={() => {
                setSelectedPoint(previousPoint);
              }}
            >
              <span>←</span>
              {getTitleFromId(previousPoint)}
            </button>
          ) : null}
          {point.nextPoint ? (
            <button
              onClick={() => {
                setSelectedPoint(point.nextPoint);
              }}
            >
              {getTitleFromId(point.nextPoint)}
              <span>→</span>
            </button>
          ) : null}
        </div>
      ) : null}
      {point.sideTrips || (previousSideTrips && usePreviousSideTrips) ? (
        <div className="sidetrips">
          <hr />
          <h4>Side trips:</h4>
          {previousSideTrips && usePreviousSideTrips
            ? previousSideTrips.map((previousSideTrip, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPoint(previousSideTrip);
                  }}
                >
                  <span>↖</span>
                  {getTitleFromId(previousSideTrip)}
                </button>
              ))
            : null}
          {point.sideTrips
            ? point.sideTrips.map((sideTrip, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPoint(sideTrip);
                  }}
                >
                  <span>↘</span>
                  {getTitleFromId(sideTrip)}
                </button>
              ))
            : null}
        </div>
      ) : null}
      <div>
        <hr />
        <button
          onClick={() => {
            setPresentationMode(true);
          }}
        >
          Presentation mode
        </button>
      </div>
    </SelectedPointDiv>
  );
};

export default SelectedPoint;
