const workFlow = require('./../services/workflowService.js');
const getCredentialTypes = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const credentialTypes = await workFlow.getCredentialTypes(applicationId);
    return res.sendSuccessResponse(credentialTypes);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getCredentials = async function (req, res) {
  try {
    const { applicationId } = req.params;
    const credentials = await workFlow.getCredentials(applicationId);
    return res.sendSuccessResponse(credentials);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getWorkFlows = async function (req, res) {
  try {
    const { applicationId } = req.params;
    console.log(req.params);
    const workFlows = await workFlow.getWorkFlows(applicationId);
    return res.sendSuccessResponse(workFlows);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getWorkFlowDetail = async function (req, res) {
  try {
    const { workflowId } = req.params;
    const workFlowDetail = await workFlow.getWorkFlowDetail(workflowId);
    return res.sendSuccessResponse(workFlowDetail);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getNodeTypes = async function (req, res) {
  try {
    const { applicatinId } = req.params;
    const nodeTypes = await workFlow.getNodeTypes(applicatinId);
    return res.sendSuccessResponse(nodeTypes);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const createWorkFlow = async function (req, res) {
  try {
    const newWorkFlow = await workFlow.createWorkFlow(req.body);
    return res.sendSuccessResponse(newWorkFlow);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const updateWorkFlow = async function (req, res) {
  try {
    const updatedWorkFlow = await workFlow.updateWorkFlow(req.body);
    return res.sendSuccessResponse(updatedWorkFlow);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const createCredential = async function (req, res) {
  try {

    const credential = await workFlow.createCredential(req.body);
    return res.sendSuccessResponse(credential);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getWorkFlows,
  getWorkFlowDetail,
  getCredentialTypes,
  getCredentials,
  getNodeTypes,
  createWorkFlow,
  updateWorkFlow,
  createCredential
};
