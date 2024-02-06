const express = require("express");
const ElementRouterRouter = express.Router();

const ElementController = require("../controllers/elementsController");

const responseFormatter = require("../middleware/responseFormatter");
ElementRouterRouter.use(responseFormatter);
ElementRouterRouter.route("/").post(ElementController.createElements); //TODO: TO REMOVE
ElementRouterRouter.route("/:ElementId").patch(ElementController.updateElements); 
ElementRouterRouter.route("/").get(ElementController.getElements);
ElementRouterRouter.route("/:name").get(ElementController.getElementDetail); 

module.exports = ElementRouterRouter;
