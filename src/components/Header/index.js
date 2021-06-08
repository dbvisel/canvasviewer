import React from "react";
import { Link } from "gatsby";
import { CommentCount } from "disqus-react";
import { BiCommentAdd } from "react-icons/bi";
import { HeaderDiv } from "./elements";
import Config from "./../../config";

const Header = ({
  currentCanvas,
  mode,
  setMode,
  setAnnotationShown,
  useAnnotation,
}) => {
  const [flag, setFlag] = React.useState(false);
  const myUrl = `${Config.disqus.url}/${currentCanvas.id}`;
  return (
    <HeaderDiv>
      <h1>
        <Link to={"/"}>«&nbsp;</Link>
        {"  "}
        {currentCanvas.title}
        {useAnnotation ? (
          <a
            href="/#"
            className="comment"
            onClick={(e) => {
              e.preventDefault();
              setAnnotationShown(true);
            }}
          >
            <BiCommentAdd />
            <CommentCount
              shortname={Config.disqus.shortName}
              config={{
                url: myUrl,
                identifier:
                  currentCanvas.id +
                  "_0" /* https://github.com/disqus/disqus-react/issues/83 */,
                title: currentCanvas.id,
                language: "en_US",
              }}
            >
              {""}
            </CommentCount>
          </a>
        ) : null}
      </h1>
      <p>
        Choose mode:{" "}
        <select
          selected={mode}
          key={mode}
          defaultValue={mode}
          onChange={(e) => {
            e.preventDefault();
            setMode(e.target.value);
            setFlag(() => !flag);
          }}
        >
          <option value="canvas">Canvas</option>
          <option value="presentation">Presentation</option>
          <option value="graph">Graph</option>
        </select>
      </p>
    </HeaderDiv>
  );
};
export default Header;
