import * as React from "react";
import { DiscussionEmbed } from "disqus-react";
import { AiOutlineClose } from "react-icons/ai";
import { AnnotationWrapper } from "./elements";
import Config from "./../../config.js";

const AnnotationPopUp = ({ id, annotationTitle, visible, closeAnnotation }) => {
  const myUrl = `${Config.disqus.url}/${id}`;
  return (
    <AnnotationWrapper visible={visible}>
      <a
        href="/#"
        onClick={(e) => {
          e.preventDefault();
          closeAnnotation(true);
        }}
      >
        <AiOutlineClose />
      </a>
      <div>
        <h2>{annotationTitle}</h2>
        <DiscussionEmbed
          key={id}
          shortname={Config.disqus.shortName}
          config={{
            url: myUrl,
            identifier:
              id + "_0" /* https://github.com/disqus/disqus-react/issues/83 */,
            title: id,
            language: "en_US",
          }}
        />
      </div>
    </AnnotationWrapper>
  );
};

export default AnnotationPopUp;
