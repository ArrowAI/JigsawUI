const express = require("express");
const CampaignRouterRouter = express.Router();
const CampaignController = require("../controllers/campaignController");
const responseFormatter = require("../middleware/responseFormatter");

CampaignRouterRouter.use(responseFormatter);
CampaignRouterRouter.route("/").post(CampaignController.createCampaigns); //TODO: TO REMOVE
CampaignRouterRouter.route("/:applicationId").get(CampaignController.getCampaigns); 
CampaignRouterRouter.route("/detail/:campaignId").get(CampaignController.getCampaignDetail);
// CampaignRouterRouter.route("/launchCampaign").post(CampaignController.getCampaignDetailBySegmentId); 
// CampaignRouterRouter.route("/launchLiveCampaign").post(CampaignController.getCampaignDetailBySegmentId); 

module.exports = CampaignRouterRouter;
