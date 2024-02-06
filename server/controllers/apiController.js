const Apiservice = require('./../services/apiService');

const getApis = async function (req, res) {
  try {
    const Apis = await Apiservice.getApi();
    return res.sendSuccessResponse(Apis);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


const createApis = async function (req, res) {
  try {
    const newApis = await Apiservice.createApi(req.body);
    return res.sendSuccessResponse(newApis);
  } catch (error) {
    console.error(error);
    return res.sendSuccessResponse({error:error.message});
  }
};
const updateApis = async function (req, res) {
  try {
    const updatedApis = await Apiservice.updateApis(req.body);
    return res.sendSuccessResponse(updatedApis);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getApiDetail= async function (req, res) {
  try {
    const { name } = req.params;
    const Api = await Apiservice.getApiDetail(name);
    return res.sendSuccessResponse(Api);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};


module.exports = {
  getApis,
  updateApis,
  createApis,
  getApiDetail

};
