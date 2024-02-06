const express = require("express");
const ApiRouterRouter = express.Router();

const ApiController = require("../controllers/apiController");

const responseFormatter = require("../middleware/responseFormatter");
ApiRouterRouter.use(responseFormatter);
ApiRouterRouter.route("/").post(ApiController.createApis); //TODO: TO REMOVE
ApiRouterRouter.route("/:apiid").patch(ApiController.updateApis); 
ApiRouterRouter.route("/").get(ApiController.getApis);
ApiRouterRouter.route("/:name").get(ApiController.getApiDetail); 

module.exports = ApiRouterRouter;
