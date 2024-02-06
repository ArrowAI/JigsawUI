const schedulerservice = require('./../services/schedulerService.js');
const cloudSchedularService= require('./../services/cloudSchedulerService.js')
const getSchedulers = async function (req, res) {
  try {
    const { applicationId } = req.params;
    console.log(req.params);
    const schedulers = await schedulerservice.getSchedulers(applicationId);
    return res.sendSuccessResponse(schedulers);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const getSchedulersDetail = async function (req, res) {
  try {
    const { schedulersId } = req.params;
    const schedulersDetail = await schedulerservice.getSchedulersDetail(schedulersId);
    return res.sendSuccessResponse(schedulersDetail);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const createSchedulers = async function (req, res) {
  try {
    const newCloudScheduler= await cloudSchedularService.createJob(req.body);
    delete req.body._id;
    const newSchedulers = await schedulerservice.createScheduler(req.body);
    return res.sendSuccessResponse(newSchedulers);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateSchedulers = async function (req, res) {
  try {
    const updatedSchedulers = await schedulerservice.updateSchedulers(req.body);
    return res.sendSuccessResponse(updatedSchedulers);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
const deleteScheduler = async function (req, res) {
  try {
    const { schedulersId } = req.params;
    const schedulersDetail = await schedulerservice.getSchedulersDetail(schedulersId);
    return res.sendSuccessResponse(schedulersDetail);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};



module.exports = {
  getSchedulers,
  updateSchedulers,
  createSchedulers,
  getSchedulersDetail,
  deleteScheduler

};
