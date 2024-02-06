const express = require("express");
const AgentRouterRouter = express.Router();

const AgentController = require("../controllers/agentsController");

const responseFormatter = require("../middleware/responseFormatter");
AgentRouterRouter.use(responseFormatter);
AgentRouterRouter.route("/").post(AgentController.createAgent); //TODO: TO REMOVE
AgentRouterRouter.route("/:agentId").patch(AgentController.updateAgent); 
AgentRouterRouter.route("/list").post(AgentController.getAgents);
AgentRouterRouter.route("/:agentId").get(AgentController.getAgentDetail); 

module.exports = AgentRouterRouter;
