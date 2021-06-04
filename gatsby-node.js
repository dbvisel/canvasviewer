require = require("esm")(module);
const path = require("path");
const canvasTemplate = path.resolve(`src/templates/canvasPage.js`);
const walkData = require("./src/assets/walkData");
const canvases = walkData.default.walks;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  canvases.forEach((thisCanvas) => {
    console.log(thisCanvas.id);
    createPage({
      path: "/" + thisCanvas.id,
      component: canvasTemplate,
      context: { id: thisCanvas.id, myData: thisCanvas },
    });
  });
};
