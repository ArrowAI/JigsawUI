

// const {WorkFlow,NodeTypes,CredentialTypes,Credentials} =require('../models/index');
const WorkFlow =require('../models/workflow');
const NodeTypes =require('../models/node-types');

const CredentialTypes =require('../models/credential-types');
const Credentials =require('../models/credentials');

let ObjectId = require('mongodb').ObjectID;
const createWorkFlow = async (workflow) => {
  let newWorkflow = await WorkFlow.create(workflow);
  return newWorkflow;
};
const updateWorkFlow= async (workflow) => {
  let updatedWorkFlow = await WorkFlow.update({id:workflow.id},{$set:{
    connections:workflow.connections,
    nodes:workflow.nodes,
    settings:workflow.settings,
    active:workflow.active,
    name:workflow.name,

  }});
  return updatedWorkFlow;
};
const createCredential = async (newCredentials) => {
  let credentials = await Credentials.create(newCredentials);
  return credentials;
};
const getCredentials = async (applicationId) => {
  let credentials = await Credentials.find({
    applicationId:applicationId
  });
  return credentials;
};

const getWorkFlows = async (applicationId) => {
console.log(applicationId);
  let workflow = await WorkFlow.find({
    applicationId:applicationId

  });

  return workflow;
};

const getNodeTypes = async (applicationId) => {
  let nodeTypes = await NodeTypes.findAll({
    applicationId:applicationId
  });

  return nodeTypes;
};

const getCredentialTypes = async (applicationId) => {
  let credentialTypes = await CredentialTypes.findAll({
    applicationId:applicationId
  });
  return credentialTypes
}
const getWorkFlowDetail = async (workflowId) => {
  let workflow = await WorkFlow.findOne({
    _id:ObjectId(workflowId)
  });
  return workflow
}
module.exports = {
  createWorkFlow,
  updateWorkFlow,
  getCredentials,
  getWorkFlows,
  getNodeTypes,
  getCredentialTypes,
  getWorkFlowDetail,
  createCredential
};
