const agentService = require('../services/agentService');

const getAgents = async function (req, res) {
  try {
    let applicationId=req.body.applicationId;
    const Agents = await agentService.getAgents(applicationId);
    return res.sendSuccessResponse(Agents);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


const createAgent = async function (req, res) {
  try {
    const newAgents = await agentService.createAgents(req.body.agent,req.body.applicationId);
    return res.sendSuccessResponse(newAgents);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateAgent = async function (req, res) {
  try {
    const updatedAgents = await agentService.updateAgents(req.body);
    return res.sendSuccessResponse(updatedAgents);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


const getAgentDetail= async function (req, res) {
  try {
    const { agentId } = req.params;
    const Agent = await agentService.getAgentDetail(agentId);
    return res.sendSuccessResponse(Agent);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getAgents,
  updateAgent,
  createAgent,
  getAgentDetail

};
