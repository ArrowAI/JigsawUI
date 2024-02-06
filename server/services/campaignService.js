
const Campaign = require('../models/campaign');
const constants = require('../config/constants');
let ObjectId = require('mongodb').ObjectID;
let MongoClient = require('mongodb').MongoClient;
const createCampaign = async (campaign) => {
  let newCampaign = await Campaign.findOneAndUpdate({ name: campaign.name }, Campaign, { upsert: true });
  return newCampaign;


};
const updateCampaign = async (campaign) => {
  let updatedCampaign = await Campaign.update();
  return updatedCampaign;
};

const getCampaigns = async (applicationId) => {
  let _campaign = await Campaign.find({applicationId:applicationId});
  return _campaign;
};

const getCampaignDetail = async (campaignId) => {
  let _campaign = await Campaign.findOne({ _id: ObjectId(campaignId) });
  return _campaign;
};
const getCampaignDetailBySegmentId = async (segmentId) => {
  let _campaigns = await Campaign.find({"segment._id": segmentId });
  return _campaigns;
}
module.exports = {
  createCampaign,
  updateCampaign,
  getCampaigns,
  getCampaignDetail,
  getCampaignDetailBySegmentId
}
