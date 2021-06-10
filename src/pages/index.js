import * as React from "react";
import { Link } from "gatsby";
import canvasData from "./../assets/canvasData";

const Index = () => {
  const canvases = canvasData.canvases;
  return (
    <div style={{ margin: "25px" }}>
      <h1>Canvas viewer demo</h1>
      <p>Choose a canvas to view:</p>
      <ul>
        {canvases.map((canvas, index) => (
          <li key={index}>
            <strong>
              <Link to={`/${canvas.id}`}>{canvas.title}</Link>
            </strong>{" "}
            (by {canvas.author}, {canvas.date})
          </li>
        ))}
      </ul>
      <p>
        Or, try{" "}
        <strong>
          <Link to={`/editor`}>editing a canvas</Link>
        </strong>
        .
      </p>
    </div>
  );
};

export default Index;
