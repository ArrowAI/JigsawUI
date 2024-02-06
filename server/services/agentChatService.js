
const agentChat = require('../models/agentChat');

const createAgentChat = async (AgentChat) => {
  let newAgentChat = await agentChat.findOneAndUpdate({ name: AgentChat.name }, AgentChat, {upsert: true});
  return newAgentChat;


};
const updateAgentChat = async (agentChat) => {
  let updatedAgentChat = await AgentChat.update();
  return updatedAgentChat;
};

const getAgentChat = async () => {
  let AgentChat = await agentChat.find({});
  return AgentChat;
};

const getAgentChatDetail = async (name) => {
  let AgentChat = await agentChat.findOne({ name: name });
  return AgentChat;
};
module.exports = {
  createAgentChat,
  updateAgentChat,
  getAgentChat,
  getAgentChatDetail
}
