const express = require("express");
const MultiBotRouterRouter = express.Router();
const MultiBotController = require("../controllers/multiBotController");;
// const {
//   getMultiBots,
//   getMultiBotDetail,
//   createMultiBot,
//   updateMultiBot,
// } = MultiBotController
const responseFormatter = require("../middleware/responseFormatter");
MultiBotRouterRouter.use(responseFormatter);
MultiBotRouterRouter.route("/").post(MultiBotController.createMultiBot); //TODO: TO REMOVE
MultiBotRouterRouter.route("/:multiBotId").put(MultiBotController.updateMultiBot);
MultiBotRouterRouter.route("/:applicationId").get(MultiBotController.getMultiBots);
MultiBotRouterRouter.route("/detail/:multiBotId").get(MultiBotController.getMultiBotDetail);



module.exports = MultiBotRouterRouter;
