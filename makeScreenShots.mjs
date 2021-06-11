// this does not play well with Gatsby. Change this to use require?

import canvasData from "./src/assets/canvasData.js";
import Config from "./src/config.js";
import captureWebsite from "capture-website";

const urlsToGet = [];

for (let i = 0; i < canvasData.canvases.length; i++) {
  const thisWalk = canvasData.canvases[i];
  const thisId = canvasData.canvases[i].id;
  for (let j = 0; j < thisWalk.points.length; j++) {
    const thisStop = thisWalk.points[j];
    if (thisStop.url) {
      const newStop = thisStop;
      newStop.filename = thisId + "-" + newStop.id;
      newStop.width = newStop.width || Config.defaultSizes[newStop.type].width;
      newStop.height =
        newStop.height || Config.defaultSizes[newStop.type].height;
      urlsToGet[urlsToGet.length] = newStop;
    }
  }
}

for (let i = 0; i < urlsToGet.length; i++) {
  const thisWebsite = urlsToGet[i];
  console.log(`Downloading ${thisWebsite.url}`);
  (async () => {
    await captureWebsite.file(
      thisWebsite.url,
      `static/images/${thisWebsite.filename}.png`,
      {
        width: thisWebsite.width,
        height: thisWebsite.height,
        type: "png",
        delay: 10,
      }
    );
  })();
}
