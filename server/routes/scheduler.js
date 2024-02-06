const express = require("express");
const SchedulerRouterRouter = express.Router();

const SchedulerController = require("../controllers/schedulerController");

const responseFormatter = require("./../middleware/responseFormatter");
SchedulerRouterRouter.use(responseFormatter);
SchedulerRouterRouter.route("/").post(SchedulerController.createSchedulers); //TODO: TO REMOVE
SchedulerRouterRouter.route("/:SchedulerId").patch(SchedulerController.updateSchedulers); 
SchedulerRouterRouter.route("/:applicationId").get(SchedulerController.getSchedulers);


module.exports = SchedulerRouterRouter;
