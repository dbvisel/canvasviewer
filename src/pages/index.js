import * as React from "react";
import { Link } from "gatsby";
import canvasData from "./../assets/canvasData";

const Index = () => {
  const walks = canvasData.canvases;
  return (
    <div style={{ margin: "25px" }}>
      <h1>Canvas viewer demo</h1>
      <p>Choose a canvas to view:</p>
      <ul>
        {walks.map((walk, index) => (
          <li key={index}>
            <strong>
              <Link to={`/${walk.id}`}>{walk.title}</Link>
            </strong>{" "}
            (by {walk.author}, {walk.date})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
