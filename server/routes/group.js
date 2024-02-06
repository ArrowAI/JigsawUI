

const express = require("express");
const GroupRouterRouter = express.Router();
const GroupController = require("../controllers/groupsController");
const responseFormatter = require("../middleware/responseFormatter");

GroupRouterRouter.use(responseFormatter);
GroupRouterRouter.route("/").post(GroupController.createGroups); //TODO: TO REMOVE
GroupRouterRouter.route("/:groupId").patch(GroupController.updateGroups); 
GroupRouterRouter.route("/list/:applicationId").get(GroupController.getGroups);
GroupRouterRouter.route("/:name").get(GroupController.getGroupDetail); 

module.exports = GroupRouterRouter;
