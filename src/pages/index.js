import * as React from "react";
import { Link } from "gatsby";
import walkData from "./../assets/walkData";

const Index = () => {
  const walks = walkData.walks;
  return (
    <div>
      <h1>Canvas viewer demo</h1>
      <p>Choose a canvas to view:</p>
      <ul>
        {walks.map((walk, index) => (
          <li key={index}>
            <strong>
              <Link to={`/${walk.id}`}>{walk.title}</Link>
            </strong>
            , {walk.author}, {walk.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
