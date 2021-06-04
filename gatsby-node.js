require = require("esm")(module);
const path = require("path");
const canvasTemplate = path.resolve(`src/templates/canvasPage.js`);
const canvasData = require("./src/assets/canvasData");
const canvases = canvasData.default.canvases;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  canvases.forEach((thisCanvas) => {
    console.log(`Building canvas: ${thisCanvas.id}`);
    createPage({
      path: "/" + thisCanvas.id,
      component: canvasTemplate,
      context: { id: thisCanvas.id, myData: thisCanvas },
    });
  });
};
