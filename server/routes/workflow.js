const express = require("express");
console.log(__dirname);
const WorkFlowRouterRouter = express.Router();
const responseFormatter = require("./../middleware/responseFormatter");
WorkFlowRouterRouter.use(responseFormatter);
const workFlowController = require("./../controllers/workFlowController");
// const {
//   getWorkFlows,
//   getWorkFlowDetail,
//   getCredentialTypes,
//   getCredentials,
//   getNodeTypes,
//   createWorkFlow,
//   updateWorkFlow,
//   createCredential
// } = workFlowController


WorkFlowRouterRouter.route("/").post(workFlowController.createWorkFlow); //TODO: TO REMOVE
WorkFlowRouterRouter.route("/:workflowId").patch(workFlowController.updateWorkFlow); 
WorkFlowRouterRouter.route("/:applicationId").get(workFlowController.getWorkFlows);
WorkFlowRouterRouter.route("/detail/:workflowId").get(workFlowController.getWorkFlowDetail);
WorkFlowRouterRouter.route("/:applicationId/credentialTypes").get(workFlowController.getCredentialTypes);
WorkFlowRouterRouter.route("/credentials").post(workFlowController.createCredential); //TODO: TO REMOVE
WorkFlowRouterRouter.route("/:applicationId/credentials").get(workFlowController.getCredentials);
WorkFlowRouterRouter.route("/:applicationId/nodeTypes").get(workFlowController.getNodeTypes);

module.exports = WorkFlowRouterRouter;
