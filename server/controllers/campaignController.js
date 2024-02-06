const CampaignService = require('../services/campaignService');
const constants = require('./../config/constants')
const getCampaigns = async function (req, res) {
  try {
    let { applicationId } = req.params;
    const Campaigns = await CampaignService.getCampaigns(applicationId);
    return res.sendSuccessResponse(Campaigns);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const createCampaigns = async function (req, res) {
  try {
    const newCampaigns = await CampaignService.createCampaign(req.body);
    return res.sendSuccessResponse(newCampaigns);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({ error: error.message });
  }
};

const updateCampaigns = async function (req, res) {
  try {
    const updatedCampaigns = await CampaignService.updateCampaigns(req.body);
    return res.sendSuccessResponse(updatedCampaigns);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getCampaignDetail = async function (req, res) {
  try {
    const { campaignId } = req.params;
    const Campaign = await CampaignService.getCampaignDetail(campaignId);
    return res.sendSuccessResponse(Campaign);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getCampaignDetailBySegmentId = async function (req, res) {
  try {
    const { segmentId } = req.body;
    const _campaign = await CampaignService.getCampaignDetailBySegmentId(segmentId);
    _launchCampaign(_campaign);
    return res.sendSuccessResponse(_campaign);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getCampaignDetailByLiveSegmentId = async function (req, res) {
  try {
    const { segmentId, gorupId } = JSON.parse(Buffer.from(req.body, 'base64').toString('ascii'));

    const _campaign = await CampaignService.getCampaignDetailBySegmentId(segmentId);
    _launchLiveCampaign(_campaign, gorupId);
    return res.sendSuccessResponse(_campaign);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const _launchCampaign = async (campaign) => {
  let users = _getSegmentUser(campaign.segment._id);
  users.forEach(user => {

  })
}
const _launchLiveCampaign = async (campaign, gorupId) => {
  let message = _getArrowaiFormat(campaign, gorupId);
}
const _getSegmentUser = async (segmentId) => {
  return await axios.get(`${constants.EVENT_SERVER}/segment/${segmentId}`);
}

const _getArrowaiFormat = (campaign, gorupId) => {
  let arrowaiFormat = {
    integrationId: integrationId
  };
  if (campaign.what.component == 'text') {
    arrowaiFormat.applicationId = applicationId;
    arrowaiFormat.sender = {
      id: "api",
      name: "Api Call"
    };
    arrowaiFormat.integration = campaign.integration,
      arrowaiFormat.sentFromServer = false;
    arrowaiFormat.sentFromUser = false;
    arrowaiFormat.sentFromRep = true;
    arrowaiFormat.seenByUser = false;
    arrowaiFormat.needVerification = false;
    arrowaiFormat.receipientId = gorupId
    arrowaiFormat.timestamp = new Date().getTime();
    arrowaiFormat.payload = {
      integration: campaign.integration
    };
    try {
      arrowaiFormat.message_id = Math.random().toString(36).substring(2) +
        (new Date()).getTime().toString(36);
      arrowaiFormat.message = what.text;
      return arrowaiFormat;

    } catch (e) {
      console.log("error in object", e);
    }
  }
}
module.exports = {
  getCampaigns,
  updateCampaigns,
  createCampaigns,
  getCampaignDetail,
  getCampaignDetailBySegmentId,
  getCampaignDetailByLiveSegmentId

};
