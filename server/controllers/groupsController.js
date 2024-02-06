const Groupservice = require('../services/groupService');

const getGroups = async function (req, res) {
  try {
    const { applicationId } = req.params;
    const Groups = await Groupservice.getGroups(applicationId);
    return res.sendSuccessResponse(Groups);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


const createGroups = async function (req, res) {
  try {
    const newGroups = await Groupservice.createGroups(req.body);
    return res.sendSuccessResponse(newGroups);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateGroups = async function (req, res) {
  try {
    const updatedGroups = await Groupservice.updateGroups(req.body);
    return res.sendSuccessResponse(updatedGroups);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getGroupDetail= async function (req, res) {
  try {
    const { name } = req.params;
    const Group = await Groupservice.getGroupDetail(name);
    return res.sendSuccessResponse(Group);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getGroups,
  updateGroups,
  createGroups,
  getGroupDetail

};
