// const {
//   multiBot,
// } = require("../services/index");
let multiBot = require('./../services/multiBotService')
const getMultiBots = async function (req, res) {
  try {
    const { applicationId } = req.params;
    console.log(req.params);
    const multiBots = await multiBot.getMultiBots(applicationId);
    return res.sendSuccessResponse(multiBots);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getMultiBotDetail = async function (req, res) {
  try {
    const { multiBotId } = req.params;
    const multiBotDetail = await multiBot.getMultiBotDetail(multiBotId);
    return res.sendSuccessResponse(multiBotDetail);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const updateMultiBot = async function (req, res) {
  try {
    console.log(req.body);
    const updatedBot = await multiBot.updateMultiBot(req.body);
    return res.sendSuccessResponse(updatedBot);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const createMultiBot = async function (req, res) {
  try {
    const newBot = await multiBot.createMutliBot(req.body);
    return res.sendSuccessResponse(newBot);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getMultiBots,
  getMultiBotDetail,
  updateMultiBot,
  createMultiBot,
};
