const express = require("express");
const AgentChatRouterRouter = express.Router();

const AgentChatController = require("../controllers/agentChatController");

const responseFormatter = require("../middleware/responseFormatter");
AgentChatRouterRouter.use(responseFormatter);
AgentChatRouterRouter.route("/").post(AgentChatController.createAgentChat); //TODO: TO REMOVE
AgentChatRouterRouter.route("/:AgentChatid").patch(AgentChatController.updateAgentChat); 
AgentChatRouterRouter.route("/").get(AgentChatController.getAgentChat);
AgentChatRouterRouter.route("/:name").get(AgentChatController.getAgentChatDetail); 

module.exports = AgentChatRouterRouter;
