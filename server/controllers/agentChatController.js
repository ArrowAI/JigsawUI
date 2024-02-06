const AgentChatervice = require('../services/agentChatService');

const getAgentChat = async function (req, res) {
  try {
    const AgentChat = await AgentChatervice.getAgentChat();
    return res.sendSuccessResponse(AgentChat);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const createAgentChat = async function (req, res) {
  try {
    const newAgentChat = await AgentChatervice.createAgentChat(req.body);
    return res.sendSuccessResponse(newAgentChat);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateAgentChat = async function (req, res) {
  try {
    const updatedAgentChat = await AgentChatervice.updateAgentChat(req.body);
    return res.sendSuccessResponse(updatedAgentChat);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getAgentChatDetail= async function (req, res) {
  try {
    const { name } = req.params;
    const AgentChat = await AgentChatervice.getAgentChatDetail(name);
    return res.sendSuccessResponse(AgentChat);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getAgentChat,
  updateAgentChat,
  createAgentChat,
  getAgentChatDetail

};
