import * as React from "react";
import PropTypes from "prop-types";
import { EditorWidgetDiv } from "./elements";

const EditorWidget = ({ mode, selectedPoint, points, setPoints }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const [title, setTitle] = React.useState(
    selectedPoint !== null ? selectedPoint.title : ""
  );
  const [text, setText] = React.useState(
    selectedPoint !== null ? selectedPoint.text : ""
  );
  const [type, setType] = React.useState(
    selectedPoint !== null ? selectedPoint.type : "comment"
  );
  const [nextPoint, setNextPoint] = React.useState(
    selectedPoint !== null ? selectedPoint.nextPoint : ""
  );
  const [sideTrips, setSideTrips] = React.useState(
    selectedPoint !== null ? selectedPoint.sideTrips : []
  );
  const [url, setUrl] = React.useState(
    selectedPoint !== null ? selectedPoint.url : ""
  );

  const thisForm = React.createRef(null);

  const addPoint = (e) => {
    e.preventDefault();
    if (url || type === "comment") {
      console.log(`|${url}|`);
      const thePoint = {
        id: `edited_${points.length}`,
        noPreview: true, // this is to tell it not to try to get an image for it.
        title: title,
        text: text,
        type: type,
        nextPoint: nextPoint,
        sideTrips: sideTrips,
        url: url,
      };
      const newPoints = points;
      newPoints[points.length] = thePoint;
      setPoints(newPoints);
      setErrorMessage("");
    } else {
      setErrorMessage("You need to enter a URL!");
    }
  };

  const editPoint = (e) => {
    e.preventDefault();
    console.log("edit point: ", selectedPoint.id);
    const newPoints = points;
    for (let i = 0; i < newPoints.length; i++) {
      if (newPoints[i].id === selectedPoint.id) {
        newPoints[i].title = title;
        newPoints[i].text = text;
        newPoints[i].type = type;
        newPoints[i].nextPoint = nextPoint;
        newPoints[i].sideTrips = sideTrips;
        newPoints[i].url = url;
        setPoints(newPoints);
      }
    }
  };

  const deletePoint = (e) => {
    e.preventDefault();
    console.log("delete point: ", selectedPoint.id);
    const newPoints = points.filter((x) => x.id !== selectedPoint.id);
    for (let i = 0; i < newPoints.length; i++) {
      if (
        newPoints[i].nextPoint &&
        newPoints[i].nextPoint === selectedPoint.id
      ) {
        newPoints[i].nextPoint = "";
      }
      if (
        newPoints[i].sideTrips &&
        newPoints[i].sideTrips.indexOf(selectedPoint.id)
      ) {
        const newSideTrips = newPoints[i].sideTrips.filter(
          (x) => x !== selectedPoint.id
        );
        newPoints[i].sideTrips = newSideTrips;
      }
    }
    setPoints(newPoints);
  };

  React.useEffect(() => {
    console.log("Selected point changed!");
    // console.log(selectedPoint, title, text, type);
    if (selectedPoint !== null) {
      setTitle(selectedPoint.title);
      setText(selectedPoint.text);
      setType(selectedPoint.type);
      setNextPoint(selectedPoint.nextPoint);
      setSideTrips(selectedPoint.sideTrips);
      setUrl(selectedPoint.url);
      setCounter((counter) => counter + 1);
    }
  }, [selectedPoint]);

  return mode === "canvas" ? (
    <EditorWidgetDiv key={`widget_${counter}`}>
      <h2>{selectedPoint === null ? "Add a new point:" : `Edit ${title}`}</h2>
      <form ref={thisForm}>
        <label htmlFor="title">
          Title:
          <input
            name="title"
            type="text"
            id="title"
            value={title}
            placeholder={`Point ${points.length + 1}`}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label htmlFor="text">
          Text:
          <textarea
            name="text"
            type="text"
            id="text"
            placeholder="Add caption text if you want."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
        <label htmlFor="type">
          Type:
          <select
            name="type"
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="audio">Audio</option>
            <option value="book">Book</option>
            <option value="canvas">Canvas</option>
            <option value="comment">Comment</option>
            <option value="image">Image</option>
            <option value="software">Software</option>
            <option value="web">Web</option>
          </select>
        </label>
        {type === "audio" ||
        type === "book" ||
        type === "canvas" ||
        type === "image" ||
        type === "software" ||
        type === "web" ? (
          <label htmlFor="url">
            URL:{" "}
            <input
              name="url"
              id="url"
              type="text"
              placeholder="Use a real URL!"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </label>
        ) : null}
        {points.length ? (
          <label htmlFor="nextPoint">
            Next point:
            <select
              name="nextPoint"
              id="nextPoint"
              value={nextPoint}
              onChange={(e) => {
                setNextPoint(e.target.value);
              }}
            >
              <option value="">(none)</option>
              {points.map((x, index) =>
                !selectedPoint || x.id !== selectedPoint.id ? (
                  <option key={index} value={x.id}>
                    {x.title || `Point ${index + 1}`}
                  </option>
                ) : null
              )}
            </select>
          </label>
        ) : null}
        {points.length ? (
          <label htmlFor="sideTrips">
            Side trips:
            <select
              name="sideTrips"
              id="sideTrips"
              value={sideTrips}
              onChange={(e) => {
                const selected = [];
                for (let i = 0; i < e.target.options.length; i++) {
                  if (e.target.options[i].selected) {
                    selected.push(e.target.options[i].value);
                  }
                }
                setSideTrips(selected);
              }}
              multiple
            >
              {points.map((x, index) =>
                !selectedPoint || x.id !== selectedPoint.id ? (
                  <option key={index} value={x.id}>
                    {x.title || `Point ${index + 1}`}
                  </option>
                ) : null
              )}
            </select>
          </label>
        ) : null}
        {errorMessage ? (
          <p>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage("");
              }}
            >
              {errorMessage}
            </a>
          </p>
        ) : null}
        <p>
          {selectedPoint === null ? (
            <button onClick={addPoint}>Add!</button>
          ) : (
            <React.Fragment>
              <button onClick={editPoint}>Edit!</button>
              <button onClick={deletePoint}>Delete</button>
            </React.Fragment>
          )}
        </p>
      </form>
    </EditorWidgetDiv>
  ) : null;
};

export default EditorWidget;

EditorWidget.propTypes = {
  mode: PropTypes.string,
  selectedPoint: PropTypes.object,
  points: PropTypes.array,
  setPoints: PropTypes.func,
};
