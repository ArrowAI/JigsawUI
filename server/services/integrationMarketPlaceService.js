
const IntegrationMarketPlace =require('./../models/integrationMarketPlace');
let ObjectId = require('mongodb').ObjectID;
const createIntegration = async (integration) => {
  let newintegration = await IntegrationMarketPlace.create(integration);
  return newintegration;
};
const updateIntegration = async (integration) => {
  let updatedintegration = await IntegrationMarketPlace.update({ id: integration.id }, {
    $set: {
      connections: integration.connections,
      nodes: integration.nodes,
      settings: integration.settings,
      active: integration.active,
      name: integration.name,

    }
  });
  return updatedintegration;
};
const getIntegrations = async () => {
  let integration = await IntegrationMarketPlace.find({
  });
  return integration;
};
const getIntegrationDetail = async (integrationId) => {
  let integration = await IntegrationMarketPlace.findOne({
    id: integrationId
  });
  return integration
}
module.exports = {
  getIntegrations,
  getIntegrationDetail,
  updateIntegration,
  createIntegration
};
